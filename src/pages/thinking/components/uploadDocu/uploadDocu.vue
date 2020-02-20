<template>
  <el-dialog title="文档上传" :visible.sync="uploadDocuVisible" :close-on-click-modal="false" :close-on-press-escape="false"
    :show-close="false" custom-class="uploadDocuDialog" width="50%">
    <div class="inner">
      <!-- http://47.103.104.87:8880/AuxiliaryPlanning/programme/word/singlefile -->
      <el-upload class="uploadArea" ref="upload" drag :limit="1" :on-exceed="handleExceed"
        :before-upload="beforeDocuUpload" :on-success="handleDocuSuccess"
        action="http://47.103.104.87:8880/AuxiliaryPlanning/programme/word/singlefile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传word文件，且不超过100M</div>
      </el-upload>
      <el-form :inline="true" ref="dialogForm" :model="formUpload" :rules="rules" class="formUploadForm">
        <el-form-item label="文档归属区域" prop="city_code">
          <el-cascader v-model="formUpload.city_code" :options="fileCityOpts" placeholder="请选择文档归属区域" :props="{ expandTrigger: 'hover',checkStrictly: true }"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="文档归属类型" prop="file_type">
          <el-select v-model="formUpload.file_type" placeholder="请选择文档归属类型">
            <el-option v-for="(item,index) in fileTypeOpts" :key="index" :label="item.LABEL" :value="item.VALUE">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档归属时间" prop="file_year">
          <el-select v-model="formUpload.file_year" placeholder="请选择文档归属时间">
            <el-option v-for="(item,index) in fileYearOpts" :key="index" :label="item.LABEL" :value="item.VALUE">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadDocuHide('dialogForm')">取消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm',formUpload)">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDocuInfo, uploadDocu, getAddress } from '@/api/thinkingApi'
export default {
  name: 'uploadDocument',
  data() {
    return {
      fileCityOpts: [],
      rules: {
        file_city: [
          { required: true, message: '请选择文档归属区域', trigger: 'change' }
        ],
        file_type: [
          { required: true, message: '请选择文档归属类型', trigger: 'change' }
        ],
        file_year: [
          { required: true, message: '请选择文档归属时间', trigger: 'change' }
        ]
      },
      fileTypeOpts: [], // 文档归属类型
      fileYearOpts: [], // 文档归属时间
      formUpload: {
        // 上传参数
        folder_no: '',
        province_code: '330000',
        city_code: [],
        file_type: '',
        file_year: ''
      }
    }
  },
  props: {
    uploadDocuVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getDocuInfoFn()
    this.getAddressFn()
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    // 获取文档上传下拉框数据
    getDocuInfoFn() {
      getDocuInfo().then(res => {
        this.fileTypeOpts = res.data.fileTypeOpts
        this.fileYearOpts = res.data.fileYearOpts
      })
    },
    getAddressFn() {
      getAddress().then(res => {
        this.fileCityOpts = res.data
      })
    },
    // 上传文件之前的钩子
    beforeDocuUpload(file) {
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)
      if (
        lastName.toLowerCase() !== '.doc' &&
        lastName.toLowerCase() !== '.docx'
      ) {
        this.$message.error('文件必须为.doc或者.docx类型')
        this.$refs.upload.clearFiles()
        return
      }
      // 限制上传文件的大小
      const isLt = file.size / 1024 / 1024 / 100 <= 1
      if (!isLt) {
        this.$message.error('上传文件不得大于100MB!')
        this.$refs.upload.clearFiles()
      }
      return isLt
    },
    // 文件选择时上传成功
    handleDocuSuccess(res, file) {
      if (res.code !== '0') {
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
        this.$refs.upload.clearFiles()
      } else {
        this.formUpload.folder_no = res.Folderno
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    // 关闭文档上传弹窗并清空表单
    uploadDocuHide(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.formUpload.folder_no = ''
      this.$emit('closeUploadDocu')
    },
    // 提交上传表单并清空表单
    onSubmit(formName, formData) {
      if (this.formUpload.folder_no == '') {
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          uploadDocu(formData).then(res => {
            this.$message({
              message: res.message,
              type: res.code === '0' ? 'success' : 'error'
            })
            this.$refs[formName].resetFields()
            this.$refs.upload.clearFiles()
            this.formUpload.folder_no = ''
            this.$emit('submitUploadDocu')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './uploadDocu.scss';
</style>
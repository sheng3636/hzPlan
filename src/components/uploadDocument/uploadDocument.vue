<template>
  <el-dialog
    title="文档上传"
    :visible.sync="uploadDocuVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="uploadDocuDialog"
    width="50%"
  >
    <div class="inner">
      <el-upload
        class="uploadArea"
        ref="upload"
        drag
        :limit="1"
        :on-exceed="handleExceed"
        :before-upload="beforeDocuUpload"
        :on-success="handleDocuSuccess"
        action="http://192.168.0.117:8083/programme/word/singlefile"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传word文件，且不超过100M</div>
      </el-upload>
      <el-form :inline="true" ref="dialogForm" :model="formUpload" :rules="rules" class="formUploadForm">
        <el-form-item label="文档归属区域" prop="file_city">
          <el-select v-model="formUpload.file_city" placeholder="请选择文档归属区域">
            <el-option v-for="(item,index) in fileCityOpts" :key="index" :label="item.LABEL" :value="item.VALUE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档归属类型" prop="file_type">
          <el-select v-model="formUpload.file_type" placeholder="请选择文档归属类型">
            <el-option v-for="(item,index) in fileTypeOpts" :key="index" :label="item.LABEL" :value="item.VALUE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档归属时间" prop="file_year">
          <el-select v-model="formUpload.file_year" placeholder="请选择文档归属时间">
            <el-option v-for="(item,index) in fileYearOpts" :key="index" :label="item.LABEL" :value="item.VALUE"></el-option>
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
import {
  getDocuInfo
} from '../../api/api'
// import {
//   getDocuInfo
// } from '@/api/thinkingApi'
export default {
  name: 'uploadDocument',
  data(){
    return {
      rules:{
        file_city: [
          { required: true, message: '请选择文档归属区域', trigger: 'change' }
        ],
        file_type: [
          { required: true, message: '请选择文档归属类型', trigger: 'change' }
        ],
        file_year: [
          { required: true, message: '请选择文档归属时间', trigger: 'change' }
        ],
      },
      fileCityOpts: [],// 文档归属区域
      fileTypeOpts: [],// 文档归属类型
      fileYearOpts: [],// 文档归属时间
      formUpload:{
        // 上传参数
        folder_no: '',
        file_province: '浙江省',
        province_code: '330000000000',
        file_city: '',
        city_code: '',
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
  mounted () {
    this.getDocuInfoFn()
  },
  methods: {
    // 获取文档上传下拉框数据
    getDocuInfoFn() {
      getDocuInfo().then(res => {
        this.fileCityOpts = res.data.fileCityOpts
        this.fileTypeOpts = res.data.fileTypeOpts
        this.fileYearOpts = res.data.fileYearOpts        
      })
    },
    // 文件上传成功
    handleDocuSuccess(res, file) {
      if(res.code !== '0'){
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
        this.$refs.upload.clearFiles()
      } else {
        this.formUpload.folder_no =  res.Folderno
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 上传文件之前的钩子
    beforeDocuUpload(file) {
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)
      if (lastName.toLowerCase() !== '.doc' && lastName.toLowerCase() !== '.docx') {
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
    // 关闭文档上传弹窗并清空表单
    uploadDocuHide(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.formUpload.folder_no =  ''
      this.$emit('closeUploadDocu')
    },
    // 提交上传表单
    onSubmit(formName,formData) {
      if (this.formUpload.folder_no ==  '') {
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submitUploadDocu',formData)
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './uploadDocument.scss';
</style>
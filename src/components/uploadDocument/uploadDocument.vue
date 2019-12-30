<template>
  <el-dialog
    title="文档上传"
    :visible.sync="uploadDocumentVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="uploadDocumentDialog"
    width="60%"
  >
    <div class="inner">
      <el-upload
        class="uploadArea"
        drag
        :on-success="handleAvatarSuccess"
        action="http://192.168.14.63:8083/programme/word/singlefile"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form :inline="true" :model="formUpload" class="formUploadForm">
        <el-form-item label="文档所属区域">
          <el-cascader :options="regionOpts" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="文档所属类型">
          <el-select v-model="formUpload.documentType" placeholder="文档所属类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadDocumentHide">取消</el-button>
      <el-button type="primary" @click="uploadDocumentHide">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'uploadDocument',
  data(){
    return {
      regionOpts: [
        {
          value: 'province',
          label: '浙江省',
          children: [
            {
              value: 'yizhi',
              label: '台州'
            },
            {
              value: 'fankui',
              label: '杭州'
            },
            {
              value: 'huzhou',
              label: '湖州'
            },
            {
              value: 'kekong',
              label: '温州'
            }
          ]
        }
      ],
      formUpload:{
        region: '',
        documentType: ''
      }
    }
  },
  props: {
    uploadDocumentVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      
    },
    // 关闭文档上传弹窗
    uploadDocumentHide() {
      this.$emit('closeUploadDocument')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './uploadDocument.scss';
</style>
<template>
  <el-dialog
    title="摘要"
    :visible.sync="summaryVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="summaryDialog"
    width="30%">
    <el-form :model="formSummary" label-width="60px" :rules="rules" ref="dialogForm" class="inner">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formSummary.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="摘要" prop="content">
            <el-input type="textarea" v-model="formSummary.content" :rows="6" placeholder="请输入摘要"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="summaryHide('dialogForm')">取消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm')">收藏</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { saveContent } from '@/api/thinkingApi'
export default {
  name: 'summaryInfo',
  data() {
    return {
      formSummary: {
        title:'',
        content: ''
      },
      rules:{
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
      },
    }
  },
  props:{
    summaryVisible:{
      type: Boolean,
      default: false
    },
    summaryVal:{
      type: String,
      default: 'fdsdf'
    }
  },
  watch:{
    summaryVal: function (val, oldVal) {
      this.formSummary.content = val
    }
  },
  methods:{
    // 关闭摘要弹窗
    summaryHide(formName) {
      this.$refs[formName].resetFields()
      this.$emit('closeSummaryInfo')
    },
    // 保存摘要
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {   
          saveContent(this.formSummary).then(res => {
            this.$message({
              message: res.message,
              type: res.code === '0' ? 'success' : 'error'
            })
            this.$emit('submitSummaryInfo')
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
@import './summaryInfo.scss';
</style>
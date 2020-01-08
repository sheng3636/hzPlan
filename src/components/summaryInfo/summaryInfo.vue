<template>
  <el-dialog
    title="摘要"
    :visible.sync="summaryVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="summaryDialog"
    width="30%">
    <el-form :model="formSummary" label-position="top" ref="dialogForm" class="inner">
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="formSummary.summaryTxt" :rows="6" placeholder="请输入摘要"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="summaryHide('dialogForm')">取消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm')">收藏</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'summaryInfo',
  data() {
    return {
      formSummary: {
        summaryTxt: ''
      }
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
      // console.log('new' + val, 'oldVal' + oldVal)
      this.formSummary.summaryTxt = val
    }
  },
  mounted() {
    
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
          // console.log('submit!')
          this.$emit('submitSummaryInfo')
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
export const menuMixin = {
  data() {
    return {
      collectParams: {
        collect_no:'',
        title: '',
        content: '',
        source: '',
        type: '历史借鉴'
      },
      isMenu:false,
      selectTxt: '', // 鼠标选中文字
      menuTop: null, // 选中文字后显示菜单距离顶部位置
      menuLeft: null, // 选中文字后显示菜单距离左边位置
      summaryVisible: false, // 控制摘要弹窗显隐
    }
  },
  mounted() {
  },
  created() {

  },
  methods: {
    // 选中文字后显示菜单
    selectText(e, title,content) {
      this.collectParams.title = title
      this.collectParams.source = content
      if (document.Selection) {
        // ie浏览器
        this.selectTxt = document.selection.createRange().text
        this.collectParams.content = this.selectTxt
      } else {
        // 标准浏览器
        this.selectTxt = window.getSelection().toString()
        this.collectParams.content = this.selectTxt
      }
      if (this.selectTxt !== '') {
        this.menuTop = e.clientY
        this.menuLeft = e.clientX
        this.isMenu = true
      } else {
        this.isMenu = false
      }
    },
    // 打开摘要弹窗
    editCollect(title, content,source,id) {
      this.collectParams.title = title
      this.collectParams.content = content
      this.collectParams.source = source
      this.collectParams.collect_no = id
      
      this.summaryVisible = true
    },
    // 保存摘要并关闭弹窗
    submitSummaryInfo() {
      this.summaryVisible = false
      this.$parent.getEcollectFn()
    },
    // 关闭摘要弹窗
    closeSummaryInfo() {
      this.summaryVisible = false
    }
  }
}
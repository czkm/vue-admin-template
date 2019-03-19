<!--  -->
<template>
    <div>
        <div ref="editor" style="text-align:left">

        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data () {
    return {
      editval: '', // 编辑值
      editorContent: '',
      menuslist: [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        // 'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
    }
  },
  //   props: ['editormessage'],
  methods: {
    getContent: function () {
      console.log(this.editorContent)
    },
    // 获取编辑值
    geteditvale () {
      console.log(this.editval)
    },

    editcreat (editvale) {
      let _this = this

      var editor = new E(this.$refs.editor)
      editor.customConfig.zIndex = 0
      // 配置菜单
      editor.customConfig.menus = this.menuslist
      // 变化时触发 传入父组件
      editor.customConfig.onchange = (html) => {
        _this.editval = html
        console.log(_this.editval)
      }
      editor.create()
      editor.txt.html(editvale)
    }
  },
  mounted () {
    // let _this = this

    var editor = new E(this.$refs.editor)

    editor.customConfig.zIndex = 0
    // 配置菜单
    editor.customConfig.menus = this.menuslist
    // 变化时触发 传入父组件
    editor.customConfig.onchange = (html) => {
      this.$emit('update:editorContent', html)
    //   _this.editval = html
    //   console.log(_this.editval)
    }
    editor.create()
  }
}

</script>
<style scoped lang="scss">

</style>

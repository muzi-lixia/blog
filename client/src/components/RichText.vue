<template>
  <div>
    <textarea id="demo" style="display: none;"></textarea>
    <button type="button" class="layui-btn" @click="handleClick">提交留言</button>
  </div>
</template>

<script>
  export default {
    name: "RichText",
    data(){
      return {
        layedit: null,
        index: 0
      }
    },
    methods: {
      /*传递参数，获取到文本框的内容*/
      handleClick(){
        this.$emit("Sub",this.layedit.getContent(this.index));
      }
    },
    mounted() {
      layui.use('layedit', ()=>{
        this.layedit = layui.layedit;
        this.index = this.layedit.build('demo',{
          tool: ["face"]
        }); //建立编辑器
      });
    }
  }
</script>

<style scoped>

</style>
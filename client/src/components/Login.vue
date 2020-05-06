<!--登录组件-->
<template>

  <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="beforeClose"
      :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" label-width="80px" class="Register" :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input v-model="form.psw" show-password></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClick" :disabled="submitDisabled">登录</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import request from '../api/index'
  const getLogin = request.getLogin;
  export default {
    name: "Login",
    data(){
      return{
        /*表单数据*/
        form: {
          user: "",
          psw: ""
        },

        /*表单验证*/
        rules: {
          /*验证用户名*/
          user: {
            validator: (rule,value,cb)=>{
              if(!value){
                cb(new Error("请输入用户名！"))
              }else{
                if(/^[\w\u4e00-\u9fa5]{3,8}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("请输入正确格式用户名！"))
                }
              }
            },
            required: true,
            trigger: 'blur',
          },

          /*验证密码*/
          psw: {
            type: 'string',
            validator: (rule,value,cb)=>{
              if(value){
                if(/^[\w.?!*<>{},;'"^\/\\\[\]]{6,12}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("请输入正确格式密码！"));
                }
              }else{
                cb(new Error("请输入密码！"));
              }
              /*触发确认密码的验证*/
              this.form.checkPwd && this.$refs.form.validateField("checkPwd");
            },
            required: true,
            trigger: ['blur', 'change']
          },
        },

        /*登录过程禁用*/
        submitDisabled : false
      }
    },
    props : ["dialogVisible"],
    methods: {
      /*点击登录*/
      handleClick(){
        this.submitDisabled = true;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            /*验证都通过*/
            getLogin({user: this.form.user,psw: this.form.psw}).then(res=>{
              if(res.data.code){
                this.submitDisabled = false;
                /*登陆失败*/
                this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 3000
                })
              }else{
                /*登陆成功*/
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  duration: 3000
                });
                setTimeout(()=>{
                  this.submitDisabled = false;
                  this.$emit("handleClose");
                  window.location.reload();
                },1800);
              }
            }).catch(()=>{
              this.$message({
                message: "登陆失败，请稍后再试。",
                type: "error",
                duration: 3000
              });
              this.submitDisabled = false;
            });
          } else {
            /*验证不通过*/
            this.submitDisabled = false;
            return false;
          }
        });
      },
      /*关闭的回调*/
      beforeClose(){
        this.$emit("handleClose");
      }
    },
    mounted(){
    },
    destroyed() {
    }
  }
</script>

<style scoped lang="less">
  .Register {
    user-select: none;
    padding-right: 30px;
    .vcode {
      .el-input {
        float: left;
        width: 35%;
      }
      div.svg {
        float: left;
        width: 35%;
        /deep/ svg {/*/deep/穿透*/
          width: 100% !important;
          height: 100% !important;
        }
      }
      .el-link {
        font-size: 12px;
      }
    }
  }
</style>
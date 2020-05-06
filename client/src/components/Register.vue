<!--注册组件-->
<template>
  <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" label-width="80px" class="Register" :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input v-model="form.psw" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="form.checkPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="svgCode" class="vcode">
        <el-input v-model="form.svgCode"></el-input>
        <div class="svg" v-html="register.svgText"></div>
        <el-link type="primary" @click="getVCode" :disabled="register.disabled">{{register.refreshText}}</el-link>
      </el-form-item>
      <!--<el-form-item>
        <el-button type="success" @click="submitForm('form')" :disabled="register.submitDisabled">立即注册</el-button>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClick" :disabled="register.submitDisabled">立即注册</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import request from '../api/index'
  const getRegisterVCode = request.getRegisterVCode;
  const getRegisterCheckVCode = request.getRegisterCheckVCode;
  const getRegisterUser = request.getRegisterUser;
  const getRegister = request.getRegister;
  export default {
    name: "Register",
    data(){
      return{
        /*表单数据*/
        form: {
          user: "",
          psw: "",
          checkPwd: "",
          svgCode: ""
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
                  getRegisterUser(value).then(res=>{
                    if(res.data.code === 3){
                      cb(new Error("用户名已存在"));
                    }else{
                      cb();
                    }
                  }).catch(()=>{
                    cb(new Error("未知错误！"));
                  });
                }else{
                  cb(new Error("3-8位数字、字母、_、中文"))
                }
              }
            },
            required: true,
            trigger: 'blur',
          },
            /*{ required: true, message: '请输入用户名', trigger: 'blur' },
            {
              /!*数据类型*!/
              type: 'string',
              /!*正则规则*!/
              pattern: /^[\w\u4e00-\u9fa5]{3,8}$/,
              message: '3-8位数字、字母、_、中文',
              trigger: 'blur'
            }*/
          /*验证密码*/
          psw: {
            type: 'string',
            validator: (rule,value,cb)=>{
              if(value){
                if(/^[\w.?!*<>{},;'"^\/\\\[\]]{6,12}$/.test(value)){
                  cb();
                }else{
                  cb(new Error("6-12位，数字、字母、_.?!*<>{},;^/\'\\[]"));
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
          /*再次验证密码*/
          checkPwd: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {
              /*validator(){} this指向validator  函数最后返回pattern*/
              validator: (rule,value,cb)=>{
                /*this指向实例*/
                if(this.form.psw === value){
                  cb();
                }else{
                  cb(new Error("两次密码输入不一致"));
                }
              },
              trigger: 'blur'
            }
          ],
          /*验证码*/
          svgCode:{
            validator: (rule,value,cb)=>{
              if(!value){
                cb(new Error("请输入验证码！"))
              }else{
                getRegisterCheckVCode(value).then(res=>{
                  if(res.data.code === 0){
                    cb();
                  }else{
                    cb(new Error("验证码错误！"));
                  }
                }).catch(()=>{
                  cb(new Error("未知错误！"));
                })
              }
            },
            required: true,
            trigger: "blur"
          }
        },

        /*注册相关的数据*/
        register: {
          svgText: "loading...",
          refreshText: "刷新",
          disabled: true,
          timer: null,
          submitDisabled: false
        },
      }
    },
    props : ["dialogVisible"],
    methods: {
      getVCode(){
        getRegisterVCode().then(res=>{
          clearTimeout(this.register.timer);
          let t = 0;
          let fn = ()=>{
            t+=1000;
            if( t > res.data.time ){
              clearTimeout(this.register.timer);
              this.register.disabled = false;
              this.register.refreshText = "刷新";
            }else{
              this.register.disabled = true;
              this.register.refreshText = ((res.data.time - t)/1000 | 0)+"s后可以刷新";
            }
          };
          this.register.timer = setInterval(fn,1000);
          fn();
          /*更新图片*/
          this.register.svgText = res.data.data;
        })
      },
      /*注册的点击*/
      handleClick(){
        /*按钮禁用*/
        this.register.submitDisabled = true;
        this.$refs["form"].validate((valid) => {
          if (valid) {
            /*验证都通过*/
            getRegister({user: this.form.user, psw: this.form.psw, svgCode: this.form.svgCode}).then(res=>{
              this.getVCode();
              /*按钮放开*/
              this.register.submitDisabled = false;
              if (res.data.code){
                this.register.submitDisabled = false;
                this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 3000
                });
              }else{
                /*注册成功*/
                this.$message({
                  message: "注册成功",
                  type: "success",
                  duration: 3000
                });
                setTimeout(()=>{
                  this.register.submitDisabled = false;
                  /*点击触发父级Nav的一个事件，改变ifShowRegister的值*/
                  this.$emit("handleClose",true);
                },1800);
              }
            }).catch(()=>{
              this.getVCode();
              this.register.submitDisabled = false;
              this.$message({
                message: "注册失败，请稍后再试。",
                type: "error",
                duration: 3000
              });
            });
          } else {
            /*验证不通过*/
            this.register.submitDisabled = false;
            return false;
          }
        });
      },
      /*关闭的回调*/
      beforeClose(){
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit("handleClose",false);
          })
          .catch(_ => {});
      }
    },
    mounted(){
      this.getVCode();
    },
    destroyed() {
      clearTimeout(this.register.timer);
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
<!--导航组件-->
<template>
  <div>
    <div id="nav">
      <div class="nav-main">
        <div class="n-m-logo">MuZi</div>
        <div class="n-m-login">
          <el-popover
              v-if="ifLogin"
              placement="top-start"
              width="100"
              trigger="hover">
            <p>欢迎登录：{{login.user}}</p>
            <el-button type="danger" plain @click="handleLogOut" size="mini">退出登录</el-button>
            <br>
            <el-button type="primary" plain @click="ifShowAvatar = true" size="mini">修改头像</el-button>
            <a href="" slot="reference" class="img"
               :style="{backgroundImage: 'url('+login.photo+')',
                position: 'absolute',
                top: '10px',
                left: '41px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                }"></a>
          </el-popover>
          <div class="login" v-else>
            <el-button type="primary" @click="ifShowLogin = true">登录</el-button>
            <el-button type="success" @click="ifShowRegister = true">注册</el-button>
          </div>
        </div>
        <div class="n-m-nav">
          <ul :class="'list'+LiActive">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/Blog/0">博客</router-link></li>
            <li><router-link to="/Message">留言</router-link></li>
            <li><router-link to="/Diary">日记</router-link></li>
            <li><router-link to="/Links">友链</router-link></li>
            <li><router-link to="/About">关于</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <Login :dialogVisible="ifShowLogin" @handleClose="closeLogin"></Login>
    <Register :dialogVisible="ifShowRegister" @handleClose="closeRegister"></Register>
    <Avatar :dialogVisible="ifShowAvatar" @handleClose="closeAvatar"></Avatar>
  </div>
</template>

<script>
  import Register from "./Register";
  import Login from "./Login";
  import Avatar from "./Avatar";
  import request from '../api/index'

  const getIfLogin = request.getIfLogin;
  const getLogOut = request.getLogOut;

  export default {
    name: "Nav",
    components:{
      Register,Login,Avatar
    },
    data(){
      return {
        /*路由列表*/
        routerList : ['Home','Blog','Message','Diary','Links','About'],
        /*弹窗key值*/
        //alertKey: 0,
        /*是否登录*/
        ifLogin : false,
        /*用户信息*/
        login: {
          user: "",
          photo: ""
        },
        /*登录弹窗和注册弹窗*/
        ifShowLogin : false,
        ifShowRegister : false,
        /*修改头像*/
        ifShowAvatar : false
      }
    },
    methods:{
      closeRegister(bool){
        this.ifShowRegister = false;
        this.ifShowLogin = bool;
      },
      closeLogin(){
        this.ifShowLogin = false;
      },
      /*退出登录*/
      handleLogOut(){
        getLogOut().then(res=>{
          setTimeout(()=>{
            window.location.reload();
          },1500);
        }).catch(()=>{
          this.$message({
            message: "退出失败",
            type: "error",
            duration: 3000
          })
        })
      },

      closeAvatar(){
        this.ifShowAvatar =false;
      },
      /*修改头像*/
      handleAvatar(){

      }
    },
    computed: {
      LiActive(){
        let index = this.routerList.indexOf(this.$route.name);
        if (this.$route.name === "Article")index=1;
        return index + 1;
      }
    },
    created() {
      getIfLogin().then(res=>{
        if (res.data.userInfo) {
          this.ifLogin = true;
          this.login.user = res.data.userInfo.user;
          this.login.photo = res.data.userInfo.photo;
        }else{
          this.ifLogin = false;
        }
      })
    }
  }
</script>

<style scoped lang="less">
  #nav {
    z-index: 99;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #e8e9e7;
    >.nav-main {
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      height: 100%;
      margin: 0 auto;
      padding: 0 50px;
      >.n-m-logo {
        float: left;
        width: 100px;
        height: 60px;
        line-height: 60px;
        font-size: 40px;
        color: #444647;
        text-align: center;
        font-family: BarbaraHand;
      }
      >.n-m-login {
        position: relative;
        float: right;
        width: 122px;
        height: 60px;
        line-height: 60px;
        .el-button {
          padding: 9px 13px;
        }
        >div.userInfo {
          width: 100%;
          height: 100%;
        }
      }
      .n-m-nav {
        float: right;
        margin-right: 8%;
        width: 576px;
        height: 60px;
        ul {
          display: flex;
          width: 100%;
          height: 100%;
          li {
            flex: 1;
            a {
              position: relative;
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 60px;
              font-weight: 400;
              font-size: 16px;
              color: #000;
              transition: color .5s;
              &:hover {
                color: #6bc30d;
                &::before {
                  width: 100%;
                }
              }
              &::before {
                position: absolute;
                content: "";
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 0;
                height: 2px;
                background-color: #6bc30d;
                transition: width .5s;
              }
            }
          }
          &.list1 li:nth-child(1),
          &.list2 li:nth-child(2),
          &.list3 li:nth-child(3),
          &.list4 li:nth-child(4),
          &.list5 li:nth-child(5),
          &.list6 li:nth-child(6){
            a {
              color: #6bc30d;
              &::before {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>
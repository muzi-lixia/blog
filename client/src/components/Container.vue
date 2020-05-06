<!--Blog侧边导航-->
<template>
  <div id="Container">
    <el-container>
      <el-main>
        <ArticleShow></ArticleShow>
      </el-main>
      <el-aside>
        <div :class="['search',{'fixed': ifSearchFixed}]">
          <div class="s-input">
            <input type="text" @input="handleInput" placeholder="请输入搜索内容" v-model="searchInput">
            <i class="el-icon-search"></i>
            <ul v-if="!!searchList.length">
              <li v-for="item in searchList">
                <router-link :to="'/article/'+item._id">{{item.title}}</router-link>
              </li>
            </ul>
          </div>
          <div class="s-articleList">
            <ul @mouseleave="handleMouseLeave">
              <li @mouseenter="handleMouseEnter(index)" v-for="(item,index) in getArticleTags">
                <router-link :to="'/blog/'+index">{{item}}</router-link>
              </li>
            </ul>
            <div class="cover" :style="{top:coverIndex*40+'px'}"></div>
          </div>
        </div>
        <div class="ArticleHot">
          <h3>热门文章</h3>
          <ul>
            <li v-for="(item,index) in articleHot">
              <i>{{index+1}}</i>
              <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="recommend">
          <h3>置顶推荐</h3>
          <ul>
            <li v-if="!!getArticleRecommend.title">
              <i>{{1}}</i>
              <router-link :to="'/Article/'+getArticleRecommend._id">{{getArticleRecommend.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="visitor">
          <h3>最近访客</h3>
          <ul>
            <li v-for="item in visitor" :style="{backgroundImage: 'url('+item.user.photo+')'}">
              <p>{{item.user.user}}</p>
            </li>
          </ul>
        </div>
      </el-aside>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
  import ArticleShow from './ArticleShow'
  import Footer from "./Footer";
  /*通过export default导出的axios数据，经过webpack打包不能通过解构拿取*/
  import request from '../api/index'
  const getArticleInfo = request.getArticleInfo;
  const getArticleHot = request.getArticleHot;
  const getArticleSearch = request.getArticleSearch;
  const getVisitor = request.getVisitor;
  export default {
    name: "container",
    components: {
      ArticleShow,Footer
    },
    data(){
      return {
        /*搜索框*/
        searchInput : "",
        searchList : [],
        searchTimer : null,
        /*控制搜索框*/
        ifSearchFixed: false,
        /*文章分类*/
        //模拟数据
        //articleTags : ["全部文章","个人日记","HTML5&CSS3","Javascript","NodeJs","Vue&React","Other"],
        //后端拿取的数据
        articleTags : [],
        /*热门文章列表*/
        articleHot: [],

        /*搜索框cover条的top值*/
        coverIndex: this.$route.params.id*1,

        /*最近访客数据*/
        visitor: []
      }
    },
    methods: {
      /*搜索框鼠标移入*/
      handleMouseEnter(index){
        this.coverIndex = index;
      },
      /*搜索框鼠标移出*/
      handleMouseLeave(){
        this.coverIndex = this.$route.params.id*1;
      },
      /*鼠标滚动事件，search定位*/
      handleWindowScroll(e){
        /*获取滚动高*/
        let scrollTop = document.documentElement.scrollTop;
        this.ifSearchFixed = scrollTop>=900;
      },
      handleInput(){
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(()=>{
          let keyWords = this.searchInput.trim();//去除首尾空格
          if(keyWords){
            getArticleSearch(keyWords).then(res=>{
              this.searchList = res.data.data;
            }).catch(()=>{
              this.searchList = [];
            })
          }else{
            this.searchList = [];
          }
        },1000);
      }
    },
    computed: {
      getArticleTags(){
        return ['全部文章',...this.articleTags];
      },
      getArticleRecommend(){
        return this.articleHot[0] || {};
      }
    },
    /*实例初始化完成，挂载尚未开始*/
    created() {
      /*请求分类*/
      getArticleInfo()
        .then(res => {
         res.data.data && 
          (this.articleTags = res.data.data.tags);
        });
      /*请求热门文章*/
      getArticleHot()
        .then((res)=>{
          this.articleHot = res.data.data;
      });
      /*请求最近访客信息*/
      getVisitor().then(res=>{
        this.visitor = res.data.data;
      })
    },
    /*在实例挂载到dom节点上之后*/
    mounted() {
      //初始执行一次
      this.handleWindowScroll();
      /*监听滚动事件*/
      window.addEventListener('scroll', this.handleWindowScroll);
    },
    /*实例销毁后*/
    destroyed() {
      /*离开当前路由后，就不需要滚轮事件*/
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
  }
</script>
<style scoped lang="less">
  #Container {
    padding-top: 80px;
    width: 100%;
    >.el-container {
      box-sizing: border-box;
      width: 100%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 50px;
      >.el-main {
        padding-top: 0;
        padding-left: 0;
      }
      >.el-aside {
        width: 300px;
        /*background-color: aqua;*/
        >.search {
          width: 100%;
          background-color: #fff;
          &.fixed {
            position: fixed;
            width: 300px;
            z-index: 3;
            animation: scrollMove .5s 1 ease-in-out forwards;
          }
          @keyframes scrollMove{
            0%{top: -500px}
            40%{top: 81px}
            70%{top: 60px}
            100%{top: 81px}
          }
          >.s-input {
            box-sizing: border-box;
            z-index: 2;
            position: relative;
            padding: 20px;
            width: 100%;
            height: 80px;
            background-color: rgb(128,128,128);
            input {
              position: relative;
              z-index: 3;
              width: 260px;
              height: 40px;
              border-radius: 20px;
              border: 0;
              outline: 0;
              text-indent: 2em;
            }
            i {
              position: absolute;
              z-index: 3;
              right: 35px;
              top: 31px;
              width: 22px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              font-weight: bolder;
              font-size: 18px;
              font-style: normal;
              color: rgb(120, 121, 119);
              cursor: pointer;
            }
            ul {
              position: absolute;
              top: 43px;
              padding-top: 23px;
              width: 260px;
              background-color: #fff;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 0 2px #999;
              li {
                overflow: hidden;
                box-sizing: border-box;
                width: 100%;
                padding: 5px 10px;
                height: 40px;
                line-height: 30px;
                a {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
                &:hover {
                   background-color: #ddd;
                 }
              }
            }
          }
          >.s-articleList {
            position: relative;
            width: 100%;
            margin-top: 20px;
            padding-bottom: 20px;
            ul {
              width: 100%;
              li {
                box-sizing: border-box;
                position: relative;
                z-index: 1;
                padding: 0 30px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                a {
                  display: block;
                  width: 100%;
                  height: 100%;
                  color: #787977;
                  border-bottom: 1px dotted #eee;
                }
              }
            }
            .cover {
              box-sizing: border-box;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 40px;
              border-right: 5px solid #000;
              background-color: rgba(0,0,0,.05);
              transition: top .3s;
            }
          }
        }
        >.ArticleHot,.recommend {
          box-sizing: border-box;
          margin-top: 20px;
          padding: 15px 20px 20px;
          width: 100%;
          background-color: #fff;
          h3 {
            box-sizing: border-box;
            padding: 0 5px 10px;
            margin-bottom: 10px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
          }
          ul {
            li {
              margin: 7px 0;
              height: 30px;
              line-height: 30px;
              color: #515250;
              i {
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                line-height: 22px;
                text-align: center;
                text-shadow: 0 1px 0 rgba(255,255,255,.5);
                font-style: normal;
                background-color: #edefee;
              }
              &:nth-child(1) i {
                color: #fff;
                background-color: #e24d46;
              }
              &:nth-child(2) i {
                color: #fff;
                background-color: #2ea7e0;
              }
              &:nth-child(3) i {
                color: #fff;
                background-color: #6bc30d;
              }
              a {
                margin-left: 8px;
                font-size: 14px;
                color: #787977;
                &:hover {
                  color: #6bc30d;
                  text-decoration: underline;
                }
              }
            }
          }
        }
        >.visitor {
          box-sizing: border-box;
          margin-top: 20px;
          padding: 15px 20px 20px;
          width: 100%;
          background-color: #fff;
          h3 {
            box-sizing: border-box;
            padding: 0 5px 10px;
            margin-bottom: 10px;
            line-height: 30px;
            font-weight: 400;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            position: relative;
            font-size: 18px;
          }
          ul {
            li{
              position: relative;
              float: left;
              margin: 1%;
              width: 23%;
              height: 60px;
              //背景图片设置设置
              background-position: center top;
              background-size: cover;
              background-repeat: no-repeat;
              cursor: pointer;
              p {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                color: #fff;
                background-color: rgba(0,0,0,.1);
              }
            }
            /*清除浮动*/
            &::after {
              display: block;
              content: '';
              width: 0;
              height: 0;
              clear: both;
            }
          }
        }
      }
    }
  }
</style>
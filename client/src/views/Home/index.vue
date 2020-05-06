<template>
  <div class="Home">
    <!--背景图-->
    <div class="bg" :style="{height: bgHeight + 'px'}">
      <!--内容-->
      <div class="bg-content loading">
        <h1>篱&nbsp下</h1>
        <h2>想陪你把想念的酸拥抱成温暖</h2>
        <router-link class="btn" to="/blog/0">Enter Blog</router-link>
      </div>
      <i class="bg-icon el-icon-arrow-down" @click="pageDown"></i>
    </div>
    <!--右上角菜单-->
    <div :class="['menu',{'click':ifClick}]">
      <div class="btn" @click="handleClick">
        <span></span><span></span><span></span>
      </div>
      <div class="cover">
        <div class="point">
          <router-link to="/">首页</router-link>
          <router-link to="/blog/0">博客</router-link>
          <router-link to="/message">留言</router-link>
        </div>
        <div class="cover-logo">MuZi</div>
      </div>
    </div>
    <!--热门文章-->
    <div class="hot">
      <div class="hot-main">
        <div class="text loading">
          <h2>热门文章</h2>
          <p>很想给你写封信,告诉你这里的天气.<br>
            昨夜的那场电影,还有我的心情.
          </p>
        </div>
        <ul class="loading">
          <li v-for="item in articleListHot">
            <div class="img">
              <div class="bgImg" :style="{backgroundImage:'url('+item.surface+')'}"></div>
              <div class="link">
                <router-link :to="'/article/'+item._id"><i class="el-icon-link"></i></router-link>
              </div>
            </div>
            <div class="info">
              <div class="title"><a href="">{{item.title}}</a></div>
              <div class="time">{{item.date | year}}年{{item.date | mouth}}月{{item.date | date}}日</div>
              <div class="content">{{item.content | contentToText}}</div>
              <router-link :to="'/article/'+item._id" class="link">阅读更多</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--关于&友链-->
    <div class="about">
      <div class="wrap">
        <ul class="loading">
          <li><router-link to="/about">关于</router-link></li>
          <li><router-link to="/links">+友情链接</router-link></li>
        </ul>
      </div>
    </div>
    <!--footer-->
    <div class="footer">
      <div class="f-main">
        <h1>篱下</h1>
        <p>以梦为马，不负韶华</p>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '../../api/index'
  const getArticleHot = request.getArticleHot;

  /*得到dom距离页面顶部的距离*/
  function getTop(node) {
    let top =0;
    while (node !== document.body){
      top += node.offsetTop;
      node = node.offsetParent;
    }
    return top;
  }
  export default {
    name: "Home",
    data(){
      return {
        /*设置背景高度100%*/
        bgHeight: 0,

        /*菜单点击*/
        ifClick: false,

        /*热门文章*/
        articleListHot: []
      }
    },
    methods: {
      /*设置背景高度100%*/
      getWindowHeight(){
        this.bgHeight = window.innerHeight;
      },
      /*右侧菜单*/
      handleClick(){
        this.ifClick = !this.ifClick;
      },
      /*向下箭头点击事件*/
      pageDown(){
        (function m() {
          let h = window.innerHeight;
          let scrollTop = document.documentElement.scrollTop;
          scrollTop += 10;
          if (scrollTop < h){
            requestAnimationFrame(m);
          }else{
            scrollTop = h;
          }
          document.documentElement.scrollTop = scrollTop;
        })();
      },
      /*动画加载*/
      handleScroll(){
        let loadingDom = document.querySelectorAll(".loading");
        let scrollTop = document.documentElement.scrollTop + window.innerHeight;
        loadingDom.forEach(node=>{
          if (scrollTop > getTop(node)+100){
            node.classList.remove("loading");
          }
        })
      }
    },
    filters: {
      date(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3]
      },
      mouth(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2]
      },
      year(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1]
      },
      contentToText(value){
        let div = document.createElement("div");
        div.innerHTML = value;
        return div.innerText;
      }
    },
    created(){
      this.getWindowHeight();
    },
    mounted() {
      window.addEventListener('resize',this.getWindowHeight);
      /*热门文章*/
      getArticleHot(3).then(res=>{
        this.articleListHot = res.data.data;
      });
      /*动画加载*/
      this.handleScroll();
      window.addEventListener("scroll",this.handleScroll);
    },
    destroyed(){
      window.removeEventListener('resize',this.getWindowHeight);
    }
  }
</script>

<style scoped lang="less">
  .Home {
    >.bg {
      z-index: 9;
      position: relative;
      width: 100%;
      background: url("../../assets/img/11.jpg") center center/cover no-repeat;
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
      }
      >.bg-content {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 154px;
        z-index: 1;
        color: #fff;
        text-align: center;
        font-size: 14px;
        transform: scale(1);
        transition: transform 1.5s;
        &.loading {
          transform: scale(0);
        }
        h1 {
          font-weight: 400;
          font-size: 2em;
        }
        h2 {
          margin: 20px 0;
          font-size: 1em;
          font-weight: normal;
          letter-spacing: 10px;
        }
        >.btn {
          display: inline-block;
          height: 38px;
          border-radius: 2px;
          margin-top: 20px;
          padding: 0 18px;
          border: none;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          background-color: #1E9FFF;
          cursor: pointer;
          transition: opacity .5s;
          &:hover {
            opacity: .8;
          }
        }
      }
      >.bg-icon {
        z-index: 11;
        position: absolute;
        bottom: 30px;
        left: 50%;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: #fff;
        font-size: 3rem;
        text-align: center;
        line-height: 50px;
        font-weight: bolder;
        transition: background-color .5s ;
        cursor: pointer;
        &:hover {
          background-color: #6bc30d;
        }
      }
    }
    >.menu {
      >.btn {
        box-sizing: border-box;
        z-index: 99;
        position: fixed;
        padding-top: 12px;
        top: 45px;
        right: 55px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;
        background-color: transparent;
        transition: background-color .5s;
        &:hover {
          background-color: #6bc30d;
        }
        span {
          position: relative;
          top: 0;
          display: block;
          margin: 0 auto 5px;
          width: 26px;
          height: 2px;
          background-color: #fff;
          transition: all .5s ;
          transform: rotate(0deg);
          opacity: 1;
        }
      }
      >.cover {
        opacity: 0;
        user-select: none;
        z-index: 8;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        transition: opacity .3s;
        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 110%;
          width: 4999px;
          height: 100%;
          background-color: #f9f9f9;
          transform: skew(-12deg);
          transition: left .3s;
        }
        .point {
          position: absolute;
          right: 0;
          top: 200px;
          font-size: 20px;
          a {
            position: relative;
            display: block;
            text-align: right;
            color: #686967;
            line-height: 60px;
            padding: 10px 30px;
            margin-right: 20px;
            font-size: 20px;
            text-decoration: none;
            transition: color .6s linear;
            &::after {
              position: absolute;
              top: 50%;
              left: 0;
              content: "";
              width: 0;
              height: 1px;
              background-color: #6bc30d;
              opacity: 0;
              transition: all .6s;
            }
            &:hover {
              color: #6bc30d;
            }
            &:hover::after {
               width: 100%;
               opacity: 1;
             }
          }
        }
        .cover-logo {
          z-index: 11;
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 10px 50px;
          width: 100px;
          height: 60px;
          line-height: 60px;
          color: #444647;
          font-size: 50px;
          text-align: center;
          font-family: BarbaraHand;
          cursor: pointer;
        }
      }
      &.click {
        .btn {
          background-color: rgba(0,0,0,.1);
          span:nth-child(1) {
            top: 8px;
            transform: rotate(45deg);
          }
          span:nth-child(2) {
            top: 1px;
            transform: rotateZ(-45deg);
          }
          span:nth-child(3) {
            display: none;
          }
        }
        .cover {
          opacity: 1;
          z-index: 10;
          &::before {
            left: 66%;
          }
        }
      }
    }
    >.hot{
      z-index: 9;
      overflow: hidden;
      display: table;
      table-layout: fixed;
      width: 100%;
      position: relative;
      padding: 100px 0;
      background-color: #fff;
      >.hot-main {
        max-width: 1170px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        >.text{
          position: relative;
          top: 0;
          opacity: 1;
          transition: all .5s;
          &.loading {
            top: -100px;
            opacity: 0;
          }
          h2 {
            position: relative;
            font-size: 32px;
            padding-bottom: 30px;
            font-weight: 500;
            &::before {
              position: absolute;
              width: 50px;
              height: 2px;
              content: "";
              left: 50%;
              margin-left: -25px;
              bottom: -1px;
              background: #00c2ff;
            }
          }
          >p {
            margin-top: 20px;
            line-height: 22px;
            color: #888;
          }
        }
        >ul {
          display: flex;
          width: 100%;
          height: 503px;
          margin-top: 50px;
          li {
            position: relative;
            top: 0;
            flex: 1;
            height: 503px;
            padding: 0 10px;
            opacity: 1;
            >.img {
              overflow: hidden;
              position: relative;
              width: 100%;
              height: 244px;
              >.bgImg {
                width: 100%;
                height: 100%;
                background-position: center center;
                background-size: cover;
                transition: transform .5s;
                transform: scale(1);
              }
              >.link {
                position: absolute;
                top: -100%;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255,255,255,.2);
                opacity: 0;
                transition: all .5s;
                a {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  margin-top: -20px;
                  margin-left: -20px;
                  width: 40px;
                  height: 40px;
                  background-color: #333;
                  line-height: 40px;
                  text-align: center;
                  color: #fff;
                  i {
                    font-size: 16px;
                  }
                }
              }
              &:hover .link {
                top: 0;
                opacity: 1;
              }
              &:hover .bgImg {
                transform: scale(1.5);
              }
            }
            >.info{
              box-sizing: border-box;
              padding: 30px 15px;
              width: 100%;
              height: 209px;
              text-align: left;
              background-color: #faf9f9;
              >.title {
                margin-bottom: 10px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                a {
                  color: #333;
                  &:hover {
                    color: #777;
                  }
                }
              }
              >.time {
                color: #bbb;
                font-size: 12px;
                margin-bottom: 15px;
              }
              >.content {
                overflow: hidden;
                height: 60px;
                line-height: 20px;
                color: #999;
              }
              >.link {
                display: inline-block;
                margin-top: 15px;
                padding: 0;
                background: 0 0;
                border: none;
                color: #29b6f6;
                transition: all .4s ease;
                &:hover {
                  color: #333;
                }
              }
            }
          }
          li:nth-child(1) {
            transition: top .6s 0s;
          }
          li:nth-child(2) {
            transition: top .6s .1s;
          }
          li:nth-child(3) {
            transition: top .6s .1s;
          }
          &.loading li {
            top: 200px;
            opacity: 0;
          }
        }
      }
    }
    >.about {
      z-index: 9;
      position: relative;
      width: 100%;
      height: 48px;
      padding: 111px 0;
      margin: 0 auto;
      background: url("../../assets/img/22.jpg") center center/cover fixed;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
      }
      ul {
        position: relative;
        z-index: 9;
        width: 425px;
        margin: 0 auto;
        opacity: 1;
        transition: width .6s;
        &.loading {
          opacity: 0;
          width: 1000px;
        }
        li {
          position: relative;
          width: 198px;
          height: 46px;
          border: 1px solid #fff;
          &:nth-child(1) {
            float: left;
          }
          &:nth-child(2) {
            float: right;
          }
          &::after {
            position: absolute;
            left: 0;
            top: 0;
            content: "";
            width: 0;
            height: 46px;
            background-color: #6bc30d;
            transition: width .5s;
          }
          &:hover::after {
            width: 100%;
          }
          a {
            position: relative;
            z-index: 1;
            display: block;
            width: 100%;
            height: 100%;
            line-height: 46px;
            text-align: center;
            font-size: 14px;
            color: #fff;
          }
        }
      }
    }
    >.footer {
      width: 100%;
      height: 76px;
      padding: 100px 0;
      background-color: #fff;
      .f-main {
        max-width: 1214px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        h1 {
          font-weight: 400;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
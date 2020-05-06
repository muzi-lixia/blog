<!--Blog文章展示-->
<template>
  <div class="articleShow">
    <section v-for="item in articleList">
      <h5>
        <span>【{{item.type}}】</span>
        <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
      </h5>
      <div class="time">
        <span class="date">{{item.date | date}}</span>
        <span class="mouth">{{item.date | mouth}}<span>月</span></span>
        <span class="year">{{item.date | year}}</span>
      </div>
      <div class="content">
        <router-link :to="'/Article/'+item._id" :style="{backgroundImage:'url('+item.surface+')'}">
          <i></i>
        </router-link>
        {{item.content | contentToText}}
      </div>
      <div class="read-more">
        <router-link :to="'/Article/'+item._id">继续阅读</router-link>
      </div>
      <div class="footer">
        <div class="fl">
          <i class="el-icon-position"></i>
          <span>{{item.tag}}</span>
        </div>
        <div class="fr">
          <span class="pv">
            <i class="el-icon-view"></i>
            <i>{{item.pv}}</i>
          </span>
          <span class="comment">
            <i class="el-icon-chat-dot-round"></i>
            <i>{{item.comment.length}}</i>
          </span>
        </div>
      </div>
    </section>
    <div v-if="ifLoading" class="loading">
      <span>加载中</span>
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
    <p v-if="ifNoMore" class="no-more">没有更多了~~</p>
  </div>
</template>

<script>
  import request from '../api/index'
  const getArticleShow = request.getArticleShow;
  export default {
    name: "ArticleShow",
    data(){
      return {
        /*文章数据*/
        articleList: '',
        /*no-more显示与否*/
        ifNoMore: false,
        /*是否加载*/
        ifLoading : false
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
    computed: {
      id(){
        return this.$route.params.id;
      }
    },
    watch: {
      /*当id发生变化时*/
      id(){
        this.getArticleShowFresh();
        document.documentElement.scrollTop = 0;
      }
    },
    methods: {
      getArticleShowFresh(){
        /*watch和mounted的时候需要重置*/
        this.ifLoading = this.ifNoMore = false;
        /*请求数据*/
        getArticleShow(this.id,true).then((res)=>{
          this.articleList = res.data.data;
        });
      },
      handleScroll(){
        if(this.ifNoMore || this.ifLoading)return;
        /*文档高*/
        let a = document.documentElement.offsetHeight;
        /*窗口高*/
        let b = document.documentElement.clientHeight;
        /*滚动高*/
        let c = document.documentElement.scrollTop;
        if (c+b >= a-200){
          this.ifLoading = true;
          getArticleShow(this.id,false).then(res=>{
            let data = res.data.data;
            this.ifLoading = false;
            if(data.length){
              this.articleList.push(...res.data.data);
            }else{
              this.ifNoMore = true;
            }
          });
        }
      }
    },
    mounted() {
      /*发送第一次请求*/
      this.getArticleShowFresh();
      /*监听滚动事件*/
      window.addEventListener("scroll",this.handleScroll);
    }
  }
</script>

<style scoped lang="less">
  .articleShow {
    >section{
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      padding: 20px 30px 25px;
      margin-bottom: 20px;
      width: 100%;
      background-color: #fff;
      animation: show .8s 1 forwards;
      @keyframes show {
        from{opacity: .5;transform: scale(.5);}
        to{opacity: 1;transform: scale(1);}
      }
      &:nth-child(1)::before {
        position: absolute;
        display: block;
        content: "置顶";
        width: 74px;
        height: 20px;
        background-color: #ff5722;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        transform: rotate(-45deg);
        left: -18px;
        top: 9px;
      }
      >h5 {
        line-height: 30px;
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-size: 18px;
        font-weight: 400;
        >span {
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          vertical-align: bottom;
          color: #2ea7e0;
        }
        >a {
          color: #212220;
          &:hover {
            text-decoration: underline;
            color: #6bc30d;
          }
        }
      }
      >.time {
        position: absolute;
        font-family: SourceCodeProRegular, Menlo, Monaco, Consolas, "Courier New", monospace, 'Helvetica Neue', Arial, sans-serif;
        right: 10px;
        top: 10px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        line-height: 32px;
        >.date{
          display: block;
          position: relative;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          top: 2px;
        }
        >.mouth{
          display: inline-block;
          color: #989997;
          font-size: 18px;
          span {
            font-size: 14px;
          }
        }
        >.year {
          margin-left: 10px;
          color: #989997;
          font-size: 18px;
        }
      }
      >.content {
        margin: 20px 0 0 0;
        line-height: 28px;
        position: relative;
        min-height: 200px;
        a {
          position: relative;
          display: block;
          overflow: hidden;
          float: left;
          width: 300px;
          height: 180px;
          border: 1px solid #e8e9e7;
          margin-right: 20px;
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
          i {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            transform: translateX(-50px) skew(-15deg);//倾斜
            box-shadow: 0 0 30px 20px rgba(255,255,255,.3);
          }
          &:hover i {
            transition: transform .5s .5s;
            transform: translateX(350px) skew(-15deg);
          }
        }
      }
      >.read-more {
        position: relative;
        height: 40px;
        line-height: 40px;
        a {
          font-weight: bold;
          color: #383937;
          &:hover {
            color: #6bc30d;
            text-decoration: underline;
          }
        }
        ::before {
          position: absolute;
          top: 20px;
          left: 100px;
          right: 0;
          display: inline-block;
          content: "";
          height: 1px;
          background-color: #d0d0d0;
        }
      }
      >.footer {
        .fl {
          float: left;
          i {
            font-size: 18px;
            margin-right: 5px;
          }
          span {
            display: inline-block;
            margin: 2px;
            padding: 2px 5px;
            font-size: 12px;
            color: #787977;
            background-color: #f1f2f0;
            &:hover {
              color: #fff;
              background-color: #6bc30d;
            }
          }
        }
        .fr {
          float: right;
          i {
            margin-right: 5px;
            font-style: normal;
            font-size: 14px;
            color: #787977;
          }
          .comment {
            margin-left: 20px;
            i:nth-child(2) {
              &:hover {
                color: #6bc30d;
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    >.loading {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      >span {
        height: 42px;
        line-height: 42px;
        vertical-align: middle;
      }
      svg {
        vertical-align: middle;
        height: 42px;
        width: 42px;
        animation: loading-rotate 2s linear infinite;
        circle {
          animation: loading-dash 1.5s ease-in-out infinite;
          stroke-dasharray: 90,150;
          stroke-dashoffset: 0;
          stroke-width: 2;
          stroke: #409eff;
          stroke-linecap: round;
        }
      }
      @keyframes loading-rotate{to{transform:rotate(1turn)}}
      @keyframes loading-dash{
        0%{stroke-dasharray:1,200;stroke-dashoffset:0}
        50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}
        to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}
    }
    >.no-more {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #333;
    }
  }
</style>
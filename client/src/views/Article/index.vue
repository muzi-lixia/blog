<template>
  <div>
    <Nav></Nav>
    <div class="Message">
      <div class="main">
        <div v-if="articleInfo">
          <section class="title">
            <h4>{{articleInfo.title}}</h4>
            <p>
              <small>
                作者：<a href="javascript:void(0)">篱下</a>
              </small>
              <small class="ml10">围观群众：<i class="readcount">{{articleInfo.pv}}</i></small>
              <small class="ml10">更新于 <label>{{articleInfo.updateDate | getTime}}</label> </small>
            </p>
          </section>
          <section class="time">
            <span class="day">{{articleInfo.date | date}}</span>
            <span class="month fs-18">{{articleInfo.date | mouth}}<small class="fs-14">月</small></span>
            <span class="year fs-18">{{articleInfo.date | year}}</span>
          </section>
          <section class="content" v-html="articleInfo.content"></section>
          <section class="copyRight">
            <p class="f-toe fc-black">
              非特殊说明，本文版权归 篱下 所有，转载请注明出处.
            </p>
            <p class="f-toe">
              本文标题：
              <a href="javascript:void(0)" class="r-title">篱下</a>
            </p>
          </section>
          <section class="extend">
            <h6>延伸阅读</h6>
            <ol class="b-relation">
              <li class="f-toe" v-for="item in extendList">
                <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  import request from "../../api/index"
  const getArticle = request.getArticle;
  const getArticleExtend = request.getArticleExtend;
  function toTow(num) {
    return (num<10?"0":"")+num;
  }
  export default {
    name: "Article",
    components : {
      Nav
    },
    data(){
      return {
        articleInfo : null,
        extendList : []
      }
    },
    filters: {
      getTime(val){
        let date = new Date(val);
        let Y = toTow(date.getFullYear()),
          M = toTow(date.getMonth()+1),
          D = toTow(date.getDay()),
          h = toTow(date.getHours()),
          m = toTow(date.getMinutes()),
          s = toTow(date.getSeconds());
        return `${Y}/${M}/${D} ${h}:${m}:${s}`
      },
      date(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3]
      },
      mouth(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2]
      },
      year(value){
        return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1]
      }
    },
    created() {
      /*文章信息*/
      getArticle(this.$route.params.id).then(res=>{
        if (res.data.code === 0) {
          this.articleInfo = res.data.data;
          /*延伸阅读*/
          getArticleExtend(res.data.data.tag).then(res=>{
              this.extendList = res.data.data
          })
        }else{
          this.$router.push("/404");
        }
        }
      ).catch(()=>{
        this.$router.push("/404");
      })
    }
  }
</script>

<style scoped lang="less">
  .f-toe {
    overflow: hidden;
    word-wrap: normal!important;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .Message {
    box-sizing: border-box;
    max-width: 1360px;
    padding: 80px 50px;
    margin: 0 auto;
    .main {
      position: relative;
      box-sizing: border-box;
      padding: 20px 30px 25px;
      width: 100%;
      background-color: #fff;
      section.title {
        padding: 5px 130px 5px 0;
        border-bottom: 1px solid #e8e9e7;
        font-weight: 400;
        color: #515250;
        >h4 {
          margin-top: 5px;
          font-weight: normal;
          font-size: 20px;
        }
        >p {
          color: #787977;
          font-size: 14px;
          a {
            color: #3e8bc7!important;
            &:hover {
              text-decoration: underline;
            }
          }
          .ml10 {
            margin-left: 10px;
          }
        }
      }
      section.time {
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #fff;
        padding: 0 20px 5px 20px;
        margin-top: 10px;
        line-height: 32px;
        .day {
          display: block;
          text-align: center;
          font-weight: 700;
          font-size: 40px;
          color: #6bc30d;
          position: relative;
          top: 2px;
        }
        .month {
          margin-right: 5px;
          color: #989997;
          font-size: 18px;
          >.fs-14 {
            font-size: 14px;
          }
        }
        .year {
          color: #989997;
          font-size: 18px;
        }
      }
      section.content {
        border-bottom: 1px solid #e1e2e0;
        padding-bottom: 20px;
        margin: 20px 0 0 0;
        line-height: 28px;
        position: relative;
        min-height: 100px;
      }
      section.copyRight {
        clear: both;
        background-color: #f8f9f7;
        padding: 15px 20px;
        line-height: 22px;
        text-shadow: 0 1px 0 rgba(255,255,255,.8);
        font-size: 12px;
        color: #787977;
        a {
          color: #3e8bc7;
          margin: 0 2px;
          &:hover {
            color: #6bc30d;
          }
        }
      }
      section.extend {
        h6 {
          margin: 20px 0;
          border-left: 3px solid #6bc30d;
          min-height: 26px;
          line-height: 26px;
          padding: 5px 20px;
          background-color: #f8f9f7;
          font-size: 16px;
          font-weight: 400;
          color: #585957;
          text-shadow: 0 1px 0 rgba(255,255,255,.5);
          clear: both;
        }
        ol {
          li {
            margin-bottom: 5px;
            &::before{
              content: "◈";
              margin-right: 5px;
              color: #787977;
            }
            a {
              color: #3e8bc7;
              margin: 0 2px;
              &:hover {
                color: #6bc30d;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>
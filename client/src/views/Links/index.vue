<template>
  <div class="Links">
    <Nav></Nav>
    <div class="canvas">
      <div class="txt">
        <h2>友情链接</h2>
        <p>想陪你把想念的酸拥抱成温暖</p>
      </div>
      <Canvas></Canvas>
    </div>
    <div class="link-main">
        <div class="rule">
          <h3>链接申请说明</h3>
          <p>
            <i class="fa fa-close"></i>经常宕机&nbsp;
            <i class="fa fa-close"></i>不合法规&nbsp;
            <i class="fa fa-close"></i>插边球站&nbsp;
            <i class="fa fa-close"></i>红标报毒&nbsp;
            <i class="fa fa-check"></i>原创优先&nbsp;
            <i class="fa fa-check"></i>技术优先
          </p>
          <p>交换友链可在留言板留言.本站链接如下<br>
            名称：清风篱下<br>
            网址：http://qflixia.top:3000<br>
            图标：http://qflixia.top:3000/icon.jpg<br>
            描述：篱下，有诗有酒有远方</p>
          <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
        </div>
        <div class="container">
          <ul>
            <li v-for="item in linksList">
              <a :href="item.href" target="_blank">
                <img :src="item.icon">
                <h3>{{item.name}}</h3>
                <p>{{item.desc}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from '../../components/Nav'
  import Canvas from '../../components/Canvas'
  import Footer from "../../components/Footer";
  import request from "../../api/index";
  const getLinks = request.getLinks;
  export default {
    name: "Links",
    data(){
      return {
        linksList: []
      }
    },
    components: {
      Nav,Canvas,Footer
    },
    created() {
      getLinks().then(res=>{
        this.linksList = res.data.data;
      });
    }
  }
</script>

<style scoped lang="less">
  .Links {
    width: 100%;
    padding-top: 61px;
    .canvas {
      position: relative;
      width: 100%;
      height: 260px;
      .txt {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%,-50%);
        color: #fff;
        h2 {
          font-size: 35px;//2.5rem
          font-weight: normal;
        }
        p {
          font-size: 1.5rem;
        }
      }
    }
    .link-main {
        box-sizing: border-box;
        max-width: 1360px;
        width: 100%;
        margin: 0 auto;
        padding: 30px 50px 0;
        .rule {
          box-sizing: border-box;
          padding: 20px;
          width: 100%;
          background-color: #fff;
          h3 {
            margin-bottom: 1rem;
            padding-left: 1rem;
            border-left: .25rem solid #6bc30d;
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 1.5rem;
          }
          p {
            margin: 1.5rem 0;
            padding-left: 18px;
            font-family: Raleway,Segoe UI,Lucida Grande,Helvetica,Arial,Microsoft YaHei;
            line-height: 1.75rem;
            color: #515250;
          }
        }
        .container {
          width: 100%;
          ul {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
              box-sizing: border-box;
              width: 23.5%;
              height: 150px;
              margin-top: 2%;
              transition: .5s;
              &:hover {transform: translateY(-2px);
                box-shadow: 0 0 5px #fff;
              }
              a {
                display: block;
                padding: 20px;
                background: #fff;
                color: #333;
                transition: all .3s ease-in-out;
                img {
                  float: left;
                  width: 40px;
                  height: 40px;
                  border-radius: 100%;
                }
                h3 {
                  overflow: hidden;
                  padding: 10px 15px 9px;
                  height: 21px;
                  font-weight: normal;
                }
                p {
                  clear: both;
                  display: -webkit-box;
                  overflow: hidden;
                  margin-top: 1rem;
                  height: 60px;
                  text-overflow: ellipsis;
                  font-size: 13px;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                }
              }
            }
          }
      }
      }
  }
</style>
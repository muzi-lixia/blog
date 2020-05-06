<template>
  <div class="About">
    <Nav></Nav>
    <div class="canvas">
      <div class="txt">
        <h2>关于</h2>
        <p>想陪你把想念的酸拥抱成温暖</p>
      </div>
      <Canvas></Canvas>
    </div>
    <div class="about-main">
      <div class="a-m-content">
        <article>
          <section>
            <h1>关于我</h1>
            <p>生活是一种绵延不绝的渴望，渴望不断上升，变得伟大而高贵</p>
            <span>可以通过以下方式联系到我：</span>
            <ul>
              <li>邮 箱 ：<a href="mailto:930054439@qq.com">1738056247@qq.com</a></li>
            </ul>
          </section>
          <section>
            <h1>关于本站</h1>
            <p>本站建于2020年4月，主要是练习框架开发。</p>
            <span>本站结构：</span>
            <ul>
              <li>前 端 ：Element-ui</li>
              <li>后 端 ：Node.js + MONGODB</li>
            </ul>
            <p>本站采用阿里云提供的服务器ESC和存储对象OSS。</p>
          </section>
          <section>
            <h1>特别说明</h1>
            <ul>
              <li>本站文章仅代表个人观点，和任何组织或个人无关。</li>
              <li>本站前端开发代码没有考虑对IE浏览器的兼容。</li>
              <li>用户邮箱仅作回复消息用，不对外使用。</li>
            </ul>
            <br><br>
            <div>
              <img src="https://yssimage.oss-cn-hangzhou.aliyuncs.com/bg9.jpg" style="width:100%;height:320px;">
            </div>
          </section>
        </article>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from '../../components/Nav'
  import Canvas from "../../components/Canvas";
  import Footer from "../../components/Footer";
  export default {
    name: "About",
    components: {
      Nav,Canvas,Footer
    }
  }
</script>

<style scoped lang="less">
  .About{
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
    .about-main {
      box-sizing: border-box;
      max-width: 1360px;
      width: 100%;
      margin: 0 auto;
      padding: 30px 50px 0;
      .a-m-content {
        width: 100%;
        background-color: #fff;
        article {
          padding: 10px;
          section {
            padding: 20px;
            background: #fff;
            font-size: 1rem;
            h1 {
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
              line-height: 1.75rem;
            }
            span {
              padding-left: 18px;
            }
            ul {
              padding-left: 18px;
              li {
                line-height: 2rem;
                a {
                  color: #0366d6;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="Footer">
    <div class="f-main">
      <div class="contact">
        <a href="javascript:void(0)" class="github">
          <i class="fa fa-github"></i>
        </a>
        <a href="javascript:void(0)" class="qq">
          <i class="fa fa-qq"></i>
        </a>
        <a href="javascript:void(0)" class="email">
          <i class="fa fa-envelope"></i>
        </a>
        <a href="javascript:void(0)" class="weixin">
          <i class="fa fa-weixin"></i>
        </a>
      </div>
      <p class="mt05">备案号：蜀ICP备19040728号</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped lang="less">
  .Footer {
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    padding: 20px 0 0 0;
    margin-top: 50px;
    width: 100%;
    height: 100px;
    background-color: #212220;
    color: #919290;
    .f-main {
      position: absolute;
      left: 50%;
      margin-left: -45%;
      padding: 10px 0 10px 0;
      width: 90%;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      .contact {
        a {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-color: rgba(255,255,255,.2);
          text-align: center;
          line-height: 30px;
          text-shadow: 1px 1px 1px rgba(0,0,0,.5);
          font-size: 14px;
          margin-left: 15px;
          margin-right: 0;
          border-radius: 100%;
          text-decoration: none;
          color: rgba(255,255,255,.5);
          -webkit-transition: all .3s;
          transition: all .3s;
          &:hover {
            color: #fff;
          }
          &.github:hover {
            background-color: #b952c5;
          }
          &.qq:hover {
            background-color: #d25744;
          }
          &.email:hover {
            background-color: #668f20;
          }
          &.weixin:hover {
            background-color: #06a2c9;
          }
        }
      }
      p {
        user-select: none;
        margin-top: 10px;
        color: #565755;
      }
    }
  }
</style>
<template>
  <div class="Message">
    <Nav></Nav>
    <div class="main">
      <div class="content">
        <article>
          <section>
            <h1>留言板</h1>
            <p>沟通交流，拉近你我！</p>
            <RichText @Sub="handleSubmit"></RichText>
          </section>
          <section>
            <ul>
              <li v-for="(item,index) in commentList" :key="item._id">
                <div class="comment-parent">
                  <div class="p-img" :style="{backgroundImage: 'url('+item.user.photo+')'}"></div>
                  <div class="p-info">
                    <div class="p-name">{{item.user.user}}</div>
                    <div class="p-content" v-html="item.content"></div>
                    <div class="p-time">
                      <span>{{item.date | getTime}}</span>
                      <a @click="replyClick(index)">
                        {{(item.reply.lastIndexArr[0] === index && item.reply.lastIndexArr[1] === undefined)?"收起":"回复"}}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="comment-child" v-for="(childItem,childIndex) in item.children" :key="childItem.date + Math.random()">
                  <div class="c-img" :style="{backgroundImage: 'url('+childItem.user.photo+')'}"></div>
                  <div class="c-info">
                    <div class="c-name">
                      <span class="name">{{childItem.user.user}}</span>回复<span class="name">{{childItem.reUser}}</span>
                      <span class="c-content"  v-html="childItem.content"></span>
                    </div>
                    <div class="c-time">
                      <span>{{childItem.date | getTime}}</span>
                      <a @click="replyClick(index,childIndex)">
                        {{(item.reply.lastIndexArr[0] === index && item.reply.lastIndexArr[1] === childIndex)?"收起":"回复"}}
                      </a>
                    </div>
                  </div>
                </div>
                <div :class="['comment-reply',{'show':item.reply.ifShow}]">
                  <textarea v-model="item.reply.content" :placeholder="'回复【'+item.reply.reUser+'】'"></textarea>
                  <button @click="childCommit(index)" type="button" class="layui-btn layui-btn-xs">提交</button>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from '../../components/Nav'
  import RichText from "../../components/RichText";
  import request from '../../api'
  const getIfLogin = request.getIfLogin;
  const commitMessage = request.commitMessage;
  const getMessageList = request.getMessageList;
  const commitChildMessage = request.commitChildMessage;
  function toTow(num) {
    return (num<10?"0":"")+num;
  }
  export default {
    name: "Message",
    components: {
      Nav,RichText
    },
    data(){
      return{
        commentList: [],
        skip : 0,
        limit : 0,
        ifLoading : false
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
        return `${Y}年${M}月${D}日${h}:${m}:${s}`
      }
    },
    methods: {
      /*提交留言*/
      handleSubmit(val){
        getIfLogin().then(res=>{
          if (res.data.userInfo) {
            /*有登录,存储数据到数据库,执行留言提交的ajax*/
            commitMessage({
              user: res.data.userInfo._id,
              content : val
            }).then(res=>{
	      if(res.data.code === 0){
		layer.msg('留言成功', {icon: 1});
                setTimeout(()=> {
                  window.location.reload();
                },1000);
	      }else{
		layer.msg(res.data.msg, {icon: 2});
                setTimeout(()=> {
                  window.location.reload();
                },1000);
	      }
            }).catch(()=>{
              layer.msg('服务器错误，请稍后再试~~', {icon: 2});
            })
          }else{
            /*没有登录*/
            layer.msg('请先登录', {icon: 2});
          }
        }).catch(()=>{
          layer.msg('服务器错误，请稍后再试~~', {icon: 2});
        });
      },
      /*点击弹出回复框*/
      replyClick(pIndex,cIndex){

        if (pIndex === undefined)return;
        let parentData = this.commentList[pIndex];

        /*改变placeholder的值*/
        if(cIndex !== undefined){
          /*回复子评论*/
          this.commentList[pIndex].reply.reUser = this.commentList[pIndex].children[cIndex].user.user;
        }else{
          /*回复父评论*/
          this.commentList[pIndex].reply.reUser = this.commentList[pIndex].user.user;
        }
        if (pIndex === parentData.reply.lastIndexArr[0] && cIndex === parentData.reply.lastIndexArr[1]) {
          //两次点的同一个
          parentData.reply.ifShow = false;
          parentData.reply.lastIndexArr = [];
        }else{
          //不是点的同一个
          parentData.reply.ifShow = true;
          parentData.reply.lastIndexArr = [pIndex,cIndex];
        }
      },
      /*子评论提交*/
      childCommit(pIndex){
        /*判断是否登录*/
        getIfLogin().then(res=>{
          if (res.data.userInfo) {
            /*有登录,存储数据到数据库,执行留言提交的ajax*/
            commitChildMessage({
              parentId: this.commentList[pIndex]._id,
              user: res.data.userInfo._id,
              content: this.commentList[pIndex].reply.content,
              reUser: this.commentList[pIndex].reply.reUser
            }).then(res=>{
              if (res.data.code) {
                /*不为0，则评论失败*/
                layer.msg(res.data.msg, {icon: 2});
              }else {
                /*为0，则评论成功*/
                layer.msg('评论成功', {icon: 1});
                setTimeout(()=> {
                  window.location.reload();
                },1000);
              }
            })
          }else{
            /*没有登录*/
            layer.msg('请先登录', {icon: 2});
          }
        }).catch(()=>{
          layer.msg('服务器错误，请稍后再试~~', {icon: 2});
        });
      },

      handleScroll(){
        if (this.ifLoading)return;
        /*文档高*/
        let a = document.documentElement.offsetHeight;
        /*窗口高*/
        let b = document.documentElement.clientHeight;
        /*滚动高*/
        let c = document.documentElement.scrollTop;
        if (c+b >= a-200){
          this.ifLoading = true;
          this.getMessageListFresh(cb=>{
            this.ifLoading = false;
          });
        }
      },
      getMessageListFresh(cb){
        this.limit += 5;
        getMessageList(this.skip,this.limit).then(res=>{
          if (res.data.code === 0) {
            let data = res.data.data;
            data.forEach(item=>{
              item.reply = {
                user : "",//id
                content : "",//回复内容
                reUser : "",//字符串
                date : "",//日期
                ifShow : false,
                lastIndexArr: []
              };
            });
            this.commentList = data;
          }
          cb && cb();
        }).catch(()=>{
          cb && cb();
        })
      }
    },
    created() {
      /*发送第一次请求*/
      this.getMessageListFresh();
    },
    mounted() {
      /*监听滚动事件*/
      window.addEventListener("scroll",this.handleScroll);
    },
    destroyed() {
      /*移除监听滚动事件*/
      window.removeEventListener("scroll",this.handleScroll);
    }
  }
</script>

<style scoped lang="less">
  .Message {
    >.main {
      box-sizing: border-box;
      max-width: 1360px;
      padding: 70px 50px;
      margin: 0 auto;
      >.content {
        width: 100%;
        >article{
          section:nth-child(1){
            box-sizing: border-box;
            width: 100%;
            padding: 20px 15px;
            color: #515250;
            margin-bottom: 20px;
            background-color: #fff;
            >h1 {
              font-weight: 700;
              font-size: 2rem;
              text-align: center;
            }
            >p {
              font-size: 1.25rem;
              margin: 1rem 0;
              text-align: center;
            }
          }
          section:nth-child(2) {
            box-sizing: border-box;
            padding: 20px 15px;
            width: 100%;
            background-color: #fff;
            >ul{
              width: 100%;
              >li {
                padding: 20px 0;
                border-bottom: 1px dotted #333;

                animation: show .8s 1 forwards;
                @keyframes show {
                  from{opacity: .5;transform: scale(.5);}
                  to{opacity: 1;transform: scale(1);}
                }
                .comment-parent {
                  display: flex;
                  .p-img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-position: center center;
                    background-size: cover;
                  }
                  .p-info {
                    flex: 1;
                    padding-left: 10px;
                    padding-bottom: 20px;
                    border-bottom: 1px dotted #aaa;
                    .p-name {
                      overflow: hidden;
                      color: #01aaed;
                    }
                    .p-content {
                      padding: 2px 0 5px 0;
                      min-height: 30px;
                      font-size: 12px;
                      word-break: break-all;
                      color: #515250;
                      margin: 5px 0 20px 0;
                    }
                    .p-time {
                      font-size: 12px;
                      color: #515250;
                      span {
                        padding: 0 5px 0 15px;
                      }
                      a {
                        color: #009688;
                        cursor: pointer;
                      }
                    }
                  }
                }
                .comment-child {
                  box-sizing: border-box;
                  display: flex;
                  width: 100%;
                  padding-left: 50px;
                  padding-top: 20px;
                  .c-img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background-position: center center;
                    background-size: cover;
                  }
                  .c-info {
                    flex: 1;
                    padding-left: 10px;
                    font-size: 12px;
                    .c-name {
                      color: #515250;
                      .name {
                        overflow: hidden;
                        color: #01aaed;
                        margin: 0 5px;
                      }
                    }
                    .c-time {
                      padding-left: 20px;
                      padding-top: 5px;
                      span {
                        margin-right: 10px;
                      }
                      a {
                        color: #009688;
                        cursor: pointer;
                      }
                    }
                  }
                }
                .comment-reply {
                  overflow: hidden;
                  box-sizing: border-box;
                  width: 100%;
                  height: 0;
                  padding-left: 50px;
                  padding-top: 10px;
                  transition: height .3s;
                  &.show {
                    height: 100px;
                  }
                  textarea {
                    box-sizing: border-box;
                    display: block;
                    width: 100%;
                    height: 60px;
                    padding: 10px;
                    border-color: #aaa;
                    resize: none;
                  }
                  button {
                    display: block;
                    margin-top: 8px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
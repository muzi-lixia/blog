<template>
  <div class="Diary">
    <div class="diary">
      <Nav></Nav>
      <div class="d-main">
        <el-timeline>
          <el-timeline-item v-for="item in diaryList" :timestamp="item.date | getDate" placement="top" :reverse="false">
            <el-card>
              <p>{{item.txt}}</p>
              <img :src="item.img" width="100%" alt="" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Nav from '../../components/Nav'
  import Footer from "../../components/Footer";
  import request from "../../api/index";
  const getDiary = request.getDiary;
  export default {
    name: "Diary",
    components: {Nav,Footer},
    data(){
      return {
        diaryList: []
      }
    },
    created() {
      getDiary().then(res=>{
	this.diaryList = res.data.data;
      }).catch(()=>{

      })
    },
    filters: {
      getDate(val){
        let date = new Date(val);
        return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
      }
    }
  }
</script>

<style scoped lang="less">
  .diary {
    box-sizing: border-box;
    max-width: 1360px;
    width: 100%;
    padding: 80px 50px 0;
    margin: 0 auto;
    .d-main {
      box-sizing: border-box;
      padding: 30px 8% 30px 20%;
      width: 100%;
      background-color: #fff;
      .el-timeline {
        /deep/ .el-timeline-item__timestamp {
          position: absolute;
          top: -8px;
          left: -134px;
          font-size: 20px;
          font-weight: bolder;
          color: #6bc30d;
        }
        .el-timeline-item {
          .el-card {
            p {
              font-size: 14px;
              line-height: 30px;
            }
            img {
            width: 200px;
            }
          }
        }
      }
    }
  }
</style>
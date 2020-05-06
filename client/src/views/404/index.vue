<template>
  <div class="notFound">
    <Nav></Nav>
    <img src="../../assets/img/404.png" alt="" />
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  export default {
    name: "notFound",
    components: {
      Nav
    }
  }
</script>

<style scoped lang="less">
  .notFound {
    background-color: #fff;
    img {
      display: block;
      padding-top: 60px;
      margin: 0 auto;
    }
  }
</style>
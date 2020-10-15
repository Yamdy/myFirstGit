<template>
  <div class="media view">
    <div class="navbar">
      <div class="navbar-item" v-for="item of navList" :key="item.index">
        {{ item.cnname }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { navList } from "../api/api";

export default {
  name: "Media",
  components: {
    // Navbar
  },
  data: () => ({
    navList: [{
        cnname: "推荐",
        tid: 469
      },
      {
        cnname: "新闻",
        tid: 470
      },
      {
        cnname: "专题",
        tid: 471
      },
      {
        cnname: "抖音",
        tid: 426
      },
      {
        cnname: "直播",
        tid: null
      },
      {
        cnname: "广播",
        tid: 474
      }
    ],
  }),
  mounted() {
    var that = this;
    // navList({
    //   siteid: 1,
    //   flag: 0,
    // }) //函数名以及传参
    //   .then((res) => {
    //     console.log(res); //成功后返回的数据
    //     that.navList = res.data;
    //   });
  },
};
</script>

<style scoped>

</style>

<template>
  <div class="news view">
    <div class="navbar">
      <div class="navbar-item" v-for="item of navList" :key="item.index">
        {{ item.cnname }}
      </div>
    </div>

    <Swiper />
  </div>
</template>

<script>
// @ is an alias to /src
import { getNavList } from "../api/api";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";

import Swiper from "../components/Swiper.vue";

export default {
  name: "News",
  components: {
    // Navbar
    Swiper,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const navList = ref([]);

    onMounted(() => {
      getNavList({
        siteid: 1,
        flag: 0,
      }) //函数名以及传参
        .then((res) => {
          console.log(res); //成功后返回的数据
          navList.value = res.data;
        });
    });

    return {
      navList,
    };
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 70px;
  padding: 10px 0;
  box-sizing: content-box;
}
</style>

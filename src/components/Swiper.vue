<template>
  <div class="swiper" :style="'width:'+(list.length*100)+'%'">
    <div class="swiper-item" v-for="item in list" :key="item.index" :style="'width:'+(100/list.length)+'%'">
      {{ item.cnname }}
    </div>
  </div>
</template>

<script>
import { getNavList } from "../api/api";
import { ref, reactive, getCurrentInstance, inject, onMounted } from "vue";

export default {
  name: "Swiper",
  setup() {
    const list = ref([]);


    onMounted(() => {
      getNavList({
        siteid: 1,
        flag: 0,
      }) //函数名以及传参
        .then((res) => {
          console.log(res); //成功后返回的数据
          list.value = res.data;
        });
    });

    return {
      list,
    };
  },
};
</script>

<style scoped>
    .swiper {
        width: auto;
        height: calc(100% - 160px);
        position: fixed;
        top: 110px;
    }
    .swiper .swiper-item {
        width: auto;
        height: 100%;
        float: left;
    }
</style>

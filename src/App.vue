<template>
  <Header />
  <Tabbar />
  <router-view />
</template>

<script>
import { provide, ref, readonly, getCurrentInstance, onMounted } from "vue";
import Store from "./store/store";
import Header from "./components/Header.vue";
import Tabbar from "./components/Tabbar.vue";

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    //用ref包裹可使location变为响应式
    let activeIdx = ref(0);
    let headerBgColor = ref('#7977b2');
    const updateActiveIdx = (e) => {
      activeIdx.value = e.idx;
      if(e.idx % 2 == 0) { headerBgColor.value = '#f5b15b'}
      ctx.$router.push({ path: e.pagePath });
    };
    /*readonly包裹后可以在组件内引用时不被改变值。
        否则在组件内可以直接通过location.value=***将值改变，
        包裹后只能通过updateLocation()方法改变*/
    provide("activeIdx", readonly(activeIdx));
    provide("headerBgColor", readonly(headerBgColor));
    provide("updateActiveIdx", updateActiveIdx);

    onMounted(() => {
      ctx.$router.push('/News')
    })
  },
  name: "App",
  components: {
    Header,
    Tabbar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.view {
  position: fixed;
  top: 70px;
  width: 100%;
  height: calc(100vh - 118px);
  overflow-y: scroll;
}
.navbar {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 70px;
}
</style>

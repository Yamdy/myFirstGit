<template>
  <div
    class="header"
    :style="(activeIdx % 2 == 0 ? 'background-color : #7977b2': 'background-color : #f5b15b')"
  >
    <div class="user"></div>
    <div class="logo"></div>
    <div class="search"></div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "Header",

  setup() {
    const activeIdx = inject("activeIdx");
    return {
      activeIdx,
    };
  }
};
</script>

<style scoped>
.header {
  width: 102%;
  height: 70px;
  background-color: #7977b2;
  position: fixed;
  top: 0;
  left: -1%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  border-bottom-left-radius: 70%;
  border-bottom-right-radius: 70%;
  padding: 3vw 4vw;
}

.header .logo {
  background: url(https://appatt.sznews.com/luohu/files/xiaochengxu/logo.png)
    no-repeat top center;
  background-size: cover;
  width: 16vw;
  height: 8vw;
}

.header .user {
  background: url(https://appatt.sznews.com/luohu/files/xiaochengxu/user.png)
    no-repeat top center;
  background-size: 60%;
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
}
.header .search {
  background: url(https://appatt.sznews.com/luohu/files/xiaochengxu/search.png)
    no-repeat top center;
  background-size: 60%;
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
}
</style>

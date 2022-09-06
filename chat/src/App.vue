
<template>
  <router-view> </router-view>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { onMounted, provide, inject, reactive } from "vue";
onMounted(() => {});
const socket = io("http://localhost:3005");
provide("socket", socket);
// let getList = reactive<Array<Lists>>([]);
// socket.on("GetList", (List: Array<Lists>) => {
//   console.log(List);
//   getList = reactive<Array<Lists>>(List);
// });
</script>

<style >
html,
body,
#app {
  height: 100%;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

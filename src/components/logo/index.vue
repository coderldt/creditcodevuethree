<template>
  <div class="logo" @click="backHome">
    <img :src="logo" alt="" />
    <span class="title" v-if="title">{{ title }}</span>
  </div>
</template>
<script setup>
import {} from "vue";
import { useRouter } from 'vue-router'
import logo from "@/assets/logo.png";
const router = useRouter()
console.log(router);
defineProps({
  title: String,
});

const backHome = () => {
  router.push('/home')
}
</script>

<style lang="less" scoped>
.logo {
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: auto;
    height: 65%;
  }

  .title {
    margin: 0 20px;
  }
}
</style>

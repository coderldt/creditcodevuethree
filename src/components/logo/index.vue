<template>
  <div class="logo" @click="backHome">
    <img :src="logoPath" alt="" />
    <span class="title" v-if="title">{{ title }}</span>
  </div>
</template>
<script>
import {} from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
export default {
  props: {
    title: String,
  },
  setup() {
    const router = useRouter();
    const backHome = () => {
      router.push("/home");
    };

    const logoPath = logo;
    return {
      backHome,
      logoPath,
    };
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 200px;
  height: 60px;
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

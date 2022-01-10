<template>
  <div class="logo" @click="backHome">
    <img :src="logoPath" alt="" />
    <span v-if="!collapseStatus && title" class="title">{{ title }}</span>
  </div>
</template>
<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { collapseStatus } = inject("collapse");
    const router = useRouter();
    const backHome = () => {
      router.push("/home");
    };

    const logoPath = logo;
    return {
      backHome,
      logoPath,
      collapseStatus,
    };
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
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

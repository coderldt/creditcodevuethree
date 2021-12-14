<template>
  <Layout></Layout>
</template>
<script>
import { provide } from "vue";
import Layout from "@/layout";
import collapseHook from "@/hooks/collapse";
import { ElMessage } from "element-plus";
import { setStore } from "@/utils/store.js";
export default {
  components: {
    Layout,
  },
  setup() {
    setStore("userInfo", { name: "coderlt" });
    provide("collapse", collapseHook());
    provide("ElMessage", ElMessage);
  },
};
</script>

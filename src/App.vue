<template>
  <Layout></Layout>
</template>
<script>
import { provide } from "vue";
import Layout from "@/layout";
import collapseHook from "@/hooks/collapse";
import { ElMessage } from "element-plus";
export default {
  components: {
    Layout,
  },
  setup() {
    provide("collapse", collapseHook());
    provide("ElMessage", ElMessage);
  },
};
</script>

<template>
  <Layout></Layout>
</template>
<script>
import { provide } from "vue";
import Layout from "@/layout";
import collapseHook from "@/hooks/collapse";
export default {
  components: {
    Layout,
  },
  setup() {
    provide("collapse", collapseHook());
  },
};
</script>

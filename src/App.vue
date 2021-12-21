<template>
  <Layout />
</template>

<script lang="ts">
import { provide, defineComponent } from "vue";
import Layout from "@/layout/index.vue";
import collapseHook from "@/hooks/collapse";
import { ElMessage } from "element-plus";
import { setStore } from "@/utils/store";
import { collapseKey } from "@/types/symbol";

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    setStore("userInfo", { name: "coderlt" });
    provide(collapseKey, collapseHook());
    provide("ElMessage", ElMessage);
  },
});
</script>

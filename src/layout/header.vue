<template>
  <div class="header">
    <Collapse></Collapse>
  </div>
</template>
<script>
import {} from "vue";
import Collapse from "@/components/collapse";
export default {
  setup() {},
  components: {
    Collapse,
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 100%;
  padding: 0 20px;
}
</style>

<template>
  <div class="collapse" @click="handleCollapse">
    <el-icon color="#000" :size="20">
      <component :is="collapseStatus ? 'fold' : 'expand'" />
    </el-icon>
  </div>
</template>
<script lang="ts">
import { inject, toRef, toRefs, watch } from "vue";
import { collapseStatus, handleCollapse } from "@/hooks/collapse";
// import
export default {
  setup() {
    return {
      collapseStatus,
      handleCollapse,
    };
  },
};
</script>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
</style>

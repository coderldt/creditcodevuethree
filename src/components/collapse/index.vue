<template>
  <div class="collapse" @click="onCollapseChange">
    <el-icon color="#000" :size="20">
      <component :is="collapseStatus ? 'fold' : 'expand'"></component>
    </el-icon>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  setup() {
    const collapseStatus = inject("collapse");
    return {
      ...collapseStatus,
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

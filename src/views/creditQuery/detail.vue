<template>
  <div class="detailMsg">
    <el-tabs v-model="currentTab" type="card">
      <el-tab-pane label="基本信息" name="1"><Base /></el-tab-pane>
      <el-tab-pane label="财务状况" name="2">财务状况</el-tab-pane>
      <el-tab-pane label="风险信息" name="3">风险信息</el-tab-pane>
      <el-tab-pane label="项目情况" name="4">项目情况</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import Base from "./children/base.vue";
export default defineComponent({
  components: {
    Base,
  },
  setup() {
    const currentTab: Ref<string> = ref("1");

    return {
      currentTab,
    };
  },
});
</script>

<style lang="less" scoped>
.el-tabs {
  :deep(.el-tabs__nav) {
    display: flex;
    width: 100%;
    .el-tabs__item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="detailMsg">
    <el-tabs type="card" v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="财务状况">财务状况</el-tab-pane>
      <el-tab-pane label="风险信息">风险信息</el-tab-pane>
      <el-tab-pane label="项目情况">项目情况</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const currentTab = ref("基本信息");

    return {
      currentTab,
    };
  },
});
</script>

<style lang="less" scoped></style>

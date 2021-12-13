<template>
  <div class="creditQuery">
    <el-tabs type="border-card">
      <el-tab-pane label="企业查询" :closable="false"> </el-tab-pane>
      <el-tab-pane
        :label="item.title"
        closable
        v-for="(item, index) in searchList"
        :key="index"
        >{{ item.title }}</el-tab-pane
      >
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const searchList = ref([]);

    return {
      searchList,
    };
  },
});
</script>

<style lang='less' scoped>
.creditQuery {
  height: 100%;

  .el-tabs {
    height: 100%;
  }
}
</style>
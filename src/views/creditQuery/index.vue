<template>
  <div class="creditQuery">
    {{ list }}
    <el-tabs type="border-card">
      <el-tab-pane class="query" label="企业查询" :closable="false">
        <SearchTemplate class="searchTemplate"></SearchTemplate>
      </el-tab-pane>
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
import SearchTemplate from "./searchTemplate.vue";
import useCreditList from "./useCreditList";
export default defineComponent({
  components: {
    SearchTemplate,
  },
  setup() {
    const searchList = ref([]);
    const { list } = useCreditList;
    return {
      searchList,
      list,
    };
  },
});
</script>

<style lang="less" scoped>
.creditQuery {
  height: 100%;

  .el-tabs {
    height: 100%;
  }

  :deep(.el-tabs__content) {
    min-height: calc(100% - 65px);
  }
  .query {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  }
}
</style>

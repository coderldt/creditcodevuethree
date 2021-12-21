<template>
  <div class="relation">
    relationship
    <MapFilter @getData="getData"></MapFilter>
  </div>
</template>
<script>
import { defineComponent, inject } from "vue";
import MapFilter from "./mapFilter.vue";
export default defineComponent({
  components: {
    MapFilter,
  },
  setup() {
    const ElMessage = inject("ElMessage");
    const getData = () => {
      ElMessage.success("关系图谱请求数据完成");
    };

    return {
      getData,
    };
  },
});
</script>

<style lang="less" scoped></style>

<template>
  <div class="baseLeader">
    <div class="subTitle">高管</div>
    <el-table :data="table" border style="width: 100%">
      <el-table-column type="index" width="50" align="center" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role" label="职位" />
    </el-table>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const table = ref([
      {
        name: "Tom",
        role: "CEO",
      },
      {
        name: "jerry",
        role: "CFO",
      },
      {
        name: "Spike",
        role: "CIO",
      },
    ]);
    return {
      table,
    };
  },
});
</script>

<style lang="less" scoped></style>

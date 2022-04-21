<template>
  <div class="tableCom">
    <el-table header-cell-class-name="dark" border highlight-current-row stripe :data="list">
      <el-table-column v-if="isOrderNum" align="center" label="序号" type="index" width="50" />
      <template v-for="(item, index) in column">
        <el-table-column v-if="item.slot" :key="'slot' + index" :label="item.label" :width="item.width" :align="item.align">
          <template #default="{ row }">
            <slot :name="item.slot" :row="row"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :label="item.label" :prop="item.prop" :width="item.width" :align="item.align" />
      </template>
    </el-table>
    <el-pagination
      v-if="isPagination"
      v-model:currentPage="pagination.pageNum"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :layout="layout"
      @current-change="onPaginationChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
// 定义时请使用 TableColumn<> 或者 Array<TableColumn>
import { TableColumn, Pagination } from "./table";

import { reactive, toRefs, PropType, defineProps, defineEmits } from "vue";
const props = defineProps({
  isOrderNum: {
    type: Boolean,
    default: false,
  },
  column: {
    type: Object as PropType<TableColumn[]>,
    default: () => ({}),
  },
  list: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String as PropType<string>,
    default: "total, sizes, prev, pager, next, jumper",
  },
  isPagination: {
    type: Boolean,
    default: true,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["onPaginationChange"]);
// export default defineComponent({
// 分页
const { pageSizes, total } = toRefs(props); // 因为是对象，外部数据会随着改变
const pagination: Pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total,
  pageSizes,
});

const onPaginationChange = (val: number) => {
  pagination.pageNum = val;
  emit("onPaginationChange", pagination);
};

const onSizeChange = (val: number) => {
  pagination.pageSize = val;
  pagination.pageNum = 1;
  emit("onPaginationChange", pagination);
};
</script>

<style lang="less" scoped>
.tableCom {
  text-align: center;
  .el-table {
    :deep(.dark) {
      color: #323c47;
      background-color: #fafafa;
    }
  }
}
.el-table + .el-pagination {
  margin-top: 20px;
}
</style>

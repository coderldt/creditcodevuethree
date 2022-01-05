<template>
  <div class="table">
    <el-table header-cell-class-name="dark" border highlight-current-row stripe :data="list">
      <template v-for="(item, index) in column">
        <el-table-column v-if="item.slot" :key="'slot' + index" :label="item.label" :width="item.width" :align="item.align">
          <slot :item="item.slot"></slot>
        </el-table-column>
        <el-table-column v-else :key="index" :label="item.label" :prop="item.prop" :width="item.width" :align="item.align" />
      </template>
    </el-table>
    <el-pagination
      v-model:currentPage="paginations.page"
      :page-sizes="paginations.pageSizes"
      :total="paginations.total"
      :page-size="paginations.pageSize"
      :layout="layout"
      @current-change="onPaginationChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script lang="ts">
interface TableColumn {
  label: string;
  prop?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  slot?: Function;
}
interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pageSizes: number[];
}
import { defineComponent, reactive, toRefs, PropType } from "vue";
export default defineComponent({
  props: {
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
    pagination: {
      type: Object as PropType<Pagination>,
      default: () => ({
        page: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [10, 20, 50, 100],
      }),
    },
  },
  emits: ["onPaginationChange"],
  setup(props, { emit }) {
    // 分页
    const { pagination } = toRefs(props); // 因为是对象，外部数据会随着改变

    const onPaginationChange = (val: number) => {
      pagination.value.page = val;
      emit("onPaginationChange", pagination);
    };

    const onSizeChange = (val: number) => {
      pagination.value.pageSize = val;
      emit("onPaginationChange", pagination);
    };

    return {
      paginations: pagination,
      onPaginationChange,
      onSizeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.el-table + .el-pagination {
  margin-top: 20px;
}
</style>

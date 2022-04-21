<template>
  <div class="userManager commonBox">
    <div class="title">用户管理</div>
    <div class="search">
      <From v-model:form="form" :form-item-list="formList" @submit="handleQuery(form)" @reset="getApiList" />
      <div class="content">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="tree">
              <el-input v-model="filterText" placeholder="请输入关键字" />
              <el-tree ref="treeRef" class="filter-tree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" />
            </div>
          </el-col>
          <el-col :span="18">
            <Table v-loading="isLoading" :column="tableColumn" :list="data.list" :total="data.total" @onPaginationChange="handlePagination">
              <template #status="{ row }">
                <el-switch v-model="row.status" :active-value="1" :inactive-value="2" />
              </template>
              <template #control="{ row }">
                <el-button type="text" @click="edit(row)"> 编辑 </el-button>
                <el-popconfirm title="是否要删除所选项" @confirm="del(row)">
                  <template #reference>
                    <el-button type="text">删除</el-button>
                  </template>
                </el-popconfirm>
                <el-popconfirm title="是否要删除所选项" @confirm="rePass(row)">
                  <template #reference>
                    <el-button type="text">重置密码</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </Table>
          </el-col>
        </el-row>
      </div>
      <Edit v-model:dialogVisible="dialog.isEdit" :data="dialog.data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref, watch, defineExpose } from "vue";
import { ElTree } from "element-plus";
import { statusList } from "@/config/system";
import Table from "@/components/table/index.vue";
import { TableColumn } from "@/components/table/table";
import From, { FormItem } from "@/components/form/form.vue";
import Edit from "./edit.vue";

import { getList } from "@/apis/system/user";
import useTable from "@/hooks/useTable";
import { List, Dialog, Tree, Forms } from "./user";

const form = ref<Forms>({
  name: "",
  status: "",
  createTime: "",
});

const formList: Ref<FormItem[]> = ref([
  {
    label: "登录账户",
    prop: "name",
    type: "input",
  },
  {
    label: "状态",
    prop: "status",
    type: "select",
    config: {
      optionList: [
        { label: "开启", value: "1" },
        { label: "关闭", value: "2" },
      ],
    },
  },
  {
    label: "创建时间",
    prop: "createTime",
    type: "date",
    config: {
      dateType: "daterange",
    },
  },
]);

const { data, getList: getApiList, isLoading, handleQuery, handlePagination } = useTable({ api: getList });

const tableColumn: TableColumn[] = [
  { label: "登录账号", prop: "loginName", width: "", align: "center" },
  { label: "用户昵称", prop: "userName", width: "", align: "center" },
  { label: "状态", align: "center", slot: "status" },
  { label: "创建日期", prop: "createTime", width: "", align: "center" },
  { label: "手机号", prop: "phone", width: "", align: "center" },
  { label: "邮箱", prop: "email", width: "", align: "center" },
  { label: "操作", align: "center", slot: "control" },
];

const edit = (row: List): void => {
  dialog.isEdit = true;
  dialog.data = row;
};
const del = (row: List): void => {
  console.log("删除密码", row.id);
};
const rePass = (row: List): void => {
  console.log("重置密码", row.id);
};

const dialog: Dialog = reactive({
  isEdit: false,
  data: {},
});
// 职位筛选
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label",
};
watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree): Boolean => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
const treeData: Tree[] = [
  {
    id: "1",
    label: "中建资本控股有限公司",
    children: [
      {
        id: "1-1",
        label: "财务风险部",
      },
      {
        id: "1-2",
        label: "法务风险部",
      },
      {
        id: "1-3",
        label: "信息技术部",
      },
      {
        id: "1-4",
        label: "中建融资租赁有限公司",
        children: [
          {
            id: "1-4-1",
            label: "运营部",
          },
        ],
      },
      {
        id: "1-5",
        label: "爱美客技术发展股份有限公司",
      },
    ],
  },
];
</script>

<style lang="less" scoped>
.userManager {
  min-height: calc(100% - 40px);
}

.tree .el-input {
  margin-bottom: 15px;
}
</style>

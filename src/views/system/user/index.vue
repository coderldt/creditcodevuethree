<template>
  <div class="userManager commonBox">
    <div class="title">用户管理</div>
    <div class="search">
      <el-form :model="form" inline>
        <el-form-item label="登录账户" prop="loginName">
          <el-input v-model="form.loginName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="tree">
            <el-input v-model="filterText" placeholder="请输入关键字" />
            <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="table">
            <Table :column="tableColumn" :list="list" :pagination="pagination" @onPaginationChange="onPaginationChange">
              <template #status="{ row }">
                <el-switch v-model="row.status" :active-value="1" :inactive-value="2" />
              </template>
            </Table>
            <!-- <el-table header-cell-class-name="dark" border highlight-current-row stripe :data="list">
              <el-table-column label="登录账号" prop="loginName" width="100" align="center" />
              <el-table-column label="用户昵称" prop="userName" width="100" align="center" />
              <el-table-column label="状态" align="center">
                <template #default="{ row }">
                  <el-switch v-model="row.status" :active-value="1" :inactive-value="2" />
                </template>
              </el-table-column>
              <el-table-column label="创建日期" prop="createTime" align="center" />
              <el-table-column label="手机号" prop="phone" align="center" />
              <el-table-column label="邮箱" prop="email" align="center" />
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
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
              </el-table-column>
            </el-table>
            <el-pagination
              v-model:currentPage="pagination.page"
              :page-sizes="[10, 20, 50, 100]"
              :total="pagination.total"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              @current-change="onPaginationChange"
              @size-change="onSizeChange"
            /> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <Edit v-model:dialogVisible="dialog.isEdit" :data="dialog.data" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { statusList } from "@/config/system";
import Table from "@/components/table/index.vue";
import Edit from "./edit.vue";
import { ElTree } from "element-plus";
interface Form {
  loginName: string;
  status: number | string;
}

export interface List {
  id?: string;
  loginName?: string;
  userName?: string;
  status?: number | string;
  phone?: string;
  departmentId?: string;
  createTime?: string;
  roleId?: string;
  email?: string;
  desc?: string;
}

interface Dialog {
  isEdit: boolean;
  data: List;
}

interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export default defineComponent({
  components: {
    Edit,
    Table,
  },
  setup() {
    const dialog: Dialog = reactive({
      isEdit: false,
      data: {},
    });

    const form: Form = reactive({
      loginName: "",
      status: 0,
    });

    const pagination: Pagination = reactive({
      page: 1,
      pageSize: 10,
      total: 50,
      pageSizes: [20, 50],
    });
    const onPaginationChange = (Object: Object) => {
      console.log(Object);
    };
    const onSizeChange = (Object: Object) => {
      console.log(Object);
    };

    const tableColumn = [
      { label: "登录账号", prop: "loginName", width: "", align: "center" },
      { label: "用户昵称", prop: "userName", width: "", align: "center" },
      {
        label: "状态",
        width: "",
        align: "center",
        slot: "status",
      },
      { label: "创建日期", prop: "createTime", width: "", align: "center" },
      { label: "手机号", prop: "phone", width: "", align: "center" },
      { label: "邮箱", prop: "email", width: "", align: "center" },
    ];

    const list: List[] = reactive([
      {
        id: "1234567890",
        loginName: "admin",
        userName: "lc",
        status: 1,
        createTime: "2021-12-31 12:12:12",
        phone: "18712345678",
        email: "19@gmail.com",
      },
      {
        id: "1234567890",
        loginName: "admin",
        userName: "tt",
        status: 1,
        createTime: "2021-12-31 13:13:13",
        phone: "187",
        email: "19699@gmail.com",
      },
    ]);

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
    const data: Tree[] = [
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
    return {
      form,
      list,
      statusList,
      edit,
      del,
      rePass,
      dialog,
      data,
      filterText,
      treeRef,
      defaultProps,
      filterNode,
      pagination,
      onPaginationChange,
      onSizeChange,
      tableColumn,
    };
  },
});
</script>

<style lang="less" scoped>
.userManager {
  min-height: calc(100% - 40px);
}
.tree .el-input {
  margin-bottom: 15px;
}
.table {
  text-align: center;
  :deep(.dark) {
    color: #323c47;
    background-color: #fafafa;
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>

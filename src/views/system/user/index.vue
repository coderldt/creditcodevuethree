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
            <el-input v-model="filterText" placeholder="Filter keyword" />
            <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" :filter-node-method="filterNode" />
          </div>
        </el-col>
        <el-col :span="18">
          <div class="table">
            <el-table header-cell-class-name="dark" border highlight-current-row stripe :data="list">
              <el-table-column label="登录账号" prop="loginName" align="center" />
              <el-table-column label="用户昵称" prop="userName" align="center" />
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
  id: number;
  label: string;
  children?: Tree[];
}

export default defineComponent({
  components: {
    Edit,
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

    const filterNode = (value: string, data: Tree) => {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    };
    const data: Tree[] = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
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
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  :deep(.dark) {
    color: #323c47;
    background-color: #fafafa;
  }
}
</style>

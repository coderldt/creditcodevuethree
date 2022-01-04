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
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="tree"></div>
      <div class="table">
        <el-table
          header-cell-class-name="dark"
          border
          highlight-current-row
          stripe
          :data="list"
        >
          <el-table-column label="登录账号" prop="loginName" align="center" />
          <el-table-column label="用户昵称" prop="userName" align="center" />
          <el-table-column label="状态" align="center">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                :active-value="1"
                :inactive-value="2"
              />
            </template>
          </el-table-column>
          <el-table-column label="创建日期" prop="createTime" align="center" />
          <el-table-column label="手机号" prop="phone" align="center" />
          <el-table-column label="邮箱" prop="email" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="edit(row)">编辑</el-button>
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
    </div>
    <Edit v-model:dialogVisible="dialog.isEdit" :data="dialog.data" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { statusList } from "@/config/system";
import Edit from "./edit.vue";
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
    return {
      form,
      list,
      statusList,
      edit,
      del,
      rePass,
      dialog,
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

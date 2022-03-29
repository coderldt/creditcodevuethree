<template>
  <div class="userManager commonBox">
    <div class="title">用户管理</div>
    <div class="search">
      <From v-model:form="forms" :rules="rules" :form-item-list="formList" :label-width="100" />
      <!-- <el-form ref="formRef" :model="form" inline>
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
      </el-form> -->
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
          <Table :column="tableColumn" :list="list" :total="total" @onPaginationChange="onPaginationChange">
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
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref, watch } from "vue";
import { statusList } from "@/config/system";
import Table, { TableColumn } from "@/components/table/index.vue";

import Edit from "./edit.vue";
import { ElTree, ElForm } from "element-plus";
import From from "@/components/form/index.vue";
// import From, { FormItemList, SelectOptions } from "@/components/form/index.vue";

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

interface Forms {
  name: string;
  status: string;
  createTime: string;
}

export default defineComponent({
  components: {
    Edit,
    Table,
    From,
  },
  setup() {
    const handleStatusChange = (e: Event) => {
      console.log(11111, e);
    };
    const handleTimeChange = (e: Event) => {
      console.log(22222, e);
    };

    const forms: Ref<Forms> = ref({
      name: "",
      status: "",
      createTime: "",
    });

    const rules = ref({
      name: [
        { required: true, message: "Please input Activity name", trigger: "blur" },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      status: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
      createTime: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
    });

    // FormItemList 类型不兼容报错
    const formList: Ref<any[]> = ref([
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
          handleChange: handleStatusChange,
        },
      },
      {
        label: "创建时间",
        prop: "createTime",
        type: "date",
        config: {
          dateType: "daterange",
          handleChange: handleTimeChange,
        },
      },
    ]);

    const form: Form = reactive({
      loginName: "",
      status: 0,
    });

    const total = ref(50);
    const onPaginationChange = (Object: Object) => {
      console.log(Object);
    };

    const tableColumn: TableColumn[] = [
      { label: "登录账号", prop: "loginName", width: "", align: "center" },
      { label: "用户昵称", prop: "userName", width: "", align: "center" },
      { label: "状态", align: "center", slot: "status" },
      { label: "创建日期", prop: "createTime", width: "", align: "center" },
      { label: "手机号", prop: "phone", width: "", align: "center" },
      { label: "邮箱", prop: "email", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
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

    const dialog: Dialog = reactive({
      isEdit: false,
      data: {},
    });
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

    const formRef = ref<InstanceType<typeof ElForm>>();
    return {
      forms,
      formList,
      form,
      list,
      statusList,
      rules,
      edit,
      del,
      rePass,
      dialog,
      data,
      filterText,
      treeRef,
      defaultProps,
      total,
      filterNode,
      onPaginationChange,
      tableColumn,
      formRef,
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
</style>

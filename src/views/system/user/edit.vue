<template>
  <el-dialog v-model="isOpen" title="编辑" width="50%">
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="登录账号" prop="loginName">
        <el-input v-model="form.loginName" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" style="width: 100%">
          <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="部门" prop="status">
        <el-select v-model="form.status" style="width: 100%">
          <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId" style="width: 100%">
          <el-option v-for="item in statusList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入" disabled />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="isOpen = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs, watch, reactive } from "vue";
import { statusList } from "@/config/system";
import { List } from "./index.vue";
import { ElForm } from "element-plus";

export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:dialogVisible"],
  setup(props, { emit }) {
    const { dialogVisible, data } = toRefs(props);
    const isOpen = computed({
      get: () => {
        return dialogVisible.value;
      },
      set: (value) => {
        if (!value) {
          formReset();
        }
        emit("update:dialogVisible", value);
      },
    });
    watch(isOpen, (val) => {
      formReset();
      form.value = { ...form.value, ...data.value };
    });

    let form: Ref<List> = ref({
      id: "",
      loginName: "",
      userName: "",
      status: "",
      phone: "",
      departmentId: "",
      roleId: "",
      email: "",
      desc: "",
    });
    const rules = reactive({
      loginName: [{ required: true, message: "登录账户不可为空", trigger: "blur" }],
      userName: [{ required: true, message: "登录账户不可为空", trigger: "blur" }],
      status: [{ required: true, message: "状态不可为空", trigger: "blur" }],
      phone: [{ required: true, message: "手机号不可为空", trigger: "blur" }],
      roleId: [{ required: true, message: "角色不可为空", trigger: "blur" }],
      email: [{ required: true, message: "邮箱不可为空", trigger: "blur" }],
    });
    const formReset = (): void => {
      form.value = {
        id: "",
        loginName: "",
        userName: "",
        status: "",
        phone: "",
        departmentId: "",
        roleId: "",
        email: "",
        desc: "",
      };
    };

    const ruleFormRef = ref<InstanceType<typeof ElForm>>();
    const submit = () => {
      console.log(ruleFormRef.value);

      ruleFormRef.value?.validate((res) => {
        console.log(res, form.value);
      });
    };

    return {
      isOpen,
      form,
      statusList,
      rules,
      submit,
      ruleFormRef,
    };
  },
});
</script>

<style lang="less" scoped>
.el-form {
  margin-right: 20px;
}
</style>

<template>
  <el-dialog
    v-model="isOpen"
    title="Tips"
    width="50%"
    :before-close="handleClose"
  >
    <span>
      <el-form :model="form">
        <el-form-item label="登录账号" prop="loginName">
          <el-input v-model="form.loginName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入" />
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
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="部门" prop="status">
          <el-select v-model="form.status">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId">
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isOpen = false">保存</el-button>
          <el-button @click="isOpen = false">取消</el-button>
        </el-form-item>
      </el-form>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs, watch } from "vue";
import { statusList } from "@/config/system";
import { List } from "./index.vue";

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
        emit("update:dialogVisible", value);
      },
    });
    watch(isOpen, (val) => {
      formReset();
      form.value = data.value;
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

    return {
      isOpen,
      form,
      statusList,
    };
  },
});
</script>

<style lang="less" scoped></style>

<template>
  <el-dialog v-model="isOpen" title="编辑" width="50%">
    <Form :form="form" :form-item-list="formItemList" :is-show-more-button="false" />
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs, watch, reactive } from "vue";
import { statusList } from "@/config/system";
import Form, { FormItem } from "@/components/form/form.vue";
import { List } from "./user";
import { ElForm } from "element-plus";

export default defineComponent({
  components: {
    Form,
  },
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
      form = { ...form, ...data.value };
    });

    const formItemList: FormItem[] = reactive([
      { label: "登录账号", prop: "loginName", type: "input", span: 24, disabled: true },
      { label: "用户昵称", prop: "userName", type: "input", span: 24, disabled: true },
      { label: "状态", prop: "status", type: "select", config: { optionList: statusList }, span: 24 },
      { label: "手机号", prop: "phone", type: "input", span: 24, disabled: true },
      { label: "部门", prop: "status", type: "select", config: { optionList: statusList }, span: 24 },
      { label: "角色", prop: "roleId", type: "select", config: { optionList: statusList }, span: 24 },
      { label: "邮箱", prop: "email", type: "input", span: 24, disabled: true },
      { label: "描述", prop: "desc", type: "input", span: 24, disabled: true },
    ]);

    let form: List = reactive({
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
      form = {
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
        console.log(res, form);
      });
    };

    return {
      isOpen,
      form,
      statusList,
      rules,
      submit,
      ruleFormRef,
      formItemList,
    };
  },
});
</script>

<style lang="less" scoped>
.el-form {
  margin-right: 20px;
}
</style>

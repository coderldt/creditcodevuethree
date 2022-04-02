<template>
  <div class="Form">
    <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formConfig.labelWidth">
      <el-row :gutter="24">
        <el-col v-for="(item, index) in getFormItemList" :key="index" :span="item.span || 6">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.slot">
              <slot :name="item.slot" :item="item.config"></slot>
            </template>
            <template v-else>
              <FormInput v-if="item.type === 'input'" :item="item" />
              <FormSelect v-else-if="item.type === 'select'" :item="item" />
              <FormDatePicker v-else-if="item.type === 'date'" :item="item" />
            </template>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button v-if="formConfig.isSearch" type="primary" @click="handleSubmit">搜索</el-button>
          <el-button v-if="formConfig.isReset" @click="handleReset">重置</el-button>
          <el-button v-if="getShowMoreButton" :type="isMoreSearch ? 'success' : ''" @click="handleSearchStatus">{{ isMoreSearch ? "隐藏" : "显示" }}</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, provide, Ref, ref, toRefs, watch } from "vue";
import * as distConfig from "@/config/dist";
import { ElForm, ElMessage } from "element-plus";
import { Config, FormButtonList } from "./index";
import FormInput from "./children/input.vue";
import FormSelect from "./children/select.vue";
import FormDatePicker from "./children/datePicker.vue";

export interface FormItem {
  label: string;
  prop: string;
  // "input" | "select" | "date"
  type: string;
  disabled?: boolean;
  span?: number;
  slot?: string;
  config?: Config;
}

export interface FormConfig {
  labelWidth?: number;
  isSearch?: boolean;
  isReset?: boolean;
  formButtonList?: FormButtonList[];
}

export default defineComponent({
  components: {
    FormInput,
    FormSelect,
    FormDatePicker,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    formItemList: {
      type: Array,
      default: [] as PropType<FormItem[]>,
    },
    formConfig: {
      type: Object,
      default: () => ({
        labelWidth: 100,
        isSearch: true,
        isReset: true,
      }),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    isShowMoreButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:form", "submit", "reset"],
  setup(props, { emit }) {
    const { formItemList, form } = toRefs(props);
    provide("formData", form);
    watch(
      form,
      (val) => {
        emit("update:form", val);
      },
      {
        deep: true,
      }
    );

    const isMoreSearch: Ref<Boolean> = ref(false);
    const handleSearchStatus = () => {
      isMoreSearch.value = !isMoreSearch.value;
    };
    const getShowMoreButton = computed(() => {
      return props.isShowMoreButton && formItemList.value.length >= 4;
    });

    // 切分需要用隐藏的表单
    const getFormItemList = computed(() => {
      if (!getShowMoreButton.value) {
        return formItemList.value;
      }
      if (isMoreSearch.value) {
        return formItemList.value;
      } else {
        return formItemList.value.slice(0, 3);
      }
    });

    const formRef = ref<InstanceType<typeof ElForm>>();
    const handleSubmit = async () => {
      const valid = await formRef.value?.validate();
      if (valid) {
        emit("submit");
      } else {
        ElMessage.error("请填写必填项");
      }
    };
    const handleReset = () => {
      formRef.value?.resetFields();
      emit("reset");
    };

    return {
      ...distConfig,
      formRef,
      formData: form,
      getFormItemList,
      handleSubmit,
      handleReset,
      getShowMoreButton,
      isMoreSearch,
      handleSearchStatus,
    };
  },
});
</script>

<style lang="less" scoped></style>

<style lang="less">
.Form {
  .el-input,
  .el-select,
  .el-date-editor,
  .el-date-picker {
    width: 100%;
  }
}
</style>

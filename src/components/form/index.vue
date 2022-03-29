<template>
  <div class="Form">
    <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formConfig.labelWidth">
      <el-row :gutter="24">
        <el-col v-for="(item, index) in formItemList" :key="index" :span="item.span || 6">
          <el-form-item :label="item.label" :props="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.render && item.config?.placeholder ? item.config.placeholder : INPUT_PLACEHOLDER"
                v-bind="item?.config?.columnConfig || {}"
                @input="(e) => handleInputChange(e, item)"
              />
            </template>

            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :props="item.props"
                clearable
                :placeholder="item?.config?.placeholder || SELECT_PLACEHOLDER"
                v-bind="item?.config?.columnConfig || {}"
                @change="(e) => handleChange(e, item)"
              >
                <el-option v-for="(i, idx) in item?.config?.optionList || []" :key="idx" :label="i.label" :value="i.value" />
              </el-select>
            </template>

            <template v-else-if="item.type === 'date'">
              <el-date-picker
                v-model="formData[item.prop]"
                :type="item?.config?.dateType || DATE_FORMAT"
                :value-format="item?.config?.dateValueFormat || DATE_VALUE_FORMAT"
                unlink-panels
                range-separator="至"
                :placeholder="item?.config?.placeholder || DATE_PLACEHOLDER"
                :start-placeholder="item?.config?.dateStartPlaceHolder || DATE_START_PLACEHOLDER"
                :end-placeholder="item?.config?.dateEndPlaceHolder || DATE_END_PLACEHOLDER"
                v-bind="item?.config?.columnConfig || {}"
                @change="(e) => handleChange(e, item)"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">搜索</el-button>
          <el-button @click="handleReset(formRef)">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs, watch } from "vue";
import * as distConfig from "@/config/dist";
import { ElForm } from "element-plus";
// import type { FormInstance } from "element-plus";
export interface SelectOptions {
  label: string;
  value: string;
}

export interface Config {
  placeholder?: string;
  columnConfig?: object; // 用户自定义覆盖默认属性
  // select
  optionList?: SelectOptions[];
  // date
  dateType?: "date" | "year" | "month" | "day" | "daterange" | "monthrange" | "datetimerange";
  dateStartPlaceHolder?: string;
  dateEndPlaceHolder?: string;
  handleChange?: (e: Event) => any;
}

export interface FormItemList {
  label: string;
  prop: string;
  type: "input" | "select" | "date";
  span?: number;
  slot?: string;
  config?: Config;
}

export interface FormButtonList {
  type: string;
  label: string;
}

export interface FormConfig {
  labelWidth?: number;
  isSearch?: boolean;
  isReset?: boolean;
  formButtonList?: FormButtonList[];
}

export default defineComponent({
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    formItemList: {
      type: Array,
      default: [] as PropType<FormItemList[]>,
    },
    formConfig: {
      type: Object,
      default: () => ({
        labelWidth: 100,
        isSearch: true,
        isReset: true,
        formButtonList: [],
      }),
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:form", "submit", "reset"],
  setup(props, { emit }) {
    const formData = ref({ ...props.form });

    watch(
      formData,
      (val) => {
        emit("update:form", val);
      },
      {
        deep: true,
      }
    );

    const formRef = ref<InstanceType<typeof ElForm>>();

    const handleInputChange = (e: any, item: FormItemList) => {
      if (item?.config?.handleChange) {
        item.config.handleChange(e);
      }
    };

    const handleChange = (e: any, item: FormItemList) => {
      if (item?.config?.handleChange) {
        item.config.handleChange(e);
      }
    };

    const handleSubmit = () => {
      emit("submit");
    };

    const handleReset = (formElForm: any) => {
      console.log(formElForm.resetFields);

      if (!formElForm) return;
      formRef.value?.resetFields();
      formElForm.resetFields();
    };
    // const handleReset = () => {
    //   if (!formRef) return;
    //   console.log(formRef.value?.resetFields, formRef.value);

    //   formRef.value?.resetFields();
    //   emit("reset");
    // };

    return {
      ...distConfig,
      formRef,
      formData,
      handleInputChange,
      handleChange,
      handleSubmit,
      handleReset,
    };
  },
});
</script>

<style lang="less" scoped>
.Form {
  .el-input,
  .el-select,
  .el-date-picker {
    width: 100%;
  }
}
</style>

<style lang="less">
.Form {
  .el-date-editor {
    width: 100%;
  }
}
</style>

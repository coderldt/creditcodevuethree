<template>
  <div class="Form">
    <el-form ref="formRef" :model="formData" :rules="rules" :label-width="formConfig.labelWidth">
      <el-row :gutter="24">
        <!-- 固定 -->
        <el-col v-for="(item, index) in getFormItemList[0]" :key="index" :span="item.span || 6">
          <template v-if="item.slot">
            <el-form-item :label="item.label" :prop="item.prop">
              <slot :name="item.slot" :row="item.config"></slot>
            </el-form-item>
          </template>
          <template v-else>
            <FormItem :item="item" />
          </template>
        </el-col>
        <!-- 显示隐藏 -->
        <el-col v-for="(item, index) in getFormItemList[1]" v-show="isMoreSearch" :key="index" :span="item.span || 6">
          <FormItem :item="item" />
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
import FormItem from "./formItem.vue";

export interface FormItem {
  label: string;
  prop: string;
  // "input" | "select" | "date"
  type: string;
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
    FormItem,
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
  },
  emits: ["update:form", "submit", "reset"],
  setup(props, { emit }) {
    const { formItemList } = toRefs(props);
    const formData = ref({ ...props.form });
    provide("formData", formData);
    watch(
      formData,
      (val) => {
        emit("update:form", val);
      },
      {
        deep: true,
      }
    );

    const isMoreSearch: Ref<Boolean> = ref(true);
    const handleSearchStatus = () => {
      isMoreSearch.value = !isMoreSearch.value;
    };
    const getShowMoreButton = computed(() => {
      return formItemList.value.length >= 4;
    });

    // 切分需要用隐藏的表单
    const getFormItemList = computed(() => {
      const res = [formItemList.value.slice(0, 3), formItemList.value.slice(3)];
      return res;
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
      formData,
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
  .el-select,
  .el-date-editor {
    width: 100%;
  }
}
</style>

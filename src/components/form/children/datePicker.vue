<template>
  <div class="FormDatePicker">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from "vue";
import * as distConfig from "@/config/dist";
import { FormItem } from "../form.vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup() {
    const formData = inject("formData");

    const handleChange = (e: Event, item: FormItem) => {
      if (item?.config?.handleChange) {
        item.config.handleChange(e);
      }
    };

    return {
      ...distConfig,
      formData,
      handleChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

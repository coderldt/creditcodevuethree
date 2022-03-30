<template>
  <div class="FormInput">
    <el-input
      v-model="formData[item.prop]"
      :placeholder="item.render && item.config?.placeholder ? item.config.placeholder : INPUT_PLACEHOLDER"
      v-bind="item?.config?.columnConfig || {}"
      @input="(e) => handleInputChange(e, item)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, useSlots } from "vue";
import * as distConfig from "@/config/dist";
import { FormItem } from "../form.vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const formData = inject("formData");

    const handleInputChange = (e: Event, item: FormItem) => {
      if (item?.config?.handleChange) {
        item.config.handleChange(e);
      }
    };

    return {
      ...distConfig,
      formData,
      handleInputChange,
    };
  },
});
</script>

<style lang="less" scoped></style>

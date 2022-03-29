<template>
  <div class="FormSelect">
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

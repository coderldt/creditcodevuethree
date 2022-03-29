<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <template v-if="item.type === 'input'">
      <FormInput :item="item" />
    </template>

    <template v-else-if="item.type === 'select'">
      <FormSelect :item="item" />
    </template>

    <template v-else-if="item.type === 'date'">
      <FormDatePicker :item="item" />
    </template>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItem } from "./form.vue";

import FormInput from "./children/input.vue";
import FormSelect from "./children/select.vue";
import FormDatePicker from "./children/datePicker.vue";

export default defineComponent({
  components: {
    FormInput,
    FormSelect,
    FormDatePicker,
  },
  props: {
    item: {
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped></style>

<template>
  <div class="detailBase">
    <RadioTag
      class="tag"
      :list="tagList"
      v-model:defaultSelect="defaultSelect"
    ></RadioTag>

    <!-- <component :is="defaultSelect"></component> -->
    <BaseBusiness v-show="defaultSelect == 'BaseBusiness'"></BaseBusiness>
    <BaseLeader v-show="defaultSelect == 'BaseLeader'"></BaseLeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import RadioTag from "@/components/radioTag/index.vue";
import { BaseBusiness, BaseLeader } from "./index";

interface TagList {
  label: string;
  key: string;
}

export default defineComponent({
  components: {
    RadioTag,
    BaseBusiness,
    BaseLeader,
  },
  setup() {
    const tagList: Ref<TagList[]> = ref([
      { label: "工商照面信息", key: "BaseBusiness" },
      { label: "高管", key: "BaseLeader" },
      { label: "分支机构", key: "2" },
      { label: "股东及出资", key: "3" },
      { label: "评级信息", key: "4" },
      { label: "平台授权信息", key: "5" },
    ]);
    const defaultSelect: Ref<string> = ref("BaseBusiness");

    return {
      tagList,
      defaultSelect,
    };
  },
});
</script>

<style lang="less" scoped>
.tag {
  margin: 15px 0;
}
</style>

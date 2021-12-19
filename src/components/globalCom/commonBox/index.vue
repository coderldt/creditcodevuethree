<template>
  <div class="commonBox">
    <div class="title">
      {{ title }}
      <div class="more" v-if="isMore" @click="onMoreClick">{{ moreText }}</div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    moreText: {
      type: String,
      default: "更多",
    },
  },
  emits: ["onMoreClick"],
  setup(props, { emit }) {
    const onMoreClick = () => {
      emit("onMoreClick");
    };
    return {
      onMoreClick,
    };
  },
});
</script>

<style lang="less">
.commonBox {
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;

  .title {
    position: relative;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .more {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    color: #74b7ff;
    cursor: pointer;
  }
}
</style>

<template>
  <el-dialog v-model="getShow" title="预警信号处理" @close="getShow = false">
    <el-radio v-model="handleStatus" label="1">已查阅</el-radio>
    <el-radio v-model="handleStatus" label="0">持续追踪</el-radio>
    <el-radio v-model="handleStatus" label="2">已处理</el-radio>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="getShow = false">取消</el-button>
        <el-button type="primary" @click="handle">处理</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs } from "vue";
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:show", "handler"],
  setup(prop, { emit }) {
    const { show } = toRefs(prop);
    const getShow = computed({
      get: () => {
        return show.value;
      },
      set: (val) => {
        emit("update:show", val);
      },
    });

    const handleStatus: Ref<""> = ref("");
    const handle = () => {
      emit("handler", handleStatus);
      handleStatus.value = "";
    };
    return {
      getShow,
      handleStatus,
      handle,
    };
  },
});
</script>

<style lang="less" scoped>
.el-radio {
  display: block;
  margin-left: 30px;
}
</style>

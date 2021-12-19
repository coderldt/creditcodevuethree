<template>
  <div class="timeRange">
    <span>{{ finallyValue }}</span>
    <el-button type="text" @click="dialogVisible = true">筛选</el-button>
    <el-dialog v-model="dialogVisible" title="时间范围筛选" width="50%" center>
      <el-tabs tab-position="left" v-model="type" style="height: 200px">
        <el-tab-pane label="固定" name="timePoint">
          <div class="title">时间点：</div>
          <el-radio-group v-model="timePoint">
            <el-radio :label="7">近7天</el-radio>
            <el-radio :label="30">近1月</el-radio>
            <el-radio :label="90">近3月</el-radio>
            <el-radio :label="180">近6月</el-radio>
            <el-radio :label="365">近12月</el-radio>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="自定义" name="timeCustom">
          <div class="title">区间段：</div>
          <el-date-picker
            v-model="timeCustom"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="开始时间"
            format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export interface SubmitParams {
  type: string;
  finallyValue: string;
}

export default defineComponent({
  emits: ["submit"],
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const finallyValue = ref("");
    const timePoint = ref("");
    const timeCustom = ref("");
    const type = ref("timePoint");

    const onSubmit = () => {
      if (type.value === "timePoint") {
        finallyValue.value = `近${timePoint.value}天`;
      } else {
        finallyValue.value = timeCustom.value;
      }
      emit("submit", {
        type: type.value,
        finallyValue: finallyValue.value,
      });
      dialogVisible.value = false;
    };
    return {
      dialogVisible,
      type,
      timePoint,
      timeCustom,
      onSubmit,
      finallyValue,
    };
  },
});
</script>

<style lang="less" scoped>
.el-tab-pane {
  margin-left: 20px;
}
</style>

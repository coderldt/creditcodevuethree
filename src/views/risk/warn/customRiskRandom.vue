<template>
  <el-dialog v-model="getShow" title="自定义预警范围" @close="getShow = false">
    <div class="subTitle">关注预警企业选择</div>
    <el-transfer v-model="transferValue" filterable :titles="titles" :data="data" />
    <div class="subTitle">关注预警信号选择</div>
    <el-checkbox-group v-model="riskwarningSign">
      <el-checkbox label="height">高风险信号</el-checkbox>
      <el-checkbox label="middle">中风险信号</el-checkbox>
      <el-checkbox label="lower">低风险信号</el-checkbox>
      <el-checkbox label="tips">提示信息</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="getShow = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { computed, defineComponent, Ref, ref, toRefs } from "vue";
export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:show", "handler"],
  setup(props, { emit }) {
    const { show } = toRefs(props);
    const getShow = computed({
      get: () => {
        return show.value;
      },
      set: (val) => {
        emit("update:show", val);
      },
    });

    const riskwarningSign: Ref<string[]> = ref([]);
    const transferValue: Ref<string[]> = ref([]);
    const titles = ["全量预警企业列表", "关注预警企业列表"];
    const data = [
      { label: "百融云创科技股份有限公司", key: "1" },
      { label: "福建森友食品有限公司", key: "2" },
      { label: "紫光海阔集团有限公司", key: "3" },
      { label: "绿地控股集团股份有限公司", key: "4" },
      { label: "阿里巴巴", key: "5" },
      { label: "青岛海文鞋业有限公司", key: "6" },
      { label: "百融致信股份有限公司", key: "7" },
      { label: "太原伟业我爱我家责任有限公司", key: "8" },
      { label: "北京简巨科技", key: "9" },
    ];

    const submit = () => {
      ElMessage.success("提交成功");
      getShow.value = false;
    };

    return {
      getShow,
      riskwarningSign,
      transferValue,
      titles,
      data,
      submit,
    };
  },
});
</script>

<style lang="less" scoped>
.subTitle {
  margin: 0 0 10px;
}

.el-transfer {
  margin-bottom: 20px;
}
:deep(.el-transfer-panel) {
  width: 37%;
}
</style>

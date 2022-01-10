<template>
  <div class="mapFilter" :style="{ width: getWidth }">
    <el-icon @click="handlerIconClick">
      <component :is="isOpen ? 'arrow-down-bold' : 'arrow-up-bold'" />
    </el-icon>
    <div v-show="isOpen" class="detail">
      <div class="title">图谱拓扑</div>
      <div class="form">
        <el-form label-position="top" :model="form" label-width="100px">
          <el-form-item label="拓扑层数">
            <el-select v-model="form.topologicalValue" size="mini">
              <el-option v-for="(item, index) in topological" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="关系模型">
            <el-select v-model="form.investmentValue" disabled size="mini">
              <el-option label="投资" value="investment" />
            </el-select>
          </el-form-item>
          <el-form-item label="持股比例">
            <el-row>
              <el-col :span="10">
                <el-select v-model="form.sign" size="mini">
                  <el-option v-for="item in signList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="form.signValue" type="number" size="mini" />
              </el-col>
              <el-col :span="2"> &nbsp;% </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, watch } from "vue";
import debounce from "lodash.debounce";

interface BaseList {
  label: string;
  value: string;
}

interface TopologicalList {
  label: string;
  value: number;
}

interface From {
  topologicalValue: number;
  investmentValue: string;
  sign: string;
  signValue: number;
}

export default defineComponent({
  emits: ["getData"],
  setup(props, { emit }) {
    const isOpen: Ref<Boolean> = ref(false);

    const getWidth = computed(() => {
      return `${isOpen.value ? "200px" : "24px"}`;
    });

    const handlerIconClick = () => {
      isOpen.value = !isOpen.value;
    };

    const form: From = reactive({
      topologicalValue: 1,
      investmentValue: "investment",
      sign: ">=",
      signValue: 0,
    });

    const onSignValueChange = debounce(() => {
      emit("getData", form);
    }, 500);
    watch(form, () => {
      onSignValueChange();
    });

    const topological: Ref<TopologicalList[]> = ref([
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
    ]);

    const signList: Ref<BaseList[]> = ref([
      { label: ">=", value: ">=" },
      { label: ">", value: ">" },
      { label: "<=", value: "<=" },
      { label: "<", value: "<" },
    ]);
    return {
      isOpen,
      handlerIconClick,
      form,
      topological,
      signList,
      getWidth,
    };
  },
});
</script>

<style lang="less" scoped>
.mapFilter {
  position: relative;
  top: 10px;
  left: 10px;
  padding: 16px;
  border-radius: 30px;
  box-shadow: 1px 1px 10px #eaeaea;
}
.detail {
  margin-top: 10px;
  .title {
    font-size: 14px;
    position: absolute;
    top: 18px;
    left: 50px;
  }

  .el-form-item {
    margin-bottom: 11px;
  }
  :deep(.el-form--label-top .el-form-item__label) {
    padding: 0 !important;
    line-height: 1em !important;
  }
}
.el-icon {
  position: relative;
  top: 2px;
  left: 1px;
  font-size: 22px;
}
</style>

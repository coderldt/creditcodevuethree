<template>
  <div class="collapse" @click="onCollapseClick">
    <el-icon color="#000" :size="20">
      <component :is="false ? 'fold' : 'expand'"></component>
    </el-icon>
  </div>
</template>
<script>
import { useStore } from "vuex";
import useState from "@/hooks/useState";
export default {
  setup() {
    const store = useStore();
    const stateData = useState("common", ["data"]);
    console.log(store, stateData.data.value);

    // const collapse = computed(() => store.state["Common"].collapse);

    const onCollapseClick = () => {
      store.dispatch("Common/onCollapseChange");
    };

    return {
      onCollapseClick,
    };
  },
};
</script>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
</style>

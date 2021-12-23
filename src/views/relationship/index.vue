<template>
  <div class="relationship commonBox">
    <div class="title">关系图谱</div>
    <div class="search">
      <el-input placeholder="请输入公司名称" style="width: 300px"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <component :is="item.name"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, provide, Ref, ref } from "vue";
  import relationship from "./children/relationship.vue";
  import equityInvestment from "./children/equityInvestment.vue";
  import actualController from "./children/actualController.vue";
  import ultimateBeneficiary from "./children/ultimateBeneficiary.vue";
  import outboundInvestment from "./children/outboundInvestment.vue";
  import workAbroad from "./children/workAbroad.vue";
  import supply from "./children/supply.vue";

  interface TabList {
    label: string;
    name: string;
  }

  export default defineComponent({
    components: {
      relationship,
      equityInvestment,
      actualController,
      ultimateBeneficiary,
      outboundInvestment,
      workAbroad,
      supply
    },
    setup() {
      const activeName: Ref<string> = ref("relationship");
      provide("activeTab", activeName);

      const tabs: Ref<TabList[]> = ref([
        { label: "关系图谱", name: "relationship" },
        { label: "对外股权投资", name: "equityInvestment" },
        { label: "实际控制人", name: "actualController" },
        { label: "疑似最终受益人", name: "ultimateBeneficiary" },
        { label: "法人对外投资", name: "outboundInvestment" },
        { label: "法人在外任职", name: "workAbroad" },
        { label: "内部供应关系", name: "supply" }
      ]);

      return {
        tabs,
        activeName
      };
    }
  });
</script>

<style lang="less" scoped>
  .relationship {
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);

    .content {
      flex: 1;
      margin-top: 10px;

      .el-tabs {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      :deep(.el-tabs__content) {
        flex: 1;
      }
    }
  }
  .el-input {
    margin-right: 10px;
  }
</style>

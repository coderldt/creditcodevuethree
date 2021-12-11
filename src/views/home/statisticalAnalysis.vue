<template>
  <CommonBox title="统计分析">
    <div class="content">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="label">
          {{ item.title }}
        </div>
        <div class="term">
          <span class="value">{{ item.value }}</span>
          <div class="trend" :style="{ background: colorList[item.type].back }">
            <el-icon :color="colorList[item.type].color"
              ><component :is="item.type ? 'bottom' : 'top'"></component
            ></el-icon>
            <div class="count" :style="{ color: colorList[item.type].color }">
              {{ item.count }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </CommonBox>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    // 0 下降 1 上升
    const list = ref([
      { title: "平台注册企业数量", value: 17, type: 0, count: 5 },
      { title: "已过门资产数量", value: 0, type: 1, count: 20 },
      { title: "已尽调资产数量", value: 256, type: 0, count: 5 },
      { title: "风险预警在监控企业", value: 625, type: 1, count: 100 },
    ]);

    const colorList = {
      0: {
        back: "#fef4f4",
        color: "#e86361",
      },
      1: {
        back: "#d3edea",
        color: "#2bcbba",
      },
    };

    return {
      list,
      colorList,
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;

  .item {
    flex: 1;
    padding-right: 20px;

    .label {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 14px;
      color: #a5a5a5;
    }

    .term {
      display: flex;
      align-items: center;
      height: 40px;

      .value {
        flex: 1;
        font-size: 30px;
        font-weight: 600;
      }

      .trend {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        border-radius: 4px;
        height: 24px;
        min-width: 40px;

        .el-icon {
          position: relative;
          top: 1px;
        }
      }
    }
  }

  .item:not(:first-child) {
    margin-left: 20px;
  }
  .item:not(:last-child) {
    border-right: 1px solid #eaeaea;
  }
  .item:last-child {
    padding-right: 0;
  }
}
</style>

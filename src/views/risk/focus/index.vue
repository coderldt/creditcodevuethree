<template>
  <CommonBox is-back :title="'专项计划' + getDateOFfDetail">
    <div class="content">
      <div class="tit">集中度规则结果</div>
      <Table :column="tableColumn" :list="list" is-order-num :is-pagination="false">
        <template #status="{ row }">
          {{ row.status ? "通过" : "不通过" }}
        </template>
      </Table>
      <div class="tit">集中度分布</div>
      <el-row :gutter="12">
        <el-col v-for="(item, index) in circleList" :key="index" :span="6">
          <Echarts :id="'dom' + index" :height="250" :options="item" />
        </el-col>
      </el-row>
      <el-row class="barList" :gutter="12">
        <el-col v-for="(item, index) in barList" :key="index" :span="12">
          <Echarts :id="'bardom' + index" :height="330" :options="item" />
        </el-col>
      </el-row>
    </div>
  </CommonBox>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import Table, { TableColumn } from "@/components/table/index.vue";

interface CircleOption {
  title?: object;
  xAxis?: object;
  yAxis?: object;
  tooltip?: object;
  legend?: object;
  series: any;
}
export default defineComponent({
  components: {
    Table,
  },
  setup() {
    const store = useStore();

    const getDateOFfDetail = computed(() => {
      if (store.state.risk.detail?.date) {
        return dayjs(store.state.risk.detail.date).format("YYYY-MM-DD");
      } else {
        return "找不到订单信息";
      }
    });

    const tableColumn: TableColumn[] = [
      // { label: "序号", prop: "", align: "center" },
      { label: "规则名称", prop: "name", width: 800, align: "center" },
      { label: "是否通过", align: "center", slot: "status" },
    ];

    const list = [
      { name: "入池的单笔资产未尝余额占比超过5%", status: 1 },
      { name: "入池的单一债务人未尝余额占比超过15%", status: 1 },
      { name: "入池的房地产行业未尝余额的占比超过30%", status: 1 },
      { name: "剩余结算周期在三个月之内的余额占比未超过30%", status: 0 },
    ];

    const circleOption: CircleOption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "5%",
        left: "center",
      },
      series: [
        {
          top: "-20%",
          name: "Access From",
          type: "pie",
          radius: ["30%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 0, name: "Search Engine" },
            { value: 0, name: "Direct" },
            { value: 0, name: "Email" },
            { value: 0, name: "Union Ads" },
            { value: 0, name: "Video Ads" },
          ],
        },
      ],
    };

    const circleList: CircleOption[] = reactive([]);
    for (let i = 0; i < 4; i++) {
      for (let index = 0; index < 5; index++) {
        const randomValue = Math.floor(Math.random() * 1000);
        circleOption.series[0].data[i].value = randomValue;
      }
      circleList.push(circleOption);
    }

    const barOption: CircleOption = {
      title: {
        text: "Waterfall Chart",
      },
      tooltip: {
        show: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          barWidth: 30,
        },
      ],
    };
    const barList: CircleOption[] = [barOption, barOption, barOption, barOption];
    return {
      getDateOFfDetail,
      tableColumn,
      list,
      circleList,
      barList,
    };
  },
});
</script>

<style lang="less" scoped>
.tit {
  font-size: 13px;
  margin: 30px 0 10px;
}
.barList {
  margin: 30px 0 0 0;
}
</style>

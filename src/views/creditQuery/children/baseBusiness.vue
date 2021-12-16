<template>
  <div class="baseBusiness">
    <div class="subTitle">工商照面信息</div>
    <List class="list">
      <ListItem
        v-for="(item, index) in list"
        :key="index"
        :label="item.label"
        :value="item.value"
        :col="item.col"
      ></ListItem>
    </List>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { List, ListItem } from "@/components/list/";
export default defineComponent({
  components: {
    List,
    ListItem,
  },
  setup() {
    const list = ref([
      { label: "公司名称", value: "蚂蚁科技集团股份有限公司", col: 12 },
      { label: "法人", value: "井贤栋", col: 12 },
      {
        label: "经营范围",
        value:
          "一般项目：工程和技术研究和试验发展；企业总部管理；控股公司服务；以自有资金从事投资活动；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；软件开发；广告设计、代理；广告制作；广告发布（非广播电台、电视台、报刊出版单位）；会议及展览服务；翻译服务(除依法须经批准的项目外，凭营业执照依法自主开展经营活动)。许可项目：第二类增值电信业务(依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以审批结果为准)。",
        col: 24,
      },
    ]);

    return {
      list,
    };
  },
});
</script>

<style lang="less" scoped>
.list {
  margin: 20px 0;
  font-size: 12px;
}
</style>

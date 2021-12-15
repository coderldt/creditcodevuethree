<template>
  <div class="creditQuery">
    <el-tabs
      type="border-card"
      :before-leave="beforeTabClick"
      @tabRemove="onTabRemove"
    >
      <el-tab-pane class="query" label="企业查询" :closable="false">
        <SearchTemplate
          v-model:search="search"
          @onSearch="onSearch"
          class="searchTemplate"
        ></SearchTemplate>
      </el-tab-pane>
      <el-tab-pane
        :label="item.title"
        :name="item.title"
        closable
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="content">
          <BaseMsg :baseMsg="item.detail.baseMsg"></BaseMsg>
          <Detail></Detail>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { defineComponent, inject, ref } from "vue";
import { getCreditDetail } from "@/apis/creditQuery.js";
import SearchTemplate from "./searchTemplate.vue";
import BaseMsg from "./children/base.vue";
import Detail from "./children/detail.vue";
export default defineComponent({
  components: {
    SearchTemplate,
    BaseMsg,
    Detail,
  },
  setup() {
    const ElMessage = inject("ElMessage");
    const search = ref("");

    const list = ref([]);

    const onSearch = async () => {
      if (!search.value) {
        return ElMessage.error("请输入企业名称或者信用代码");
      }

      if (list.value.find((i) => i.title == "蚂蚁科技集团股份邮箱公司")) {
        console.log("已查询");
      } else {
        list.value.push({
          title: "蚂蚁科技集团股份邮箱公司",
          id: "123",
          value: 20,
          detail: {},
        });
      }
    };

    const beforeTabClick = async (activeName) => {
      const res = await getCreditDetail({ name: activeName });
      if (res) {
        console.log(res);
        const obj = list.value.find((i) => i.title === activeName);
        if (obj) {
          obj.detail = res;
        }
      }
      return true;
    };

    const onTabRemove = (name) => {
      list.value = list.value.filter((i) => i.title !== name);
    };

    return {
      list,
      search,
      onSearch,
      beforeTabClick,
      onTabRemove,
    };
  },
});
</script>

<style lang="less" scoped>
.creditQuery {
  height: 100%;

  .el-tabs {
    height: 100%;
  }

  :deep(.el-tabs__content) {
    min-height: calc(100% - 65px);
  }
  .query {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  }

  .content {
    padding: 15px;
  }
}
</style>

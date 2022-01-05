<template>
  <div class="creditQuery">
    <el-tabs type="border-card" :before-leave="beforeTabClick" @tabRemove="onTabRemove">
      <el-tab-pane class="query" label="企业查询" :closable="false">
        <SearchTemplate v-model:search="search" class="searchTemplate" @onSearch="onSearch" />
      </el-tab-pane>
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title" :name="item.title" closable>
        <div class="content">
          <CompanyBase :base-msg="item.detail.baseMsg" />
          <Detail />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { ElMessage } from "element-plus";
import { getCreditDetail } from "@/apis/creditQuery";
import SearchTemplate from "./searchTemplate.vue";
import CompanyBase from "./companyBase.vue";
import Detail from "./detail.vue";

interface Tabs {
  title: string;
  id: number | string;
  value: number;
  detail: {};
}

interface DetailApiParams {
  name: string;
  age: number;
}

export default defineComponent({
  components: {
    SearchTemplate,
    CompanyBase,
    Detail,
  },
  setup() {
    const search: Ref<string> = ref("");

    const list: Ref<Tabs[]> = ref([]);

    const onSearch = async () => {
      if (!search.value) {
        return ElMessage.error("请输入企业名称或者信用代码");
      }

      if (list.value.find((i) => i.title === "蚂蚁科技集团股份邮箱公司")) {
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

    const beforeTabClick = async (activeName: string) => {
      const detailApiParams: DetailApiParams = { name: "111", age: 100 };
      const res = await getCreditDetail(detailApiParams);
      if (res) {
        const obj = list.value.find((i) => i.title === activeName);
        if (obj) {
          obj.detail = res;
        }
      }
      return true;
    };

    const onTabRemove = (name: string) => {
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

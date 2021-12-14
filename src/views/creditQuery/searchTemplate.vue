<template>
  <div class="searchTemplate">
    <el-input
      v-model="search"
      placeholder="请输入企业名称/统一社会信用代码"
    ></el-input>
    <el-button @click="onSearch" type="primary">查询</el-button>
    <div class="link">
      <div class="linkItem" v-for="(item, index) in linkItem" :key="index">
        <el-icon @click="onItemClick(item)">
          <component :is="item.icon"></component>
        </el-icon>
        <div class="label" @click="onItemClick(item)">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, inject, toRefs } from "vue";
import { useRouter } from "vue-router";
import useCreditList from "./useCreditList";
export default defineComponent({
  setup() {
    const { search, onSearch } = toRefs(useCreditList);

    const ElMessage = inject("ElMessage");
    const linkItem = [
      { label: "查报告", icon: "calendar", link: "/" },
      { label: "查关系", icon: "connection", link: "" },
      { label: "查风险", icon: "bell-filled", link: "" },
    ];

    const router = useRouter();
    const onItemClick = (item) => {
      if (item.link) {
        router.push(item.link);
      } else {
        ElMessage.warning("我不知道你要到哪里去");
      }
    };

    return {
      linkItem,
      onItemClick,
      search,
      onSearch,
    };
  },
});
</script>

<style lang="less" scoped>
.searchTemplate {
  .el-input {
    width: 87%;
    margin-right: 3%;
  }

  .el-button {
    width: 10%;
  }

  .link {
    display: flex;
    width: 80%;
    margin: 30px auto;

    .linkItem {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #409eff;

      .el-icon {
        font-size: 40px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .label {
        cursor: pointer;
      }
    }
  }
}
</style>

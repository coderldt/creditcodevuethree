<template>
  <div class="Check commonBox">
    <div class="title">专项计划风险跟踪</div>
    <div class="search">
      <el-form ref="formRef" :model="form" inline>
        <el-form-item label="登录账户" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="状态" prop="assetNumber">
          <el-input v-model="form.assetNumber" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <Table v-loading="loading" :column="tableColumn" :total="159" :list="list">
        <template #control="{ row }">
          <el-button type="text" @click="handleRiskDetail(row)"> 查看风险详情 </el-button>
          <el-button \ type="text" @click="handleFocusDetail(row)"> 查看集中的详情 </el-button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import Table from "@/components/table/index.vue";
import { TableColumn } from "@/components/table/table";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import useStore from "@/store/children/risk";
interface Form {
  productName: string;
  assetNumber: string;
}
export interface List {
  productName: string;
  assetNumber: string;
  companyName: string;
  date: string;
  size: string;
}

export default defineComponent({
  components: {
    Table,
  },
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const form: Form = reactive({
      productName: "",
      assetNumber: "",
    });

    const tableColumn: TableColumn[] = [
      { label: "产品编号", prop: "productName", width: "", align: "center" },
      { label: "产品名称", prop: "assetNumber", width: "", align: "center" },
      { label: "核心企业名称", prop: "companyName", align: "center" },
      { label: "专项计划设置日", prop: "date", width: "", align: "center" },
      { label: "发行规模（元）", prop: "size", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];
    const list: List[] = [
      { productName: "0007482-B23a-4ba3", assetNumber: "安心签专项计划", companyName: "测试安心签企业", date: "2021-04-09 00:00:00", size: "10000000" },
      { productName: "0007482-B23a-4ba3", assetNumber: "安心签专项计划", companyName: "测试安心签企业", date: "2021-04-09 00:00:00", size: "10000000" },
    ];

    const handleRiskDetail = (row: List) => {
      ElMessage({
        message: "别点了，没东西了！！",
        type: "warning",
      });
    };
    const detail = ref({});
    const store = useStore();
    const router = useRouter();
    const handleFocusDetail = (row: List) => {
      detail.value = row;
      store.dispatch("risk/onDetailChange", detail);
      router.push("/risk/focusDetail");
    };

    const loading = ref(true);
    setTimeout(() => {
      loading.value = false;
    }, 1500);

    return {
      formRef,
      form,
      tableColumn,
      list,
      handleRiskDetail,
      handleFocusDetail,
      detail,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
.Check {
  min-height: calc(100% - 40px);
}
</style>

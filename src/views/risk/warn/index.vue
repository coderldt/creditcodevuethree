<template>
  <CommonBox title="企业风险预警">
    <div class="search">
      <el-form ref="formRef" label-position="right" :model="form" label-width="200">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="企业名称" prop="companyName">
              <el-input v-model="form.companyName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预警时间" prop="warningDate">
              <el-date-picker
                v-model="form.warningDate"
                style="width: 100%"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                type="datetimerange"
                start-placeholder="请选择开始时间"
                end-placeholder="前选择结束时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险级别" prop="riskLevel">
              <el-select v-model="form.riskLevel">
                <el-option label="高风险信号" value="heiht" />
                <el-option label="中风险信号" value="middle" />
                <el-option label="低风险信号" value="low" />
                <el-option label="提示信息" value="tip" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="风险类别" prop="riskType">
              <el-select v-model="form.riskType">
                <el-option label="司法诉讼" value="1" />
                <el-option label="经营风险" value="2" />
                <el-option label="舆情风险" value="3" />
                <el-option label="工商风险" value="4" />
                <el-option label="资产风险" value="5" />
                <el-option label="主体风险" value="6" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="处理类别" prop="handleType">
              <el-select v-model="form.handleType">
                <el-option label="待处理" value="1" />
                <el-option label="已查阅" value="2" />
                <el-option label="持续跟踪" value="3" />
                <el-option label="已处理" value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="query">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="warningRang">
      <el-button type="primary" @click="onCustomRiskRandomChange">自定义预警范围</el-button>
    </div>
    <div class="content">
      <Table v-loading="loading" is-order-num :column="tableColumn" :list="[...list, ...list, ...list]" :total="6">
        <template #control="{ row }">
          <el-button type="text" @click="handler(row)">待处理</el-button>
        </template>
      </Table>
    </div>
    <HandleWarning v-model:show="isHandle.show" @handler="handleWarning" />
    <CustomRiskRandom v-model:show="isCustomRiskRandom.show" />
  </CommonBox>
</template>

<script lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { computed, defineComponent, Ref, ref, watch } from "vue";
import Table from "@/components/table/index.vue";
import { TableColumn } from "@/components/table/table";
import HandleWarning from "./handleWarning.vue";
import CustomRiskRandom from "./customRiskRandom.vue";
interface Form {
  companyName: string;
  warningDate: string[];
  riskLevel: string;
  riskType: string;
  handleType: string;
}

interface List {
  companyname: string;
  riskLevel: string;
  riskType: string;
  riskChindrenType: string;
  riskDesc: string;
  warningDate: string;
}

interface IsHandle {
  show: boolean;
  data: object;
  status: string;
}

interface RiskRondom {
  show: boolean;
  data: object;
}
export default defineComponent({
  components: {
    Table,
    HandleWarning,
    CustomRiskRandom,
  },
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const form: Ref<Form> = ref({
      companyName: "",
      warningDate: [],
      riskLevel: "",
      riskType: "",
      handleType: "",
    });

    const query = () => {
      console.log(form.value);
    };
    const reset = () => {
      formRef.value?.resetFields();
    };

    // 表格
    const tableColumn: TableColumn[] = [
      { label: "企业名称", prop: "companyname", align: "center" },
      { label: "风险级别", prop: "riskLevel", align: "center" },
      { label: "风险类型", prop: "riskType", align: "center" },
      { label: "风险子类", prop: "riskChindrenType", align: "center" },
      { label: "风险概述", prop: "riskDesc", width: "200", align: "center" },
      { label: "预警时间", prop: "warningDate", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];
    const list: List[] = [
      {
        companyname: "中国建设银行股份有限公司北京市分行",
        riskLevel: "提示信息",
        riskType: "司法诉讼",
        riskChindrenType: "裁判文书",
        riskDesc: "案由：合同纠纷案件执行 案号：（2021）津0116执11403号之一 诉讼身份：案外人 发布日期：2021-12-30",
        warningDate: "2022-01-08",
      },
      {
        companyname: "中国建设银行股份有限公司北京市分行",
        riskLevel: "提示信息",
        riskType: "司法诉讼",
        riskChindrenType: "裁判文书",
        riskDesc: "案由：合同纠纷案件执行 案号：（2021）津0116执11403号之一 诉讼身份：案外人 发布日期：2021-12-30",
        warningDate: "2022-01-08",
      },
    ];
    const isHandle: Ref<IsHandle> = ref({
      show: false,
      data: {},
      status: "",
    });
    const handler = (row: List) => {
      isHandle.value.data = row;
      isHandle.value.show = true;
    };
    const show = computed(() => isHandle.value.show);
    watch(show, (val) => {
      if (!val) {
        isHandle.value.data = {};
      }
    });
    const handleWarning = (status: string) => {
      isHandle.value.status = status;
      isHandle.value.show = false;
      ElMessage.success("处理成功");
    };

    const isCustomRiskRandom: Ref<RiskRondom> = ref({
      show: false,
      data: {},
    });
    const onCustomRiskRandomChange = () => {
      isCustomRiskRandom.value.show = true;
    };

    const loading = ref(true);
    setTimeout(() => {
      loading.value = false;
    }, 1500);

    return {
      formRef,
      form,
      query,
      reset,
      tableColumn,
      list,
      handler,
      isHandle,
      handleWarning,
      isCustomRiskRandom,
      onCustomRiskRandomChange,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
.el-date-editor,
.el-select {
  width: 100%;
}
.warningRang {
  text-align: right;
  margin-bottom: 10px;
}
</style>

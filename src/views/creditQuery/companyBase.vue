<template>
  <div class="companyBase">
    <div class="title">
      <div class="name">{{ baseMsg.companyname }}</div>
      <div class="level">内部评级：{{ baseMsg.level || "--" }}</div>
    </div>
    <el-form label-width="140px">
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item label="统一社会信用代码：">
            {{ baseMsg.creditCode || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法定代表人：">
            {{ baseMsg.legalPerson || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册资本：">
            {{ baseMsg.registeredCapital || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="成立时间：">
            {{ baseMsg.credteTime || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话号码：">
            {{ baseMsg.phone || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱：">
            {{ baseMsg.email || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业状态：">
            {{ baseMsg.companyStatus || tip }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址：">
            {{ baseMsg.address || tip }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    baseMsg: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const tip = "暂无数据";

    return {
      tip,
    };
  },
});
</script>

<style lang="less" scoped>
.title {
  .name {
    position: relative;
    font-size: 20px;
    font-weight: 700;
  }

  .level {
    position: absolute;
    right: -105px;
    top: 0;
    font-size: 10px;
    padding: 6.5px 10px;
    background: #eaeaea;
    box-sizing: border-box;
    color: #e74c3c;
    border-radius: 50px;
  }
}
.el-form {
  width: 800px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>

<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import {} from "vue";
import Header from "./header.vue";
export default {
  setup() {},
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  height: calc(100vh - 60px);
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

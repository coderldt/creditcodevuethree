<template>
  <el-container>
    <el-aside :width="collapseStatus ? '63px' : '200px'">
      <Logo :title="configData.title"></Logo>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { inject } from "vue";
import Logo from "@/components/logo";
import Header from "./header.vue";
import Menu from "@/components/menu";
import { config } from "@/config/";
export default {
  setup() {
    const configData = config;
    const { collapseStatus } = inject("collapse");
    return {
      configData,
      collapseStatus,
    };
  },
  components: {
    Header,
    Logo,
    Menu,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0;
  box-shadow: 1px 0 3px #aeadad;
  z-index: 1;
}

.el-aside {
  min-height: 100vh;
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  box-shadow: 2px 0px 5px #e4e2e2;
  z-index: 2;
  transition: width 0.5s;
}

.el-main {
  background-color: #f3f6f8;
  color: var(--el-text-color-primary);
  padding: 20px;
}
</style>

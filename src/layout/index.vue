<template>
  <el-container>
    <el-aside :width="collapseStatus ? '63px' : '200px'">
      <Logo :title="configData.title"></Logo>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header :style="{ right: 0, left: collapseStatus ? '63px' : '200px' }">
        <Header></Header>
      </el-header>
      <el-main :style="{ left: collapseStatus ? '63px' : '200px' }">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { inject, defineComponent } from "vue";
import Logo from "@/components/logo";
import Header from "./header.vue";
import Menu from "@/components/menu";
import { config } from "@/config";

export default defineComponent({
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
});
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
  height: 100vh;
}

.el-header {
  position: fixed;
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0;
  box-shadow: 1px 0 3px #aeadad;
  transition: all 0.5s;
  z-index: 999;
}

.el-aside {
  position: fixed;
  min-height: 100vh;
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  box-shadow: 2px 0 5px #e4e2e2;
  transition: width 0.5s;
  z-index: 999;
}

.el-main {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 60px;
  background-color: #f3f6f8;
  color: var(--el-text-color-primary);
  padding: 20px;
  transition: all 0.5s;
}
</style>

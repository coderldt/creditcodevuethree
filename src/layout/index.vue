<template>
  <el-container>
    <el-aside width="200px">
      <Logo :title="configData.title"></Logo>
      <!-- <Menu></Menu> -->
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
import {} from "vue";
import Logo from "@/components/logo";
import Header from "./header.vue";
// import Menu from "@/components/menu";
import { config } from "@/config/";
export default {
  setup() {
    const configData = config;
    return {
      configData,
    };
  },
  components: {
    Header,
    Logo,
    // Menu,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0;
  box-shadow: 1px 0 3px #eaeaea;
  z-index: 1;
}

.el-aside {
  height: 100vh;
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  box-shadow: 2px 0px 5px #eaeaea;
  z-index: 2;
}

.el-main {
  background-color: #fff;
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

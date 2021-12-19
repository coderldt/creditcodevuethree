<template>
  <div class="commonBox tips">
    <div class="title">
      公告栏
      <div class="more">更多</div>
    </div>
    <template v-if="noticeList.length">
      <div class="item toe" v-for="(item, index) in noticeList" :key="index">
        {{ item.title }}
      </div>
    </template>
    <el-empty v-else description="暂时数据" :image-size="80"></el-empty>
    <div class="title tip">
      消息栏
      <div class="more">更多</div>
    </div>
    <template v-if="tipList.length">
      <div class="item toe" v-for="(item, index) in tipList" :key="index">
        {{ item.title }}
      </div>
    </template>
    <el-empty v-else description="暂时数据" :image-size="80"></el-empty>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

interface Tip {
  title: string;
}

export default defineComponent({
  setup() {
    const noticeList: Array<Tip> = [
      { title: "3月31日波士顿大学硕士招生宣讲会" },
      { title: "4/16宣讲会——LSE暑期班" },
      { title: "3/7日宣讲会——英国伯明翰大学理工科2+2项目" },
      { title: "3/5日宣讲会——英国CBL牛津剑桥暑期班" },
    ];

    const tipList: Array<Tip> = [];
    return {
      noticeList,
      tipList,
    };
  },
});
</script>

<style lang="less" scoped>
.tip {
  margin-top: 20px;
}

.item {
  font-size: 14px;
  line-height: 2em;
}
</style>

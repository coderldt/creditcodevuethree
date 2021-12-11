<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="18">
        <ToDoList style="margin-bottom: 20px"></ToDoList>
        <StatisticalAnalysis></StatisticalAnalysis>
      </el-col>
      <el-col :span="6">
        <Tips></Tips>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ToDoList from "./toDoList.vue";
import Tips from "./tips.vue";
import StatisticalAnalysis from "./statisticalAnalysis.vue";
</script>

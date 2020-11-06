<template>
<div class="container bg-yriel-yellow shadow-lg rounded-lg mt-3 outline-board">
 <div class="row">
  <task-board v-for="(cat, i) in category" :key="i" :categoryDetail="cat" :tasks="tasks">
  </task-board>

 </div>
</div>
</template>

<script>
import TaskBoard from './TaskBoard.vue'
export default {
 name: "BoardList",
 components: {
  TaskBoard
 },
 props: ['category', "tasks"]
}
</script>

<style>

</style>

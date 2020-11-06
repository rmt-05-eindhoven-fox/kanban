<template>
<div class="container bg-yriel-yellow shadow-lg rounded-lg mt-3 outline-board">
 <div class="row">
  <task-board v-for="(cat, i) in category" :key="i" :categoryDetail="cat" :tasks="tasks" @toEditPage="toEditPage" @deleteTask="deleteTask">
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
 methods: {
  toEditPage(payload) {
   this.$emit('toEditPage', payload)
  },
  deleteTask(payload) {
   this.$emit('deleteTask', payload)
  }
 },
 props: ['category', 'tasks']
}
</script>

<style>

</style>

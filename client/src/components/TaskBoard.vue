<template>
<div class="col mt-3 text-">
 <div class="card-header text-dark">
  <span class="font-weight-bold h5">{{categoryDetail}}</span>
  <span class="material-icons" style="float: right; margin-top: 2px">filter_list</span>
 </div>
 <task-item v-for="task in taskEqualCategory" :key="task.id" :task="task"></task-item>
</div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default {
 name: "TaskBoard",
 components: {
  TaskItem
 },
 props: ['categoryDetail', 'tasks'],
 computed: {
  taskEqualCategory() {
   return this.tasks.filter(task => task.category == this.categoryDetail.toLowerCase())
  }
 }
}
</script>

<style>

</style>

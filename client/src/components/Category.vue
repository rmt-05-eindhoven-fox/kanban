<template>
  <div class="col-md-3 pt-2">
    <h3 :class="category.border" class="text-center border text-light rounded-pill font-weight-bold">{{ category.title }}</h3>
    <div :class="category.color" class="px-2 pt-3 pb-2 rounded overflow">
      <Task
      v-for="(task, i) in tasksPerCategory"
      :key="i"
      :task="task"
      :category="category"
      @showEditTaskForm="showEditTaskForm"
      @deleteTask="deleteTask"
      @showMoveTaskForm="showMoveTaskForm"
      ></Task>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: 'Category',
  components: {
    Task
  },
  props: ['category', 'tasks'],
  computed: {
    tasksPerCategory() {
      return this.tasks.filter(task => task.category === this.category.category);
    }
  },
  methods: {
    showEditTaskForm(payload) {
      this.$emit('showEditTaskForm', payload);
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload);
    },
    showMoveTaskForm(payload) {
      this.$emit('showMoveTaskForm', payload);
    },
  }
}
</script>

<style>

</style>
<template>
  <div class="category">
    <div class="category-head category-yellow">
      <h3> {{categoryDetail}} </h3>
    </div>
    <div class="category-body">
      <Task
        v-for="(task, i) in taskPerCategory"
        :key="i"
        :task="task"
        @toEditPage='toEditPage'
        @deleteTask='deleteTask'>
      </Task>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Category",
  components: {
    Task,
  },
  props: ["categoryDetail", 'tasks'],
  computed: {
      taskPerCategory() {
          return this.tasks.filter(task => task.category === this.categoryDetail)
      }
  },
  methods: {
    toEditPage(payload) {
        this.$emit("toEditPage", payload);
    },
    deleteOneTask(payload){
        this.$emit("deleteTask", payload)
      }
  }
};
</script>

<style>
</style>
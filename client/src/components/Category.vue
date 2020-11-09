<template>
  <div class="col-md-3 item">
    <h5 class="mt-3 text-center text-white p-4 rounded bg-primary">{{titleDetails.title}}</h5>
    <!-- {{titleDetails}} -->
    <div class="bg-light p-2 task-overflow shadow card rounded">
      <Task
        v-for="task in taskPerCategory"
        :key="task.id"
        :task="task"
        @editTask="editTask"
        @fetchTask="$emit('fetchTask')"
      ></Task>
    </div>
  </div>
</template>



<script>
import Task from "./Task";
export default {
  name: "Category",
  components: {
    Task
  },
  props: ["titleDetails", "tasks"],
  methods: {
    editTask(task) {
      this.$emit("editTask", task);
    }
  },
  computed: {
    taskPerCategory() {
      let tasks = this.tasks.filter(
        task => task.category == this.titleDetails.title.toLowerCase()
      );
      tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return tasks;
    }
  }
};
</script>

<style>
</style>
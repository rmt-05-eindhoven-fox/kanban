<template>
  <div class="card card-yellow">
    <div class="card-body">
      <p>{{ task.title }}</p>
      <p>created at: {{ task.createdAt.slice(0, 10) }}</p>
      <p>updated at: {{ task.updatedAt.slice(0, 10) }}</p>
    </div>
    <div class="card-button">
      <i @click="EditPage" class="fas fa-pen-square">edit</i>
      <i @click="DeleteTask" class="fas fa-minus-square">delete</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  methods: {
    EditPage() {
      let payload = {
        pageName: 'editPage',
        id: this.task.id,
        title: this.task.title,
        category: this.task.category
      }
      this.$emit("toEditPage", payload);
    },
    DeleteTask() {
      let payload = {
        id: this.task.id,
      }
      this.$emit("deleteTask", payload);
    }
  }
};
</script>

<style>
</style>
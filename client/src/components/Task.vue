<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{task.title}}</h5>
      <p class="card-text">{{task.description}}</p>
    </div>
    <div class="card-button">
      <i class="fas fa-pen-square" @click.prevent="$emit('editTask',task)"></i>
      <i class="fas fa-minus-square" @click.prevent="confirmDelete(task.id)"></i>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "Task",
  props: ["task"],
  methods: {
    confirmDelete(id) {
      if (window.confirm("Are you sure to delete this task ? ")) {
        this.deleteTask(id);
      }
    },
    deleteTask(id) {
      axios({
        url: "/todos/" + id,
        method: "DELETE",
        headers: {
          token: localStorage.tokenAccess
        }
      })
        .then(({ data }) => {
          this.$emit("fetchTask");
        })
        .catch(err => {
          console.log(err.response, "<<<< error fetch");
        });
    }
  }
};
</script>

<style>
</style>
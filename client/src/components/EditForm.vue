<template>
  <div class="container">
    <div class="row content">
      <div class="col-md-6 mb-3">
        <h3 class="signin-text mb-3">Edit Task</h3>
        <form @submit.prevent="editTask">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="title" name="title" class="form-control" v-model="currentTask.title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text-area"
              name="description"
              class="form-control"
              v-model="currentTask.description"
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" v-model="currentTask.category">
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "EditForm",
  props: ["task"],
  data() {
    return {
      currentTask: {}
    };
  },
  methods: {
    editTask() {
      axios({
        url: "/todos/" + this.currentTask.id,
        method: "put",
        headers: {
          token: localStorage.tokenAccess
        },
        data: {
          title: this.currentTask.title,
          description: this.currentTask.description,
          category: this.currentTask.category
        }
      })
        .then(({ data }) => {
          this.$emit("fetchTask");
          this.$emit("changePage", "home-page");
        })
        .catch(err => {
          console.log(err.response, "<<<< error fetch");
        });
    }
  },
  created() {
    this.currentTask = this.task;
  }
};
</script>

<style>
</style>
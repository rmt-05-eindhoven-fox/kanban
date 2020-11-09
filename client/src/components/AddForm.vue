<template>
  <div class="container">
    <div class="row content">
      <div class="col-md-6 mb-3">
        <h3 class="signin-text mb-3">Create Task</h3>
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="title" name="title" class="form-control" v-model="task.title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <input
              type="text-area"
              name="description"
              class="form-control"
              v-model="task.description"
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" v-model="task.category">
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
  name: "AddForm",
  data() {
    return {
      task: {}
    };
  },
  methods: {
    addTask() {
      axios({
        url: "/todos",
        method: "post",
        headers: {
          token: localStorage.tokenAccess
        },
        data: {
          title: this.task.title,
          description: this.task.description,
          category: this.task.category
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
  }
};
</script>

<style>
</style>
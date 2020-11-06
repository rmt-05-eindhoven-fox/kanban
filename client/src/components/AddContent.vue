<template>
  <div>
    <div class="container">
      <div class="shadow-lg bg-white rounded p-4">
        <h2 class="text-center">Add Task</h2>
        <div v-if="error" class="alert alert-danger text-center" role="alert">
          <p v-for="(er, i) in error" :key="i">{{ er }}</p>
        </div>
        <form v-on:submit.prevent="addTask">
          <div class="form-group">
            <label for="add-title">Title</label>
            <input
              v-model="title"
              type=" text"
              id="add-title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="add-password">Description</label>
            <input
              v-model="description"
              type="text"
              id="add-description"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="add-category">Category</label>
            <select v-model="category" id="add-category" class="form-control">
              <option value="">Choose Category</option>
              <option value="Backlog">Backlog</option>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary text-center">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-page",
  data() {
    return {
      title: "",
      description: "",
      category: "",
    };
  },
  props: ["error"],
  methods: {
    addTask() {
      let payload = {
        title: this.title,
        description: this.description,
        category: this.category,
        UserEmail: localStorage.getItem("email"),
      };
      this.$emit("addTask", payload);
    },
  },
};
</script>

<style>
</style>
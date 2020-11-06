<template>
  <div>
    <div class="container">
      <div class="shadow-lg bg-white rounded p-4">
        <h2 class="text-center">Edit Task</h2>
        <div v-if="error" class="alert alert-danger text-center" role="alert">
          <p v-for="(er, i) in error" :key="i">{{ er }}</p>
        </div>
        <form v-on:submit.prevent="editTask">
          <div class="form-group">
            <label for="edit-title">Title</label>
            <input
              v-model="title"
              type=" text"
              id="edit-title"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="edit-password">Description</label>
            <input
              v-model="description"
              type="text"
              id="edit-description"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="edit-category">Category</label>
            <select v-model="category" id="edit-category" class="form-control">
              <option value="">Choose Category</option>
              <option value="Backlog">Backlog</option>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div class="form-group text-center">
            <button type="submit" class="btn btn-primary text-center">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-page",
  data() {
    return {
      id: this.detailTask.id,
      title: this.detailTask.title,
      description: this.detailTask.description,
      category: this.detailTask.category,
    };
  },
  props: ["detailTask", "error"],
  methods: {
    editTask() {
      let payload = {
        id: this.id,
        title: this.title,
        description: this.description,
        category: this.category,
        UserEmail: localStorage.getItem("email"),
      };
      this.$emit("editTask", payload);
    },
  },
};
</script>

<style>
</style>
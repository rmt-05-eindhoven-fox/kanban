<template>
  <div>
    <div>
      <div class="container-fluid d-flex justify-content-between p-3">
        <h3>KANBAN</h3>
        <h3>Hi {{ user }}</h3>
        <div>
          <button v-on:click="addPage" class="btn btn-primary">Add Task</button>
          <button v-on:click="logout" class="btn btn-danger">Sign out</button>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <Category
            v-for="(el, i) in category"
            :key="i"
            :tag="el"
            :task="task"
            @editPage="editPage"
            @deleted="deleted"
          ></Category>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "./Category";
export default {
  name: "content-page",
  components: {
    Category,
  },
  props: ["category", "task", "user"],
  methods: {
    addPage() {
      this.$emit("addPage", "add");
    },
    logout() {
      this.$emit("logout");
    },
    editPage(payload) {
      this.$emit("editPage", payload);
    },
    deleted(id) {
      this.$emit("deleted", id);
    },
  },
};
</script>

<style>
</style>
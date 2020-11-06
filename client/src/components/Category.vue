<template>
  <div class="col mt-3">
    <h5 :class="tag.color">
      {{ tag.name }}
    </h5>
    <div
      class="bg-light pl-2 pr-2 pt-2 shadow card rounded"
      style="height: 75vh; overflow: scroll"
    >
      <Task
        :border="tag.border"
        v-for="el in differCategory"
        :key="el.id"
        :el="el"
        @deleted="deleted"
        @editPage="editPage"
        :user="user"
      ></Task>
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
  props: ["tag", "task", "user"],
  computed: {
    differCategory() {
      return this.task.filter((cat) => cat.category == this.tag.name);
    },
  },
  methods: {
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
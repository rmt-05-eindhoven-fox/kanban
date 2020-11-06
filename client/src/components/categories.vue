<template>
  <div class="row" style="margin: 5px; width: 100%">
    <div class="col-12 rataTengah">
      <div class="titleTodo" style="background-color: #fd5927">
        {{ category.category }}
      </div>
      <Tasks
        v-for="task in taskPerCategory"
        :key="task.id"
        :task="task"
        @toUpdateForm="toUpdateForm"
        @deleteTask="deleteTask"
      ></Tasks>
    </div>
  </div>
</template>

<script>
import Tasks from "./tasks";
export default {
  name: "categories",
  components: {
    Tasks,
  },
  props: ["category", "tasks"],
  methods: {
    toUpdateForm(payload) {
      this.$emit("toUpdateForm", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
  },
  computed: {
    taskPerCategory() {
      return this.tasks.filter((task) => task.CategoryId == this.category.id);
    },
  },
};
</script>

<style>
.rataTengah {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
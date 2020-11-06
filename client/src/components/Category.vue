<template>
  <!-- Category Board-->
  <div class="board shadow">
    <div class="category-title">{{ category }}</div>
    <!-- Board Content  -->
    <div class="task-container overflow-auto">
      <!-- Task Item -->
      <Task
        v-for="task in taskPerCategory"
        :key="task.id"
        :task="task"
        @deleteTask="deleteTask"
        @editTask="editTask"
      >
      </Task>

      <!-- Add Task Form -->
      <AddForm
        v-if="formName == 'add-task-form'"
        :category="category"
        @closeForm="closeForm"
        @addTask="addTask"
      ></AddForm>
    </div>

    <!-- Board Footer -->
    <div class="board-footer">
      <button @click="showAddForm" class="add-task-button">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-plus-square"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            fill-rule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
        Add Task
      </button>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
import AddForm from "./AddForm";

export default {
  name: "Category",
  data() {
    return {
      formName: "",
    };
  },
  components: {
    Task,
    AddForm
  },
  props: ["category", "tasks"],
  computed: {
    taskPerCategory() {
      return this.tasks.filter((task) => task.category == this.category);
    },
  },
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    showAddForm() {
      this.formName = "add-task-form";
    },
    closeForm() {
      this.formName = "";
    },
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    editTask(payload) {
      console.log(payload,"<<<payload di category vue")
      this.$emit("editTask", payload);
    }
  },
};
</script>

<style>
</style>
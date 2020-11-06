<template>
  <!-- HOME PAGE -->
  <section id="home-page">
    <div class="col col-add d-flex flex-column align-items-center">
      <div class="row pb-2 pt-3">
        <button @click="showAddNewTaskForm()" class="btn btn-primary"><i class="fas fa-plus"></i> Add New Task</button>
      </div>
      <!-- ADD FORM -->
      <AddForm
        v-show="addNewTaskForm"
        @closeAddNewTaskForm="closeAddNewTaskForm"
        @addNewTask="addNewTask"
      ></AddForm>
      <!-- ADD FORM -->
      <!-- EDIT FORM -->
      <EditForm
        v-show="editTaskForm"
        @closeEditTaskForm="closeEditTaskForm"
        :edit_task="edit_task"
        @editTask="editTask"
      ></EditForm>
      <!-- EDIT FORM -->
      <!-- MOVE FORM -->
      <MoveForm
        v-show="moveTaskForm"
        @closeMoveTaskForm="closeMoveTaskForm"
        :move_task="move_task"
        @moveTask="moveTask"
      ></MoveForm>
      <!-- MOVE FORM -->
    </div>
    <!-- TASKS -->
    <div class="board container-fluid">
      <div class="row row-task">
        <Category
          v-for="(category, i) in categories"
          :key="i"
          :category="category"
          :tasks="tasks"
          @showEditTaskForm="showEditTaskForm"
          @deleteTask="deleteTask"
          @showMoveTaskForm="showMoveTaskForm"
          @updateCategoryDrag="updateCategoryDrag"
        ></Category>
      </div>
    </div>
    <!-- TASKS -->
    <!-- FOOTER -->
    <div class="footer footer-copyright text-light text-center mt-4">
      © 2020 KhanBhanBhoard by Bobby Septianto
    </div>
    <!-- FOOTER -->
  </section>
  <!-- HOME PAGE -->
</template>

<script>
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import MoveForm from "./MoveForm";
import Category from "./Category";
export default {
  name: 'HomePage',
  props: ['categories', 'tasks'],
  components: {
    AddForm,
    EditForm,
    MoveForm,
    Category
  },
  data() {
    return {
      "addNewTaskForm": false,

      // EDIT TASK
      "edit_task": {
        id: '',
        title: '',
        description: ''
      },
      "editTaskForm": false,

      // MOVE TASK
      "move_task": {
        id: '',
        category: ''
      },
      "moveTaskForm": false,
    }
  },
  methods: {
    showAddNewTaskForm() {
      this.addNewTaskForm = true;
    },
    closeAddNewTaskForm() {
      this.addNewTaskForm = false;
    },
    addNewTask(payload) {
      this.addNewTaskForm = false;
      this.$emit('addNewTask', payload);
    },
    showEditTaskForm(payload) {
      this.editTaskForm = true;
      this.edit_task.id = payload.id;
      this.edit_task.title = payload.title;
      this.edit_task.description = payload.description;
    },
    closeEditTaskForm() {
      this.editTaskForm = false;
    },
    editTask(payload) {
      this.editTaskForm = false
      this.$emit('editTask', payload);
    },
    showMoveTaskForm(payload) {
      this.moveTaskForm = true;
      this.move_task.id = payload.id;
      this.move_task.category = payload.category;
    },
    closeMoveTaskForm() {
      this.moveTaskForm = false;
    },
    moveTask(payload) {
      this.moveTaskForm = false;
      this.$emit('moveTask', payload);
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload);
    },
    updateCategoryDrag(payload) {
      this.$emit('updateCategoryDrag', payload);
    }
  }
}
</script>

<style>

</style>
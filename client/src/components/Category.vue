<template>
  <div class="col-md-3 pt-2">
    <h3 :class="category.border" class="text-center border text-light rounded-pill font-weight-bold">{{ category.title }}</h3>
    <div :class="category.color" class="px-2 pt-3 pb-2 rounded overflow">
      <draggable :list="tasksPerCategory" group="task" :move="onMove" :category="category" @end="updateCategory">
        <Task
        v-for="(task, i) in tasksPerCategory"
        :key="i"
        :task="task"
        :category="category"
        @showEditTaskForm="showEditTaskForm"
        @deleteTask="deleteTask"
        @showMoveTaskForm="showMoveTaskForm"
        :id="task.id"
        ></Task>
      </draggable>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
import axios from "../config/axios";
import draggable from "vuedraggable";
export default {
  name: 'Category',
  data() {
    return {
      currentId: null,
      currentCategory: null
    }
  },
  components: {
    Task,
    draggable
  },
  props: ['category', 'tasks'],
  computed: {
    tasksPerCategory() {
      return this.tasks.filter(task => task.category === this.category.category);
    }
  },
  methods: {
    onMove(event) {
      this.currentId = event.draggedContext.element.id;
      this.currentCategory = event.relatedContext.component.$attrs.category.category;
    },
    updateCategory() {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "PATCH",
        url: `/tasks/${this.currentId}`,
        headers: {
          access_token
        },
        data: {
          category: this.currentCategory
        }
      })
      .then((result) => {
        this.$swal(
          'Moved!',
          `Your task has been moved to category "${this.currentCategory}".`,
          'success'
        );
        this.$emit('readAllTasks');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    showEditTaskForm(payload) {
      this.$emit('showEditTaskForm', payload);
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload);
    },
    showMoveTaskForm(payload) {
      this.$emit('showMoveTaskForm', payload);
    },
  }
}
</script>

<style>

</style>
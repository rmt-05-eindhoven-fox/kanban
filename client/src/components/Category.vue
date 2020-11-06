<template>
  <div class="col-md-3 pt-2">
    <h3 :class="category.border" class="text-center border text-light rounded-pill font-weight-bold">{{ category.title }}</h3>
    <div :class="category.color" class="px-2 pt-3 pb-2 rounded overflow">
      <draggable :list="tasksPerCategory" group="task" :move="onMove" :category="category" @end="updateCategoryDrag">
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
  props: ['category', 'tasks'],
  components: {
    Task,
    draggable
  },
  data() {
    return {
      currentId: null,
      currentCategory: null
    }
  },
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
    updateCategoryDrag() {
      let payload = {
        currentId: this.currentId,
        currentCategory: this.currentCategory
      };
      this.$emit('updateCategoryDrag', payload);
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
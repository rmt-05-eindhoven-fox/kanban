<template>
  <div class="col-md-3 col-sm-6 col-12">
    <div class="category-selection bg-body">

      <!--CATEGORY HEADER-->
      <div class="category-title bg-title p-4">
        <h2>{{ cat.name }}</h2>
      </div>
      <!--END CATEGORY HEADER-->

      <!--TASK-->
      <div class="category-content m-3">

        <Task
          v-for="task in taskCategory"
          :key="task.id"
          :task="task"
          @deleteTask="deleteTask"
          @editTask="editTask"
        ></Task>

        <AddTask
          v-if="backlog || todo || doing || finished"
          :cat="cat"
          @cancelForm="cancelForm"
          @addTask="addTask"
        ></AddTask>

      </div>
      <!--END TASK-->

      <!--CATEGORY FOOTER-->
      <div class="category-footer p-3">
        <button @click="showForm(cat.name)" class="btn btn-primary">Add Task</button>
      </div>
      <!--END CATEGORY FOOTER-->

    </div>
  </div>
</template>

<script>
import Task from './Task'
import AddTask from './AddTask'
export default {
  name: 'Category',
  data() {
    return {
      backlog: false,
      todo: false,
      doing: false,
      finished: false
    }
  },
  methods: {
    showForm(name) {
      if (name.toLowerCase() == 'backlog') {
        this.backlog = true
      } else if (name.toLowerCase() == 'todo') {
        this.todo = true
      } else if (name.toLowerCase() == 'doing') {
        this.doing = true
      } else if (name.toLowerCase() == 'finished') {
        this.finished = true
      }
    },
    cancelForm(name) {
      if (name.toLowerCase() == 'backlog') {
        this.backlog = false
      } else if (name.toLowerCase() == 'todo') {
        this.todo = false
      } else if (name.toLowerCase() == 'doing') {
        this.doing = false
      } else if (name.toLowerCase() == 'finished') {
        this.finished = false
      }
    },
    addTask(addTask) {
      console.log(addTask.status)
      this.cancelForm(addTask.status)
      this.$emit('addTask', addTask)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    editTask(edit) {
      this.$emit('editTask', edit)
    }
  },
  components: {
    Task,
    AddTask
  },
  props: [
    'cat',
    'tasks'
  ],
  computed: {
    taskCategory() {
      return this.tasks.filter( task => task.status == this.cat.name.toLowerCase() )
    }
  }
}
</script>

<style>

</style>
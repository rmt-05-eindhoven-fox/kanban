<template>
      <div class="col-md-3 col-sm-6">
        <div class="card p-2 shadow ">
          <div class="d-flex justify-content-between card-header"
            :class="categoryDetails.color">
            <h5 class="card-title p-2 m-0">{{ categoryDetails.name }}</h5>
          </div>
          <div class="card-body p-1 kanban-card-content">
            <!-- {{ filterTask }} -->
            <TaskItem
              v-for="task in filterTask"
              :key="task.id"
              :task="task"
              @toEditPage="toEditPage"
              @deleteTask="deleteTask"
              >
            </TaskItem>
          </div>
          <div class="card-footer" style="font-size: 0.8em;">
            <a @click.prevent="toAddPage(categoryDetails.name)" href="#" class="card-link">
              <i class="fas fa-plus"></i> Add Another Task
            </a>
          </div>
        </div>
      </div>
</template>

<script>
import TaskItem from './TaskItem'

export default {
  name: 'TaskBoard',
  components: {
    TaskItem
  },
  props: ['categoryDetails', 'tasks'],
  methods: {
    toAddPage(category) {
      const payload = {
        category,
        page: 'add-page'
      }
      // console.log(payload);
      this.$emit('toAddPage', payload)
    },
    toEditPage(payload) {
      this.$emit('toEditPage', payload)
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload)
    }
  },
  computed: {
    filterTask() {
      return this.tasks.filter(task => task.category == this.categoryDetails.name)
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="card mb-1">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <!-- <p class="card-text">{{ task.category }}</p> -->
      <!-- <div class="d-flex justify-content-between"> -->
        <div class="text-right font-weight-lighter" style="font-size: 0.8em">
          <p class="card-text text-muted my-0">{{ task.email }}</p>
          <p class="card-text text-muted my-0">{{ task.createdAt }}</p>
        </div>
        <div class="text-right">
          <a @click.prevent="toEditPage(task.id, task.category, task.title)" href="#" class="card-link">
            <i class="fas fa-edit"></i>
          </a>
          <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">
            <i class="fas fa-trash"></i>
          </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: [ 'task' ],
  methods: {
    toEditPage(id, category, title) {
      const payload = {
        id,
        category,
        title,
        page: 'edit-page'
      }
      this.$emit('toEditPage', payload)
    },
    deleteTask(id) {
      const payload = {
        id,
        page: 'main-page'
      }
      this.$emit('deleteTask', payload)
    }
  }
}
</script>

<style>

</style>
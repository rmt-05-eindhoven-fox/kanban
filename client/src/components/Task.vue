<template>
  <div class="shadow-lg card mb-2">
    <div class="card-header p-2 d-flex justify-content-between">
      {{ task.title }}
      <i class="fas fa-square" :style="category.square"></i>
    </div>
    <div class="card-body p-2">
      <p class="card-text text-justify">{{ task.description }}</p>
      <div class="row px-3 d-flex justify-content-between">
        <div>
          <a href="#" @click.prevent="showEditTaskForm()" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></a>
          <a href="#" @click.prevent="deleteTask()" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></a>
          <a href="#" @click.prevent="showMoveTaskForm()" class="btn btn-success btn-sm"><i class="fas fa-arrows-alt"></i></a>
        </div>
        <div class="pt-1">
          <i class="far fa-user"></i> {{ task.User.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['category', 'task'],
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    showEditTaskForm() {
      let payload = {
        id: this.task.id,
        title: this.task.title,
        description: this.task.description
      }
      this.$emit('showEditTaskForm', payload);
    },
    deleteTask() {
      let payload = {
        id: this.task.id
      }
      this.$emit('deleteTask', payload);
    },
    showMoveTaskForm() {
      let payload = {
        id: this.task.id,
        category: this.task.category
      }
      this.$emit('showMoveTaskForm', payload);
    }
  }
}
</script>

<style>

</style>
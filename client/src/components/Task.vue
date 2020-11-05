<template>
  <!--CARD v-for="task in tasks" :key="task.id"-->
    <div class="card mb-3" style="width: 100%;">
      <div v-if="task.id == editId" class="card-body">
        <form @submit.prevent="editTask(task.id)">
          <input
            v-model="task.title"
            class="form-control"
            type="text"
            placeholder="Title"
          >
          <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
          <input
            v-model="task.description"
            class="form-control"
            type="text"
            placeholder="Description"
          >
          <button type="submit" class="btn btn-primary">Edit</button>
          <a @click.prevent="resetEdit" href="#" class="btn btn-primary">Cancel</a>
        </form>
      </div>

      <div v-else class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <!-- <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> -->
        <p class="card-text">{{ task.description }}</p>
        <a @click.prevent="editForm(task.id)" href="#" class="card-link">Edit</a>
        <a @click.prevent="deleteTask(task.id)" href="#" class="card-link">Delete</a>
      </div>
    </div>
  <!--END CARD-->
</template>

<script>
export default {
  name: 'Task',
  data () {
    return {
      editId: 0,
      title: '',
      description: ''
    }
  },
  props: [
    'task'
  ],
  methods: {
    deleteTask (id) {
      this.$emit('deleteTask', id)
    },
    editForm (id) {
      this.editId = id
    },
    resetEdit () {
      this.editId = 0
    },
    editTask (id) {
      const edit = {
        id: id,
        title: this.title,
        description: this.description
      }
      this.editId = 0
      this.$emit('editTask', edit)
    }
  }
}
</script>

<style>

</style>
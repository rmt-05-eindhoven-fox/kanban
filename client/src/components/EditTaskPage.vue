<template>
  <section id="editTask" class="container">
    <div class="d-flex justify-content-center my-5">
      <div class="card" style="width: 30rem;">
        <div class="card-header">
          <h5 class="card-title">Edit task</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="editTask">
            <div class="form-group">
              <label for="edit-category" class="col-form-label">Category:</label>
              <select v-model="category" class="custom-select" id="edit-category">
                <option value="Backlog" :selected="dataEditTask.category == 'Backlog'" >Backlog</option>
                <option value="Todo" :selected="dataEditTask.category == 'Todo'" >Todo</option>
                <option value="Doing" :selected="dataEditTask.category == 'Doing'" >Doing</option>
                <option value="Done" :selected="dataEditTask.category == 'Done'" >Done</option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit-title" class="col-form-label">Title:</label>
              <textarea v-model="title" placeholder="your title" class="form-control" id="edit-title"></textarea>
            </div>
            <button @click.prevent="changePage('main-page')" type="button" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Edit Task</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EditTaskPage',
  props: ['dataEditTask'],
  data(){
    return {
      title: this.dataEditTask.title,
      category: this.dataEditTask.category
    }
  },
  methods: {
    changePage(name) {
      this.$emit('changePage', name)
    },
    editTask() {
      const payload = {
        title: this.title,
        category: this.category,
        id: this.dataEditTask.id
      }
      this.$emit('editTask', payload)
    }
  }
}
</script>

<style>

</style>
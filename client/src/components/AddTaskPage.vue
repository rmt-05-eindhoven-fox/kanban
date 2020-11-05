<template>
  <section id="addTask" class="container">
    <div class="d-flex justify-content-center my-5">
      <div class="card" style="width: 30rem;">
        <div class="card-header">
          <h5 class="card-title">Add new task</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="addTask">
            <div class="form-group">
              <label for="add-category" class="col-form-label">Category:</label>
              <select v-model="category" class="custom-select" id="add-category" disabled>
                <option value="Backlog" :selected="dataAddTask.category == 'Backlog'" >Backlog</option>
                <option value="Todo" :selected="dataAddTask.category == 'Todo'" >Todo</option>
                <option value="Doing" :selected="dataAddTask.category == 'Doing'" >Doing</option>
                <option value="Done" :selected="dataAddTask.category == 'Done'" >Done</option>
              </select>
            </div>
            <div class="form-group">
              <label for="add-title" class="col-form-label">Title:</label>
              <textarea v-model="title" placeholder="your title" class="form-control" id="add-title"></textarea>
            </div>
            <button @click.prevent="changePage('main-page')" type="button" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Task</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AddTaskPage',
  props: ['dataAddTask'],
  data(){
    return {
      title: '',
      category: this.dataAddTask.category
    }
  },
  methods: {
    changePage(name) {
      this.$emit('changePage', name)
    },
    addTask() {
      const payload = {
        title: this.title,
        category: this.category
      }
      this.$emit('addTask', payload)
    }
  }
}
</script>

<style>

</style>
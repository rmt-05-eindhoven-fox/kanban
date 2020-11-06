<template>
  <div>
    <nav class="navbar navbar-info" style="position: fixed; width: 100vw; background-color: rgba(158, 10, 109, 0.7); box-shadow: 10%; z-index: 100;">
      <a href=""  class="" style="text-decoration: none; color: white;">
        <img src="./assets/kanban.png" height="30" width="auto" class="d-inline-block align-top" alt="">
        Kanban by Agung Setya Pratama
      </a>
      <div v-if="logged">
        <button @click="showAdd" class="btn btn-info">Add task</button>
        <button @click="logout" class="btn btn-danger">Log out</button>
      </div>
    </nav>

    <modal v-model="add" title="Add Task">
        <form id="add" @submit.prevent="addTask">
          <div class="form-group">
            <label for="Title">Title</label>
            <textarea id="Title" cols="63" rows="3" form="add" v-model="title"></textarea>
          <div class="form-group">
            <label for="category">Category</label>
            <select id="category" class="form-control" v-model="category">
              <option value="" selected disabled hidden>Choose here</option>
              <option value="Backlog">Backlog</option>
              <option value="Todo">Todo</option>
              <option value="Done">Done</option>
              <option value="Completed">Completed</option>
              <option value="Write your own category here">Others</option>
            </select>
          </div>
          <input v-if="category === 'Write your own category here'" type="text" class="form-control mb-3" v-model="category">
          <input type="submit" value="Submit" class="btn btn-info form-control">
        </form>
    </modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      category: "",
      add: false,
      category: '',
      title: "",
    }
  },
  methods: {
    showAdd() {
      this.add = true
    },
    logout() {
      localStorage.removeItem('access_token')
      this.$emit('logout', false)
    },
    addTask() {
      let data = {
        title: this.title,
        category: this.category
      }
      this.add = false
      this.$emit('add', data)
    }
  },
  props: ["logged"]
}
</script>

<style>

</style>

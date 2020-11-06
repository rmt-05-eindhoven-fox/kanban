<template>
  <div class="container-app">
      <!-- Navbar -->
      <div class="d-flex justify-content-between navhome">
        <a class="navbar-brand" href="#">
          <img
            src="https://icons-for-free.com/iconfiles/png/512/cards+kanban+management+project+tasks+trello+icon-1320165725577116630.png"
            width="50" height="50" class="d-inline-block" alt="" loading="lazy">
          KANBAN
        </a>
        <div class="btn-group dropleft">
          <button type="button" class="btn dropdown-toggle text-white" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            {{nameUser}}
          </button>
          <div class="dropdown-menu">
            <a @click.prevent="logout" class="dropdown-item" href="">Logout</a>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="d-flex justify-content-around containerItem">
        <Category
          v-for="cat in categories"
          :key=cat.id
          :category="cat"
          :tasks="tasks"
          @requestAddTask="postAddTask"
          @requestEditTask="postEditTask"
          @deleteTask="deleteTask"
          @deleteCat="deleteCat"
          @updateCategory="updateCategory">
        </Category>
      </div>
      <div class="row justify-content-end floating">
        <AddCat @requestAddCat="postAddCat"></AddCat>
      </div>
  </div>
</template>

<script>
import Category from "./Category"
import AddCat from "./AddCategory"

export default {
  name: "HomePage",
  components: {
    Category, AddCat
  },
  props: ["nameUser", "categories", "tasks"],
  methods: {
    logout() {
      this.$emit("requestLogout")
    },
    postAddTask(payload) {
      this.$emit("postAddTask", payload)
    },
    postEditTask(payload) {
      this.$emit("postEditTask", payload)
    },
    postAddCat(payload) {
      this.$emit("postAddCat", payload)
    },
    deleteTask(payload){
      this.$emit("deleteTask", payload)
    },
    deleteCat(payload){
      this.$emit("deleteCat", payload)
    },
    updateCategory(payload){
      this.$emit("updateCategory", payload)
    }
  }
}
</script>

<style>

</style>
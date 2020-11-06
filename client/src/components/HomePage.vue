<template>
  <div>
    <nav>
      <div id="logo">
        <img :src="logoPng" width="150px" alt="" srcset="" />
      </div>
      <div class="links">
        <ul>
          <li>Welcome, {{username}}</li>
          <li>
            <button type="submit" class="btn btn-link" @click="logout"><i class="fa fa-power-off"></i></button>
          </li>
        </ul>
      </div>
    </nav>
    <!-- NAVBAR END -->

    <section class="container-fluid main-board">
      <div class="task-header">
        <h1>Task board</h1>
      </div>
      
      <!-- TASK BOARD -->
      <div class="task-board">
        <div class="row">
          <CategoryBoard
            v-for="(cat, i) in dataCat"
            :key="i"
            :nameCategories="cat"
            :tasks="tasks"
            @postTask="postTask"
            @editTask="editTask"
            @editCategory="editCategory"
            @deleteTask="deleteTask"
          ></CategoryBoard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryBoard from "./CategoryBoard";

export default {
  name: "Homepage",
  data() {
    return {
      inputTitle: '',
      selectedCategory: ''
    };
  },
  props: ["dataCat", "logoPng", "tasks", "username"],
  components: {
    CategoryBoard,
  },
  methods: {
    logout(){
      let clear = localStorage.clear() 
      this.$emit('logout', clear)
    },

    postTask(inputData){
      let payload = {
        inputTitle: inputData.inputTitle,
        selectedCategory: inputData.selectedCategory
      }
      this.$emit('postTask', payload)
    },
    editTask(payload){
      this.$emit('editTask', payload)
    },
    editCategory(payload){
      this.$emit('editCategory', payload)
    },
    deleteTask(payload){
      this.$emit('deleteTask', payload)
    }
  }
};
</script>

<style></style>

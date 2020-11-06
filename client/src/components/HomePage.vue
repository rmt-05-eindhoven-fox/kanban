<template>
  <div>
    <section>
      <!-- Nav bar -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" @click="kanban">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" @click="addTask">Add Task</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" @click="logout">Logout</button>
          </form>
        </div>
      </nav>
  
      <!-- category -->
      <div class="container" style="padding-top: 5vh;" v-if="pageName === 'listCategory'">
        <div class="d-flex justify-content-between">
          <Category 
          v-for="cat in categories"
          :key="cat.id"
          :catDetail='cat'
          :taskDetail='tasks'
          @changePage='changePage'></Category>
        </div>
      </div>
       

      <!-- Add Form -->
      <AddTask 
      v-else-if="pageName === 'addTask'"
      @addTask='addTasks'></AddTask>

      <!-- move category -->
      <EditCat v-else-if="pageName === 'editCat'"></EditCat>
      
    </section>
  </div>
</template>

<script>
import Category from './Category';
import AddTask from './AddTask';
import EditCat from './EditCat';

export default {
  name: "home-page",
  components: {
    Category, AddTask, EditCat
  },
  props: ['categories', 'tasks'],
  data(){
    return {
      pageName : "listCategory"
    }
  },
  methods: {
    addTask(){
      this.pageName = 'addTask'
    },
    kanban(){
      this.pageName = 'listCategory'
    },
    changePage(name){
      console.log(name)
      this.pageName = name;
    },
    addTasks(payload){
      console.log(payload, 'dari homepage');
      this.$emit('addTask', payload);
    },
    logout(){
      localStorage.removeItem("token");
      this.$emit('logout', 'login-page');
    }
  }
}
</script>

<style>

</style>
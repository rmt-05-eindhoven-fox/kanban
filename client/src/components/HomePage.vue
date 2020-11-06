<template>
  <section id="content">
      <div class="sidenav shadow">
        <div id="home" class="row" style="width: 100%;">
          <h1>Kanban App</h1>
        </div>
        <hr>
        <span>Dashboard</span>
        <span>My Project</span>
        <span>Teams</span><br/><br/><br/>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong"><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-calendar2-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 3.5c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5v-1zm8.854 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
          </svg><br>Add Todo</button>
        <br><br>
        <button class="btn btn-dark" @click="logout"><GoogleLogin class="btn btn-dark" :params="params" @click="logout" :logoutButton=true>Logout</GoogleLogin></button><br><br>
        
      </div>
      <div class="container-fluid mt-5">
        <div class="row">
          <Category @editTask="editTask" @updateCategory="updateCategory" @deleteTask="deleteTask" :task="task" :category="category" v-for="(category,i) in category" :key="i"></Category>      
          <AddTask @addTask="addTask"></AddTask>
        </div>
      </div>
    </section>
</template>

<script>
import GoogleLogin from "vue-google-login";
import Category from './Category'
import AddTask from './AddTask'
export default {
  name:"HomePage",
  props:["task","category"],
  components:{
    Category,
    AddTask,
    GoogleLogin
  },
  methods:{
    logout(){
      this.$emit("logout")
    },
    deleteTask(payload){
      this.$emit("deleteTask",payload)
    },
    addTask(payload){
      this.$emit("addTask",payload)
    },
    editTask(payload){
      this.$emit("editTask",payload)
    },
    updateCategory(payload){
      this.$emit("updateCategory",payload)
    }
  }
}
</script>

<style>

</style>
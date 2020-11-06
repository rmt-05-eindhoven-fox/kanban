<template>
    <div id="app">
      <SideBar @screen="screen" v-if="screenName == 'ProjectForm' || screenName == 'TaskForm' "/>
  <div class="container">

      <LoginForm  @screen="screen" v-if="screenName == 'LoginForm'"/>
      <RegisterForm @screen="screen" v-if="screenName == 'RegisterForm'"/>
      <ProjectForm @screen="screen" @setOrganizationId="setOrganizationId" v-if="screenName == 'ProjectForm'"/>
      <TaskForm @screen="screen"  v-if="screenName == 'TaskForm'"/>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ProjectForm from './components/ProjectForm.vue'
import TaskForm from './components/TaskForm.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    ProjectForm,
    TaskForm,
    SideBar    
  },
  data(){
    return {
      screenName: "LoginForm",
      token:"",
      welcomeMsg: "",
      organizationId:""      
    }
  },
  created() {
    if(localStorage.getItem("token") != "undefined" && localStorage.getItem("token")!=null){
      this.token = localStorage.getItem("token");
      this.screen("ProjectForm");
    }else{
      this.screen("LoginForm");
    }
    console.log('Component has been created!');
  },
  destroyed() {
    console.log('Component has been destroyed!');
  },
  methods: {
    screen : function(screenName) {
      this.screenName = screenName
      console.log(screenName)
    },
    initScreen : function(){
      if(localStorage.getItem("token")){
          screen("ProjectForm")
      }else{
          //initLogin()
      }
    },
    initRegisterForm: function(){
      this.screen("RegisterForm")
    },edit (index) {
      this.anns[index].state = 'editing'
    },changeMsg() {
          this.$emit("changeMsg", this.welcomeMsg);
          console.log('message emit from child component')
    },setToken(token){
      this.token = token
    },setOrganizationId(id){
            console.log(id)
      this.organizationId = id
    }

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}
</style>

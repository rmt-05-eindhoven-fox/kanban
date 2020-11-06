<template>
  <div>
      
    <!-- REGISTER PAGE -->
    <RegisterPage v-if="pageName === 'register-page'"
    @changePage="changePage"
    @register="register"
    @googleLogin="googleLogin"
    >
    </RegisterPage>

    <!-- LOGIN PAGE -->
    <LoginPage v-else-if="pageName === 'login-page'"
    @changePage="changePage"
    @login="login"
    @googleLogin="googleLogin"></LoginPage>

    <!-- HOMEPAGE -->
    <HomePage v-else-if="pageName === 'home-page'"
    :categories="categories"
    :dataTodo="dataTodo"
    @changePage="changePage"
    @logout="logout"
    @toEditPage="toEditPage"
    @deleteTodo="deleteTodo"
    >
    </HomePage>

    <!-- ADD TODO -->
    <AddTodo v-else-if="pageName === 'add-todo'"
    @changePage="changePage"
    @addTodo="addTodo"
    >
    </AddTodo>

    <!-- EDIT TODO -->
    <EditTodo v-else-if="pageName === 'edit-todo'"
    @changePage="changePage"
    @editTodo="editTodo"
    :dataEdit="dataEdit"
    >
    </EditTodo>

    <!-- PAGE NOT FOUND -->
    <PageNotFound v-else></PageNotFound>

  </div>
</template>

<script>
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import AddTodo from './components/AddTodo'
import EditTodo from './components/EditTodo'
import PageNotFound from './components/PageNotFound'
import axios from './server/axios'
export default {
    name: 'App',
    data() {
        return{
            msg: 'Halo',
            pageName: 'home-page',
            categories: [
              {
                name: 'Backlog',
                color: 'danger'
              },
              {
                name: 'Todo',
                color: 'primary'
              },
              {
                name: 'Doing',
                color: 'warning'
              },
              {
                name: 'Done',
                color: 'success'
              }
            ],
            
            dataTodo: [],
            dataEdit: null
        }
    },
    components: {
        HomePage, RegisterPage, LoginPage, AddTodo, PageNotFound, EditTodo
    },
    methods: {
      showError(msg){

      },
      googleLogin(id){
        const google_token = id
        axios({
          url: '/loginGoogle',
          method: 'POST',
          data: {
            google_token: google_token
          }
        }).then(data => {
          localStorage.setItem('token', data.data.token)
          this.fetchTodo()
          this.checkLogin()
          Swal.fire({
              icon: 'success',
              title: `Welcome ` + data.data.email,
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: `Error`,
              })
        })
      },
      changePage(page){
        this.checkLogin()
        this.pageName = page
      },
      toEditPage(payload){
        this.checkLogin()
        this.dataEdit = payload
        this.pageName = payload.pageName
      },
      editTodo(payload){
        axios({
          url: `/tasks/${payload.id}`,
          method: 'PUT',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.description,
            category: payload.category
          }
        }).then(res => {
          Swal.fire({
            icon: 'success',
            title: `Success Edit todo`,
          })
          this.fetchTodo()
          this.pageName = 'home-page'
        }).catch(err => {
          if(err.response.status === 403){
            Swal.fire({
              icon: 'error',
              title: `Forbidden`,
              text: 'You aren\'t creator of this todo!',
            })
          }else if(err.response.status === 400){
              Swal.fire({
                icon: 'error',
                title: `ERROR!`,
                text: 'Title, Description, Category cannot empty!!',
              })
          }
        })
      },
      deleteTodo(payload){
        axios({
          url: `/tasks/${payload.id}`,
          method: 'DELETE',
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Todo Deleted...',
          })
          this.fetchTodo()
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You aren\'t creator of this todo!',
          })
        })
      },
      checkLogin(){
        if(localStorage.getItem('token')){
          this.pageName = 'home-page'
          this.fetchTodo()
        }else {
          this.pageName = 'register-page'
        }
      },
      fetchTodo(){
        axios({
          url: '/tasks',
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(data => {
          this.dataTodo = data.data.dataTask
        })
          .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        })
      },
      addTodo(payload){
        axios({
          url: '/tasks',
          method: 'POST',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            description: payload.description,
            category: payload.category
          }
        }).then(data => {
          this.fetchTodo()
          this.pageName = 'home-page'
          Swal.fire({
            icon: 'success',
            title: 'Todo created succesfully',
          })
        }).catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Title, description, and Category cannot empty',
              })
        })
      },
      register(dataUser){
        axios({
          url: '/register',
          method: 'POST',
          data: {
            email: dataUser.email,
            password: dataUser.password
          }
        }).then(data => {
          Swal.fire({
            icon: 'success',
            title: 'Created account succesfully...',
          })
          this.pageName = 'login-page'
        }).catch(err => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Try again',
              })
        })
      },
      login(dataLogin){
        axios({
          url: '/login',
          method: 'POST',
          data: {
            email: dataLogin.email,
            password: dataLogin.password
          }
        }).then(data => {
          let token = data.data.token
          localStorage.setItem('token', token)
          this.fetchTodo()
          this.checkLogin()
          Swal.fire({
                icon: 'success',
                title: 'Welcome ' + data.data.email,
              })
        }).catch(err => {
            Swal.fire({
                  icon: 'error',
                  title: 'Try again',
                  text: 'Please type correctly'
                })
        })
      },
      logout(){
        localStorage.clear()
        this.checkLogin()
        Swal.fire({
                icon: 'success',
                title: 'See you <3',
              })
      }
    },
    created(){
      this.checkLogin()
    }
}
</script>

<style>

</style>
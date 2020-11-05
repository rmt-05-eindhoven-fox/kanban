<template>
  <div>
      
    <!-- REGISTER PAGE -->
    <RegisterPage v-if="pageName === 'register-page'"></RegisterPage>

    <!-- LOGIN PAGE -->
    <LoginPage v-else-if="pageName === 'login-page'"></LoginPage>

    <!-- HOMEPAGE -->
    <HomePage v-else-if="pageName === 'home-page'"
    :categories="categories"
    >
    </HomePage>

    <!-- ADD TODO -->
    <AddTodo v-else-if="pageName === 'add-todo'"></AddTodo>

    <!-- PAGE NOT FOUND -->
    <PageNotFound v-else></PageNotFound>

  </div>
</template>

<script>
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import AddTodo from './components/AddTodo'
import PageNotFound from './components/PageNotFound'
import axios from './axios'
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
            ]
        }
    },
    components: {
        HomePage, RegisterPage, LoginPage, AddTodo, PageNotFound
    },
    methods: {
      changePage(page){
        this.pageName = page
      },
      fetchTodo(){
        axios: ({
          url: '/tasks',
          method: 'get'
        })
          .then(data => {
          console.log({data}, 'ini data')
        })
          .catch(err => {
          console.log(err.response)
        })
      }
    },
    created(){
      this.fetchTodo()
    }
}
</script>

<style>

</style>
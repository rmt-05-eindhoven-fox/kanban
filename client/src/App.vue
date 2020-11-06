<template>
  <div>
    <LandingPage
      v-if="pageName === 'landingPage'"
      @postLogin="postLogin"
      @postRegister="postRegister"
      @googleLogin="googleLogin">
    </LandingPage>
    <HomePage
      v-else-if="pageName === 'homePage'"
      @requestLogout="logout"
      :nameUser="name"
      :categories="categories"
      :tasks="tasks"
      @postAddTask="postAddTask"
      @postEditTask="postEditTask"
      @postAddCat="postAddCat"
      @deleteTask="willDeleteTask"
      @deleteCat="willDeleteCat"
      @updateCategory="updateCategory">
    </HomePage>
  </div>
</template>

<script>
import LandingPage from "./components/LandingPage"
import HomePage from "./components/HomePage"
import swal from 'sweetalert'
import axios from "./config/axios"

export default {
  name: "App",
  components: {
    LandingPage,
    HomePage
  },
  data() {
    return {
      pageName: "landingPage",
      name: "",
      categories: [],
      tasks: [],
    }
  },
  methods: {
    changePage(name){
      this.pageName = name
    },
    isLogin(){
      if (localStorage.getItem("token")) {
        this.changePage("homePage")
        this.name = localStorage.getItem("name")
        this.fetchCategory()
        this.fetchTasks()
      } else {
        this.changePage("landingPage")
      }
    },
    postRegister(payload) {
      axios({
        url: "register",
        method: "POST",
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }
      })
        .then(({ data }) => {
          swal({
            title: "Success",
            text: "Your email has been added!",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
        })
        .catch((err) => {
          swal({
            title: "Register Failed!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    postLogin(payload) {
      axios({
        url: "/login",
        method: "POST",
        data: {
          email: payload.email,
          password: payload.password,
        }
      })
        .then(({data}) => {
          const token = data.access_token
          localStorage.setItem("token", token)
          localStorage.setItem("name", data.name)
          this.name = data.name
          swal({
            title: "Success",
            text: `Welcome back ${this.name}`,
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setTimeout(() => {
            this.isLogin()
          }, 3000)
        })
        .catch(err => {
          swal({
            title: "Login Failed!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    googleLogin(payload){
      axios({
        url: "/googleLogin",
        method: "POST",
        data: {
          id_token: payload.id_token
        }
      })
        .then(({data}) => {
          const token = data.access_token
          localStorage.setItem("token", token)
          localStorage.setItem("name", payload.name)
          this.isLogin()
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout(){
      localStorage.clear()
      this.isLogin()
    },
    signOut() {
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        isLogin()
      });
    },
    fetchTasks(){
      const token = localStorage.getItem("token")
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          token
        }
      })
        .then(({data}) => {
          this.tasks = data
        })
        .catch(err => {
          console.log(err.response.data.error)
        })
    },
    postAddTask(payload){
      const token = localStorage.getItem("token")
      axios({
        url: "/tasks",
        method: "POST",
        headers: {
          token
        },
        data: {
          title: payload.title,
          description: payload.description,
          CategoryId: payload.CategoryId,
        }
      })
        .then(({data}) => {
          swal({
            title: "Success",
            text: "Your task has been added!",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          this.fetchTasks()
        })
        .catch (err => {
          swal({
            title: "Check Field!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    postAddCat(payload){
      const token = localStorage.getItem("token")
      console.log(payload)
      axios({
        url: "/category",
        method: "POST",
        headers: {
          token
        },
        data: {
          name: payload.name
        }
      })
        .then(({data}) => {
          swal({
            title: "Success",
            text: "Your category has been added!",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          this.isLogin()
        })
        .catch (err => {
          swal({
            title: "Check Field!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    deleteTask(payload){
      const token = localStorage.getItem("token")
      axios({
        url: `/tasks/${payload}`,
        method: "DELETE",
        headers: {
          token
        },
      })
        .then(({data}) => {
          this.fetchTasks()
        })
        .catch (err => {
          console.log(err.response.data.error)
        })
    },
    deleteCat(payload){
      const token = localStorage.getItem("token")
      axios({
        url: `/category/${payload.id}`,
        method: "DELETE",
        headers: {
          token
        },
      })
        .then(({data}) => {
          this.isLogin()
        })
        .catch (err => {
          console.log(err.response.data.error)
        })
    },
    updateCategory(payload){
      const token = localStorage.getItem("token")
      axios({
        url: `/tasks/${payload.id}`,
        method: "PATCH",
        headers: {
          token
        },
        data: {
          CategoryId: payload.CategoryId
        }
      })
        .then(({data}) => {
          this.fetchTasks()
        })
        .catch(err => {
          swal({
            title: "Check Field!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    postEditTask(payload){
      const token = localStorage.getItem("token")
      axios({
        url: `/tasks/${payload.id}`,
        method: "PUT",
        headers: {
          token
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
        .then(({data}) => {
          swal("Poof! Your task has been updated!", {
            icon: "success",
          });
          this.fetchTasks()
        })
        .catch(err => {
          swal({
            title: "Check Field!",
            text: err.response.data.error,
            icon: "warning",
          });
        })
    },
    fetchCategory(){
      const token = localStorage.getItem("token")
      axios({
        url: "/category",
        method: "GET",
        headers: {
          token
        }
      })
        .then(({data}) => {
          this.categories = data
        })
        .catch(err => {
          console.log(err.response.data.error)
        })
    },
    willDeleteTask(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your task has been deleted!", {
              icon: "success",
            });
            this.deleteTask(id)
          }
        });
    },
    willDeleteCat(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this category!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your category has been deleted!", {
              icon: "success",
            });
            this.deleteCat(id)
          }
        });
    }
  },
  created() {
    this.isLogin()
  }
}
</script>

<style>
</style>
<template>
  <div>
    <Login @postGoogleLogin="loginGoogle" @postLogin="login" @showRegister="changePage" :pageName="pageName"></Login>
    <Register @postGoogleLogin="loginGoogle" @postRegister="register" @showLogin="changePage" :pageName="pageName"></Register>
    <Home 
        @addTask="addTask" 
        @addCategory="addCategory" 
        @logout="logout" 
        @deleteCategory="deleteCategory"
        @deleteTask="deleteTask"
        @moveCategory="moveCategory"
        @changeCategoryTitle="changeCategoryTitle"
        :pageName="pageName" 
        :categories="categories"
        :tasks="tasks"></Home>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Home from "./components/Home.vue"
import axios from "axios"

export default {
    name: "App",
    data() {
        return {
            SERVER: "http://localhost:3000",
            pageName: "Login",
            categories: [],
            tasks: [],
        }
    },
    components: {
        Login,
        Register,
        Home,
        GoogleLogin
    },
    methods: {
        changePage(value) {
            this.pageName = value
        },
        login(value) {
            axios({
                method: "POST",
                url: this.SERVER + "/login",
                data: {
                    email: value.email,
                    password: value.password
                }
            }).then((res) => {
                const {access_token} = res.data
                localStorage.setItem("access_token", access_token)
                this.changePage("Home")
                this.fetchCategories();
                this.fetchTasks();
            }).catch(err => {
                console.log(err)
            })
        },
        loginGoogle(value) {
            console.log(`in App vue`)
            console.log(value)
            axios({
                method: "POST",
                url: this.SERVER + "/loginGoogle",
                data: {
                    google_token: value,
                }
            }).then(res => {
                const {access_token} = res.data
                localStorage.setItem("access_token", access_token)
                this.changePage("Home")
                this.fetchCategories();
                this.fetchTasks();
            }).catch(err => {
                console.log(err)
            })
        },
        register(value) {
            axios({
                method: "POST",
                url: this.SERVER + "/register",
                data: {
                    email: value.email,
                    password: value.password
                }
            }).then(({data}) => {
                const {access_token} = data
                localStorage.setItem("access_token", access_token)
                this.changePage("Login")
            }).catch(err => {
                console.log(err)
            })
        },
        logout(value) {
            this.pageName = value
            localStorage.removeItem("access_token")
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {});
        },
        checkLogin() {
            if (localStorage.access_token) {
                this.pageName = "Home";
                this.fetchCategories();
                this.fetchTasks();
            } else {
                this.pageName = "Login";
            }
        },
        fetchCategories() {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "GET",
                url: this.SERVER + "/categories",
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.categories = res.data.categories;
            }).catch((err) => {
                console.log(err);
            });
        },
        fetchTasks() {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "GET",
                url: this.SERVER + "/tasks",
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.tasks = res.data.tasks;
            }).catch((err) => {
                console.log(err);
            });
        },
        addTask(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "POST",
                url: this.SERVER + "/tasks",
                data: {
                    title: value.title,
                    CategoryId: value.CategoryId
                },
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchTasks()
            }).catch((err) => {
                console.log(err);
            });
        },
        deleteTask(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "DELETE",
                url: this.SERVER + `/tasks/${value.TaskId}`,
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchTasks()
            }).catch((err) => {
                console.log(err);
            });
        },
        addCategory(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "POST",
                url: this.SERVER + "/categories",
                data: {
                    title: value.title,
                },
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchCategories()
            }).catch((err) => {
                console.log(err);
            });
        },
        deleteCategory(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "DELETE",
                url: this.SERVER + `/categories/${value.CategoryId}`,
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchCategories()
            }).catch((err) => {
                console.log(err);
            });
        },
        moveCategory(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "PATCH",
                url: this.SERVER + `/tasks/${value.TaskId}`,
                data: {
                    CategoryId: value.CategoryId
                },
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchCategories()
                this.fetchTasks()
            }).catch((err) => {
                console.log(err);
            });
        },
        changeCategoryTitle(value) {
            const access_token = localStorage.getItem("access_token");
            axios({
                method: "PATCH",
                url: this.SERVER + `/categories/${value.id}`,
                data: {
                    title: value.title
                },
                headers: {
                    access_token,
                },
            }).then((res) => {
                this.fetchCategories()
                this.fetchTasks()
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    created() {
        this.checkLogin();
    },
}
</script>

<style>

</style>
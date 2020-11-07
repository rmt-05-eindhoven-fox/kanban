<template>
  <div>
    <!-- header -->
    <nav>
      <div
        v-if="pageName !== 'login-page' && pageName !== 'register-page'"
        id="navigation-bar"
        class="link icon"
      >
        <ul>
          <li v-on:click.prevent="logout">
            <a href="#">Logout</a>
          </li>
          <li @click.prevent=""><a href="#">Home</a></li>
        </ul>
      </div>
    </nav>
    <!-- end header -->

    <!-- flexbox -->
    <!-- List Task Based on Card -->
    <Card
      v-if="pageName === 'home-page'"
      :category="categories"
      :tasks='tasks'
      @toAddForm="toAddForm"
      @addTask="postTask"
      @deleteTask='deleteTask'
    >
    </Card>
    <!-- end flexbox -->

    <!-- add Form Task -->
    <div
      v-if="pageName !== 'login-page' && pageName !== 'register-page'"
      id="add-form"
      class="col-md-10"
    >
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="font-weight-light mb-3">Add New Task</h5>
          <form @submit.prevent="postTask">
            <div class="row">
              <div class="col-md-12">
                <label for="add-title" class="text-center">Title</label><br />
                <input
                  v-model="addTask.title"
                  type="text"
                  name="title"
                  id="add-title"
                  placeholder="task name"
                  class="text-center"
                /><br />
                <label for="tag">Choose category tag:</label>
                <select class="form-control" v-model="addTask.category">
                  <option value="">=== Please Select Category ===</option>
                  <option value="backlog">Backlog</option>
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div class="col-md-8 mx-auto mt-3">
                <button class="btn btn-primary btn-block" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- end Form Task -->

    <!-- register form -->
    <div
      v-if="pageName === 'register-page'"
      id="register-page"
      class="register"
    >
      <section>
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-4">
              <h1 class="mb-4">Register Your Account!</h1>
              <form>
                <div class="form_group">
                  <label for="email">Email</label><br />
                  <input
                    type="email"
                    class="form-control"
                    id="login-email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <br />
                  <label for="password">Password</label><br />
                  <input
                    type="password"
                    class="form-control"
                    id="login-password"
                    aria-describedby="emailHelp"
                    placeholder="Enter password"
                  />
                  <br />
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style="background-color: blue"
                    onclick="loginPage()"
                  >
                    Sign Up
                  </button>
                  <p role="button" v-on:click.prevent="redirect('login-page')">
                    Have an account?
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- end register form -->

    <!-- login -->
    <div
      v-if="pageName === 'login-page'"
      id="login-page"
      class="container my-3"
    >
      <div class="row">
        <div class="col-12 p-0 text-center">
          <img src="../security.svg" alt="" style="height: 40%" />
          <h5 class="font-weight-light mb-3">
            You shall not pass, please verify your identity
          </h5>
          <div class="row">
            <div class="col-md-6 mx-auto">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="login-email" class="text-left"
                    >Email address</label
                  >
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    id="login-email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>

                <div class="form-group">
                  <label for="login-password">Password</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    id="login-password"
                    aria-describedby="emailHelp"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  style="background-color: blue"
                >
                  Log In
                </button>
              </form>
              <button
                type="button"
                class="btn btn-primary"
                v-on:click.prevent="redirect('register-page')"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end login -->
  </div>
</template>

<script>
import axios from "../config/axios";
import Card from "./components/Card";
export default {
  name: "app",
  components: {
    Card,
  },
  data() {
    return {
      pageName: "login-page",
      tasks: [],
      addTask: {
        title: "",
        category: "",
      },
      user: {
        email: "",
        password: "",
      },
      categories: [
        {
          titleCategory: "backlog",
          icon: "😫",
        },
        {
          titleCategory: "product",
          icon: "😅",
        },
        {
          titleCategory: "development",
          icon: "😢",
        },
        {
          titleCategory: "done",
          icon: "😔",
        },
      ],
    };
  },
  methods: {
    redirect(pageName) {
      this.pageName = pageName;
    },
    showFormAdd() {
      this.isShow = true;
    },
    addTodo() {
      console.log("function addTodo");

      let data = this.addTask;

      console.log(data);
      this.tasks.push(data);
      this.pageName = "home-page";
    },
    login() {
      console.log("masuk login");
      let payload = this.user;
      console.log(payload);
      axios({
        url: "/login",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          console.log(data, "<<< data login");
          localStorage.setItem("access_token", data.data.access_token);
          this.pageName = "home-page";
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAddForm() {
      this.pageName = "add-form";
    },
    postTask(task) {
      axios({
        url: "/task",
        method: "post",
        data: {
          title: this.addTask.title,
          category: this.addTask.category,
        },
        headers: {
          token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data);
          this.fetchData();
          this.checklogin()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchData() {
      const token = localStorage.getItem("access_token");
      console.log(token);
      axios({
        url: "/task",
        method: "get",
        headers: {
          token,
        },
      })
        .then(({ data }) => {
          // console.log(data);
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.removeItem("access_token");
      this.pageName = "login-page";
    },
    checklogin(){
      const token = localStorage.getItem('access_token')
      if(token){
        this.pageName='home-page'
        this.fetchData()
      } else {
        this.pageName='login-page'
      }
    },
    deleteTask(id){
      console.log('masuk kakek delete');
      console.log(id, "kakek");
      const token = localStorage.getItem("access_token")
      axios({
        url:`/task/${id}`,
        method: 'delete',
        headers: {
          token
        }
      })
      .then(data=>{
        this.fetchData()
        this.pageName = 'home-page'
      })
    }
  },
  created() {
    this.checklogin();
  },
};
</script>

<style>
</style>
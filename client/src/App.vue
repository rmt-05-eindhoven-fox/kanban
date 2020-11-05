<template>
  <div>
    <!-- NAVBAR LANDING PAGE -->
    <NavbarLandingPage
      v-if="default_page === 'login-page' || default_page === 'register-page'"
      >
    </NavbarLandingPage>
    <!-- NAVBAR LANDING PAGE -->

    <!-- NAVBAR HOME PAGE -->
    <NavbarHomePage
      v-if="default_page === 'home-page'"
      :login_user="login_user"
      @logout="logout"
    ></NavbarHomePage>
    <!-- NAVBAR HOME PAGE -->

    <!-- LOGIN PAGE -->
    <section v-if="default_page === 'login-page'" id="login-page" class="container mt-5 pt-5">
      <div class="row mt-5">
        <div class="col-sm-9 col-md-7 col-lg-5 m-auto">
          <div class="card card-login">
            <div class="card-body text-light">
              <h5 class="card-title text-center">LOGIN</h5>
              <form @submit.prevent="login()" class="form-login">
                <div class="form-group">
                  <label for="email-login">Email Address</label>
                  <input v-model="email_login" type="email" id="email-login" class="form-control rounded-pill p-4" placeholder="Email address" required autofocus>
                </div>
                <div class="form-group">
                  <label for="password-login">Password</label>
                  <input v-model="password_login" type="password" id="password-login" class="form-control rounded-pill p-4" placeholder="Password" required autofocus>
                </div>
                <div class="form-group">
                  <label for="remember">
                    <input v-model="remember" type="checkbox" id="remember" name="remember" class="mr-2"> Remember Me
                  </label>
                </div>
                <hr class="bg-light">
                <button class="btn btn-lg btn-primary btn-block mt-4 p-2 rounded-pill" type="submit">LOGIN</button>
                <hr class="bg-light mt-4">
              </form>
              <small class="form-text text-center">Sign in with your google account</small>
              <div class="row justify-content-center my-3">
                <button v-google-signin-button="clientId" class="google-signin-button"><i class="fab fa-google"></i> Login with Google</button>
              </div>
              <small class="form-text text-center">Don't have an account yet?<a href="#" @click.prevent="changePage('register-page')" class="text-warning"> Register now!</a></small>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="footer container text-center text-light">
          © 2020 KhanBhanBhoard by Bobby Septianto
        </div>
      </div>
    </section>
    <!-- LOGIN PAGE -->

    <!-- REGISTER PAGE -->
    <RegisterPage
      v-else-if="default_page === 'register-page'"
      @register="register"
      @changePage="changePage"
    ></RegisterPage>
    <!-- REGISTER PAGE -->

    <!-- HOME PAGE -->
    <HomePage
      v-else-if="default_page === 'home-page'"
      :categories="categories"
      :tasks="tasks"
      @addNewTask="addNewTask"
      @editTask="editTask"
      @deleteTask="deleteTask"
      @moveTask="moveTask"
      @readAllTasks="readAllTasks"
    ></HomePage>
    <!-- HOME PAGE -->
  </div>
</template>

<script>
import NavbarLandingPage from "./components/NavbarLandingPage";
import NavbarHomePage from "./components/NavbarHomePage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import axios from "./config/axios";

export default {
  name: 'App',
  data() {
    return {
    // MISC
    "default_page": "login-page",
    "login_user": '',

    // LOGIN
    "email_login": '',
    "password_login": '',
    "remember": '',
    "clientId": '347714341093-c0bqlieo0hp32k7e4mkhinqlb3m5m034.apps.googleusercontent.com',

    // CATEGORIES
    "categories": [
      {
        category: "Backlog",
        title: "BACKLOG",
        square: "color: red",
        border: "border-danger",
        color: "backlog"
      },
      {
        category: "Todo",
        title: "TODO",
        square: "color: yellow",
        border: "border-warning",
        color: "todo"
      },
      {
        category: "Doing",
        title: "DOING",
        square: "color: cyan",
        border: "border-primary",
        color: "doing"
      },
      {
        category: "Done",
        title: "DONE",
        square: "color: greenyellow",
        border: "border-success",
        color: "done"
      }
    ],

    // TASKS
    "tasks": [],
    };
  },
  components: {
    NavbarLandingPage,
    NavbarHomePage,
    RegisterPage,
    HomePage
  },
  methods: {
    changePage(name) {
      this.default_page = name;
    },
    login() {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: this.email_login,
          password: this.password_login
        }
      })
      .then((result) => {
        let access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);

        // User Login
        this.login_user = result.data.email;

        // Reset Form Login
        if (!this.remember) {
          this.email_login = '';
          this.password_login= '';
        }

        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    OnGoogleAuthSuccess(google_access_token) {
      axios({
        method: 'POST',
        url: '/loginGoogle',
        data: {
          google_access_token
        }
      })
      .then((result) => {
        let access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);

        // User Login
        this.login_user = result.data.email;

        // Reset Form Login
        this.email_login = '';
        this.password_login= '';

        this.changePage('home-page');
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    OnGoogleAuthFail(err) {
      console.log(err)
      this.$swal(
        'Error!',
        err,
        'error'
      );
    },
    register(payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email_register,
          password: payload.password_register
        }
      })
      .then((result) => {
        this.changePage('login-page');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    logout(payload) {
      this.default_page = 'login-page';
      localStorage.clear();
    },
    isLogin() {
      if (localStorage.access_token) {
        this.default_page = 'home-page';
        this.readAllTasks();
      } else {
        this.default_page = 'login-page';
      }
    },
    readAllTasks() {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "GET",
        url: '/tasks',
        headers: {
          access_token
        }
      })
      .then((result) => {
        // Empty first before fetch new data!
        this.tasks = [];
        this.tasks = result.data;
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    addNewTask(payload) {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "POST",
        url: '/tasks',
        headers: {
          access_token
        },
        data: {
          title: payload.title,
          description: payload.description,
          category: payload.category
        }
      })
      .then((result) => {
        this.$swal(
          'Added!',
          'Your new task has been added.',
          'success'
        );
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    editTask(payload) {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "PUT",
        url: `/tasks/${payload.id}`,
        headers: {
          access_token
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
      .then((result) => {
        this.$swal(
          'Edited!',
          'Your task has been edited.',
          'success'
        );
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    moveTask(payload) {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "PATCH",
        url: `/tasks/${payload.id}`,
        headers: {
          access_token
        },
        data: {
          category: payload.category
        }
      })
      .then((result) => {
        this.$swal(
          'Moved!',
          `Your task has been moved to category "${payload.category}".`,
          'success'
        );
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        this.$swal(
          'Error!',
          err.response.data.msg,
          'error'
        );
      });
    },
    deleteTask(payload) {
      const access_token = localStorage.getItem('access_token');
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios({
            url: `/tasks/${+payload.id}`,
            method: 'DELETE',
            headers: {
              access_token
            }
          })
          .then((result) => {
            this.$swal(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            );
            this.default_page = 'home-page';
            this.readAllTasks();
          })
          .catch((err) => {
            console.log(err.response.data.msg);
            this.$swal(
              'Error!',
              err.response.data.msg,
              'error'
            );
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.$swal(
          'Error!',
          err,
          'error'
        );
      });
    }
  },
  created() {
    this.isLogin();
  }
};
</script>

<style>

</style>
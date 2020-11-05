const app = new Vue({
  el: "#app",
  data: {
    SERVER: "http://localhost:3000",
    pageName: "Landing",
    isShowAddCard: false,
    user: {
      email: "",
      password: "",
    },
    signup: false,
    categories: [],
    tasks: [],
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    login() {
      axios({
        method: "POST",
        url: this.SERVER + "/login",
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.changePage("Home");
          this.fetchCategories();
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.removeItem("access_token");
      this.user.email = "";
      this.user.password = "";
      this.changePage("Landing");
    },
    checkLogin() {
      if (localStorage.access_token) {
        this.pageName = "Home";
        this.fetchCategories();
        this.fetchTasks();
      } else {
        this.pageName = "Landing";
      }
    },
    showSignup() {
      this.signup = true;
    },
    cancelSignup() {
      this.signup = false;
    },
    showAddCard() {
      this.isShowAddCard = true;
    },
    fetchCategories() {
      const access_token = localStorage.getItem("access_token");
      axios({
        methods: "GET",
        url: this.SERVER + "/categories",
        headers: {
          access_token,
        },
      })
        .then((res) => {
          this.categories = res.data.categories;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchTasks() {
      const access_token = localStorage.getItem("access_token");
      axios({
        methods: "GET",
        url: this.SERVER + "/tasks",
        headers: {
          access_token,
        },
      })
        .then((res) => {
          this.tasks = res.data.tasks;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.checkLogin();
  },
});

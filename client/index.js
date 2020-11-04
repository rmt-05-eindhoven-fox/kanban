const app = new Vue({
  el: "#app",
  data: {
    message: "Hello Vue!",
    pageName: "Landing",
    isShowAddCard: false,
    user: {
      email: "",
      password: "",
    },
    title: "Category Title",
    categories: [
      {
        id: 1,
        title: "Category 1",
      },
      {
        id: 2,
        title: "Category 2",
      },
      {
        id: 3,
        title: "Category 3",
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Task 1",
        CategoryId: 1,
      },
      {
        id: 2,
        title: "Task 2",
        CategoryId: 1,
      },
      {
        id: 3,
        title: "Task 3",
        CategoryId: 1,
      },
      {
        id: 4,
        title: "Task 4",
        CategoryId: 2,
      },
      {
        id: 5,
        title: "Task 5",
        CategoryId: 2,
      },
      {
        id: 6,
        title: "Task 6",
        CategoryId: 3,
      },
    ],
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    login() {
      console.log(this.user.email);
      console.log(this.user.password);
      localStorage.setItem("access_token", this.user.email);
      this.changePage("Home");
    },
    logout() {
      this.changePage("Landing");
    },
    checkLogin() {
      if (localStorage.access_token) {
        this.pageName = "Home";
      } else {
        this.pageName = "Landing";
      }
    },
    showAddCard() {
      this.isShowAddCard = true;
    },
    fetchCategories() {
      axios({
        methods: "GET",
      });
    },
  },
  created() {
    this.checkLogin();
  },
});

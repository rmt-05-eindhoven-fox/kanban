<template>
  <div> 
    <Auth
      v-if="activePage == 'auth-page'"
      @prosesLogin="prosesLogin"
      @prosesRegister="prosesRegister"
      :user="user"
    ></Auth>

    <Home
      v-else-if="activePage == 'home-page'"
      :categories="categories"
      :organizationId="currentOrganizationId"
      @openAddTask="openAddTask"
      @deleteTask="deleteTask"
      @openEditTask="openEditTask"
      @changeCategory="changeCategory"
    >
    </Home>   

    <Modaladd 
    v-if="modalName == 'addTodo'" 
    v-show="showModal"  
    @isDisplayModal="isDisplayModal"
    @storeTask="storeTask"
    :payload="payloadAddTask"
    ></Modaladd>

  <ModalEdit
    v-if="modalName == 'editTodo'" 
    v-show="showModal"  
    @isDisplayModal="isDisplayModal"
    @editTask="editTask"
    :payload="payloadEditTask"
    > 
  </ModalEdit>
  
</template>

<script>
// ES6 Modules or TypeScript

import axios from "./config/axios";
import Swal from "sweetalert2";
import Modaladd from "./component/home/add-todo.vue";
import ModalEdit from "./component/home/edit-todo.vue";
import Auth from "./component/auth-page.vue";
import Home from "./component/home-page.vue";

export default {
  name: "App",
  data() {
    return {
      user: {},
      organization: {},
      categories: [],
      activePage: "auth-page",

      // Data Modal Add Task
      modalAddTodo: false,
      showModal: false,
      modalName: "",

      //
      currentOrganizationId: "",
      payloadAddTask: {},
      payloadEditTask: {},
    };
  },

  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.changePage("home-page");
      this.loadOrganizationById();
    } else {
      this.changePage("auth-page");
    }
  },

  components: {
    Auth,
    Home,
    Modaladd,
    ModalEdit,
  },

  methods: {
    changeModal(params) {
      this.modalName = params;
    },

    changePage(page) {
      this.activePage = page;
    },

    openAddTask(payload) {
      this.payloadAddTask = payload;
      console.log("clicked here");
      this.isDisplayModal(true);
      this.changeModal("addTodo");
    },

    getCategories() {
      const objCat = {};
      this.categories.forEach((category) => {
        objCat[category.id] = category.name;
      });
      return objCat;
    },

    openEditTask(payload) {
      // arrCat.push(objCat);
      payload.categories = this.getCategories();
      console.log(payload);
      this.payloadEditTask = payload;
      console.log("clicked here");
      this.isDisplayModal(true);
      this.changeModal("editTodo");
    },

    isDisplayModal(params) {
      this.showModal = params;
      this.modalName = "";
      this.modalAddTodo = params;
    },

    prosesLogin(payload) {
      axios({
        url: "login",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          const fullname = data.fullname;
          this.afterLogin();
          this.$swal("Access Granted!", `Welcome, ${fullname}`, "success");
        })
        .catch((err) => {
          this.errorHandler(err, "Access Denied!");
        });
    },

    prosesRegister(payload) {
      axios({
        url: "register",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          this.$swal(
            "Access Granted!",
            "Register successfully, Please login first!",
            "success"
          );
          this.user = data;
        })
        .catch((err) => {
          this.errorHandler(err, "Register Failed!");
        });
    },

    afterLogin() {
      this.saveUserInfo(data);
      this.changePage("home-page");
      this.loadOrganizationById();
    },

    loadOrganizationById(organizationId = null) {
      // organizations
      organizationId = 1;
      axios({
        url: "organizations/" + organizationId,
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.currentOrganizationId = organizationId;
          this.categories = data.organization.Categories;
        })
        .catch((err) => {
          console.log(err.response);
          // this.errorHandler(err, "Register Failed!");
        });
    },

    setCategory(data) {},

    // add task to database
    storeTask(payload) {
      axios({
        url: "tasks",
        method: "post",
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          const message = data.task.name || "";
          this.loadOrganizationById();
          this.$swal("Add new Task Successfully!", message, "success");
          // console.log(data);
        })
        .catch((err) => {
          this.errorHandler(err, "Save Task Failed!");
          console.log(err.response);
        });
    },

    editTask(payload) {
      this.isDisplayModal(false);
      const { id, CategoryId, OrganizationId, name, description } = payload;
      const update = { CategoryId, OrganizationId, name, description };
      axios({
        url: "tasks/" + id,
        method: "put",
        data: update,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.loadOrganizationById();
          const message = data.task.name || "";
          this.$swal("Edit new Task Successfully!", message, "success");
          // console.log(data);
        })
        .catch((err) => {
          this.errorHandler(err, "Edit Task Failed!");
          console.log(err.response);
        });
      console.log(payload);
    },

    deleteTask(payload) {
      const taskName = payload.name;
      const id = payload.id;
      const OrganizationId = payload.OrganizationId;

      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios({
              url: "tasks/" + id,
              method: "delete",
              data: {
                OrganizationId,
              },
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            })
              .then(({ data }) => {
                this.loadOrganizationById();
                const message =
                  (data.message || "Failed deleted task!") + ` ${taskName}`;
                this.$swal.fire("Deleted!", message, "success");
              })
              .catch((err) => {
                this.errorHandler(err, "Save Task Failed!");
                console.log(err.response);
              });
          }
        });
    },

    changeCategory(payload) {
      this.$swal
        .fire({
          title: "Select new category!",
          input: "select",
          inputOptions: this.getCategories(),
          inputPlaceholder: "Select category",
          showCancelButton: true,
        })
        .then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            this.prosesChangeCategory(payload, result.value);
          }
        })
        .catch((err) => {
          console.log(err);
          // this.errorHandler(err);
        });
    },

    prosesChangeCategory(payload, newCategoryId) {
      const CategoryId = newCategoryId;
      const OrganizationId = payload.OrganizationId;
      axios({
        url: "tasks/" + payload.id,
        method: "patch",
        data: {
          CategoryId,
          OrganizationId,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.loadOrganizationById();
          const categories = this.getCategories();
          const taskName = data.task.name;
          const category = categories[data.task.CategoryId];
          const message = `Chnge category ${taskName} to ${category}`;
          this.$swal.fire("Deleted!", message, "success");
        })
        .catch((err) => {
          this.errorHandler(err, "Change Category Failed!");
          // console.log(err.response);
        });
    },

    saveUserInfo(user) {
      localStorage.setItem("id", user.id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("fullname", user.fullname);
      localStorage.setItem("access_token", user.access_token);
    },

    errorHandler(err, title) {
      const error = err.response.data;
      let message = "";
      if (Array.isArray(error.message)) {
        message = error.message[0].errors;
      } else {
        message = error.message;
      }
      this.$swal(title, message, "error");
    },
  },
};
</script>

<style>
</style>
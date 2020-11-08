<template>
  <div> 
    <Auth
      v-if="activePage == 'auth-page'"
      @prosesLogin="prosesLogin"
      @prosesRegister="prosesRegister"
      :user="user"
      @googleLogin="googleLogin"
    ></Auth>

    <Home
      v-else-if="activePage == 'home-page'"
      :categories="categories"
      :organizationId="currentOrganizationId"
      :allOrganizations="allOrganizations"
      :members="members"
      :admin="admin"
      @openAddTask="openAddTask"
      @deleteTask="deleteTask"
      @openEditTask="openEditTask"
      @changeCategory="changeCategory"
      @changeOrganization="changeOrganization"
      @createOrganization="createOrganization"
      @createCategory="createCategory"
      @createMember="createMember"
      @logout="logout"
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
import img from "./component/images/ajax-progres.gif";

export default {
  name: "App",
  data() {
    return {
      user: {},
      organization: {},
      categories: [],
      members: [],
      admin: {},
      activePage: "auth-page",
      // Data Modal Add Task
      modalAddTodo: false,
      showModal: false,
      modalName: "",

      //
      currentOrganizationId: "",
      allOrganizations: {},
      payloadAddTask: {},
      payloadEditTask: {},
    };
  },

  created() {
    const access_token = localStorage.getItem("access_token");
    this.verifyToken();
  },

  components: {
    Auth,
    Home,
    Modaladd,
    ModalEdit,
  },

  watch: {
    // whenever question changes, this function will run
    currentOrganizationId() {
      this.loadOrganizationById();
    },
  },

  methods: {
    changeModal(params) {
      this.modalName = params;
    },

    logout() {
      localStorage.clear();
      this.changePage("auth-page");
      this.$gAuth.signOut();
    },

    changePage(page) {
      this.activePage = page;
    },

    changeOrganization(id) {
      this.currentOrganizationId = id;
    },

    openAddTask(payload) {
      this.payloadAddTask = payload;
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
      this.payloadEditTask = payload;
      this.isDisplayModal(true);
      this.changeModal("editTodo");
    },

    isDisplayModal(params) {
      this.showModal = params;
      this.modalName = "";
      this.modalAddTodo = params;
    },

    showLoading() {
      this.$swal.fire({
        title: "Please wait!",
        text: "",
        imageUrl: img,
        imageWidth: 50,
        imageHeight: 50,
        imageAlt: "Custom image",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    },

    verifyToken() {
      this.showLoading();
      axios({
        url: "users/verify",
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.$swal.close();
          const access_token = localStorage.getItem("access_token");
          data.access_token = access_token;
          this.saveUserInfo(data);
          this.afterLogin();
        })
        .catch((err) => {
          this.$swal("Access Denied", "Please, login first!", "error");
          this.changePage("auth-page");
        });
    },

    googleLogin(authCode) {
      this.showLoading();
      axios({
        url: "googlesignin",
        method: "post",
        data: {
          google_access_token: authCode,
        },
      })
        .then(({ data }) => {
          const fullname = data.fullname;
          this.saveUserInfo(data);
          this.$swal({
            title: "Access Granted!",
            text: `Welcome, ${fullname}`,
            icon: "success",
            willClose: () => {
              this.afterLogin();
            },
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    prosesLogin(payload) {
      this.showLoading();
      axios({
        url: "login",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          const fullname = data.fullname;
          this.saveUserInfo(data);
          this.$swal({
            title: "Access Granted!",
            text: `Welcome, ${fullname}`,
            icon: "success",
            willClose: () => {
              this.afterLogin();
            },
          });
        })
        .catch((err) => {
          this.errorHandler(err, "Access Denied!");
        });
    },

    prosesRegister(payload) {
      this.showLoading();
      axios({
        url: "register",
        method: "post",
        data: payload,
      })
        .then(({ data }) => {
          this.user = data;
          this.$swal("Register Succesfully!", "Please login first!", "success");
        })
        .catch((err) => {
          this.errorHandler(err, "Register Failed!");
        });
    },

    afterLogin() {
      this.categories = [];
      this.members = [];
      this.changePage("home-page");
      this.loadUserOrganization();
    },

    loadUserOrganization() {
      const tempOrg = {};
      this.allOrganizations = tempOrg;
      axios({
        url: "users/organizations",
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          if (!this.currentOrganizationId) {
            this.currentOrganizationId = data.Organizations[0].id;
          } else {
            this.loadOrganizationById();
          }
          data.Organizations.forEach((org) => {
            tempOrg[org.id] = org.name;
          });
          this.allOrganizations = tempOrg;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    loadOrganizationById(organizationId = null) {
      // organizations
      organizationId = organizationId || this.currentOrganizationId || -1;
      this.showLoading();
      axios({
        url: "organizations/" + organizationId,
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          const orgUserId = data.organization.UserId;
          this.categories = data.organization.Categories;
          this.members = data.organization.Users;
          this.changeOrganization(organizationId);
          const tempAdmin = this.members.filter(
            (member) => member.id == orgUserId
          );
          this.admin = tempAdmin[0];
          this.$swal.close();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // add task to database
    storeTask(payload) {
      this.showLoading();
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
          this.$swal({
            title: "Add new Task Successfully!",
            text: message,
            icon: "success",
            willClose: () => {
              this.loadOrganizationById();
            },
          });
        })
        .catch((err) => {
          this.errorHandler(err, "Save Task Failed!");
        });
    },

    editTask(payload) {
      this.isDisplayModal(false);
      const { id, CategoryId, OrganizationId, name, description } = payload;
      const update = { CategoryId, OrganizationId, name, description };
      this.showLoading();
      axios({
        url: "tasks/" + id,
        method: "put",
        data: update,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          const message = data.task.name || "";
          this.$swal({
            title: "Edit Task Successfully!",
            text: message,
            icon: "success",
            willClose: () => {
              this.loadOrganizationById();
            },
          });
        })
        .catch((err) => {
          this.errorHandler(err, "Edit Task Failed!");
        });
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
            this.showLoading();
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
                const message =
                  (data.message || "Failed deleted task!") + ` ${taskName}`;
                this.$swal({
                  title: "Deleted!",
                  text: message,
                  icon: "success",
                  willClose: () => {
                    this.loadOrganizationById();
                  },
                });
              })
              .catch((err) => {
                this.errorHandler(err, "Save Task Failed!");
              });
          }
        });
    },

    createOrganization() {
      Swal.fire({
        title: "Type organization name!",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Create",
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          return axios({
            url: "organizations",
            method: "post",
            data: {
              name,
            },
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
            .then(({ data }) => {
              if (data.hasOwnProperty("name")) {
                return data;
              } else {
                throw new Error("Failed created organization");
              }
            })
            .catch((err) => {
              const error = err.response.data;
              let msg = " Somthing error!";
              if (Array.isArray(error.message)) {
                msg = error.message[0].errors;
              }
              const message = Swal.showValidationMessage(
                `Request failed: ${msg}`
              );
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Created!",
            text: "Successfully create organization!",
            icon: "success",
            willClose: () => {
              this.loadUserOrganization();
              this.loadOrganizationById();
            },
          });
        }
      });
    },

    createCategory() {
      let message = "";
      Swal.fire({
        title: "Type new category!",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Create",
        showLoaderOnConfirm: true,
        preConfirm: (name) => {
          return axios({
            url: "categories",
            method: "post",
            data: {
              name,
              OrganizationId: this.currentOrganizationId,
            },

            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
            .then(({ data }) => {
              return data;
            })
            .catch((err) => {
              const error = err.response.data;
              let msg = err.response.data.message || "Somthing error!";
              if (Array.isArray(error.message)) {
                msg = error.message[0].errors;
              }
              const message = Swal.showValidationMessage(
                `Request failed: ${msg}`
              );
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Created!",
            text: "Successfully create new category!",
            icon: "success",
            willClose: () => {
              this.loadOrganizationById();
            },
          });
        }
      });
    },

    createMember() {
      let message = "";
      Swal.fire({
        title: "Type email user!",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Create",
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          return axios({
            url: "organizations/member",
            method: "post",
            data: {
              OrganizationId: this.currentOrganizationId,
              email,
            },
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
            .then(({ data }) => {
              return data;
            })
            .catch((err) => {
              const error = err.response.data;
              let msg = err.response.data.message || "Somthing error!";
              if (Array.isArray(error.message)) {
                msg = error.message[0].errors;
              }
              const message = Swal.showValidationMessage(
                `Request failed: ${msg}`
              );
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            title: "Created!",
            text: "Successfully add new member!",
            icon: "success",
            willClose: () => {
              this.loadOrganizationById();
            },
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
          if (result.isConfirmed) {
            this.prosesChangeCategory(payload, result.value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    prosesChangeCategory(payload, newCategoryId) {
      const CategoryId = newCategoryId;
      const OrganizationId = payload.OrganizationId;
      this.showLoading();
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
          this.$swal.fire(
            "Category Changed!",
            "Succesfully Change Category!",
            "success"
          );
        })
        .catch((err) => {
          this.errorHandler(err, "Change Category Failed!");
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
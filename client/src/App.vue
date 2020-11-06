<template>
  <section>
    <RegisterPage
      v-if="pageName === 'register-page'"
      @showLogin="changePage"
      @register="register"
    ></RegisterPage>
    <LoginPage
      v-else-if="pageName === 'login-page'"
      @showRegister="changePage"
      @login="login"
      @googlelogin="googlelogin"
    ></LoginPage>
    <HomePage
      v-else-if="pageName === 'home-page'"
      :userInfo="loggedInUser"
      :isEditUsername="isEditUsername"
      @showEditUsername="showEditUsername"
      @editUsername="editUsername"
      :organizations="organizations"
      :organizationCount="organizationCount"
      :activeOrgId="activeOrgId"
      @activeOrg="activeOrg"
      :tasks="tasks"
      :members="members"
      @addTask="addTask"
      @deleteTask="deleteTask"
      @editTask="editTask"
      @addCategory="addCategory"
      @editCategory="editCategory"
      @deleteCategory="deleteCategory"
      @logout="logout"
      @editOrganization="editOrganization"
    ></HomePage>
  </section>
</template>

<script>
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      msg: "Hello world",
      pageName: "",
      loggedInUser: null,
      isEditUsername: false,
      organizations: null,
      organizationCount: 0,
      activeOrgId: null,
      tasks: null,
      members: null,
    };
  },
  components: {
    RegisterPage,
    LoginPage,
    HomePage,
  },
  methods: {
    changePage(name) {
      this.pageName = name;
    },
    register(payload) {
      const { first_name, last_name, email, password } = payload;
      axios({
        url: "/register",
        method: "post",
        data: {
          first_name,
          last_name,
          email,
          password,
        },
      })
        .then(({ data }) => {
          this.pageName = "login-page";
          console.log(data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    login(payload) {
      const { email, password } = payload;
      axios({
        url: "/login",
        method: "post",
        data: {
          email,
          password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.pageName = "home-page";
          afterLogin();
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    googlelogin(payload) {
      const { google_access_token } = payload;
      axios({
        url: "/google-login",
        method: "post",
        data: {
          google_access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("access_token", data.access_token);
          this.pageName = "home-page";
          afterLogin();
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    afterLogin() {
      this.pageName = "home-page";
      this.fetchUserProfile();
      this.fetchOrganizationList();
    },
    fetchUserProfile() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: "/user",
        method: "get",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.loggedInUser = data;
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    showEditUsername() {
      this.isEditUsername = true;
    },
    editUsername(payload) {
      const access_token = localStorage.getItem("access_token");
      const { first_name, last_name } = payload;
      axios({
        url: "/user",
        method: "patch",
        headers: {
          access_token,
        },
        data: {
          first_name,
          last_name,
        },
      })
        .then(({ data }) => {
          this.isEditUsername = false;
          this.fetchUserProfile();
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    fetchOrganizationList() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: "/organizations",
        method: "get",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.organizations = data;
          this.organizationCount = data.length;
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    fetchTasksOrganization(OrganizationId) {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks?OrganizationId=${OrganizationId}`,
        method: "get",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    fetchOrganizationMember(OrganizationId) {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/organizations/${OrganizationId}/members`,
        method: "get",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.members = data;
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    activeOrg(payload) {
      this.activeOrgId = payload;
      this.fetchTasksOrganization(payload);
      this.fetchOrganizationMember(payload);
    },
    addTask(payload) {
      const access_token = localStorage.getItem("access_token");
      const { title, OrganizationId, CategoryId } = payload;
      axios({
        url: "/tasks",
        method: "post",
        headers: {
          access_token,
        },
        data: {
          title,
          OrganizationId,
          CategoryId,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(data.OrganizationId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    deleteTask(payload) {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${payload}`,
        method: "delete",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    editTask(payload) {
      const access_token = localStorage.getItem("access_token");
      const { id, title, description, due_date } = payload;
      axios({
        url: `/tasks/${id}`,
        method: "put",
        headers: {
          access_token,
        },
        data: {
          title,
          description,
          due_date,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    addCategory(payload) {
      const { name, OrganizationId } = payload;
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/categories`,
        method: "post",
        headers: {
          access_token,
        },
        data: {
          name,
          OrganizationId,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    editCategory(payload) {
      const { id, name } = payload;
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/categories/${id}`,
        method: "patch",
        headers: {
          access_token,
        },
        data: {
          name,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    deleteCategory(payload) {
      const access_token = localStorage.getItem("access_token");
      const id = payload.id;
      axios({
        url: `/categories/${id}`,
        method: "delete",
        headers: {
          access_token,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    editOrganization(payload) {
      const { id, name, description } = payload;
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/organizations/${id}`,
        method: "put",
        headers: {
          access_token,
        },
        data: {
          name,
          description,
        },
      })
        .then(({ data }) => {
          this.fetchTasksOrganization(this.activeOrgId);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },
    logout() {
      localStorage.removeItem("access_token");
      this.pageName = "login-page";
    },
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      this.afterLogin();
    } else {
      this.pageName = "login-page";
    }
  },
};
</script>

<style>
</style>
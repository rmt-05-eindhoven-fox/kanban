<template>
  <section id="home-page">
    <!-- Navbar -->
    <nav>
      <div id="logo">
        <img id="logo-img" src="/src/assets/neko-kanban.jpg" width="50px" />
        <header id="logo-name">Kanban</header>
      </div>
      <div class="nav-links">
        <ul>
          <li>
            <a @click="signOut" href="#"><GoogleLogin class="btn btn-light" :params="params" :logoutButton="true"
              >Sign Out <i class="fas fa-sign-out-alt"></i></GoogleLogin
            ></a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Main Content -->
    <div class="board-container">
      <Category
        v-for="(category, i) in categories"
        :key="i"
        :category="category.category"
        :tasks="tasks"
        @deleteTask="deleteTask"
        @addTask="addTask"
        @editTask="editTask"
        @updateCategory="updateCategory"
      >
      </Category>
    </div>
  </section>
</template>

<script>
import Category from "./Category.vue";
import GoogleLogin from "vue-google-login";

export default {
  name: "HomePage",
  components: {
    Category,
    GoogleLogin,
  },
  props: ["categories", "tasks"],
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    signOut() {
      localStorage.clear();

      this.$emit("signOut");
    },
    toLoginPage() {
      let payload = {
        pageName: "login-page",
      };
      this.$emit("toLoginPage", payload);
    },
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    updateCategory(payload) {
      this.$emit("updateCategory", payload);
    },
  },
  computed: {},
};
</script>

<style>
</style>
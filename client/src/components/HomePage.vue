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
            <a @click="signOut" href="#"
              >Sign Out <i class="fas fa-sign-out-alt"></i
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
      >
      </Category>
    </div>
  </section>
</template>

<script>
import Category from "./Category.vue";

export default {
  name: "HomePage",
  components: {
    Category,
  },
  props: ["categories", "tasks"],
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    signOut() {
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
      console.log(payload, "<<<payload di homepage vue");
      this.$emit("editTask", payload);
    },
  },
  computed: {},
};
</script>

<style>
</style>
<template>
  <section class="mainPage" style="height: 100vh">
    <div class="containerKanban">
      <div class="containerMenu">
        <div
          class="menulink"
          style="
            display: flex;
            text-decoration: none;
            justify-content: space-around;
          "
        >
          <a href="">
            <i class="fa fa-user sizeIcon"></i>
            <div>{{ namaUser }}</div>
          </a>
        </div>
        <div>
          <a href="" @click.prevent="changePage"
            ><i class="fa fa-plus-square sizeIcon" aria-hidden="true"></i> Add
            Card</a
          >
        </div>
        <div class="menulink">
          <div class="sizeIcon">KANBAN</div>
        </div>
        <div class="menulink">
          <a href="" @click.prevent="signOut"
            ><i class="fa fa-sign-out sizeIcon" aria-hidden="true"></i
          ></a>
        </div>
      </div>
      <div class="content">
        <Categories
          v-for="(category, i) in categories"
          :key="i"
          :category="category"
          :tasks="tasks"
          @changePage="changePage"
          @toUpdateForm="toUpdateForm"
          @deleteTask="deleteTask"
        >
        </Categories>
      </div>
    </div>
  </section>
</template>

<script>
import addPage from "./addPage";
import editPage from "./editPage";
import Categories from "../components/categories";
export default {
  name: "homePage",
  components: {
    addPage,
    editPage,
    Categories,
  },
  props: ["categories", "tasks", "namaUser"],
  methods: {
    changePage() {
      this.$emit("changePage", "addPage");
    },
    toUpdateForm(payload) {
      this.$emit("toUpdateForm", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    signOut() {
      this.$emit("signOut");
    },
  },
};
</script>

<style>
.content {
  display: flex;
}
</style>
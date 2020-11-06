<template>
  <div class="col main-col">
    <div class="topbar">
      <div class="d-flex justify-content-center">
        <h1>{{ organization[0].name }}'s Board</h1>
      </div>
      <div class="navbar-top d-flex">
        <p>BOARD</p>
        <P>SETTINGS</P>
        <i class="fa fa-bell nav-icon dropdown-toggle" data-toggle="dropdown"
          ><span id="notification_count" class="notification-alert"></span
        ></i>
        <div
          id="notification-content"
          class="dropdown-menu dropdown-menu-right"
        ></div>
      </div>
    </div>
    <div class="main-content">
      <div
        v-show="!isShowDetail"
        class="container-fluid scrollable scroll-touch category-content overflow-auto"
      >
        <div class="d-flex">
          <TaskCategory
            v-for="category in organization[0].Categories"
            :key="category.id"
            :category="category"
            :tasks="
              tasks.filter((element) => element.category == category.name)
            "
            @addTask="addTask"
            @deleteTask="deleteTask"
            @showDetail="showDetail"
          ></TaskCategory>
          <div class="card category">
            <div
              class="card-body d-flex flex-column justify-content-center add-cat-card"
            >
              <h3 class="text-center">+ Add Category</h3>
            </div>
          </div>
        </div>
      </div>
      <TaskDetail
        v-show="isShowDetail"
        :task="taskDetail"
        @editTask="editTask"
        @back="hideDetail"
      ></TaskDetail>
    </div>
  </div>
</template>

<script>
import TaskCategory from "./TaskCategory";
import TaskDetail from "./TaskDetail";

export default {
  name: "MainContent",
  props: ["organization", "tasks", "isShowDetail"],
  components: { TaskCategory, TaskDetail },
  data() {
    return {
      taskDetail: null,
    };
  },
  methods: {
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    showDetail(payload) {
      this.taskDetail = payload;
      this.isShowDetail = true;
    },
    editTask(payload) {
      this.isShowDetail = false;
      this.$emit("editTask", payload);
    },
    hideDetail() {
      this.isShowDetail = false;
    },
  },
  computed: {},
};
</script>

<style>
</style>
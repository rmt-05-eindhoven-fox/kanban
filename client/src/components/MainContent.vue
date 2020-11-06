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
            @editCategory="editCategory"
            @deleteCategory="deleteCategory"
          ></TaskCategory>
          <div v-show="isAddCategory" class="card category category-add-form">
            <div class="card-body">
              <div class="card-title">
                <div class="card">
                  <div class="card-body">
                    <textarea
                      v-model="categoryTitle"
                      @keyup.enter.prevent="addCategory"
                      class="form-control"
                      rows="3"
                      placeholder="Enter a category"
                    ></textarea>
                    <div class="row btn-add-group">
                      <div class="col">
                        <button @click="hideAddForm" class="btn btn-close">
                          Cancel
                        </button>
                      </div>
                      <div class="col">
                        <button @click="addCategory" class="btn btn-addTask">
                          Add Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div @click="showAddCategory" class="card category">
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
      isAddCategory: false,
      categoryTitle: "",
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
    showAddCategory() {
      this.isAddCategory = true;
    },
    hideAddForm() {
      this.isAddCategory = false;
    },
    addCategory() {
      this.isAddCategory = false;
      const payload = {
        name: this.categoryTitle,
        OrganizationId: this.organization[0].id,
      };
      this.$emit("addCategory", payload);
      this.categoryTitle = "";
    },
    editCategory(payload) {
      this.$emit("editCategory", payload);
    },
    deleteCategory(payload) {
      this.$emit("deleteCategory", payload);
    },
  },
  computed: {},
};
</script>

<style>
</style>
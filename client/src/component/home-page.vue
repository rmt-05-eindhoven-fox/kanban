<template>
  <!-- Main Content -->
  <section class="content">
    <div class="body_scroll horizontal-scrollable">
      <div class="block-header">
        <div class="row">
          <div class="col-lg-7 col-md-6 col-sm-12">
            <h2>Kanban</h2>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#"><i class="zmdi zmdi-home"></i> Home</a>
              </li>
              <li class="breadcrumb-item active">Taskboard</li>
            </ul>
            <button class="btn btn-primary btn-icon mobile_menu" type="button">
              <i class="zmdi zmdi-sort-amount-desc"></i>
            </button>
          </div>

          <div class="col-lg-5 col-md-6 col-sm-12">
            <!-- right_icon_toggle_btn -->

            <button
              class="btn btn-primary btn-icon float-right"
              type="button"
              @click.prevent="logout"
            >
              <i class="zmdi zmdi-arrow-right"></i>
            </button>

            <button
              class="btn btn-success btn-icon float-right"
              data-backdrop="static"
              data-keyboard="false"
              type="button"
              title="Create new Category"
              @click.prevent="createCategory"
            >
              <i class="zmdi zmdi-reader"></i>
            </button>

            <button
              class="btn btn-warning btn-icon float-right"
              data-backdrop="static"
              data-keyboard="false"
              type="button"
              title="Create new Organization"
              @click.prevent="createOrganization"
            >
              <i class="zmdi zmdi-group-work"></i>
            </button>

            <button
              class="btn btn-info btn-icon float-right"
              data-backdrop="static"
              data-keyboard="false"
              type="button"
              title="Logout"
              @click.prevent="createMember"
            >
              <i class="zmdi zmdi-accounts"></i>
            </button>

            <div class="p-1 col-sm-6 float-right">
              <div class="form-group">
                <select
                  class="form-control input-lg"
                  v-model="currentOrgId"
                  id="myselect"
                >
                  <option
                    v-for="(val, key) in allOrganizations"
                    :key="key"
                    :value="key"
                  >
                    {{ val }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-0 m-0 float-left">
        <span>Admin Organization : {{ adminName }}</span>
      </div>
      <div class="p-0 m-0 float-right">
        <span>Login as : {{ fullname }}</span>
      </div>
      <div class="card">
        <div class="body">
          <div class="user p-0 m-0">
            <a
              v-for="(member, i) in members"
              :href="'#' + member.fullname"
              :key="i"
            >
              <img
                class="p-1"
                src="./images/avatar.png"
                :title="member.fullname"
                alt="avatar"
                width="35vh"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="container-fluid testimonial-group">
        <div class="row flex-nowrap">
          <Category
            v-for="category in categories"
            :key="category.id"
            :dataCategory="category"
            :organizationId="organizationId"
            @openAddTask="openAddTask"
            @deleteTask="deleteTask"
            @openEditTask="openEditTask"
            @changeCategory="changeCategory"
          ></Category>
          <!-- List Category -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "../component/home/category.vue";

export default {
  name: "home-page",
  props: [
    "categories",
    "organizationId",
    "allOrganizations",
    "members",
    "admin",
  ],
  components: {
    Category,
  },
  data() {
    return {
      currentOrgId: "",
      fullname: localStorage.getItem("fullname"),
    };
  },

  // created() { 
  //   this.currentOrgId = this.organizationId;
  // },

  updated() { 
    this.currentOrgId = this.organizationId;
  },

  watch: {
    currentOrgId() {
      this.$emit("changeOrganization", this.currentOrgId);
    }, 
  },
  computed: {
    adminName() {
      let name = this.admin.fullname;
      if (this.admin.id == localStorage.getItem("id")) {
        name += " (yourself)";
      }
      return name;
    },
  },

  methods: {
    openAddTask(payload) {
      this.$emit("openAddTask", payload);
    },

    openEditTask(payload) {
      this.$emit("openEditTask", payload);
    },

    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },

    changeCategory(payload) {
      this.$emit("changeCategory", payload);
    },

    createOrganization() {
      this.$emit("createOrganization", null);
    },

    createCategory() {
      this.$emit("createCategory", null);
    },

    createMember() {
      this.$emit("createMember", null);
    },

    logout() {
      this.$emit("logout", null);
    },
  },
};
</script>

<style>
</style>
<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 sidebar d-flex flex-column">
          <UserProfile
            :userInfo="userInfo"
            :isEditUsername="isEditUsername"
            @showEditUsername="showEditUsername"
            @editUsername="editUsername"
          ></UserProfile>
          <hr />
          <div class="side-navbar d-flex flex-column">
            <OrganizationSidebar
              :organizations="organizations"
              :organizationCount="organizationCount"
              @activeOrg="activeOrg"
              :activeOrgId="activeOrgId"
            ></OrganizationSidebar>
          </div>
          <MemberSidebar v-if="activeOrgId" :members="members"></MemberSidebar>
        </div>
        <MainContent
          v-if="activeOrgId"
          :organization="activeOrgDetail"
          :tasks="tasks"
          :isShowDetail="isShowDetail"
          @addTask="addTask"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @addCategory="addCategory"
          @editCategory="editCategory"
          @deleteCategory="deleteCategory"
        ></MainContent>
        <NoOrganization v-else></NoOrganization>
      </div>
    </div>
  </section>
</template>

<script>
import UserProfile from "./UserProfile";
import OrganizationSidebar from "./OrganizationSidebar";
import MainContent from "./MainContent";
import NoOrganization from "./NoOrganization";
import MemberSidebar from "./MemberSidebar";

export default {
  name: "HomePage",
  components: {
    UserProfile,
    OrganizationSidebar,
    MainContent,
    NoOrganization,
    MemberSidebar,
  },
  data() {
    return {
      isShowDetail: false,
    };
  },
  props: [
    "userInfo",
    "isEditUsername",
    "organizations",
    "organizationCount",
    "activeOrgId",
    "tasks",
    "members",
  ],
  methods: {
    showEditUsername() {
      this.$emit("showEditUsername");
    },
    editUsername(payload) {
      this.$emit("editUsername", payload);
    },
    activeOrg(payload) {
      this.isShowDetail = false;
      this.$emit("activeOrg", payload);
    },
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    addCategory(payload) {
      this.$emit("addCategory", payload);
    },
    editCategory(payload) {
      this.$emit("editCategory", payload);
    },
    deleteCategory(payload) {
      this.$emit("deleteCategory", payload);
    },
  },
  computed: {
    activeOrgDetail() {
      return this.organizations.filter((org) => org.id === this.activeOrgId);
    },
  },
};
</script>

<style>
</style>
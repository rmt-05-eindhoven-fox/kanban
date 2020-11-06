<template>
  <div class="organization-sidebar">
    <div class="d-flex justify-content-between align-self-center">
      <p>
        <span><i class="fa fa-industry"></i></span> Organizations
        <span class="badge badge-secondary">{{ organizationCount }}</span>
      </p>
    </div>
    <div v-show="!isAddOrg" class="organization-list">
      <OrganizationList
        v-for="organization in organizations"
        :key="organization.id"
        :organization="organization"
        @activeOrg="activeOrg"
        :activeOrgId="activeOrgId"
      ></OrganizationList>
    </div>
  </div>
</template>

<script>
import OrganizationList from "./OrganizationList";

export default {
  name: "OrganizationSidebar",
  props: ["organizations", "organizationCount", "activeOrgId"],
  components: { OrganizationList },
  data() {
    return {
      isAddOrg: false,
    };
  },
  methods: {
    activeOrg(payload) {
      this.$emit("activeOrg", payload);
    },
    showAddOrg() {
      this.isAddOrg = true;
    },
  },
};
</script>

<style>
</style>
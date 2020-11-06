<template>
  <div class="organization-sidebar">
    <div class="d-flex justify-content-between align-self-center">
      <p>
        Organizations
        <span class="badge badge-secondary">{{ organizationCount }}</span>
      </p>
      <span><i class="fa fa-plus-circle"></i></span>
    </div>
    <div class="organization-list">
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
  methods: {
    activeOrg(payload) {
      this.$emit("activeOrg", payload);
    },
  },
};
</script>

<style>
</style>
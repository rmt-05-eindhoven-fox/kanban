<template>
  <p
    @click="activeOrg(organization.id)"
    class="organizationList-button"
    :class="isActive"
  >
    >{{ organization.name }}
  </p>
</template>

<script>
export default {
  name: "OrganizationList",
  props: ["organization", "activeOrgId"],
  methods: {
    activeOrg(payload) {
      this.$emit("activeOrg", payload);
    },
  },
  computed: {
    isActive() {
      if (this.organization.id !== this.activeOrgId) {
        return "text-muted";
      }
    },
  },
};
</script>

<style>
</style>
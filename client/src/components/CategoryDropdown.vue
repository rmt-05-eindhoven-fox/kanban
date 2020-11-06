<template>
  <a @click.prevent="updateCategory" class="dropdown-item" href="#">{{
    category.name
  }}</a>
</template>

<script>
export default {
  name: "CategoryDropdown",
  props: ["category", "TaskId"],
  methods: {
    updateCategory() {
      const payload = {
        id: this.TaskId,
        CategoryId: this.category.id,
      };
      this.$emit("updateCategory", payload);
    },
  },
};
</script>

<style>
</style>
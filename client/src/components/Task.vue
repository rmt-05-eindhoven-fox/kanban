<template>
  <div>
    <div
      type="button"
      class="card bg-white mb-2 shadow rounded p-2"
      style="width: 15em; height: 13em; overflow: scroll"
    >
      <div class="btn-group btn-task-menu">
        <button
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          :class="border"
        >
          menu
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button v-on:click="editPage" class="dropdown-item">Edit</button>
          <button v-on:click="deleted" class="dropdown-item">Delete</button>
        </div>
      </div>
      <div>
        <b class="mr-1">{{ el.title }}</b>
      </div>
      <div>
        {{ el.description }} <br />
        <small>By {{ el.UserEmail }}</small>
      </div>
      <div>
        <small class="mr-2">{{ new Date(el.updatedAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {};
  },
  props: ["border", "el"],
  methods: {
    editPage() {
      let payload = {
        pageName: "edit",
        id: this.el.id,
        title: this.el.title,
        description: this.el.description,
        category: this.el.category,
      };
      if (localStorage.getItem("email") == this.el.UserEmail) {
        this.$emit("editPage", payload);
      }
    },
    deleted() {
      this.$emit("deleted", this.el.id);
    },
  },
};
</script>

<style>
</style>
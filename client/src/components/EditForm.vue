<template>
  <div class="edit-task-form">
    <form @submit.prevent="editTask">
      <h4>Edit Task</h4>
      <textarea
        v-model="task.title"
        class="task-title add-title"
        rows="2"
        cols="30"
        placeholder=" Edit title of the task here.."
        style="font-size: 12px"
      ></textarea>
      <label class="edit-task-tag-label" for="task-tag">Tag:</label>
      <input v-model="task.tag" type="text" style="height: 20px" />
      <div class="edit-button-options mt-2">
        <button type="submit" class="edit-btn"><i class="fas fa-check"></i> Edit Task</button>
        <button @click="closeForm" class="cancel-btn">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditForm",
  data() {
    return {
      task: {
        title: "",
        tag: ""
      },
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    editTask() {
      let payload = {
        title: this.task.title,
        tag: this.task.tag
      };
      console.log(payload, "masuk ke edittask di editform vue")
      this.$emit("editTask", payload);
      this.clearForm();
      this.closeForm();
    },
    clearForm() {
      this.task.title = "";
    },
  },
};
</script>

<style>
</style>
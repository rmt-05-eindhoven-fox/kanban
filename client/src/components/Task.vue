<template>
  <div>
    <!--Start Task Item -->
    <div class="task-item">
      <h5 class="task-title">{{ task.title }}</h5>
      <p class="task-tag">{{ task.tag }}</p>
      <p class="task-creator">By: {{ task.User.name }}</p>
      <p class="task-time">
        Time: {{ task.createdAt.slice(0, 10) }}
        {{ task.createdAt.split("T")[1].slice(0, 8) }}
      </p>
      <div class="task-button-options">
        <a @click.prevent="showEditForm" href="" class="edit-task"
          ><svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-pencil-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
            /></svg
        ></a>
        <a @click="deleteTask" href="#" class="delete-task"
          ><svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
            /></svg
        ></a>
      </div>
    </div>
    <!--End Task Item -->

    <!--Edit Task Form -->
    <div v-if="showForm" class="edit-task-form">
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
          <button type="submit" class="edit-btn">
            <i class="fas fa-check"></i> Edit Task
          </button>
          <button @click="closeForm" class="cancel-btn">
            <i class="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
    <!--End Edit Task Form -->
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      showForm: false
    }
  },
  methods: {
    deleteTask() {
      let payload = {
        id: this.task.id,
        title: this.task.title,
        category: this.task.category,
      };
      this.$emit("deleteTask", payload);
    },
    showEditForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    editTask() {
      let payload = {
        id: this.task.id,
        title: this.task.title,
        tag: this.task.tag
      };
      this.$emit("editTask", payload);
      this.clearForm();
      this.closeForm();
    },
    clearForm() {
      this.task.title = "";
    }
  }
};
</script>

<style>
.task-title {
  font-size: 14px;
  margin-top: 6px;
}

.task-tag {
  font-size: 10px;
  margin-left: 20px;
  margin-top: px;
  text-align: center;
  padding: 1px;
  width: 20%;
  background-color: #ffe05d;
  border-radius: 0.35em;
}

.task-title,
.task-creator,
.task-time {
  margin-left: 16px;
  margin-right: 10px;
}
.task-creator,
.task-time {
  font-size: 9px;
  color: grey;
  margin-top: -5px;
}
</style>
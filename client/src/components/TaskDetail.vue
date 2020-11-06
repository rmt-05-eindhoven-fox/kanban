<template>
  <section>
    <div class="card">
      <div class="card-body">
        <div class="back-button">
          <button @click="back">back</button>
        </div>
        <div class="row">
          <div class="col-8">
            <h1 v-show="!isEditTitle" class="task-title">
              {{ task.title }}
              <span @click="titleClick"
                ><i class="fa fa-pencil edit-username"></i
              ></span>
            </h1>
            <input
              v-model="task.title"
              v-show="isEditTitle"
              type="text"
              class="edit-title-form"
              @keyup.enter="titleClick"
            />
            <p class="text-muted">
              Last updated: {{ task.updatedAt }}, By: {{ task.user.name }}
            </p>
            <div class="row edit-bottom">
              <div class="col">
                <h3>Descriptions</h3>
                <div
                  v-show="!isEditDescription"
                  @click.prevent="descriptionClick"
                  class="card"
                >
                  <div class="card-body">
                    {{ task.description }}
                  </div>
                </div>
                <div v-show="isEditDescription">
                  <textarea
                    v-model="task.description"
                    class="form-control"
                    rows="5"
                    placeholder="Add a more detailed description"
                  ></textarea>
                  <button @click="descriptionClick">Edit description</button>
                </div>
              </div>
              <div class="col">
                <!-- <h3>Due Date</h3>
                <input v-model="this.task.due_date" type="date" /> -->
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="assignee-side">
              <h3>Assignee</h3>
              <AssigneeAvatar
                v-for="assignee in task.assignees"
                :key="assignee.id"
                :user="assignee"
              ></AssigneeAvatar>
              <button><i class="fa fa-user-plus"></i></button>
            </div>

            <h3>Labels</h3>
          </div>
        </div>
        <div class="row btn-group-edit">
          <div class="col-4"></div>
          <div class="col-4">
            <div class="row">
              <div class="col">
                <button @click="back" class="btn btn-close">Cancel</button>
              </div>
              <div class="col">
                <button @click="editTask" class="btn btn-addTask">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AssigneeAvatar from "./AssigneeAvatar";

export default {
  name: "TaskDetail",
  props: ["task"],
  components: { AssigneeAvatar },
  data() {
    return {
      isEditTitle: false,
      isEditDescription: false,
    };
  },
  methods: {
    titleClick() {
      this.isEditTitle = !this.isEditTitle;
    },
    descriptionClick() {
      this.isEditDescription = !this.isEditDescription;
    },
    editTask() {
      const payload = {
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        due_date: this.task.due_date,
      };
      this.$emit("editTask", payload);
    },
    back() {
      this.$emit("back");
    },
  },
  computed: {
    formatDate() {
      if (this.task.due_date) {
        let date = new Date(this.task.due_date);
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        const year = date.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }
    },
  },
};
</script>

<style>
</style>
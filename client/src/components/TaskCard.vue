<template>
  <section>
    <div class="card card-task">
      <div class="card-body">
        <div class="card-label d-flex">
          <TaskTags
            v-for="tag in taskDetail.tags"
            :key="tag.id"
            :tag="tag"
          ></TaskTags>
        </div>
        <div class="d-flex justify-content-between task-title">
          <h5>{{ taskDetail.title }}</h5>
          <div class="btn-group">
            <button
              class="btn option-btn"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu">
              <a @click="showDetail" class="dropdown-item" href="#">Detail</a>
              <a @click.prevent="deleteTask" class="dropdown-item" href="#"
                >Delete</a
              >
            </div>
          </div>
        </div>
        <div class="due_date">
          <p v-show="getDueDate">
            <i class="far fa-clock"></i> {{ getDueDate }}
          </p>
        </div>
        <div class="assignee-avatar">
          <div class="member-list d-flex flex-wrap">
            <AssigneeAvatar :user="taskDetail.user"></AssigneeAvatar>
            <AssigneeAvatar
              v-for="assignee in taskDetail.assignees"
              :key="assignee.id"
              :user="assignee"
            ></AssigneeAvatar>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AssigneeAvatar from "./AssigneeAvatar";
import TaskTags from "./TaskTags";

export default {
  name: "TaskCard",
  props: ["taskDetail"],
  components: { AssigneeAvatar, TaskTags },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    deleteTask() {
      const payload = this.taskDetail.id;
      this.$emit("deleteTask", payload);
    },
    showDetail() {
      const payload = this.taskDetail;
      this.$emit("showDetail", payload);
    },
  },
  computed: {
    getDueDate() {
      if (this.taskDetail.due_date) {
        let date = new Date(this.taskDetail.due_date);

        return date.toDateString();
      }
    },
  },
};
</script>

<style>
</style>
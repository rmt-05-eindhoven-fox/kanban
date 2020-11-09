<template>
  <li class="dd-item" data-id="1">
    <div class="dd-handle d-flex justify-content-between align-items-center">
      <div class="h6 mb-0" title="Task name">{{ task.name }}</div>
      <div class="action">
        <div class="btn-group">
          <button
            class="btn btn-info btn-outline-primary btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            More
          </button>
          <div class="dropdown-menu">
            <a
              class="dropdown-item p-2"
              href="javascript:void(0);"
              @click.prevent="changeCategory"
              >Change Category</a
            >
            <a
              class="dropdown-item p-2"
              href="javascript:void(0);"
              @click.prevent="openEditTask()"
              >Edit</a
            >
            <div role="separator" class="dropdown-divider"></div>
            <a
              class="dropdown-item p-2"
              href="javascript:void(0);"
              @click.prevent="deleteTask()"
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="dd-content p-15">
      <p title="Description of task">
        {{ task.description }}
      </p>
      <ul class="list-unstyled d-flex bd-default align-items-center">
        <li class="mr-2 flex-grow-1 bd-default">
          <span class="badge badge-primary" title="Created At"
            ><i class="zmdi zmdi-time"></i> {{ formatDate(task.createdAt) }}
          </span>
        </li>
        <li class="ml-3 bd-highlight">
          <ul class="list-unstyled team-info margin-0">
            <li>
              <img
                src="../images/profile.png"
                alt="Avatar"
                :title="task.User.fullname"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "task",
  props: ["task"],
  methods: {
    getPayload() {
      const payload = {
        id: this.task.id,
        name: this.task.name,
        description: this.task.description,
        CategoryId: this.task.CategoryId,
        OrganizationId: this.task.OrganizationId,
        fullname: this.task.User.fullname,
        UserId: this.task.UserId,
      };
      return payload;
    },

    deleteTask() {
      const idStorange = localStorage.getItem("id");
      if (idStorange != this.task.UserId) {
        this.$swal("Delete Failed!", "This task is not yours!", "error");
      } else {
        this.$emit("deleteTask", this.getPayload());
      }
    },

    openEditTask() {
      const idStorange = localStorage.getItem("id");
      if (idStorange != this.task.UserId) {
        this.$swal("Edit Failed!", "This task is not yours!", "error");
      } else {
        this.$emit("openEditTask", this.getPayload());
      }
    },

    changeCategory() {
      this.$emit("changeCategory", this.getPayload());
    },

    formatDate(date) {
      const bulan = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const newDate = new Date(date);
      return `${newDate.getDate()} ${
        bulan[newDate.getMonth()]
      } ${newDate.getFullYear()}`;
    },
  },
};
</script>

<style>
</style>
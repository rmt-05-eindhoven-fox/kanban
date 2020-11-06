<template>
  <div class="card card-task-content">
    <div class="card-body">
      <div class="card-title">
        <h5>{{ task.title }}</h5>
        <div class="dropdown">
          <a
            class="dropdown-toggle"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <a class="dropdown-item" type="button" @click="showEditCategory()"
              >Move to...</a
            >
            <a class="dropdown-item" type="button" @click="showEditPage()"
              >Edit</a
            >
            <a
              class="dropdown-item"
              type="button"
              style="color: #fa2d2d"
              @click="deleteTask()"
              >Delete</a
            >
          </div>
        </div>
      </div>
      <form v-show="isShow" class="mb-2" @submit.prevent="editTask">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Edit Task</label>
          <input
            v-model="editData"
            class="form-control"
            id="exampleFormControlTextarea1"
            autocomplete="off"
            name="EditTitle"
            required
          />
        </div>
        <div class="d-flex justify-content-end ml-2">
          <button class="btn btn-success mr-2" type="submit">Edit</button>
          <button class="btn btn-danger" type="button" @click="closeEditPage()">
            Cancel
          </button>
        </div>
      </form>
      <form v-show="catShow" @submit.prevent="editCategory">
      <select class="custom-select custom-select-sm mb-3" v-model="newCategory">
        <option selected disabled>Move to...</option>
        <option value="Backlog">Backlog</option>
        <option value="Todo">Todo</option>
        <option value="On Going">On Going</option>
        <option value="Completed">Completed</option>
      </select>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary btn-sm mr-2">Move</button>
        <button @click="closeCategory" class="btn btn-dark btn-sm">Cancel</button>
      </div>
      </form>
      <div class="card-text text-muted author">Post No {{ task.id }}, by {{task.taskOwner}}</div>
      <div class="card-text text-muted date">
        Posted At {{ new Date(task.createdAt).toISOString().split("T")[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryItem",
  props: ["task"],
  data() {
    return {
      isShow: false,
      catShow: false,
      editData: "",
      newCategory: ""
    };
  },
  methods: {
    showEditPage() {
      this.isShow = true;
      this.editData = this.task.title;
    },
    showEditCategory() {
      this.catShow = true
    },
    closeEditPage() {
      (this.isShow = false), (this.editData = "");
    },
    closeCategory() {
      this.catShow = false;
    },
    editTask() {
      let payload = {
        id: this.task.id,
        title: this.editData,
        category: this.task.category,
      };
      this.$emit("editTask", payload);
      this.isShow = false;
    },
    editCategory(){
      let payload = {
        id: this.task.id,
        category: this.newCategory
      }
      this.$emit('editCategory', payload)
    },
    deleteTask() {
      let payload = {
        id: this.task.id,
      };
      this.$emit("deleteTask", payload);
    },
  },
};
</script>

<style>
</style>
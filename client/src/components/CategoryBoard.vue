<template>
  <div class="col-md-6 col-lg-3 mb-3">
    <div class="card-header">
      <h3>{{ nameCategories.category }}</h3>
      <button @click="createTaskForm()" class="btn btn-add-task">
        <i class="fa fa-plus-square"></i>
      </button>
    </div>
    <div class="card card-backlog" id="scroll-custom">
        <!-- TASK CONTENT -->
      <div class="card-body">
        <form class="mb-3" @submit.prevent="" action="" v-show="isShow">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Add new task</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Write your task"
              style="resize: none"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button @click="closeForm()" type="submit" class="btn btn-dark">
            Cancel
          </button>
        </form>
        <CategoryItem
        v-for="task in taskPerCategory" :key="task.id"
        :task="task"
        ></CategoryItem>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
export default {
  name: "CategoryBoard",
  props: ["nameCategories", "tasks"],
  computed: {
    taskPerCategory() {
      return this.tasks.filter(task => task.category == this.nameCategories.category)
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    createTaskForm() {
      this.isShow = true;
    },

    closeForm() {
      this.isShow = false;
    },
  },
  components: {
    CategoryItem,
  },
};
</script>

<style>
</style>
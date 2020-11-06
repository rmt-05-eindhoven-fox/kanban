<template>
  <div class="col-md-6 col-lg-3 mb-3">
    <div class="card-header">
      <h3>{{ nameCategories.category }}</h3>
      <button @click="showTaskForm()" class="btn btn-add-task">
        <i class="fa fa-plus-square"></i>
      </button>
    </div>
    <div class="card card-backlog" id="scroll-custom">
        <!-- TASK CONTENT -->
      <div class="card-body">
        <form class="mb-3" @submit.prevent="postTask" action="" v-show="isShow">
          <div class="form-group">
            <label for="input-title">Add new task</label>
            <select class="w-50" name="category" id="category-id" v-model="selectedCategory">
              <option :value="nameCategories.category" selected>{{nameCategories.category}}</option>
            </select>
            <input
              v-model="inputTitle"
              type="text"
              class="form-control"
              id="input-title"
              name="input-title"
              placeholder="Write your task"
              autocomplete="off"
              required
            />
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
          <button @click="closeForm()" type="submit" class="btn btn-danger">
            Cancel
          </button>
          <!-- FORM EDIT -->
        </form>
        <CategoryItem
        v-for="task in taskPerCategory" :key="task.id"
        :task="task"
        @editTask="editTask"
        @editCategory="editCategory"
        @deleteTask="deleteTask"
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
      inputTitle: '',
      selectedCategory: ''
    };
  },
  methods: {
    showTaskForm() {
      this.isShow = true;
      this.inputTitle = '';
    },

    closeForm() {
      this.isShow = false;
      this.inputTitle = ''
    },
    postTask() {
      let inputData = {
        inputTitle: this.inputTitle,
        selectedCategory: this.selectedCategory
      }
      console.log(inputData);
      this.$emit('postTask', inputData)
      this.inputTitle = ''
      this.isShow = false
    },
    editTask(payload){
      this.$emit('editTask', payload)
    },
    editCategory(payload){
      this.$emit('editCategory', payload)
    },
    deleteTask(payload){
      this.$emit('deleteTask', payload)
    }
  },
  components: {
    CategoryItem,
  },
};
</script>

<style>
</style>
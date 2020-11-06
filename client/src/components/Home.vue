<template>
  <div v-if="pageName == 'Home' " class="w-screen">
        
        <!--Header-->
        <nav class="flex p-4 bg-blue-500">
            <div class="flex-grow mr-3 bg-green-500 p-2">Logo</div>
            <div class="flex-grow-0 mr-3 bg-red-500 flex-row p-2">Home</div>
            <button @click="logout()" class="flex-grow-0 bg-red-500 flex-row hover:bg-red-600 p-2">Logout</button>
        </nav>
        <!--Main-->
        <div class="flex mt-3 overflow-x-auto h-screen w-screen position-relative">
            <!--Each Category-->
            <div v-for="(category, i) in categories" :key="i" class="pl-2">
                <Category 
                    @postCard="addCard" 
                    @deleteCategory="deleteCategory" 
                    @deleteTask="deleteTask"
                    @moveCategory="moveCategory"
                    @changeCategoryTitle="changeCategoryTitle"
                    @changeTaskTitle="changeTaskTitle"
                    :categories="categories"
                    :category="category" 
                    :tasks="tasks">
                </Category>
            </div>
            <div class="flex w-64 pr-6">
            <button v-show="!isShowAddCategory" @click="showAddCategory()" class="bg-blue-300 h-8 w-64 pl-5 pr-5 hover:bg-blue-500 rounded shadow-md">
                + Add Category
            </button>
            <div v-show="isShowAddCategory" class="flex-col ">
                <form @submit.prevent="postCategory()" class="flex-col">
                    <div>
                    <input v-model="newCategory" type="text" class="m-auto h-10 rounded-sm bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Enter a title for this category">
                    </div>
                    <div class="w-auto bg-blue-400 rounded hover:bg-blue-500">
                    <button type="submit" >Add Category</button>
                    </div>
                </form>
                <div class="w-auto bg-red-400 rounded hover:bg-red-500">
                <button @click="closeAddCategory">Cancel</button>
                </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
import Category from "./Category"
export default {
  name: "Home",
  data() {
      return {
          newCategory: "",
          isShowAddCategory: false
      }
  },
  components: {
      Category
  },
  methods: {
      logout() {
          this.$emit("logout", "Login")
      },
      addCard(value) {
          this.$emit("addTask", value)
      },
      postCategory() {
          const payload = { 
              title: this.newCategory
          }
          this.$emit("addCategory", payload)
          this.isShowAddCategory = false
          this.newCategory = ""
      },
      showAddCategory() {
          this.isShowAddCategory = true
      },
      closeAddCategory() {
        this.newCategory = ""
        this.isShowAddCategory = false
      },
      deleteCategory(value){
          this.$emit("deleteCategory", value)
      },
      deleteTask(value) {
          this.$emit("deleteTask", value)
      },
      moveCategory(value) {
          this.$emit("moveCategory", value)
      },
      changeCategoryTitle(value) {
          this.$emit("changeCategoryTitle", value)
      },
      changeTaskTitle(value) {
          this.$emit("changeTaskTitle", value)
      }
  },
  props: ['pageName', 'tasks', 'categories']
}
</script>

<style>

</style>
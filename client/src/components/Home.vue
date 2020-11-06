<template>
  <div v-if="pageName == 'Home'">
        
        <!--Header-->
        <nav class="flex p-4 bg-blue-500">
            <div class="flex-grow mr-3 bg-green-500">Logo</div>
            <div class="flex-grow-0 mr-3 bg-red-500 flex-row">Home</div>
            <div @click="logout()" class="flex-grow-0 bg-red-500 flex-row">Logout</div>
        </nav>
        <!--Main-->
        <div class="flex flex-row mt-3 overflow-scroll overscroll-contain">
            <!--Each Category-->
            <div v-for="(category, i) in categories" :key="i">
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
            <button v-show="!isShowAddCategory" @click="showAddCategory()" class="bg-blue-100 h-full w-auto pl-5 pr-5">
                + Add Category
            </button>
            <div v-show="isShowAddCategory" class="flex-col">
                <form @submit.prevent="postCategory()" class="flex-col">
                    <div>
                    <input v-model="newCategory" type="text" class="m-auto rounded-sm mb-3 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Enter a title for this category">
                    </div>
                    <div>
                    <button type="submit">Add Category</button>
                    </div>
                </form>
                <button @click="closeAddCategory()">Cancel</button>
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
          console.log(`ini di home`)
          console.log(value)
          this.$emit("changeTaskTitle", value)
      }
  },
  props: ['pageName', 'tasks', 'categories']
}
</script>

<style>

</style>
<template>
    <div class="flex-col h-auto w-64 mx-3 px-0 border border-gray-400 rounded-md shadow-md">
        <div id="category-title" class="container w-full flex flex-row">
            <form @submit.prevent="changeCategoryTitle" class="w-full">
                <input 
                    type="text" 
                    class="w-full
                            cursor-pointer 
                            rounded-sm 
                            px-2 
                            bg-gray-200 
                            hover:bg-gray-500 
                            focus:outline-none 
                            focus:bg-white 
                            focus:shadow-outline 
                            focus:border-gray-300" 
                    v-model="CategoryTitle">
            </form>
            <button @click="deleteCategory()" class="px-2">
                x
            </button>
        </div>

        <!--Task Container -->
        <div class="mt-3 overflow-auto position-relative" id="TaskContainer">
        <div v-for="(task, i) in tasks" :key="i"  >
            <div v-if="task.CategoryId == category.id">
                <Task 
                    @deleteTask="deleteTask"
                    @moveCategory="moveCategory"
                    @changeTaskTitle="changeTaskTitle"
                    :categories="categories"
                    :task="task" 
                    :category="category">
                </Task>
            </div>
        </div>
        </div>

        <button v-show="!isShowAddCard" @click="showAddCard()" id="add-card" class="bg-blue-100 h-8 w-full hover:bg-blue-300">
            Add Card
        </button>
        <div v-show="isShowAddCard" id="add-card-form">
            <form @submit.prevent="postCard()">
                <input v-model="newCard" type="text" class="m-auto h-auto w-full rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Enter a title for this card">
                <div class="flex flex-row">
                <button type="submit" class="w-full bg-green-500">Add card</button>
                </div>
            </form>
            <button @click="closeAddCard" class="w-full bg-red-500">Cancel</button>
        </div>
    </div>
</template>

<script>
import Task from "./Task"
export default {
  name: "Category",
  data() {
      return {
          isShowAddCard: false,
          newCard: "",
          CategoryTitle: this.category.title
      }
  },
  methods: {
      showAddCard() {
          this.isShowAddCard = true
      },
      closeAddCard() {
          this.newCard = ""
          this.isShowAddCard = false
      },
      postCard() {
          const payload = {
              title: this.newCard,
              CategoryId: this.category.id,
          }
          this.$emit("postCard", payload)
          this.newCard = ""
          this.isShowAddCard = false
      },
      deleteCategory() {
          const payload = {
              CategoryId: this.category.id
          }
          this.$emit("deleteCategory", payload)
      },
      deleteTask(value) {
          this.$emit("deleteTask", value)
      },
      moveCategory(value) {
          this.$emit("moveCategory", value)
      },
      changeCategoryTitle() {
          const payload = {
              id: this.category.id,
              title: this.CategoryTitle
          }
          this.$emit("changeCategoryTitle", payload)
      },
      changeTaskTitle(value) {
          this.$emit("changeTaskTitle", value)
      }
  },
  components: {
    Task
  },
  props: ['tasks', 'category', 'categories']
}
</script>

<style>
    #TaskContainer {
        max-height: 30rem;
    }
</style>
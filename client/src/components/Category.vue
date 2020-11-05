<template>
    <div class="flex-col h-auto w-auto mx-3 px-0 border border-gray-600">
        <div id="category-title" class="container w-full flex flex-row">
            <form @submit.prevent="changeCategoryTitle()" class="w-full">
                <input 
                    type="text" 
                    class="w-full 
                            cursor-pointer 
                            rounded-sm 
                            px-2 
                            bg-gray-200 
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
        <div v-for="(task, i) in tasks" :key="i"  >
            <div v-if="task.CategoryId == category.id">
                <Task 
                    @deleteTask="deleteTask"
                    @moveCategory="moveCategory"
                    :categories="categories"
                    :task="task" 
                    :category="category">
                </Task>
            </div>
        </div>

        <button v-show="!isShowAddCard" @click="showAddCard()" id="add-card" class="bg-blue-100 h-8 w-full">
            Add Card
        </button>
        <div v-show="isShowAddCard" id="add-card-form">
            <form @submit.prevent="postCard()">
                <input v-model="newCard" type="text" class="m-auto rounded-sm mb-3 p-2 bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300" placeholder="Enter a title for this card">
                <button type="submit">Add card</button>
            </form>
            <button @click="closeAddCard()">Cancel</button>
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
      }
  },
  components: {
    Task
  },
  props: ['tasks', 'category', 'categories']
}
</script>

<style>

</style>
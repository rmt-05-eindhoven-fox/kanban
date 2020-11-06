<template>
    <div class="h-auto bg-yellow-500 h-20 border border-gray-300 flex flex-col">
        <div class="bg-blue-500">
            <!-- <button v-show="!edit" @click.prevent="showEdit" class="flex-wrap w-auto :hover-pointer">{{TaskTitle}}</button> -->
            <form @submit.prevent="changeTaskTitle">
                <input 
                    type="text-area" 
                    class="
                        whitespace-normal
                        pl-2 
                        h-20
                        min-h-full
                        w-full
                        cursor-pointer 
                        bg-blue-500
                        hover:bg-blue-600
                        focus:outline-none 
                        focus:bg-white 
                        focus:shadow-outline 
                        focus:border-gray-300" 
                    v-model="TaskTitle">
            </form>
        </div>
        <div class="flex flex-col">
            <!--Move button-->
            <button 
                v-show="!move" 
                @click="showMove()" 
                class="px-2 bg-green-500 hover:bg-green-600"
            >
                Move
            </button>
            <div v-show="move" class="h-auto">
                <form @submit.prevent="changeCategory()">
                    <select v-model="moveCategory" class="w-full">
                        <option 
                            v-for="(category, i) in categories" 
                            :key="i" 
                            :value="category.id"
                        >
                            {{ category.title }}
                        </option>
                    </select>
                    <button type="submit" class="w-full bg-green-500 hover:bg-green-600">
                        Move
                    </button>
                </form>
                <button 
                    @click.prevent="cancelMove()" 
                    class="bg-blue-500 w-full hover:bg-blue-600"
                >
                        Cancel
                </button>
            </div>

            <!--Delete button-->
            <button @click="deleteTask()" class="px-2 bg-red-500 hover:bg-red-600">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: "Task",
  data() {
      return {
          moveCategory: "",
          move: false,
          edit: false,
          TaskTitle: this.task.title
      }
  },
  methods: {
      deleteTask() {
          const payload = {
              TaskId: this.task.id
          }
          this.$emit("deleteTask", payload)
      },
      showMove() {
          this.move = true
      },
      cancelMove() {
          this.moveCategory = ""
          this.move = false
      },
      showEdit() {
          this.edit = true
      },
      cancelEdit() {
          this.TaskTitle = this.task.title
          this.edit = false
      },
      changeCategory() {
          const payload = {
              CategoryId: this.moveCategory,
              TaskId: this.task.id
          }
          this.$emit("moveCategory", payload)
      },
      changeTaskTitle() {
          const payload = {
              id: this.task.id,
              title: this.TaskTitle
          }
          this.$emit("changeTaskTitle", payload)
      }
  },
  props: ['task', 'category', 'categories']
}
</script>

<style>

</style>
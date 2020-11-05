<template>
    <div class="h-auto bg-red-500 h-20 border border-gray-300 flex flex-col">
        <div class="bg-blue-500 py-5">
            <p>{{task.title}}</p>
        </div>
        <div class="flex flex-col">
            <!--Move button-->
            <button 
                v-show="!move" 
                @click="showMove()" 
                class="px-2"
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
                    <button type="submit" class="w-1/2 bg-green-500">
                        Move
                    </button>
                </form>
                <button 
                    @click.prevent="cancelMove()" 
                    class="bg-blue-500 w-1/2"
                >
                        Cancel
                </button>
            </div>

            <!--Delete button-->
            <button @click="deleteTask()" class="px-2">
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
          move: false
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
      changeCategory() {
          const payload = {
              CategoryId: this.moveCategory,
              TaskId: this.task.id
          }
          this.$emit("moveCategory", payload)
      }
  },
  props: ['task', 'category', 'categories']
}
</script>

<style>

</style>
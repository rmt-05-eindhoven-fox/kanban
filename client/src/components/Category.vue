<template>
  <div class="col-lg-3 col-sm-6 col-12 mt-5">
    <div class="bg-light shadow p-3">
      <h3>{{category.category}}</h3>
      <draggable :list="taskCategory" group="task" :move="onMove" :category="category" @end="updateCategory">
      <Task @deleteTask="deleteTask" :task="task" v-for="task in taskCategory" :key="task.id" :id="task.id" ></Task>
      </draggable>
    </div>
  </div>
</template>

<script>
import Task from './Task'
import draggable from "vuedraggable"
import axios from "axios"
export default {
  name:"Category",
  props:["task","category"],
  components:{
    Task,
    draggable
  },
  data(){
    return{
      currentId:null,
      currentCategory:null
    }
  },
  computed:{
    taskCategory(){
      return this.task.filter(task => task.category === this.category.category)
    }
  },
  methods:{
    updateCategory(){
      const payload = {
        id: this.currentId,
        category:this.currentCategory
      }
      this.$emit("updateCategory", payload)
    },
    deleteTask(payload){
      console.log(payload)
      this.$emit("deleteTask",payload)
    },
    onMove(event){
      this.currentId = event.draggedContext.element.id
      this.currentCategory = event.relatedContext.component.$attrs.category.category
      // console.log(event.draggedContext.element.id)
      // console.log(event.relatedContext.component.$attrs.category.category);
    }
  }
};
</script>

<style>
</style>
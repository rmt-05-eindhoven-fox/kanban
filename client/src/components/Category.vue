<template>

<div 
  @drop="onDrop($event, categoryDetail.id)"
  @dragenter.prevent 
  @dragover.prevent 
  class = "kanban-card-container">    <!-- Card Container start -->

  <h3 style="text-align:center;">{{ categoryDetail.name }}</h3>  <!-- Board Title -->

  <div class = "kanban-card-all">
    <Task 
      v-for="task in taskFilter"
      :key="task.id"
      :taskDetail="task"
      @editTask="editTask"
      @deleteTask='deleteTask'

      ></Task>

  </div>

  <div class = "kanban-add-task mt-3">

    <button 
      v-if = "!showAddTask"
      @click.prevent="toggleShowAddTask"
      type="button" 
      class="btn btn-outline-primary">＋  Add Task</button>

    <div 
      v-else
      class="kanban-card-edit">
      <textarea 
        v-model="newTask"
        class="form-control" 
        rows="3"></textarea>

      <div class="kanban-card-edit-btns w-100">
      <div class="btn-group w-100" role="group" aria-label="Basic example">

        <button 
          @click.prevent = "cancelAddTask"
          type="button" 
          class="btn btn-outline-danger btn-sm mt-2"
          style ="align-self: flex-end; width:100px"
        >Cancel</button>

        <button 
          @click.prevent = "addTask"
          type="button" 
          class="btn btn-outline-success btn-sm mt-2"
          style ="align-self: flex-end; width:100px"
        >Add Task</button>
      </div>
      </div>


    </div>


  </div>

</template>

<script>
import Task from './Task.vue'
export default {
  name : 'Category',
  data(){
    return {
      showAddTask : false,
      newTask : '',
    }
  },
  components : {
    Task
  },
  computed : {
    taskFilter(){
      return this.tasks.filter( el => el.CategoryId === this.categoryDetail.id)
    }
  },
  methods : {
    toggleShowAddTask(){
      if(this.showAddTask){
        this.showAddTask = false
      } else {
        this.showAddTask = true
      }
    },
    addTask(){
      this.toggleShowAddTask()
      let payload = {
        description : this.newTask,
        CategoryId : this.categoryDetail.id
      }
      
      this.$emit('addTask', payload)
      this.newTask = ''
    },
    
    cancelAddTask(){
      this.newTask = ''
      this.toggleShowAddTask()
    },
    
    editTask(payload){
      this.$emit('editTask', payload)
    },
    deleteTask(payload){
      this.$emit('deleteTask', payload)
    },
    onDrop (evt, categoryId) {
      const taskId = +evt.dataTransfer.getData('TaskId')
      const taskCatId = +evt.dataTransfer.getData('TaskCategoryId')
      if(taskCatId !== categoryId){

        const payload = {
          taskId,
          CategoryId : categoryId
        }
        this.$emit('changeTaskCategory', payload)
      }
    },
    dragging(event){
      console.log('dragging this')
    },
  },
  props : [ 'categoryDetail', 'tasks' ]
}
</script>

<style>
</style>
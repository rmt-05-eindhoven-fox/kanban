<template>
  <div>
    <Navbar
      @userLogout="userLogout"></Navbar>
    <div class = "container kanban-content">
      <Category
        v-for="category in categories"
        :key = "category.id"
        :categoryDetail="category"
        :tasks="tasks"
        @addTask='addTask'
        @editTask='editTask'
        @deleteTask='deleteTask'
        @changeTaskCategory='changeTaskCategory'
        @drop="onDrop($event,category.id)"
        @dragenter.prevent
        @dragover.prevent
        ></Category>  
    </div> 

  </div>

</template>

<script>
import Category from './Category.vue'
import Navbar from './Navbar.vue'

export default {
  name : 'HomePage',
  data(){
    return {
      message : 'Hello from Home'
    }
  },
  methods : {
    addTask(payload){
      console.log('add task from Homepage')
      this.$emit('addTask', payload)
    },
    userLogout(){
      this.$emit('userLogout')
    },
    editTask(payload){
      // console.log(payload, '<< from Homepage')
      this.$emit('editTask', payload)
    },

    deleteTask(payload){
      this.$emit('deleteTask', payload)
    },

    // onDrop (evt, catId) {
    //   const CategoryId = evt.dataTransfer.getData('CategoryId')
    //   console.log(catId)
    //   console.log(CategoryId)
    //   const item = this.items.find(item => item.id == itemID)
    //   item.list = list
    // },

    changeTaskCategory(payload){

      this.$emit('changeTaskCategory', payload)
    }


  },
  props : [ 'categories', 'tasks' ],

  components : {
    Category, Navbar
  }
}
</script>

<style>

</style>
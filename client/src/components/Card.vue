<template>
  <!-- flexbox -->
    <!-- List Task Based on Card -->
    <div id="home-page" class="container">
      <div class="row" >
          <Category 
            v-for="(cat,index) in category" 
            :key="index"
            :categoryDetail="cat"
            :tasks="tasks"
            @toAddForm='toAddForm'
            @deleteTask='deleteTask'
          >
          </Category>
      </div>
    </div>
    <!-- end flexbox -->
</template>

<script>
import Category from "./Category"
export default {
    name: 'Card',
    components: {
        Category
    },
    props: ['category', "tasks"],
    methods: {
      toAddForm() {
        this.$emit("toAddForm")
      },
      deleteTask(id){
        console.log(id, 'bapa');
        this.$emit('deleteTask', id)
      }
    }
}
</script>

<style>

</style>
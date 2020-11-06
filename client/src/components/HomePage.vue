<template>
<div>

  <div class="container">
      <div class="btn-corner">
          <i @click="toAddPage" class="fas fa-plus-square" style="margin: 40px;"></i>
      </div>
    <h1 style="text-align: center; margin: 2em 0">Kanban</h1>
    <div class="container-category">
      <Category
        v-for="(cat, i) in  categories"
        :key="i"
        :categoryDetail="cat"
        :tasks='tasks'
        @toEditPage='toEditPage'
        @deleteTask='deleteTask'>
      </Category>
    </div>
  </div>
     
</div>
      
</template>

<script>
import Category from "./Category.vue";
export default {
  name: "Homepage",
  components: {
      Category
  },
  props: ['categories', 'tasks'],
  methods: {
      toAddPage(){
          this.$emit('changePage', 'addPage')
      },
       toEditPage(payload) {
          this.$emit("toEditPage", payload);
    },
      deleteOneTask(payload){
        this.$emit("deleteTask", payload)
      }
  }
};
</script>

<style>
</style>
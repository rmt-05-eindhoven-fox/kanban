<template>
  <div class="card">
    <div class="card-body">
      <span class="badge badge-pill badge-primary">{{ task.tag }}</span>
      <h5 class="card-title">{{ task.title }}</h5>
      <p class="card-text">By: {{ fullname }}</p>
      <a class="btn btn-primary" ><i class="far fa-edit"></i></a>
      <a class="btn btn-danger" @click="deleteTask"><i class="fas fa-trash-alt"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name:"Task",
  props:["task"],
  computed:{
    fullname(){
      return `${this.task.User.first_name} ${this.task.User.last_name}`
    }
  },
  methods:{
    deleteTask(){
      const payload = {
        idTask: this.task.id
      }
      this.$emit("deleteTask",payload)
    }
  }
};
</script>

<style>
</style>
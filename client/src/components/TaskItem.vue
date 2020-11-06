<template>
<div class="card text-white mb-3 bg-fresh-turquoise shadow outline-card">
 <div class="card-header">
  <span class="h5">{{task.title}}</span>
  <span @click="toEditPage" class="material-icons clickable" style="float: right; margin-top: 2px; color: yellow">mode_edit</span>
  <span class="material-icons clickable" style="float: right; margin-top: 2px; color: orange" @click="deleteTask">delete</span>
 </div>
 <div class="card-body overflow-auto" style="height:75px">
  <h6 class=" card-title">by: {{task.User.email}}</h6>
  <p class="card-text " style="font-size: 1em">
   {{task.description}}
  </p>
 </div>
</div>
</template>

<script>
export default {
 name: "TaskItem",
 methods: {
  toEditPage() {
   let payload = {
    pageName: 'edit-page',
    task: this.task
   }
   this.$emit('toEditPage', payload)
  },
  deleteTask() {
   const id = +this.task.id
   this.$emit('deleteTask', id)
  }
 },
 props: ['task']
}
</script>

<style>

</style>

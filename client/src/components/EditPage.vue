<template>
<section id="editForm">
 <div class="container">
  <div class="row">
   <div class="col-md-6">
    <div class="card">
     <form @submit.prevent="editTask" class="box rounded">
      <h1 style="font-family: Impact; letter-spacing: 7px">
       Edit task
      </h1>
      <p class="text-muted" style="font-family: monospace;">
       Edit or nay?
      </p>

      <input v-model="title" type="text" placeholder="Title" />
      <input type="text" v-model="description" placeholder="Description" />
      <select name="category" id="category" v-model="category">
       <option value="" disabled selected>Which category?</option>
       <option class="text-dark" value="backlog">Backlog</option>
       <option class="text-dark" value="todo">Todo</option>
       <option class="text-dark" value="doing">Doing</option>
       <option class="text-dark" value="done">Done</option>
      </select>

      <div class="row">
       <div class="col">
        <input type="submit" name="" class="login-ipt" value="Edit Task" href="" />
       </div>
       <div class="col">
        <input @click="toHomePage" type="submit" name="" class="back-ipt" value="Go Back" href="" />
       </div>
      </div>
    </div>
   </div>
  </div>
 </div>
</section>
</template>

<script>
export default {
 name: "EditPage",
 data() {
  return {
   title: this.detailTask.title,
   description: this.detailTask.description,
   category: this.detailTask.category
  }
 },
 props: ['detailTask'],
 methods: {
  toHomePage() {
   this.$emit('toHomePage', 'home-page')
  },

  editTask() {
   let payload = {
    title: this.title,
    description: this.description,
    category: this.category,
    taskId: +this.detailTask.taskId
   }
   this.$emit('editTask', payload)
  }
 },
}
</script>

<style>

</style>

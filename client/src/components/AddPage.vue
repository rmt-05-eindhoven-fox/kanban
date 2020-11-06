<template>
<section id="addForm">
 <div class="container">
  <div class="row">
   <div class="col-md-6">
    <div class="card">
     <form @submit.prevent="addTask" class="box rounded">
      <h1 style="font-family: Impact; letter-spacing: 7px">
       Add a task
      </h1>
      <p class="text-muted" style="font-family: monospace;">
       Go submit a new task
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
        <input type="submit" name="" class="login-ipt" value="Add Task" href="" />
       </div>
       <div class="col">
        <input @click="toHomePage" type="submit" name="" class="back-ipt" value="Go Back" href="#" />
       </div>
      </div>
     </form>
    </div>
   </div>
  </div>
 </div>
</section>
</template>

<script>
export default {
 name: "AddPage",
 data() {
  return {
   title: '',
   description: '',
   category: ''
  }
 },
 methods: {
  addTask() {
   let payload = {
    title: this.title,
    description: this.description,
    category: this.category,
   }
   this.$emit('addTask', payload);
  },
  toHomePage() {
   this.$emit('toHomePage', 'home-page')
  }
 },
}
</script>

<style>

</style>

<template>
<div class="card text-white mb-3 bg-fresh-turquoise shadow outline-card">
 <div class="card-header">
  <span class="font-weight-bold h5">{{task.title}}</span>
  <span class="material-icons" style="float: right; margin-top: 2px; color: yellow">mode_edit</span>
  <span class="material-icons" style="float: right; margin-top: 2px; color: orange">delete</span>
 </div>
 <div class="card-body">
  <h6 class="card-title">{{task.User.email}}</h6>
  <p class="card-text" style="font-size: 1em">
   {{task.description}}
  </p>
 </div>
</div>
</template>

<script>
export default {
 name: "TaskItem",
 props: ['task']
}
</script>

<style>

</style>

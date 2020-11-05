<template>
  <div class="card mx-4 my-4 bg-light shadow" style="width:272px">
    <div class="card-body m-0 p-2">
      <h5 class="card-title text-center">Category 1</h5>
      <Task></Task>
      <a href="#" class="btn btn-info btn-block p-1 mt-2" data-toggle="modal" data-target="#addTask"><i class="fa fa-plus"></i> Add Task</a>
    </div>
  </div>
</template>

<script>
import Task from './Category/Task'
export default {
  name: 'Category',
  components: {
    Task
  }
}
</script>

<style>

</style>
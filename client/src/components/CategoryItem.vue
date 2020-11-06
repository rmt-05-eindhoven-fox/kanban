<template>
  <div class="card card-task-content">
    <div class="card-body">
      <div class="card-title">
        <h5>{{task.title}}</h5>
        <div class="dropdown">
          <a
            class="dropdown-toggle"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <a class="dropdown-item" type="button">Move to...</a>
            <a class="dropdown-item" type="button">Edit</a>
            <a class="dropdown-item" type="button" style="color: #fa2d2d;">Delete</a>
          </div>
        </div>
      </div>
      <div class="card-text text-muted author">
        Created by {{task.id}}
      </div>
      <div class="card-text text-muted date">Posted At {{new Date(task.createdAt).toISOString().split('T')[0]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  
  name: "CategoryItem",
  props: ["task"],
};
</script>

<style>
</style>
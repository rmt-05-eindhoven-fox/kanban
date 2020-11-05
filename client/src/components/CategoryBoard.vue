<template>
  <div class="col-md-6 col-lg-3 mb-3">
    <div class="card-header">
      <h3>Backlog</h3>
      <button class="btn btn-add-task">
        <i class="fa fa-plus-square"></i>
      </button>
    </div>
    <div class="card card-backlog" id="scroll-custom">
      <div class="card-body">
        <!-- TASK CONTENT -->
        <CategoryItem></CategoryItem>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
export default {
  name: "CategoryBoard",

  components: {
    CategoryItem,
  },
};
</script>

<style>
</style>
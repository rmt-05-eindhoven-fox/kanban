<template>
  <div class="">
    <Category />
    <!-- <div class="d-flex flex-row flex-nowrap">
      <div class="task-category" style="min-width: 380px;">
        <div class="category card-body p-2 pl-2">
          <h5 class="text-left text-light pt-2 pl-3"><font-awesome-icon icon="lightbulb" /> Backlog </h5>
        </div>
        <div class="p-2 pl-3 task-body" style=" min-height: 700px;">
          <div class="list-group tasks flex-wrap">
            <a href="#" class="list-group-item list-group-item-action mb-3 text-left">Dapibus ac facilisis in</a>
            <a href="#" class="list-group-item list-group-item-action mb-3 text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis odit modi qui doloribus vitae nostrum.</a>
            <a href="#" class="list-group-item list-group-item-action mb-3 text-left">Porta ac consectetur ac</a>
            <a href="#" class="list-group-item list-group-item-action mb-3 text-left disabled">Vestibulum at eros</a>
          </div>
          <a href="#"><font-awesome-icon icon="plus-circle" size="lg" /></a>
        </div>
      </div>
      <div class="task-category" style="min-width: 380px;">
        <div class="category card-body p-2 pl-2" style="background-color: #04AAFF">
          <h5 class="text-left text-light pt-2 pl-3"><font-awesome-icon icon="code-branch" /> Production </h5>
        </div>
        <div class="p-2 pl-3 task-body" style="background-color: #F6F7F9; min-height: 700px;">
          <div class="list-group tasks">
          </div>
          <a href="#"><font-awesome-icon icon="plus-circle" size="lg" /></a>
        </div>
      </div>
      <div class="task-category" style="min-width: 380px;">
        <div class="category card-body p-2 pl-2" style="background-color: #8F7EE6">
          <h5 class="text-left text-light pt-2 pl-3"><font-awesome-icon icon="code" /> Development </h5>
        </div>
        <div class="p-2 pl-3 task-body" style="background-color: #EBF0F2; min-height: 700px;">
          <div class="list-group tasks">
          </div>
          <a href="#"><font-awesome-icon icon="plus-circle" size="lg" /></a>
        </div>
      </div>
      <div class="task-category" style="min-width: 380px;">
        <div class="category card-body p-2 pl-2" style="background-color: #2FBFBF">
          <h5 class="text-left text-light pt-2 pl-3"><font-awesome-icon icon="check-circle" /> Done </h5>
        </div>
        <div class="p-2 pl-3 task-body" style="background-color: #F6F7F9; min-height: 700px;">
          <div class="list-group tasks">
          </div>
          <a href="#"><font-awesome-icon icon="plus-circle" size="lg" /></a>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Category from '../components/Category.vue'
export default {
  name: 'Tasks',
  created () {
  },
  components: {
    Category
  }
}
</script>

<style scoped>
  .card {
    border: 0;
  }
  .card-body {
  }
</style>

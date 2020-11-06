<template>
<section>
  <div class="card" style="width: 13rem;">
    <div class="card-body">
      <h5>{{catDetail.name}}</h5>
    </div>
  </div>

  <Task
  v-for="task in TaskPerCat"
  :key="task.id"
  :taskDetail='task'></Task>
    
</section>
</template>

<script>
import Task from './Task';

export default {
  name: 'Category',
  props: ['catDetail', 'taskDetail'],
  components: {
    Task
  },
  computed: {
    TaskPerCat() {
      return this.taskDetail.filter(task => task.CategoryId === this.catDetail.id)
    }
  }
}
</script>

<style>

</style>
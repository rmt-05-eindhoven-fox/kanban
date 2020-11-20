<template>
<div class="d-flex flex-row flex-nowrap">
  <div v-for="(category, i) in categories" :key="i" class="task-category" style="min-width: 380px;">
    <div class="category card-body p-2 pl-2" :style="category.headColor">
        <h5 class="text-left text-light pt-2 pl-3"><font-awesome-icon :icon="category.icon" /> {{category.name}} </h5>
    </div>
    <Task :bodyColor="category.bodyColor" :categoryName="category.name" :after="category.after" :before="category.before" />
  </div>
</div>
</template>

<script>
import Task from './Task.vue'
export default {
  name: 'Category',
  data () {
    return {
      categories: [
        {
          name: 'backlog',
          after: 'Production',
          icon: 'lightbulb',
          headColor: 'background-color: #2FBFBF',
          bodyColor: 'background-color: #EBF0F2;'
        },
        {
          name: 'Production',
          before: 'backlog',
          after: 'Development',
          icon: 'code-branch',
          headColor: 'background-color: #04AAFF',
          bodyColor: 'background-color: #F6F7F9'
        },
        {
          name: 'Development',
          before: 'Production',
          after: 'Done',
          icon: 'code',
          headColor: 'background-color: #8F7EE6',
          bodyColor: 'background-color: #EBF0F2'
        },
        {
          name: 'Done',
          before: 'Development',
          icon: 'check-circle',
          headColor: 'background-color: #2FBFBF',
          bodyColor: 'background-color: #F6F7F9'
        }
      ]
    }
  },
  components: {
    Task
  }
}
</script>

<style scoped>
.card {
    border: 0;
  }
  .card-body {
  }
  .category {
    background-color: #2FBFBF;
  }
  .task-body {
    background-color: #EBF0F2;
  }
  .tasks a {
    padding: 15px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
    border-radius: 5px;
  }
</style>

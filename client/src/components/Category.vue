<template>
  <div class="col-md-3 item blue">
    <div class="text-center">
        <button
          v-on:click.prevent="toAddForm"
          class="btn btn-primary"
        >
          Add New Task
        </button>
      </div>

      <div class="mt-4 text-center text-white p-6 rounded bg-primary">
        <h5>{{categoryDetail.titleCategory}}</h5>
        <h5>{{categoryDetail.icon}}</h5>
      </div>
    
    <div id="card-backlog item blue" class="overflow-auto" style="height: 80vh">
      <div
        v-for="(task, index) in taskParser"
        :key="index"
        class="bg-light p-1 task-overflow shadow card rounded"
      >
      <!-- {{task}} -->
        {{ task.title }}
        <button>Edit</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['categoryDetail', "tasks", "task"],
    data() {
      return {
        pageName: 'home-page'
      }
    },
    methods: {
      toAddForm() {
        this.$emit("toAddForm")
      },
      deleteTask(id){
        console.log(id, '<<< id');
        console.log('masuk deleteTask');
        // console.log(this.task.id, "<<< task delete ");
        // console.log(this.task.id);
        this.$emit('deleteTask', id)
      }
    },
    computed: {
      taskParser(){
        return this.tasks.filter(el => el.category == this.categoryDetail.titleCategory)
      }
    }
};
</script>

<style>
</style>
<template>
  <div>
    <div class="card">
      <div class="card-body">
        <span class="badge badge-pill badge-primary">{{ task.tag }}</span>
        <h5 class="card-title">{{ task.title }}</h5>
        <p class="card-text">By: {{ fullname }}</p>
        <a @click="showEditForm" class="btn btn-primary"><i class="far fa-edit"></i></a>
        <a class="btn btn-danger" @click="deleteTask"
          ><i class="fas fa-trash-alt"></i
        ></a>
      </div>
    </div>
    <div v-if="showForm" class="card-body">
      <h3>edit form</h3>
      <form @submit.prevent="editTask()">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="title" id="title" class="form-control" type="text" />
        </div>
        <div class="form-group">
          <label for="tag">Tag</label>
          <input
            v-model="tag"
            id="description"
            class="form-control"
            type="text"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  data(){
    return{
      showForm:false,
      title: `${this.task.title}`,
      tag: `${this.task.tag}`
    }
  },
  computed: {
    fullname() {
      return `${this.task.User.first_name} ${this.task.User.last_name}`;
    },
  },
  methods: {
    deleteTask() {
      const payload = {
        idTask: this.task.id,
      };
      this.$emit("deleteTask", payload);
    },
    showEditForm(){
      if(this.showForm === true){
        this.showForm = false
      }else{
        this.showForm = true
      }
    },
    editTask(){
      const payload = {
        id:this.task.id,
        title:this.title,
        tag:this.tag
      }
      this.showForm = false
      this.$emit("editTask", payload)
    }
  },
};
</script>

<style>
</style>
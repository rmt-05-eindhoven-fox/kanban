<template>
  <div class="container" id="addTask-page" style="padding-top: 5vh;">
    <div id="formTask" class="row justify-content-center">
      <form 
      @submit.prevent="addTask"
      style="width: 40%; background-color: cornsilk; padding: 5vh; border-radius: 5%">
        <h2>Add Task</h2>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" v-model="categoryId">
            <option value="1">backlog</option>
            <option value="2">todo</option>
            <option value="3">doing</option>
            <option value="4">done</option>
          </select>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addTask",
  data(){
    return {
      title: '',
      categoryId: ''
    }
  },
  methods: {
    addTask(){
      let payload = {
        title: this.title,
        CategoryId: this.categoryId
      }

      this.$emit('addTask', payload);
    }
  }

}
</script>

<style>

</style>
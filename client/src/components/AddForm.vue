<template>
  <div class="add-task-form">
    <form @submit.prevent="addTask" >
      <h4>Add New Task</h4>
      <textarea v-model="task.title" class="task-title add-title" rows="2" cols="30" placeholder="  Insert title of the task here.." style="font-size: 12px"></textarea>
      <label class="add-task-tag-label" for="task-tag">Tag:</label>
      <input v-model="task.tag" type="text" style="height: 20px">
      <div class="add-button-options mt-2">
        <button type="submit" class="add-btn"><i class="fas fa-check"></i> Add Task</button>
        <button @click="closeForm" class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  data() {
    return {
      task: {
        title: '',
      }
    }
  },
  props: ['category'],
  methods: {
    closeForm() {
      this.$emit("closeForm")
    },
    addTask() {
      let payload = {
        title: this.task.title,
        tag: this.task.tag,
        category: this.category
      }
      this.$emit("addTask", payload)
      this.clearForm()
      this.closeForm()
    },
    clearForm() {
      this.task.title = ''
    }
  }
};
</script>

<style>
label.add-task-tag-label, .edit-task-tag-label {
  font-size: 10px;
  margin-left: 20px;
  margin-bottom: -5px; 
}

h4 {
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
  margin-top: 10px;
}
</style>
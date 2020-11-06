<template>
  <!-- ADD FORM -->
  <div class="col-md-8">
    <div class="card text-light">
      <div class="card-body add-form">
        <form @submit.prevent="addNewTask()">
          <div class="form-row">
            <div class="col-sm">
              <div class="form-group">
                <input v-model="new_task.title" type="text" class="form-control" id="title-task-add" placeholder="-- Title --">
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <input v-model="new_task.description" type="text" class="form-control" id="desc-task-add" placeholder="-- Description --">
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <select v-model="new_task.category" id="status-task" class="form-control">
                  <option value="">-- Select --</option>
                  <option value="Backlog">Backlog</option>
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm">
              <div class="text-center">
                <button type="submit" class="btn btn-sm btn-success">ADD</button>
                <a @click.prevent="closeAddNewTaskForm()" class="btn btn-sm btn-danger">CANCEL</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- ADD FORM -->
</template>

<script>
export default {
  name: 'AddForm',
  props: [],
  components: {

  },
  data() {
    return {
      // ADD NEW TASK
      "new_task": {
        title: '',
        description: '',
        category: ''
      },
    }
  },
  methods: {
    closeAddNewTaskForm() {
      this.$emit('closeAddNewTaskForm');
    },
    addNewTask() {
      let payload = {
        title: this.new_task.title,
        description: this.new_task.description,
        category: this.new_task.category
      }
      this.new_task.title = '';
      this.new_task.description = '';
      this.new_task.category = '';
      this.$emit('addNewTask', payload);
    },
  }
}
</script>

<style>

</style>
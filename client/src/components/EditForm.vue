<template>
  <!-- EDIT FORM -->
  <div class="col-md-6">
    <div class="card text-light">
      <div class="card-body add-form">
        <form @submit.prevent="editTask()">
          <div class="form-row">
            <div class="col-sm">
              <div class="form-group">
                <input v-model="edit_task.title" type="text" class="form-control" id="title-task-edit" placeholder="-- Title --">
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <input v-model="edit_task.description" type="text" class="form-control" id="desc-task-edit" placeholder="-- Description --">
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="col-sm">
              <div class="text-center">
                <button type="submit" class="btn btn-sm btn-success">EDIT</button>
                <a @click.prevent="closeEditTaskForm()" class="btn btn-sm btn-danger">CANCEL</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- EDIT FORM -->
</template>

<script>
export default {
  name: 'EditForm',
  props: ['edit_task'],
  data() {
    return {

    }
  },
  methods: {
    closeEditTaskForm() {
      this.$emit('closeEditTaskForm');
    },
    editTask() {
      let payload = {
        id: this.edit_task.id,
        title: this.edit_task.title,
        description: this.edit_task.description
      }
      this.$emit('editTask', payload);
    },
  }
}
</script>

<style>

</style>
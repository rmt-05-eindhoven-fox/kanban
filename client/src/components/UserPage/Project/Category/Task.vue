<template>
  <div class="card shadow my-2">
    <div class="w-100 d-flex align-items-center">
      <div class="flex-fill">
        <h6 class="card-text flex-fill p-1 mx-1">{{ taskDetail.title }}</h6>
        <p class="mx-1"><em><small>Created by: {{ usersPerTask.name }}</small></em></p>
      </div>
      <button 
        @click.prevent="editForm"
        data-toggle="modal"
        :data-target="`#modal${taskDetail.CategoryId}-${taskDetail.id}`"
        class="btn h-100 mx-0 px-1 fa fa-pencil"></button>
      <button 
        @click.prevent="deleteTask"
        class="btn h-100 mx-0 px-1 fa fa-trash"></button>
    </div>
    <!-- ! Modal Edit Task -->
        <div class="modal fade" :id="`modal${taskDetail.CategoryId}-${taskDetail.id}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            @submit.prevent="editTask">
          <div class="modal-body">
              <div class="form-group p-4">
                <label :for="`exampleInputEmail1${taskDetail.CategoryId}-${taskDetail.id}`">Task Title</label>
                <input 
                  v-model="editTaskForm.title"
                  type="text" class="form-control" :id="`exampleInputEmail1${taskDetail.CategoryId}-${taskDetail.id}`" aria-describedby="emailHelp" placeholder="Your task title">
              </div>
              <div class="form-group p-4">
                <label :for="`exampleFormControlTextarea1${taskDetail.CategoryId}-${taskDetail.id}`">Description</label>
                <textarea 
                  v-model="editTaskForm.description"
                  class="form-control" :id="`exampleFormControlTextarea1${taskDetail.CategoryId}-${taskDetail.id}`" rows="3" placeholder="Description"></textarea>
              </div>              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Edit Task</button>
          </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Task',
  props: [ 'taskDetail', 'allUsers' ],
  data() {
    return {
      editTaskForm: {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    usersPerTask() {
      return this.allUsers.find(user => {
        return user.id == this.taskDetail.UserId
      });
    },
    coba() {
      return `${this.taskDetail}`
    }
  },
  methods: {
    editForm() {
      this.editTaskForm.title = this.taskDetail.title;
      this.editTaskForm.description = this.taskDetail.description;
    },
    editTask() {
      $(`#modal${this.taskDetail.CategoryId}-${this.taskDetail.id}`).modal('toggle');
      Swal.showLoading();
      const payload = this.editTaskForm;
      payload.id = this.taskDetail.id;
      this.$emit('editTask', payload);
    },
    deleteTask() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.showLoading();
          const payload = {
            id: this.taskDetail.id
          };
          this.$emit('deleteTask', payload);
        }
      })
    }
  }
}
</script>

<style>
</style>
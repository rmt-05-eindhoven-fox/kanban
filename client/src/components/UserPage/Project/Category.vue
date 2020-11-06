<template>
  <div class="card mx-4 my-4 bg-light shadow" style="width:272px">
    <div class="card-body m-0 p-2">
      <h5 class="card-title text-center">{{categoryDetail.name}}</h5>
        <draggable :list="categoryDetail.Tasks" :animation="200" ghost-class="ghost-card" group="tasks" @add="update()">
          <Task
            v-for="task in categoryDetail.Tasks"
            :key="task.id"
            :taskDetail="task"
            :allUsers="allUsers"
            @editTask="editTask"
            @deleteTask="deleteTask">
          </Task>
        </draggable>
      <a href="#" class="btn btn-info btn-block p-1 mt-2" data-toggle="modal" :data-target="buttonModalId"><i class="fa fa-plus"></i> Add Task</a>
    </div>
        <!-- ! Modal Add Task -->
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            @submit.prevent="addTask">
          <div class="modal-body">
              <div class="form-group p-4">
                <label for="exampleInputEmail1">Task Title</label>
                <input 
                  v-model="addTaskForm.title"
                  type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your task title">
              </div>
              <div class="form-group p-4">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea 
                  v-model="addTaskForm.description"
                  class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description"></textarea>
              </div>              
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Task</button>
          </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Task from './Category/Task'
export default {
  name: 'Category',
  data() {
    return {
      addTaskForm: {
        title: '',
        description: ''
      }
    }
  },
  components: {
    Task,
    draggable
  },
  props: ['categoryDetail', 'allUsers'],
  computed: {
    buttonModalId() {
      return `#modal${this.categoryDetail.id}`
    },
    modalId() {
      return `modal${this.categoryDetail.id}`
    }
  },
  methods: {
    addTask() {
      $(`#modal${this.categoryDetail.id}`).modal('toggle');
      Swal.showLoading();
      const payload = this.addTaskForm;
      payload.category = this.categoryDetail.name;
      payload.categoryId = this.categoryDetail.id;
      this.$emit('addTask', payload);
      for (const key in this.addTaskForm) {
         this.addTaskForm[key] = '';
      }
    },
    editTask(payload) {
      payload.categoryId = this.categoryDetail.id;
      this.$emit('editTask', payload);
    },
    deleteTask(payload) {
      payload.categoryId = this.categoryDetail.id;
      this.$emit('deleteTask', payload);
    },
    update() {
      let payload;
      this.categoryDetail.Tasks.forEach(task => {
        if(task.CategoryId !== this.categoryDetail.id) payload = task;  
      })
      this.$emit('patchTask', payload);
    },
  }
}
</script>

<style>

</style>
<template>
  <!-- HOME PAGE -->
  <section id="home-page">
    <div class="col col-add d-flex flex-column align-items-center">
      <div class="row pb-2 pt-2">
        <button @click="showAddNewTaskForm()" class="btn btn-primary"><i class="fas fa-plus"></i> Add New Task</button>
      </div>
      <!-- ADD FORM -->
      <div v-show="addNewTaskForm" class="col-md-8">
        <div class="card text-light">
          <div class="card-body add-form">
            <form @submit.prevent="addNewTask()">
              <div class="form-row">
                <div class="col-sm">
                  <div class="form-group">
                    <input v-model="new_task.title" type="text" class="form-control" id="title-task" placeholder="-- Title --">
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-group">
                    <input v-model="new_task.description" type="text" class="form-control" id="desc-task" placeholder="-- Description --">
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
      <!-- EDIT FORM -->
      <div v-show="editTaskForm" class="col-md-6">
        <div class="card text-light">
          <div class="card-body add-form">
            <form @submit.prevent="editTask()">
              <div class="form-row">
                <div class="col-sm">
                  <div class="form-group">
                    <input v-model="edit_task.title" type="text" class="form-control" id="title-task" placeholder="-- Title --">
                  </div>
                </div>
                <div class="col-sm">
                  <div class="form-group">
                    <input v-model="edit_task.description" type="text" class="form-control" id="desc-task" placeholder="-- Description --">
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
      <!-- CATEGORY FORM -->
      <div v-show="moveTaskForm" class="card text-light">
        <div class="card-body add-form">
          <form @submit.prevent="moveTask()">
            <div class="row btn-group">
              <label class="btn btn-danger px-5">
                <input v-model="move_task.category" value="Backlog" type="radio" name="category" id="move-backlog"> Backlog
              </label>
              <label class="btn btn-warning px-5">
                <input v-model="move_task.category" value="Todo" type="radio" name="category" id="move-todo"> Todo
              </label>
              <label class="btn btn-primary px-5">
                <input v-model="move_task.category" value="Doing" type="radio" name="category" id="move-doing"> Doing
              </label>
              <label class="btn btn-success px-5">
                <input v-model="move_task.category" value="Done" type="radio" name="category" id="move-done"> Done
              </label>
            </div>
            <div class="form-row">
              <div class="col-sm">
                <div class="text-center">
                  <button type="submit" class="btn btn-sm btn-success">MOVE</button>
                  <a @click.prevent="closeMoveTaskForm()" class="btn btn-sm btn-danger">CANCEL</a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- CATEGORY FORM -->
    </div>
    <div class="board container-fluid pt-3">
      <!-- TASK -->
      <div class="row row-task">
        <Category
          v-for="(category, i) in categories"
          :key="i"
          :category="category"
          :tasks="tasks"
          @showEditTaskForm="showEditTaskForm"
          @deleteTask="deleteTask"
          @showMoveTaskForm="showMoveTaskForm"
        ></Category>
      </div>
      <!-- TASK -->
    </div>

    <!-- FOOTER -->
    <div class="footer footer-copyright text-light text-center mt-4">
      © 2020 KhanBhanBhoard by Bobby Septianto
    </div>
    <!-- FOOTER -->

  </section>
  <!-- HOME PAGE -->
</template>

<script>
import Category from "./Category";
export default {
  name: 'HomePage',
  data() {
    return {
      // ADD NEW TASK
      "new_task": {
        title: '',
        description: '',
        category: ''
      },
      "addNewTaskForm": false,

      // EDIT TASK
      "edit_task": {
        id: '',
        title: '',
        description: ''
      },
      "editTaskForm": false,

      // MOVE TASK
      "move_task": {
        id: '',
        category: ''
      },
      "moveTaskForm": false,
    }
  },
  components: {
    Category
  },
  props: ['categories', 'tasks'],
  methods: {
    showAddNewTaskForm() {
      this.addNewTaskForm = true;
    },
    closeAddNewTaskForm() {
      this.addNewTaskForm = false;
    },
    addNewTask() {
      let payload = {
        title: this.new_task.title,
        description: this.new_task.description,
        category: this.new_task.category
      }
      this.addNewTaskForm = false;
      this.new_task.title = '';
      this.new_task.description = '';
      this.new_task.category = '';
      this.$emit('addNewTask', payload);
    },
    showEditTaskForm(payload) {
      this.editTaskForm = true;
      this.edit_task.id = payload.id;
      this.edit_task.title = payload.title;
      this.edit_task.description = payload.description;
    },
    closeEditTaskForm() {
      this.editTaskForm = false;
    },
    editTask() {
      let payload = {
        id: this.edit_task.id,
        title: this.edit_task.title,
        description: this.edit_task.description
      }
      this.editTaskForm = false;
      this.$emit('editTask', payload);
    },
    showMoveTaskForm(payload) {
      this.moveTaskForm = true;
      this.move_task.id = payload.id;
      this.move_task.category = payload.category;
    },
    closeMoveTaskForm() {
      this.moveTaskForm = false;
    },
    moveTask() {
      let payload = {
        id: this.move_task.id,
        category: this.move_task.category
      }
      this.moveTaskForm = false;
      this.$emit('moveTask', payload);
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload);
    }
  }
}
</script>

<style>

</style>
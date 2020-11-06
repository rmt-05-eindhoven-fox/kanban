<template>
  <!-- MOVE FORM -->
  <div class="card text-light">
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
  <!-- MOVE FORM -->
</template>

<script>
export default {
  name: 'MoveForm',
  props: ['move_task'],
  data() {
    return {

    }
  },
  methods: {
    closeMoveTaskForm() {
      this.$emit('closeMoveTaskForm', false);
    },
    moveTask() {
      let payload = {
        id: this.move_task.id,
        category: this.move_task.category
      }
      this.$emit('moveTask', payload);
    },
  }
}
</script>

<style>

</style>
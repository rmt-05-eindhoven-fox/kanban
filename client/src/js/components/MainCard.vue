<template>
  <div>
    <v-card :color="category.color">
      <v-card-title
        class="headline text-center"
        style="color: white; font-weight: 500;"
        >{{ category.name }}</v-card-title
      >
      <div id="taskCard">
        <draggable v-model="category.task" group="category" @start="drag = true" @end="drag = false">
          <TaskCard v-for="(task, i) in category.task" :key="i" :task="task" v-on:DELETE_TASK="deleteTask" @EDIT_TASK="getEdit"
          ></TaskCard>
        </draggable>
      </div>
    </v-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'MainCard',
  data() {
    return {
      projectId: null
    }
  },
  components: {
    TaskCard,
    draggable
  },
  props: ['category'],
  methods: {
    deleteTask(val) {
      this.projectId = val.ProjectId
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to go back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete(`${this.$BASE_URL}/tasks/${val.id}/${val.ProjectId}`, {
              headers: { access_token: localStorage.getItem('access_token') }
            })
            .then(response => {
              this.emit('changeTask', 'task deleted')
              Swal.fire('Whoops!', 'Task Successfully Deleted!', 'success')
              return this.$emit('FETCH_Now', this.projectId)
            })
            .catch(({ response }) => {
              Swal.fire('Oops', response.data.msg, 'error')
            })
        }
      })
    },
    getEdit(val) {
      return this.$emit('EDIT_DATA', val)
    }
  }
}
</script>

<style lang="css" scoped>
.v-card {
  color: white !important;
  font-weight: 500;
  min-height: 15vh;
}
</style>
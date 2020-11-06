<template>
  <div>
    <h2>{{ project.name }} Project</h2>
    <img src="../assets/undraw_Projections_re_1mrh.svg" style="display: block; margin-top: 2vh; margin-left: 60vh; margin-bottom: 10vh;" width="500px;" />
    <p>
      <v-btn color="primary" style="display: block; margin-top: 2vh; margin-left: 90vh; margin-bottom: 10vh;" @click.stop="dialog2 = true"
        >Add task</v-btn
      >
    </p>
    <v-row>
      <v-col md="3" lg="3" v-for="(category, i) in categories" :key="i">
        <MainCard
          :category="category"
          @EDIT_DATA="getEdit"
          @FETCH_DONG="fetchDong"
        ></MainCard>
      </v-col>
    </v-row>


    <v-dialog v-model="dialog2" max-width="320">
      <v-card>
        <v-card-title class="headline" v-if="!editId"
          >Create new Task</v-card-title
        >
        <v-card-title class="headline" v-else>Edit Task</v-card-title>
        <v-form>
          <v-text-field v-model="task.title" type="text" label="Title" style="padding: 20px;"
          ></v-text-field>
          <v-text-field v-model="task.description" type="text" label="Description" style="padding: 20px;"
          ></v-text-field>
        </v-form>
        <v-btn color="orange darken-1" text @click.prevent="createTask" v-if="!editId">
          Submit
        </v-btn>
        <v-btn color="orange darken-1" text @click.prevent="editTask" v-else>
          Edit
        </v-btn>
        <v-btn color="green darken-1" text @click.prevent="dialog2 = false">Close
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import MainCard from './MainCard'

export default {
  name: 'KanbanBoard',
  data() {
    return {
      dialog2: false,
      editId: null,
      task: {
        title: null,
        description: null,
        projectId: this.project.id
      },
      categories: [
        {
          name: 'Backlog',
          status: 'backlog',
          color: 'red darken-1',
          task: []
        },
        {
          name: 'Todo',
          status: 'todo',
          color: 'orange darken-1',
          task: []
        },
        {
          name: 'Ongoing',
          status: 'ongoing',
          color: 'blue darken-1',
          task: []
        },
        {
          name: 'Completed',
          status: 'completed',
          color: 'green darken-1',
          task: []
        }
      ]
    }
  },
  methods: {
    fetchProjectTasks(id) {
      axios
        .get(`${this.$BASE_URL}/tasks/${id}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          this.categories.forEach(el => {
            el.task = []
            data.forEach(task => {
              if (el.status == task.status) {
                el.task.push(task)
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    createTask() {
      const id = this.task.projectId
      const form = {
        title: this.task.title,
        description: this.task.description
      }
      axios
        .post(`${this.$BASE_URL}/tasks/${id}`, form, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(result => {
          Swal.fire('Success', 'New task added', 'success')
          this.dialog2 = false
          this.fetchProjectTasks(id)
          this.$socket.emit('changeTask', 'new task added')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchDong(val) {
      return this.fetchProjectTasks(val)
    },
    getEdit(val) {
      this.editId = val.id
      this.task.title = val.title
      this.task.description = val.description
      this.dialog2 = true
    },
    editTask() {
      const data = {
        title: this.task.title,
        description: this.task.description
      }
      const id = this.task.projectId
      axios
        .put(`${this.$BASE_URL}/tasks/${this.editId}/${id}`, data, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(result => {
          this.dialog2 = false
          this.fetchProjectTasks(id)
          this.$socket.emit('changeTask', 'task edited')
          Swal.fire({
            title: 'Success',
            text: 'Task edited',
            icon: 'success',
            timer: 1500
          })
        })
        .catch(({ response }) => {
          Swal.fire('Oops', response, 'error')
        })
    }
  },
  props: ['project'],
  components: {
    MainCard
  },
  watch: {
    categories: {
      deep: true,
      handler: function(val, old) {
        val.forEach(el => {
          if (el.task.length !== 0) {
            el.task.forEach(todo => {
              if (todo.status !== el.status) {
                axios
                  .patch(
                    `${this.$BASE_URL}/tasks/${todo.id}/${todo.ProjectId}`,
                    { status: el.status },
                    { headers: { access_token: localStorage.getItem('access_token') } }
                  )
                  .then(response => {
                    this.fetchProjectTasks(this.task.projectId)
                    this.$socket.emit('changeTask', 'task moved')
                  })
                  .catch(({ response }) => {
                    if (response.code == 403) {
                      Swal.fire('Forbidden', 'Unauthorized', 'error')
                    }
                  })
              }
            })
          }
        })
      }
    },
    dialog2: function(val, old) {
      if (!val) {
        this.task.title = null
        this.task.description = null
        this.editId = null
      }
    },
  },
  created() {
    this.fetchProjectTasks(this.project.id)
  },
  mounted() {
    const projectId = this.project.id
    this.$socket.on('taskChanged', msg => {
      this.fetchProjectTasks(projectId)
    })
  }
}
</script>

<style lang="css" scoped>
.v-btn {
  color: white;
}
.v-dialog .headline {
  color: black !important;
}
</style>

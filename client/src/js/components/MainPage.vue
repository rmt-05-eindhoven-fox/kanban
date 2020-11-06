<template>
  <div>
    <div id="projectPage" v-if="detailProject == null">
      <v-container>
        <v-toolbar dense>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn color="orange darken-4" dark v-on="on">
                <v-icon>mdi-plus</v-icon>
                <h5>Click Here to Create a New Project!</h5></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headline">Create a New Project</v-card-title>
              <v-col cols="12" sm="12">
                <v-text-field v-model="projectName" label="Project Name" single-line outlined
                ></v-text-field>
              </v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="orange darken-1" text @click.prevent="createProject">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-toolbar-title class="ml-10"
            ><h3 style="display: block; margin-top: 2vh; margin-left: 18vh; margin-bottom: 2vh;">Hi! Welcome!</h3></v-toolbar-title>
        </v-toolbar>
 
        <div id="personal" v-if="personal">
          <h1 class="mt-4"><center>Projects</center></h1>
          <img src="../assets/undraw_Playful_cat_rchv.svg" style="display: block; margin-top: 2vh; margin-left: 50vh; margin-bottom:5vh;" width="500px;" />
          <v-row>
            <h4 v-if="allProjects.personal.length == 0">Oops! No projects yet</h4>
            <v-col v-else md="4" v-for="(project, i) in allProjects.personal" :key="i" @click.prevent="getDetail(project.ProjectId)">
              <ProjectCard
                :project="project"
                v-on:DELETE_PROJECT="deleteProject"
              ></ProjectCard>
            </v-col>
          </v-row>
        </div>
       
      </v-container>
    </div>

    <div id="kanbanPage" class="mt-5 ml-5 mr-5" v-else>
      <KanbanBoard :project="detailProject"></KanbanBoard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import ProjectCard from './ProjectCard'
import KanbanBoard from './KanbanBoard'

export default {
  name: 'MainPage',
  data() {
    return {
      dialog: false,
      personal: true,
      projectName: null,
      projectId: null,
      detailProject: null
    }
  },
  props: ['allProjects', 'home'],
  components: {
    ProjectCard,
    KanbanBoard
  },
  methods: {
    createProject() {
      const form = {
        name: this.projectName
      }
      axios
        .post(`${this.$BASE_URL}/projects`, form, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          this.dialog = false
          Swal.fire('Wohoo! Done!', 'A New Project Successfully Created!', 'success')
          return this.$emit('FETCH_PROJECT')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    deleteProject(val) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to get the project back!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete(`${this.$BASE_URL}/projects/${val}`, {
              headers: { access_token: localStorage.getItem('access_token') }
            })
            .then(response => {
              this.detailProject = null
              Swal.fire('Whoops!', 'Project Successfully Deleted!', 'success')
              return this.$emit('FETCH_PROJECT')
            })
            .catch(({ response }) => {
              console.log(response)
            })
        }
      })
    },
    getDetail(val) {
      this.projectId = val
      localStorage.setItem('projectId', val)
      axios
        .get(`${this.$BASE_URL}/projects/${val}`, {
          headers: { access_token: localStorage.getItem('access_token') }
        })
        .then(({ data }) => {
          this.detailProject = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadProjects() {
      return this.$emit('FETCH_PROJECT')
    }
  },
  watch: {
    home: function(val, old) {
      this.detailProject = null
      this.projectId = null
    }
  },
  mounted() {
    this.$socket.on('newDetail', msg => {
      this.getDetail(this.projectId)
    })
  },
  created() {
    this.fetchUserProject()
  }
}
</script>

<style lang="css" scoped></style>

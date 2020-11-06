<template>
  <section id="user-page" style="width: fit-content; padding-top: 10%; height: 100vh; background-color: #2c3e50;">
    <!-- ! Navbar -->
    <div class="fixed-top m-0 p-0 bg-info shadow" style="width: 100vw !important;">
      <nav class="navbar row navbar-expand-lg navbar-dark w-100 py-0 px-4 m-0" style="height: fit-content;">
        <div class="col-4">
          <span class="navbar-text text-light font-weight-bold">Hello {{ userName }}!</span>
        </div>
        <div class="col-4 d-flex justify-content-center h-100">
          <img src="../assets/logo.png" alt="logo" height="100px">
        </div>
        <div class="col-4 d-flex justify-content-end">
          <button class="navbar-toggler align-self-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active dropdown">
                <a 
                v-if="userProjects.length === 0"
                class="nav-link dropdown-toggle" href="#" id="project" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Project
                  <span class="sr-only">(current)</span>
                </a>
                <a 
                  v-else
                  class="nav-link dropdown-toggle" href="#" id="project" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ activeProject }}
                  <span class="sr-only">(current)</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="project">
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addMember">Collaborators</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="projects" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  My Projects
                </a>
                <div class="dropdown-menu" aria-labelledby="projects">
                  <a
                  v-for="project in userProjects"
                  :key="project.id"
                  @click.prevent="changeProject(project.id)"
                  class="dropdown-item" href="#">
                  {{project.name}}
                  </a>
                </div>
              </li>
              <li class="nav-item align-items-center d-flex">
                <a 
                  @click.prevent="passLogout()"
                  class="nav-link fa fa-power-off" role="button" href="#">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <Project
      :projectDetail="projectDetail"
      :userDetail="userDetail"
      :allUsers="allUsers"
      @createCategory="createCategory"
      @addTask="addTask"
      @editTask="editTask"
      @deleteTask="deleteTask">
    </Project>
  </section>
</template>

<script>
import Project from './UserPage/Project'
export default {
  name: 'UserPage',
  data() {
    return {
      userName: this.userDetail.name,
      activeProject: '',
      activeProjectId: ''
    }
  },
  components: {
    Project
  },
  props: [ 'userDetail', 'otherUsers' ],
  computed: {
    userProjects() {
      return this.userDetail.Projects
    },
    projectDetail() {
      // if(!this.activeProjectId) {
      //   return this.userDetail.Projects[0]
      // } else {
      //   return this.userDetail.Projects.find(project => {
      //     project.id === this.activeProjectId;
      //   });
      // }
      if(this.userDetail.Projects.length !== 0) {
        for (const i in this.userDetail.Projects) {
          if (this.userDetail.Projects[i].id === this.activeProjectId) {
            return this.userDetail.Projects[i];
          }
        }
      } else {
        return null;
      }
    },
    allUsers() {
      const user = [{
        id: this.userDetail.id,
        name: this.userDetail.name,
        email: this.userDetail.email
      }]
      return user.concat(this.otherUsers);
    }
  },
  methods: {
    passLogout() {
      this.$emit('logout');
    },
    createProject(payload) {
      console.log(payload, 'ini di userpageee');
      this.$emit('createProject', payload);
    },
    changeProject(id) {
      this.userProjects.forEach(el => {
        if (id === el.id) {
          this.activeProject = el.name;
          this.activeProjectId = el.id;
        };
      });
    },
    createCategory(payload) {
      this.$emit('createCategory', payload);
    },
    addTask(payload) {
      this.$emit('addTask', payload);
    },
    editTask(payload) {
      this.$emit('editTask', payload);
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload);
    }
  },
  created() {
    if (this.userProjects.length == 0) {
      this.activeProject = 'Project';
    } else {
      this.activeProject = this.userProjects[0].name;
      this.activeProjectId = this.userProjects[0].id;
    }
  }
}
</script>

<style>

</style>
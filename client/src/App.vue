<template>
  <div>
    <!-- ! home-page -->
    <HomePage 
      ref="homePage"
      v-if="pageName === 'home-page'"
      @register="register"
      @login="login">
    </HomePage>
    <!-- ! user-page -->
    <UserPage 
      v-else-if="pageName == 'user-page'"
      :userDetail="userDetail"
      :otherUsers="otherUsers"
      @logout="logout"
      @createProject="createProject"
      @createCategory="createCategory"
      @addTask="addTask"
      @editTask="editTask"
      @deleteTask="deleteTask">
    </UserPage>
  </div>
</template>

<script>
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import axios from './config/axios';
export default {
  name: 'KanbanApp',
  data() {
    return {
      msg: 'Hello World!',
      pageName: '',
      access_token: localStorage.access_token,
      formLogin: {
        email: '',
        password: ''
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      },
      userDetail: [],
      otherUsers: '',
      categories: [],
      tasks: []
    }
  },
  components: {
    HomePage,
    UserPage
  },
  methods: {
    changePage(pageName) {
      if(this.pageName !== pageName) {
        this.pageName = pageName;
      }
    },
    isLogin() {
      if (this.access_token) {
        this.fetchUserDetail();
        this.fetchUsers();
      } else {
        this.changePage('home-page');
      }
    },
    fetchUserDetail() {
        axios.get('/projects')
          .then(({ data }) => {
            console.log(data);
            this.userDetail = data;
            this.changePage('user-page')
          })
          .catch(err => {
            this.changePage('home-page');
            console.log(err.response.data);
          });
    },
    fetchUsers() {
      axios.get('/users')
        .then(({ data }) => {
          this.otherUsers = data;
        })
        .catch(err => console.log(err.response.data));
    },
    login(payload) {
      Swal.showLoading();
      axios.post('/login', payload)
        .then(({ data }) => {
          this.toastSwal('Signed in successfully');
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('name', data.name);
          this.fetchUserDetail();
          this.activeUser.name = data.name;
          this.$refs.homePage.clearLoginForm();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    register(payload) {
      Swal.showLoading();
      axios.post('/register', payload)
        .then(({ data }) => {
          this.swalSuccess('Thank you for registering on Kanban', 'center', undefined, undefined, () => {
            $('#modal-sign-in').modal('toggle');
          });
            this.$refs.homePage.clearRegisForm();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      })
        .then((result) => {
          if (result.isConfirmed) {
          localStorage.clear();
          this.changePage('home-page')
          }
        })
    },
    createProject(payload) {
      console.log(payload, 'berhasil sampai ke App');
      axios.post('/projects', payload)
        .then(response => {
          if(payload.userId) {
            return axios.post(`/projects/${response.data.id}`, payload)
          } else {
            return Promise.resolve(response);
          }
        })
        .then(({ data }) => {
          this.swalSuccess(`Successfully add ${data.name} to your projects`, 'center')
          this.fetchUserDetail();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    createCategory(payload) {
      axios.post(`/projects/${payload.projectId}/categories`, payload)
        .then(({ data }) => {
          console.log(data);
          this.swalSuccess(`Successfully add ${data.name} as new category`, 'top-end');
          this.fetchUserDetail();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    addTask(payload) {
      axios.post(`/projects/${payload.projectId}/categories/${payload.categoryId}/tasks`, payload)
        .then(({ data }) => {
          this.toastSwal(`${data.title} added as your task`);
          this.fetchUserDetail();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    editTask(payload) {
      axios.put(`/projects/${payload.projectId}/categories/${payload.categoryId}/tasks/${payload.id}`, payload)
        .then(({ data }) => {
          this.toastSwal(`Successfully edit your task`);
          this.fetchUserDetail();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    deleteTask(payload) {
      axios.delete(`/projects/${payload.projectId}/categories/${payload.categoryId}/tasks/${payload.id}`)
        .then(({ data }) => {
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            )
            this.fetchUserDetail();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    swalSuccess(message, position, confirmButton, timer, cb) {
      Swal.fire({
        position: position,
        icon: 'success',
        title: message,
        showConfirmButton: confirmButton,
        timer: timer
      })
        .then(result => {
          if(cb) {
            if(result.isConfirmed) cb();
          } else {
            Swal.close();
          }
        })
    },
    swalFailed(message, cb) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
        .then(result => {
          if (cb) {
            if(result.isConfirmed) cb();
          } else {
            Swal.close();
          }
        })
    },
    toastSwal(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: message
      });
    }
  },
  created() {
    this.isLogin();
  }
}
</script>

<style>
 input {
    border: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
    border-bottom: 1px solid black !important;
    border-radius: 0 !important;
  }
</style>
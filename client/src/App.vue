<template>
  <div>
    <!-- ! home-page -->
    <HomePage 
      ref="homePage"
      v-if="pageName === 'home-page'"
      @register="register"
      @login="login"
      @googleLogin="googleLogin">
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
      @deleteTask="deleteTask"
      @patchTask="patchTask"
      @addMember="addMember">
    </UserPage>

        <div class="modal fade" id="modal-password" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <form
            @submit.prevent="googleLoginFinal">
          <div class="modal-body">
              <div class="form-group p-4">
                <label for="googleLogin">Enter Password</label>
                <input 
                  v-model="googleLogin2.password"
                  type="password" class="form-control" id="googleLogin" placeholder="Password">
              </div>
            </div>
            <div class="modal-footer"> 
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Let me in!</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import axios from './config/axios';

export default {
  name: 'KanbanApp',
  data() {
    return {
      server: 'https://kanban-porto-app.herokuapp.com',
      socket: {},
      dataInserted: false,
      dataChanged: false,
      pageName: '',
      formLogin: {
        email: '',
        password: ''
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      },
      userDetail: '',
      otherUsers: [],
      googleLogin2: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    HomePage,
    UserPage
  },
  methods: {
    changePage(pageName) {
      this.pageName = pageName;
    },
    isLogin() {
      if (localStorage.access_token) {
        this.fetchUserDetail();
        this.fetchUsers();
      } else {
        this.changePage('home-page');
      }
    },
    fetchUserDetail() {
      axios({
        method: 'GET',
        url: '/projects',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.userDetail = data;
          this.changePage('user-page');
        })
        .catch(err => {
          this.changePage('home-page');
        });
    },
    fetchUsers() {
      axios({
        method: 'GET',
        url: '/users',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.otherUsers = data;
        })
        .catch(err => console.log(err.response.data));
    },
    login(payload) {
      Swal.showLoading();
      axios({
        method: 'post',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          this.toastSwal('Signed in successfully');
          localStorage.setItem('access_token', data.access_token);
          this.fetchUserDetail();
          this.fetchUsers();
          this.activeUser.name = data.name;
          this.$refs.homePage.clearLoginForm();
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    googleLogin(payload) {
      axios({
        method: 'post',
        url: '/login/google',
        headers: {
          google_access_token: payload.google_access_token
        }
      })
        .then(({ data }) => {
          Swal.close();
          if(data.access_token) {
            this.toastSwal('Signed in successfully');
            localStorage.setItem('access_token', data.access_token);
            this.fetchUserDetail();
            this.activeUser.name = data.name;
            this.$refs.homePage.clearLoginForm();
          } else {
            this.googleLogin2.name = data.name;
            this.googleLogin2.email = data.email;
            $('#modal-password').modal('toggle');
          }
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    googleLoginFinal() {
      $('#modal-password').modal('toggle');
      Swal.showLoading();
      const payload = this.googleLogin2;
      this.register(payload);
    },
    register(payload) {
      Swal.showLoading();
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          if(this.googleLogin2.password) {
            const payload = {
              name: data.name,
              email: data.email,
              password: this.googleLogin2.password
            }
            this.login(payload);
            this.googleLogin2.password = ''
          } else {
            this.swalSuccess('Thank you for registering on Kanban', 'center', undefined, undefined, () => {
              $('#modal-sign-in').modal('toggle');
            });
            this.$refs.homePage.clearRegisForm();
          }
          this.socket.emit('newData', { msg: `${data.name} has joined on Kanban`, userId: '', projectId: '' });
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
          this.userDetail = '';
          this.changePage('home-page')
          }
        })
    },
    createProject(payload) {
      axios({
        url: '/projects',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(response => {
          if(payload.userId) {
            return axios({
              method: 'POST',
              url: `/projects/${response.data.id}`,
              headers: {
                access_token: localStorage.access_token
              },
              data: payload
            })
          } else {
            return Promise.resolve(response);
          }
        })
        .then(({ data }) => {
          this.swalSuccess(`Successfully create new project`, 'center')
          this.fetchUserDetail();
          if (data.email) {
            this.socket.emit('newData', { msg: `${this.userDetail.name} has added you to his/her project`, userId: data.UserId, createdBy: '' } );
          }
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    createCategory(payload) {
      axios({
        url: `/projects/${payload.projectId}/categories`,
        method: 'post',
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.swalSuccess(`Successfully add ${data.name} as new category`, 'top-end');
          this.fetchUserDetail();
          this.socket.emit('newData', { msg: `${this.userDetail.name} has added new category on`, projectId: payload.projectId, userId: '', createdBy: this.userDetail.id});
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    addTask(payload) {
      axios({
        method: 'post',
        url: `/projects/${payload.projectId}/categories/${payload.categoryId}/tasks`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          this.toastSwal(`${data.title} added as your task`);
          this.fetchUserDetail();
          this.socket.emit('newData', { msg: '', userId: '', projectId: '' });
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    editTask(payload) {
      axios({
        method: 'put',
        url: `/projects/${payload.projectId}/categories/${payload.categoryId}/tasks/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          this.toastSwal(`Successfully edit your task`);
          this.fetchUserDetail();
          this.socket.emit('newData', { msg: '', userId: '', projectId: '' });
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        });
    },
    deleteTask(payload) {
      axios({
        method: 'delete',
        url: `/projects/${payload.projectId}/categories/${payload.categoryId}/tasks/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
            Swal.fire(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            )
            this.fetchUserDetail();
            this.socket.emit('newData', { msg: '', userId: '', projectId: '' });
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
        })
    },
    patchTask(payload) {
      payload.CategoryId = payload.newCategoryId;
      axios({
        method: 'patch',
        url: `/projects/${payload.projectId}/categories/${payload.CategoryId}/tasks/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          this.toastSwal(`${data.title} has been successfully moved`);
          this.socket.emit('newData', { msg: '', userId: '', projectId: '' });
        })
        .catch(err => {
          this.swalFailed(err.response.data.error);
          this.fetchUserDetail();
        })
    },
    addMember(payload) {
      axios({
        method: 'POST',
        url: `/projects/${payload.projectId}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          this.toastSwal(`Successfully add ${data.name} as project collaborator`);
          this.fetchUserDetail();
          this.socket.emit('newData', { msg: `${this.userDetail.name} has added you to his/her project`, userId: data.UserId, projectId: '' });
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
    this.socket = io(this.server);
    this.isLogin();
    this.socket.on('dataChanged', (payload) => {
      if (this.userDetail) {
        this.fetchUserDetail();
        this.fetchUsers();
        if (!payload.userId && !payload.projectId && payload.msg) {
          this.toastSwal(payload.msg);
        } else if (payload.userId === this.userDetail.id && !payload.projectId) {
          this.toastSwal(payload.msg);
        } else if (payload.projectId) {
          for (const project of this.userDetail.Projects) {
            if (project.id === payload.projectId && this.userDetail.id != payload.createdBy) this.toastSwal(`${payload.msg} ${project.name} project`); 
          }
        }
      }
    });
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
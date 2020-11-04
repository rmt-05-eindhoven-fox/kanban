let app = new Vue({
  el: "#app",
  data: {
    "server": 'http://localhost:3000',
    "icon_logo": "https://image.flaticon.com/icons/png/128/3192/3192595.png",
    "app_name": "KhanBhanBoard",
    "default_page": "login-page",
    "login_user": '',

    // LOGIN
    "email_login": '',
    "password_login": '',
    "remember": false,

    // REGISTER
    "email_register": '',
    "password_register": '',

    // ADD NEW TASK
    "new_task": {
      title: '',
      description: '',
      category: ''
    },
    "addNewTaskForm": false,

    // TASKS
    "backlogs": [],
    "todos": [],
    "doings": [],
    "dones": [],

    // EDIT TASK
    "edit_task": {
      title: '',
      description: ''
    },
    "editTaskId": '',
    "editTaskForm": false,

    // MOVE TASK
    "move_task": {
      category: ''
    },
    "moveTaskId": '',
    "moveTaskForm": false,
  },
  methods: {
    changePage(name) {
      this.default_page = name;
    },
    login() {
      email = this.email_login;
      password = this.password_login;
      axios({
        method: 'POST',
        url: this.server + '/login',
        data: {
          email: this.email_login,
          password: this.password_login
        }
      })
      .then((result) => {
        let access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);

        // User Login
        this.login_user = result.data.email;

        // Reset Form Login
        if (!this.remember) {
          this.email_login = '';
          this.password_login= '';
        }

        this.changePage('home-page');
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    onSignIn(googleUser) {
      var google_access_token = googleUser.getAuthResponse().id_token;
      console.log(google_access_token);
      axios({
        method: 'POST',
        url: this.server + '/loginGoogle',
        data: {
          google_access_token
        }
      })
      .then((result) => {
        let access_token = result.data.access_token;
        localStorage.setItem('access_token', access_token);

        // User Login
        this.login_user = result.data.email;

        // Reset Form Login
        this.email_login = '';
        this.password_login= '';

        this.changePage('home-page');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    register() {
      axios({
        method: 'POST',
        url: this.server + '/register',
        data: {
          email: this.email_register,
          password: this.password_register
        }
      })
      .then((result) => {
        // Reset Form Register
        this.email_register = '';
        this.password_register= '';

        this.changePage('login-page');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    logout() {
      this.changePage('login-page');
      localStorage.clear();
      // // Google Signout di Taruh disini!
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });
    },
    isLogin() {
      if (localStorage.access_token) {
        this.default_page = 'home-page';
        this.readAllTasks();
      } else {
        this.default_page = 'login-page';
      }
    },
    showAddNewTaskForm() {
      this.addNewTaskForm = true;
    },
    closeAddNewTaskForm() {
      this.addNewTaskForm = false;
    },
    addNewTask() {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "POST",
        url: this.server + '/tasks',
        headers: {
          access_token
        },
        data: {
          title: this.new_task.title,
          description: this.new_task.description,
          category: this.new_task.category
        }
      })
      .then((result) => {
        // Reset Form Add New Task
        this.new_task.title = '';
        this.new_task.description = '';
        this.new_task.category = '';
        
        this.addNewTaskForm = false;
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    readAllTasks() {
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "GET",
        url: this.server + '/tasks',
        headers: {
          access_token
        }
      })
      .then((result) => {
        // Empty first before fetch new data!
        this.backlogs = [];
        this.todos = [];
        this.doings = [];
        this.dones = [];
        result.data.forEach(task => {
          if (task.category === 'Backlog') {
            this.backlogs.push(task);
          } else if (task.category === 'Todo') {
            this.todos.push(task);
          } else if (task.category === 'Doing') {
            this.doings.push(task);
          } else if (task.category === 'Done') {
            this.dones.push(task);
          }
        });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    deleteTask(id) {
      const access_token = localStorage.getItem('access_token');
      axios({
        url: this.server + `/tasks/${+id}`,
        method: 'DELETE',
        headers: {
            access_token
        }
      })
      .then((result) => {
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    showEditTaskForm(id, title, desc) {
      this.editTaskForm = true;
      this.edit_task.title = title;
      this.edit_task.description = desc;
      this.editTaskId = +id;
    },
    closeEditTaskForm() {
      // Reset Form Edit Task
      this.edit_task.title = '';
      this.edit_task.description = '';
      this.editTaskId = '';
      this.editTaskForm = false;
    },
    editTask() {
      let id = +this.editTaskId;
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "PUT",
        url: this.server + `/tasks/${id}`,
        headers: {
          access_token
        },
        data: {
          title: this.edit_task.title,
          description: this.edit_task.description
        }
      })
      .then((result) => {
        // Reset Form Edit Task
        this.edit_task.title = '';
        this.edit_task.description = '';
        this.editTaskId = '';
        
        this.editTaskForm = false;
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    },
    showMoveTaskForm(id, category) {
      this.moveTaskForm = true;
      this.move_task.category = category;
      this.moveTaskId = +id;
    },
    closeMoveTaskForm() {
      // Reset Form Move Task
      this.move_task.title = '';
      this.moveTaskId = '';
      this.moveTaskForm = false;
    },
    moveTask() {
      let id = +this.moveTaskId;
      const access_token = localStorage.getItem('access_token');
      axios({
        method: "PATCH",
        url: this.server + `/tasks/${id}`,
        headers: {
          access_token
        },
        data: {
          category: this.move_task.category
        }
      })
      .then((result) => {
        // Reset Form Move Task
        this.move_task.title = '';
        this.moveTaskId = '';
        
        this.moveTaskForm = false;
        this.default_page = 'home-page';
        this.readAllTasks();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    }
  },
  created() {
    this.isLogin();
  }
});
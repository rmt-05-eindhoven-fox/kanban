let app = new Vue({
  el: '#app',
  data: {
    pageName: 'home-page',
    server: 'http://localhost:3000',
    access_token: localStorage.getItem('access_token'),
    activeUser: '',
    formLogin: {
      email: '',
      password: ''
    },
    formRegister: {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const user = this.formLogin;

        const loginUser = await axios({
          url: this.server + '/login',
          method: 'post',
          data: user
        });

        localStorage.setItem('access_token', loginUser.data.access_token);
        this.activeUser = loginUser.data.name;
        this.pageName = 'user-page';
      } catch (err) {
        console.log(err);
      }
    },
    async register() {
      try {
        const user = this.formRegister;

        const regisUser = await axios({
          url: this.server + '/register',
          method: 'post',
          data: user
        });

        console.log(regisUser);
      } catch (err) {
        console.log(err);
      }
    }
  }
})
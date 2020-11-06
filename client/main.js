let app = new Vue({
    el: '#app',
    data: {
        pageName: 'login-page',
        user: {
            email: '',
            password: ''
        }
    },
    methods: {
        changePage(name) {
            this.pageName = name;
        },
        login() {
            let payload = this.user
            console.log(payload);

            axios({
                url: 'http://localhost:3000/login',
                data: payload,
                method: 'POST'
            })
            .then(result => {
                localStorage.setItem('access_token', this.user.email)
                this.changePage('content-page')
            })
        }
    }
})
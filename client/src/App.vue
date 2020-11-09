<template>
  <div class="main">
		<!-- landing-page -->
		<LandingPage 
			v-if="pageName == 'LandingPage'"
			@register="register"
			@login="login">
		</LandingPage>

		<HomePage 
		v-else-if="pageName == 'HomePage'"
		:categories="categories"
		:tasks="tasks"
		@addTask="addTask"
		@assignTask="assignTask"
		@deleteTask="deleteTask"
		@logout="logout">
		</HomePage>		
	
		
	</div>
</template>

<script>
import axios from './config/axios'
import LandingPage from './components/landing-page'
import HomePage from './components/home-page'
export default {
	name: 'App',
  data() {
    return {
			pageName: 'LandingPage',
			access_token: localStorage.getItem('access_token'),
			tasks: [],
			categories: []
    };
	},
	components: {
		LandingPage, HomePage
	},
	methods: {
		checkLogin() {
			if (this.access_token) {
				this.fetch()
				this.fetchCategory()
				this.pageName = 'HomePage'
			} else {
				this.pageName = 'LandingPage'
			}
		},
		register(payload) {
			axios({
				url: '/users/register',
				method: 'post',
				data: {
					username: payload.username,
					email: payload.email,
					password: payload.password
				}
			})
				.then(result => {
					console.log(`register success`);
				})
				.catch (err => {
					console.log(err.response);
				})	
		},
		login(payload) {
			axios({
				url: '/users/login',
				method: 'post',
				data: {
					email: payload.email,
					password: payload.password
				}
			})
				.then(result => {
					const access_token = result.data.access_token
					this.access_token = access_token
					localStorage.setItem('access_token', access_token)
					console.log(result);
					this.checkLogin()
				})
				.catch (err => {
					console.log(err.response);
				})
		},
		fetch () {
			axios({
				method: 'get',
				url: '/tasks',
				headers: {
					access_token: this.access_token
				}
			})
				.then(result => {
					this.tasks = result.data
				})
				.catch(err => {
					console.log(err);
				})
		},
		addTask (payload) {
			axios({
				method: 'post',
				url: '/tasks',
				headers: {
					access_token: this.access_token
				},
				data: {
					title: payload.title,
					description: payload.description
				}
			})
				.then(result => {
					console.log(`success`);
					this.checkLogin()
				})
				.catch(err => {
					console.log(err);
				})
		},
		edit (payload) {
			axios({
				method: 'patch',
				url: `/tasks/${payload.id}`,
				headers: {
					access_token: this.access_token
				},
				data: {
					category: payload.category
				}
			})
				.then(result => {
					console.log(result);
				})
				.catch(err => {
					console.log(err);
				})
		},
		deleteTask (id) {
			axios({
				method: 'delete',
				url: `/tasks/${id}`,
				headers: {
					access_token: this.access_token
				}
			})
				.then(result => {
					console.log(result);
					this.checkLogin()
				})
				.catch(err => {
					console.log(err);
				})
		},
		assignTask(id) {
			axios({
				method: 'put',
				url: `/tasks/${id}`,
				headers: {
					access_token: this.access_token
				}
			})
				.then(result => {
					console.log(result)
					this.checkLogin()
				})
				.catch(err => {
					console.log(err);
				})
		},
		fetchCategory() {
			axios({
				method: 'get',
				url: '/categories',
				headers: {
					access_token: this.access_token
				}
			})
				.then(result => {
					this.categories = result.data
				})
				.catch(err => {
					console.log(err);
				})
		},
		logout() {
			localStorage.clear()
			this.access_token = ''
			this.checkLogin()
		}
	},
	created() {
		this.checkLogin()
	}
};
</script>

<style scoped>
</style>
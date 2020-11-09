<template>
	<div>
		<HeaderNavbar> </HeaderNavbar>

		<LandingPage
			v-if="currentPage === 'landing-page'"
			:currentPage="currentPage"
			@changePage="changePage"
		>
		</LandingPage>

		<LoginPage v-else-if="currentPage === 'login-page'" @login="login">
		</LoginPage>

		<BoardPage
			v-else-if="currentPage === 'board-page'"
			:categories="categories"
			:tasks="tasks"
			@fetchTasks="fetchTasks"
			@signOut="signOut"
		>
		</BoardPage>

		<RegisterPage v-else-if="currentPage === 'register-page'"> </RegisterPage>

		<NotFoundPage v-else> </NotFoundPage>
	</div>
</template>

<script>
import HeaderNavbar from "./components/HeaderNavbar";
import BoardPage from "./components/BoardPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NotFoundPage from "./components/NotFoundPage";
import LandingPage from "./components/LandingPage";

import axios from "../config/axios";

export default {
	name: "App",
	data() {
		return {
			currentPage: "landing-page",
			imgLanding: "../img/goals.svg",
			tasks: [],
			categories: [
				{
					id: 1,
					name: "BACKLOG",
				},
				{
					id: 2,
					name: "TODO",
				},
				{
					id: 3,
					name: "DONE",
				},
				{
					id: 4,
					name: "COMPLETE",
				},
			],
		};
	},
	components: {
		BoardPage,
		LoginPage,
		RegisterPage,
		NotFoundPage,
		HeaderNavbar,
		LandingPage,
	},
	methods: {
		changePage(name) {
			this.currentPage = name;
			this.fetchTasks();
		},
		checkAuth() {
			if (localStorage.access_token) {
				this.currentPage = "board-page";
				this.fetchTasks();
			} else {
				this.currentPage = "landing-page";
			}
		},
		login(payload) {
			axios({
				url: "/login",
				method: "POST",
				data: {
					email: payload.email,
					password: payload.password,
				},
			})
				.then((data) => {
					const access_token = data.data.access_token;
					localStorage.setItem("access_token", access_token);
					console.log(data, "login berhasil");
					this.currentPage = "board-page";
					this.fetchTasks();
				})
				.catch((err) => {
					console.log(err);
				}, " gagal login");
		},
		registerForm() {
			axios({
				method: "POST",
				url: "/register",
				data: {
					email: this.email,
					password: this.password,
				},
			})
				.then(({ data }) => {
					this.currentPage = "login-page";
					(this.email = ""), (this.password = "");
				})
				.catch((err) => {
					console.log(err);
				});
		},
		fetchTasks() {
			const access_token = localStorage.getItem("access_token");
			// localStorage.setItem("access_token", access_token);
			axios({
				url: "/tasks",
				method: "GET",
				headers: {
					access_token: access_token,
				},
			})
				.then(({ data }) => {
					console.log(data, " <<< ini dari data");
					this.tasks = data;
					// this.$emit("fetchTasks");
				})
				.catch((err) => {
					console.log(err, "<<<< ini error nih fetch nya");
				});
		},


	},
};
</script>

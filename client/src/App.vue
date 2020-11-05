<template>
	<div>
		<HeaderNavbar> </HeaderNavbar>

		<LandingPage v-if="pageName == 'landing-page'"> </LandingPage>

		<LoginPage v-else-if="pageName == 'login-page'"> </LoginPage>

		<BoardPage 
        v-else-if="pageName == 'board-page'" 
        :categories="categories">
        </BoardPage>

		<RegisterPage v-else-if="pageName == 'register-page'"> </RegisterPage>

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

export default {
	name: "App",
	data() {
		return {
			message: "hello world",
			pageName: "board-page",
			categories: [
				{
					"id": 1,
					"name": "BACKLOG",
				},
				{
					"id": 2,
					"name": "TODO",
				},
				{
					"id": 3,
					"name": "DONE",
				},
				{
					"id": 4,
					"name": "COMPLETE",
				},
			],
		};
	},
	methods: {
		changePage(name) {
			this.pageName = name;
		},
	},
	components: {
		BoardPage,
		LoginPage,
		RegisterPage,
		NotFoundPage,
		HeaderNavbar,
		LandingPage,
	},
};
</script>

<template>
	<!---login---------------------------------------------------------------->
	<section id="login-page">
		<div class="login-page-left"></div>
		<div class="login-page-right">
			<div class="logo">
				<img v-bind:src="imgLanding" width="500" />
			</div>
			<h1>Sign In</h1>
			<form id="submit-login" @submit.prevent="login">
				<label>Email:</label>
				<input type="email" id="email-login" v-model="email" />
				<label>Password:</label>
				<input type="password" id="password-login" v-model="password" />
				<br />
				<button class="login-btn" type="submit">Sign in</button> <br />
			</form>
			<span
				>Don't have an account?
				<a
          @click.prevent="keRegist"
					href="#"
					id="go-to-register"
					
					>Register Now!</a
				></span
			>
		</div>
	</section>

	<!-----end-of-login-------------------------------------------------------------------->
</template>

<script>
export default {
	name: "LoginPage",
	data() {
		return { email: "", password: "" };
	},
	props: ["currentPage", "imgLanding"],
	methods: {
		login() {
			const payload = { email: this.email, password: this.password };

			this.$emit("login", payload);
		},
		keRegist() {
			this.$emit("changePage", "register-page");
		},
	},
};
</script>

<style></style>

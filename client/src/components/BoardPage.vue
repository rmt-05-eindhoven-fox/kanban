<template>
	<!----------------------------------BOARD ------------------------------------->
	<section>
		<HeaderNavbar @signOut="signOut"> </HeaderNavbar>

		<div class="container-fluid mt-4">
			<div class="row mt-3 d-flex">
				<Category
					v-for="category in categories"
					v-bind:key="category.id"
					:tasks="tasks"
					:categoriesDetail="category"
					@addTask="addTask"
				>
				</Category>
			</div>
		</div>
	</section>
</template>

<script>
import Category from "./Category";
import HeaderNavbar from "./HeaderNavbar";
import axios from "../../config/axios";

export default {
	name: "BoardPage",
	components: {
		Category,
		HeaderNavbar,
	},
	props: ["categories", "tasks"],
	methods: {
		addTask(payload) {
			console.log(payload, "<<<<<<<< ini isi paylod euy di board");
			axios({
				method: "POST",
				url: `/tasks/${payload.id}`,
				headers: {
					access_token: localStorage.access_token,
				},
				data: {
					title: payload.title,
					description: payload.description,
				},
			})
				.then((data) => {
					this.$emit("fetchTasks");
				})
				.catch((err) => {
					console.log(err);
				});
		},
		signOut() {
			console.log("<<<<<<<<<<<<<<<<<<<INI SIGN OUT");
			this.$emit("signOut");
		},
	},
};
</script>

<style></style>
y

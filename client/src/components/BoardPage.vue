<template>
	<!----------------------------------BOARD ------------------------------------->
	<section>
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

export default {
	name: "BoardPage",
	components: {
		Category,
	},
	props: ["categories", "tasks"],
	methods: {
		addTask(payload) {
			axios({
				method: "POST",
				url: `/tasks/${this.id}`,
				headers: {
					access_token: localStorage.access_token,
				},
				data: payload,
			})
				.then((data) => {
					this.$emit("fetchTasks");
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style></style>
y

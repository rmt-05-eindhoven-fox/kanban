<template>
	<!----------------------------------BOARD ------------------------------------->
	<section>
		<div class="container-fluid mt-4">
			<div class="row mt-3 d-flex">
				<Category v-for="category in categories" v-bind:key="category.id">
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
	props: ["categories"],
};
</script>

<style></style>

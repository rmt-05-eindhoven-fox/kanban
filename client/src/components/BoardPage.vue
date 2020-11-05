<template>
	<!----------------------------------BOARD ------------------------------------->
	<section>
		<div class="container-fluid mt-4">
			<div class="row mt-3 d-flex">
				<div class="category col-sm-3">
					<Category> </Category>
				</div>

				<div class="category col-sm-3">
					<Category> </Category>
				</div>

				<div class="category col-sm-3">
					<Category> </Category>
				</div>

				<div class="category col-sm-3">
					<Category> </Category>
				</div>
        
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
};
</script>

<style></style>

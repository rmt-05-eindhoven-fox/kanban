<template>
	<!-- CARD BODY -->
	<div>
		<div class="container-fluid" v-for="(taskbycategory, i) in task.Tasks" :key="i">
			<div class="card container-fluid mb-2 mr-3 rounded" width="100%;">
				<div class="card-body">
					<h5 class="card-title"> {{ taskbycategory.title }}</h5>
					<h6 class="card-subtitle m-2 text-muted">
						{{ taskbycategory.description }}
					</h6>
					<a href="#" class="delete-task">Delete task</a>
				</div>
			</div>
		</div>
	</div>

	<!-- end of card body ----------------------------------------------->

	<!-- END OF CARD ----------------------------------------------------->
</template>

<script>
export default {
	name: "Task",
	components: {},
	props: ["task"],
};
</script>

<style></style>
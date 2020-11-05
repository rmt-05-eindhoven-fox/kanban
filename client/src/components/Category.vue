<template>
	<div class="category-section">
		<!-- CATEGORY--------BACKLOG---------------------------------------------------------->
		<div class="category-title pt-1 mt-5">
			<h2 class="mt-2 ml-3">B A C K L O G</h2>
		</div>
		<!-- CATEGORY HEADER ---------------------------------------------------------------->
		<div class="category-content overflow-auto m-3">
			<div class="row">
				<Task> </Task>

				<Task> </Task>

				<Task> </Task>
			</div>
		</div>
		<!-- CATEGORY FOOTER -->
		<div class="category-footer p-3 mr-4">
			<form @submit.prevent="addTask" v-show="isShow" class="mb-2">
				<input
					v-model="title"
					type="text"
					placeholder="add title"
					style="border: none"
					class="card container-fluid mb-2"
				/>
				<textarea
					v-model="description"
					placeholder="add description"
					style="border: none"
					class="card container-fluid"
				>
				</textarea>
				<div id="post-decision">
					<button @click="closeAddTask" class="btn btn-success btn-sm">
						<i class="fa fa-check"></i>&nbsp;
					</button>
					<button @click="closeAddTask" class="btn btn-danger btn-sm">
						<i class="fa fa-close"></i>
					</button>
				</div>
			</form>
			<div v-show="!isShow">
				<button @click="showAddTask" class="btn rounded btn-add-task p-2">
					ADD TASK
				</button>
			</div>
		</div>
		<!-- END CATEGORY FOOTER -------------------------------------------------->
	</div>
</template>

<script>
import Task from "./Task";
export default {
	name: "Category",
	components: {
		Task,
	},
};
</script>

<style></style>

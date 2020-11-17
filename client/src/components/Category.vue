<template>
	<div class="category col-sm-3">
		<div class="category-section">
			<!-- CATEGORY--------BACKLOG---------------------------------------------------------->
			<div class="category-title pt-1 mt-5">
				<h2 class="mt-2 ml-3">
					{{ categoriesDetail.name }}
					{{ categoriesDetail.id }}
				</h2>
			</div>
			<!-- CATEGORY HEADER ---------------------------------------------------------------->
			<div class="category-content overflow-auto m-3">
				<div class="row">
					<div></div>
					<Task
						v-for="task in TaskperCategory"
						:key="task.id"
						:task="task"
						class="container-fluid"
					>
					</Task>
				</div>
			</div>
			<!-- CATEGORY FOOTER -->
			<div class="category-footer p-3 mr-4">
				<!-- form add task -->
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
				</form>

				<div v-if="isShow" id="post-decision">
					<button
						@click="addTask(categoriesDetail.id)"
						type="submit"
						class="btn btn-success btn-sm"
					>
						<i class="fa fa-check"></i>&nbsp;
					</button>

					<button @click="isShow = !isShow" class="btn btn-danger btn-sm">
						<i class="fa fa-close"></i>
					</button>
				</div>

				<div v-else-if="!isShow">
					<button @click="isShow = true" class="btn rounded btn-add-task p-2">
						ADD TASK
					</button>
				</div>
			</div>
			<!-- END CATEGORY FOOTER -------------------------------------------------->
		</div>
	</div>
</template>

<script>
import Task from "./Task";
export default {
	name: "Category",
	data() {
		return {
			isShow: false,
			title: "",
			description: "",
		};
	},
	components: {
		Task,
	},
	props: ["categoriesDetail", "tasks"],
	computed: {
		TaskperCategory() {
			return this.tasks.filter(
				(tasks) => tasks.id === this.categoriesDetail.id
			);
		},
	},
	methods: {
		addTask(id) {
			console.log(id, "<<<<<<<< ini id");
			let payload = {
				id: id,
				title: this.title,
				description: this.description,
			};
			this.$emit("addTask", payload);
		},
	},
};
</script>

<style></style>

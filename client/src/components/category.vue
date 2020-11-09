<template>
	<div class="col">
		<h2 class="header">{{ category.name }}</h2>
		<Task v-for="task in taskPerCategory"
		:key="task.id"
		:task="task"
		@assignTask="assignTask"
		@deleteTask="deleteTask"></Task>
	</div>
</template>

<script>
import Task from './task'
export default {
	name: 'Category',
	components: {
		Task
	},
	props: [ 'category', 'tasks' ],
	computed: {
		taskPerCategory() {
			return this.tasks.filter(el =>
				el.CategoryId == this.category.id
			)
		}
	},
	methods: {
		deleteTask(id) {
			this.$emit("deleteTask", id)
		},
		assignTask(id) {
			this.$emit("assignTask", id)
		}
	}
}
</script>

<style>
.card {
	margin-bottom: 10px
}

a {
	text-decoration: none;
	color: black;
}
</style>
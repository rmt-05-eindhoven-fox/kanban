<template>
	<div class="card">
		<div class="card-body">
			<div class="title">
				<h5 class="card-title">{{task.title}}</h5>
				<button @click.prevent="assignTask" class="fas fa-check" v-if="task.CategoryId == 1"></button>
			</div>
			<p class="card-text">{{task.description}}</p>
			<p v-if="task.CategoryId != 1">by: {{task.User.username}}</p>
			<button class="fas fa-edit"></button>
			<button @click="deleteTask" class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Task',
	props: [ 'task' ],
	methods: {
		deleteTask() {
			this.$emit("deleteTask", this.task.id)
		},
		assignTask() {
			this.$emit("assignTask", this.task.id)
		}
	}
	
}
</script>

<style>
.title {
	display: flex;
	justify-content: space-between;
}

.card {
	height: 170px;
}
</style>
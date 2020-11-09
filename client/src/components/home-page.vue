<template>
	<div>
		<NavBar @logout="logout"></NavBar>
		<AddPage @addTask="addTask"></AddPage>
		<div class="container">
			<div class="row">
				<Category v-for="cat in categories" :key="cat.id"
				:category="cat"
				:tasks="tasks"
				@assignTask="assignTask"
				@deleteTask="deleteTask"></Category>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from './navbar'
import AddPage from './addTask'
import Category from './category'
export default {
	name: 'HomePage',
	components: {
		NavBar, Category, AddPage
	},
	props: [ 'categories', 'tasks' ],
	methods: {
		logout() {
			this.$emit("logout")
		},
		addTask(payload) {
			this.$emit("addTask", payload)
		},
		deleteTask(id) {
			this.$emit("deleteTask", id)
		},
		assignTask(id) {
			this.$emit("assignTask", id)
		}
	}
}
</script>

<style scoped>

</style>
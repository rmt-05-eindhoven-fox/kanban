<template>
	<nav class="navbar">
		<a href="" class="navbar-brand">Kanban</a>
		<div>
			<b-button id="show-btn" @click="$bvModal.show('bv-modal-example')" variant="primary">Add Task</b-button>
		</div>
		<button @click="logout" class="btn btn-primary">Sign Out</button>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	methods: {
		logout() {
			this.$emit("logout")
		}
	}
}
</script>

<style scoped>
.navbar {
	background-color: aqua;
	margin-bottom: 20px;
}
</style>
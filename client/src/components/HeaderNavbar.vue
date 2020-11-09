<template>
	<header class="navbar fixed-top">
		<div id="logo">
			<img src="../img/kanbattefit.png" alt="" width="270px" />
		</div>

		<div class="links">
			<ul>
				<li>
					<button @click="signOut" class="btn rounded btn-logout mt-3 mr-3">
						SIGN OUT
					</button>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	methods: {
		signOut() {
			console.log("<<<<<<<<<<<<<<<<<<<INI SIGN OUT");
			this.$emit("signOut");
		},
	},
};
</script>

<style></style>

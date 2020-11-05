<template>
  <div class="main">
		<!-- landing-page -->
		<HomePage></Homepage>
		
	</div>
</template>

<script>
import HomePage from './components/landing-page'
export default {
	name: 'App',
  data() {
    return {
      message: ' world',
    };
	},
	components: {
		HomePage: HomePage
	}
};
</script>

<style scoped>
</style>
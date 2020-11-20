<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  name: 'Home',
  methods: {
    checkCredentials () {
      const accessToken = localStorage.getItem('access_token')
      if (!accessToken) {
        this.$router.push('/landing-page')
      }
    }
  },
  components: {
    Header
  },
  mounted () {
    this.checkCredentials()
  }
}
</script>

<style scoped>

</style>

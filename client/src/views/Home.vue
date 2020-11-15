<template>
  <div>
    <Header />
    <Tasks />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Tasks from '../components/Tasks.vue'
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
    Header,
    Tasks
  },
  mounted () {
    this.checkCredentials()
  }
}
</script>

<style scoped>

</style>

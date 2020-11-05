<template>
  <div>
    <!-- ! home-page -->
    <HomePage v-if="pageName === 'home-page'"></HomePage>
    <!-- ! user-page -->
    <UserPage v-else></UserPage>
  </div>
</template>

<script>
import HomePage from './components/HomePage'
import UserPage from './components/UserPage'
export default {
  name: 'KanbanApp',
  data() {
    return {
      msg: 'Hello World',
      pageName: 'home-page',
      server: 'http://localhost:3000',
      access_token: localStorage.getItem('access_token'),
      activeUser: '',
      formLogin: {
        email: '',
        password: ''
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    HomePage,
    UserPage
  }
}
</script>

<style>
 input {
    border: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
    border-bottom: 1px solid black !important;
    border-radius: 0 !important;
  }
</style>
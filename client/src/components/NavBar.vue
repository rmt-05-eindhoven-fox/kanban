<template>
  <div id="nav-bar">
      <ul class="nav d-flex justify-content-between align-items-center p-2 bg-light">
        <li class="nav-item ml-3">
          <img src="../../Scrum_board.svg" >
        </li>

        <li class="nav-item ml-3">
          <h3 ></h3>
        </li>
        
        <li class="nav-item mr-3">
          <a 
            @click="logout"
            class="nav-link font-weight-bold btn btn-secondary">Logout</a>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: function() {
    return {
      // access_token: localStorage.getItem('access_token')
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>

<template>
  <!--NAVBAR-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Kanban</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">           
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click.prevent="logout" href="#">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--END NAVBAR-->
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$emit('logout', 'logout')
    }
  }
}
</script>

<style>

</style>
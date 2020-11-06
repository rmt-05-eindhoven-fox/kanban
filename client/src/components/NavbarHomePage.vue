<template>
  <!-- NAVBAR HOME PAGE -->
  <section id="navbar-homepage">
    <div class="container-fluid navbar d-flex navbar-dark text-light p-2">
      <div class="logo">
        <nav>
          <a class="navbar-brand" href="#">
            <img src="https://image.flaticon.com/icons/png/128/3192/3192595.png" width="30" height="30" class="icon-logo d-inline-block align-top" alt="kanban-icon" loading="lazy">
            KhanBhanBoard
          </a>
        </nav>
      </div>
      <div class="d-flex align-items-center logout">
        <div id="user-login" class="mr-4">
          <span class="rainbow">Hello! {{ login_user }}</span>
        </div>
        <button @click="logout()" type="button" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </section>
  <!-- NAVBAR HOME PAGE -->
</template>

<script>
export default {
  name: 'NavbarHomePage',
  props: ['login_user'],
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$emit('logout');
    }
  }
}
</script>

<style>

</style>
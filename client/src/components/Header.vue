<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#" class="text-light"><font-awesome-icon icon="clipboard-list" /> Kanban App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right variant="secondary">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em class="text-light">{{email}}</em>
          </template>
          <b-dropdown-item @click="logout"><router-link to="landing-page">Sign Out</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    email () {
      return this.$store.state.email
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/landing-page')
    }
  }
}
</script>

<style>

</style>

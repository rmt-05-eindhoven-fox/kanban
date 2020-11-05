<template>
  <nav class="navbar navbar-light bg-light">
      <div>
        <i class="fas fa-tasks navbar-brand"></i>
        Kanban
      </div>
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"> {{ getFullName }} </a>
            <div class="dropdown-menu">
              <a v-on:click.prevent="logout" class="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: [ 'logged_last_name', 'logged_first_name' ],
  methods: {
    logout(){
      this.$emit('logout')
    }
  },
  computed: {
    getFullName(){
      return this.logged_first_name + ' ' + this.logged_last_name
    }
  }
}
</script>

<style>

</style>
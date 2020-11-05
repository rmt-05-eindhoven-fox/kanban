<template>
  <!--NAVBAR-->
  <nav>
    <div class="links">
      <ul>
        <li>
          <a href="#">Kanban</a>
        </li>
        <li>
          <a @click.prevent="logout" href="#">Log Out</a>
        </li>
      </ul>
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
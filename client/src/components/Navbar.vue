<template>
  
<nav class = "navbar sticky" style="width:100%">
    <div class = "navbar container">
      <div class = "group-left">
        <img src="../../img/kanban_logo.png" style="width:50px" alt="Logo">

      </div>

      <div class = "group-right">
        <h1 
          @click.prevent = "userLogout"
          style="color: #21206f; margin:0; cursor: pointer;">Logout</h1>
      </div>

    </div>
  </nav>

</template>

<script>
export default {
  name : "Navbar",
  methods : {
    userLogout(){
      this.$emit('userLogout')
    }
  }
}
</script>

<style>

</style>
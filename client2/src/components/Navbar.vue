<template>
  
<nav class = "navbar sticky" style="width:100%">
    <div class = "navbar container">
      <div class = "group-left">
        <img src="../../img/kanban_logo.png" style="width:50px" alt="Logo">
        <h1 style="line-height:35px">Kanban App</h1>

      </div>

      <div class = "group-right">
        <h1 
          @click.prevent = "logout"
          style="color: #21206f; margin:0; cursor: pointer;">Logout</h1>
      </div>

    </div>
  </nav>

</template>

<script>
export default {
  name : "Navbar",
  methods : {
    logout(){
      this.$emit('logout')
    }
  }
}
</script>

<style>
.group-left{
  display : flex;
  justify-content: center;
}
.group-left h1{
  margin-left : 20px;
  margin-bottom: 0px;
}
</style>
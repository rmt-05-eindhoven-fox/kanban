  
<template>
  
  <nav class = "navbar sticky" style="width:100%">
    <div class = "navbar container">
      <div class = "group-left">
        <h4 style="line-height:20px; color:white;">KANBAN!</h4>
      </div>

      <div class = "group-right">
        <h4 
          @click.prevent = "userLogout"
          style="color: #21206f; margin:0; cursor: pointer; color:white;">Logout</h4>
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
.group-left{
  display : flex;
  justify-content: center;
}
.group-left h1{
  margin-left : 20px;
  margin-bottom: 0px;
}
</style>
  
<template>
  
  <nav class = "navbar sticky" style="width:100%">
    <div class = "navbar container">
      <div class = "group-left">
        <h3 style="line-height:35px">KANBAN!</h3>
      </div>

      <div class = "group-right">
        <h3 
          @click.prevent = "userLogout"
          style="color: #21206f; margin:0; cursor: pointer;">Logout</h3>
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
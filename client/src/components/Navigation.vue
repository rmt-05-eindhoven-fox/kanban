<template>
<nav class="navbar navbar-expand-lg">
 <a class="navbar-brand text-dark font-weight-bold" href="#" style="font-size: 1.2em">Kanban</a>
 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
 </button>

 <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">

  </ul>
  <form class="form-inline my-2 my-lg-0">
   <!-- Another variation with a button -->
   <div class="input-group">
    <div class="input-group-append">
     <button @click="toAddPage" class="btn btn-outline-success mr-2" type="button">
      Add Task
     </button>
     <button @click="toLoginPage" class="btn btn-outline-danger" type="button">
      Logout
     </button>
    </div>
   </div>
  </form>
 </div>
</nav>
<!-- NAV -->
</template>

<script>
export default {
 name: "Navigation",
 methods: {
  toAddPage() {
   this.$emit('toAddPage', 'add-page')
  },
  toLoginPage() {
   this.$emit('toLoginPage', 'login-page')
  }
 },
}
</script>

<style>

</style>

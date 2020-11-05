<template>
    <section id="landing-page" class="container-fluid p-4">
   <div class="row mt-5">
    <div class="col-md-6 mt-5 text-left order-sm-1">
     <h1 class="">
      <b>K A N B A T T E</b><br />
      when kanban meets ganbatte
     </h1>
     <h4 class="mt-1 sub-title">
      The Best scheduling system in The Country
     </h4>
     <a v-on:click.prevent="changePage('register-page')" href="#" class="btn slideUpBtn mt-1">Sign Up</a>
     &nbsp;

     <a v-on:click.prevent="changePage('login-page')" href="#" class="btn btn-add-task mt-1">Sign In</a>
    </div>
    <div class="col-md-6 mt-5 order-sm-2">
     <div class="">
      <img src="../img/goals.svg" width="500px" loading="lazy" class="images-fluid" />
     </div>
    </div>
   </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
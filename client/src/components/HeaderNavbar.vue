<template>
    <header class="navbar fixed-top">
   <div id="logo">
    <img src="../img/kanbattefit.png" alt="" width="270px" />
   </div>

   <div class="links">
    <ul>
     <li>
      <button v-on:click="changePage('landing-page')" class="btn rounded btn-logout mt-3 mr-3">
       SIGN OUT
      </button>
     </li>
    </ul>
   </div>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>
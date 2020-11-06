<template>
  <!-- HOME -->
  <section >

    <!-- NAVBAR -->
    <nav>
      <div id="logo">
        <img v-bind:src="'https://i2.wp.com/d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2020/01/15094433/hacktiv8-1.png?fit=280%2C280&ssl=1'" alt="" width="70px">
        <!-- <img :src="" alt="" width="50px"> -->
      </div>
      <div class="links">
        <!-- <ul>
          <li><a v-on:click.prevent="changePage('BackLog')" href="#">Backlog</a></li>
          <li><a v-on:click.prevent="changePage('To Do')"  href="#">To Do</a></li>
          <li><a @click.prevent="pageName='On Progress'"  href="#">On Progress</a></li>
          <li><a @click.prevent="pageName= 'Completed'"  href="#">Completed</a></li>
        </ul> -->

        <ul>
          <li><a href="#">Backlog</a></li>
          <li><a href="#">To Do</a></li>
          <li><a href="#">On Progress</a></li>
          <li><a href="#">Completed</a></li>
        </ul>
      </div>
      <div class="links icon">
        <ul>
          <li><a href=""><i class="fa fa-search"></i></a></li>
          <li><a href=""><i class="fa fa-envelope"></i></a></li>
          <li><a href=""><i class="fa fa-sign-out"></i></a></li>
        </ul>
      </div>
    </nav>
    <!-- END NAVBAR -->

  <!-- CARD -->
    <div class="container">
      <Category></Category>
    </div>
  <!-- END CARD -->
</section>
<!-- END HOME -->

</template>

<script>
import Category from "./Category"

export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    Category
  }
}
</script>

<style>

</style>
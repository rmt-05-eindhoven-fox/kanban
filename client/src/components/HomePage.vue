<template>
  <div>
    <nav>
      <div id="logo">
        Logo
        <!-- <img src="/assets/logo-kanban@2x.png" alt="" srcset="" /> -->
      </div>
      <div class="links">
        <ul>
          <li>Welcome, Username!</li>
          <li>
            <a href="#"><i class="fa fa-power-off"></i></a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- NAVBAR END -->

    <section class="container-fluid main-board">
      <div class="task-header">
        <h1>Task board</h1>
      </div>

      <!-- TASK BOARD -->
      <div class="task-board">
        <div class="row">
          <CategoryBoard></CategoryBoard>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryBoard from "./CategoryBoard";
export default {
  name: "Homepage",

  components: {
    CategoryBoard,
  },
};
</script>

<style></style>

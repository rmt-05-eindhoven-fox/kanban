<template>
  <!-- Main Content -->
  <section class="content">
    <div class="body_scroll horizontal-scrollable">
      <div class="block-header">
        <div class="row">
          <div class="col-lg-7 col-md-6 col-sm-12">
            <h2>Kanban</h2>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#"><i class="zmdi zmdi-home"></i> Home</a>
              </li>
              <li class="breadcrumb-item active">Taskboard</li>
            </ul>
            <button class="btn btn-primary btn-icon mobile_menu" type="button">
              <i class="zmdi zmdi-sort-amount-desc"></i>
            </button>
          </div>
          <div class="col-lg-5 col-md-6 col-sm-12">
            <button
              class="btn btn-primary btn-icon float-right right_icon_toggle_btn"
              type="button"
            >
              <i class="zmdi zmdi-arrow-right"></i>
            </button>
            <button class="btn btn-success btn-icon float-right" type="button">
              <i class="zmdi zmdi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="container-fluid testimonial-group">
        <div class="row flex-nowrap">
          <Category></Category>
          <Category></Category>
          <Category></Category> 
          <Category></Category> 
          <Category></Category> 
          <Category></Category> 
          <!-- List Category -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "../component/home/category.vue";

export default {
  name: "home-page",
  components: {
    Category,
  },
};
</script>

<style>
</style>
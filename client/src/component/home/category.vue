<template>
  <div class="col-lg-4 col-md-12">
    <div class="card">
      <div class="header">
        <h2><strong>Planned</strong></h2>
        <ul class="header-dropdown">
          <li class="dropdown">
            <a
              href="javascript:void(0);"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="zmdi zmdi-more"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-right slideUp">
              <li><a href="javascript:void(0);">Add Task</a></li>
              <li><a href="javascript:void(0);">Delete Category</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="body taskboard planned_task">
        <div class="dd" data-plugin="nestable">
          <ol class="dd-list">
            <!-- Task List -->
            <Task></Task>
            <Task></Task>
            <Task></Task>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./task";
export default {
  name: "comp-category",
  data() {
    return {};
  },
  components: {
    Task,
  },
};
</script>

<style>
</style>
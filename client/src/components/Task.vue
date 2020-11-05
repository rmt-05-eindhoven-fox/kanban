<template>
  <div>
    <div type="button" class="card bg-white mb-2 shadow rounded p-2">
      <div class="btn-group btn-task-menu">
        <button
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          :class="border"
        >
          menu
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item">Edit</button>
          <button class="dropdown-item">Delete</button>
        </div>
      </div>
      <div>
        <b class="mr-1">tes</b>
      </div>
      <div>
        tes <br />
        <small>tes@tes.com</small>
      </div>
      <div>
        <small class="mr-2">tanggal</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {};
  },
  props: ["border", "oneTask"],
};
</script>

<style>
</style>
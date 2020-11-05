<template>
  <li class="dd-item" data-id="1">
    <div class="dd-handle d-flex justify-content-between align-items-center">
      <div class="h6 mb-0">Themeforest update update update update asasa</div>
      <div class="action">
        <div class="btn-group">
          <button
            class="btn btn-info btn-outline-primary btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            More
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item p-2" href="javascript:void(0);"
              >Change Category</a
            >
            <a class="dropdown-item p-2" href="javascript:void(0);">Edit</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item p-2" href="javascript:void(0);">Delete</a>
          </div>
        </div>
      </div>
    </div>
    <div class="dd-content p-15">
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <ul class="list-unstyled d-flex bd-default align-items-center">
        <li class="mr-2 flex-grow-1 bd-default">
          <span class="badge badge-primary"
            ><i class="zmdi zmdi-time"></i> 18 Jan</span
          >
        </li>
        <li class="ml-3 bd-highlight">
          <ul class="list-unstyled team-info margin-0">
            <li>
              <img
                src="../images/profile.png"
                alt="Avatar"
                title="Riyan Pratama"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: "task",
};
</script>

<style>
</style>
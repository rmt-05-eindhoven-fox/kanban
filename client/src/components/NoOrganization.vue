<template>
  <div class="col d-flex justify-content-center main-col">
    <div class="align-self-center">
      <img
        src="../../img/login-kanban.png"
        alt=""
        class="kanban-illustration"
      />
      <h1 class="text-center brand-title">Hello, {{ user.name }}</h1>
      <h4 class="text-center">Choose organization to show board</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoOrganization",
  props: ["user"],
};
</script>

<style>
</style>
<template>
  <div class="card" style="width: 13rem; margin-top: 2vh;">
    <div class="card-body">
      <h5>{{taskDetail.title}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  props: ['taskDetail'],
  methods: {
  }

}
</script>

<style>

</style>
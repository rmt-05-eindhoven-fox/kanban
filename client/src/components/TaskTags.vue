<template>
  <span class="badge badge-pill" :style="{ 'background-color': tag.color }">{{
    tag.name
  }}</span>
</template>

<script>
export default {
  name: "TaskTags",
  props: ["tag"],
};
</script>

<style>
</style>
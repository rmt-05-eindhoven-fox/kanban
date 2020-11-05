<template>
  <div class="col mt-3">
    <h5 :class="tag.color">
      {{ tag.name }}
    </h5>
    <div
      class="bg-light pl-2 pr-2 pt-2 shadow card rounded"
      style="height: 75vh; overflow: scroll"
    >
      <Task
        :border="tag.border"
        v-for="el in task"
        :key="el.id"
        :oneTask="el"
      ></Task>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Category",
  data() {
    return {};
  },
  components: {
    Task,
  },
  props: ["tag", "task"],
};
</script>

<style>
</style>
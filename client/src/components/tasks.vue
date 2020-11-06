<template>
  <div class="row" style="width: 100%">
    <div class="col-12" style="">
      <div class="card">
        <div style="border-bottom: 1px dashed black">
          <h6>{{ task.title }}</h6>
        </div>
        <div class="btnCard">
          <!-- <a href=""><i class="fa fa-arrow-left" aria-hidden="true" style="font-size: 20px;"></i></a> -->
          <a href="" @click.prevent="toUpdateForm"
            ><i
              class="fa fa-pencil-square-o"
              aria-hidden="true"
              style="font-size: 20px"
            ></i
          ></a>
          <a href="" @click.prevent="deleteTask"
            ><i
              class="fa fa-trash"
              aria-hidden="true"
              style="font-size: 20px"
            ></i
          ></a>
          <!-- <a href=""><i class="fa fa-arrow-right" aria-hidden="true" style="font-size: 20px;"></i></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tasks",
  props: ["task"],
  methods: {
    toUpdateForm() {
      this.$emit("toUpdateForm", this.task);
    },
    deleteTask() {
      this.$emit("deleteTask", this.task.id);
    },
  },
};
</script>

<style>
</style>
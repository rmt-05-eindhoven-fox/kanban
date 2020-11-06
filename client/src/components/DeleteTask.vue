<template>
  <div>
    <a @click="deleteTask" href="#"><i class="fa fa-trash"></i></a>
  </div>
</template>

<script>
export default {
  name: "DeleteTask",
  props: ["idTask"],
  methods: {
    deleteTask(){
      this.$emit("deleteTask", this.idTask)
    }
  }
}
</script>

<style>

</style>
<template>
  <div>
  <!-- Button trigger modal -->
    <div class="text-center">
      <a data-toggle="modal"
        :data-target="taskId"
        data-backdrop="static"
        data-keyboard="false"
        @click="changeActive(true)"
        href=""><i class="fa fa-edit"></i></a>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="taskModal" tabindex="-1" :aria-labelledby="taskModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalTitle">Edit Task</h5>
            <button @click="changeActive(false)" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="requestEditTask">
              <div class="form-group">
                <label for="title-name" class="col-form-label">Title:</label>
                <input required type="text" class="form-control" v-model="title">
              </div>
              <div class="form-group">
                <label for="description-text" class="col-form-label">Description:</label>
                <textarea class="form-control" v-model="description"></textarea>
              </div>
              <div class="modal-footer mt-5">
                <button @click="changeActive(false)" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="changeActive(false)" type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditTask",
  props: ["task"],
  data(){
    return {
      title: this.task.title,
      description: this.task.description,
      taskId: `#editTaskModal${this.task.id}`,
      taskModal: `editTaskModal${this.task.id}`,
    }
  },
  methods: {
    changeActive(payload){
      this.$emit("changeActive", payload)
    },
    requestEditTask(){
      const payload = {
        title: this.title,
        description: this.description,
        id: this.task.id
      }
      this.clearForm
      this.$emit("requestEditTask", payload)
      $(this.taskId).modal("hide")
    },
    clearForm() {
      this.title = ""
      this.description = ""
    }
  }
}
</script>

<style>

</style>
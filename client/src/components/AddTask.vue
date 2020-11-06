<template>
  <div>
  <!-- Button trigger modal -->
    <div class="text-center">
      <button class="btn btn-primary badge-pill mb-3" data-toggle="modal" :data-target="'#addTaskModal'+category">+Add Task</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="'addTaskModal'+category" tabindex="-1" :aria-labelledby="'addTaskModal'+category" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="requestAddTask">
              <div class="form-group">
                <label for="title-name" class="col-form-label">Title:</label>
                <input required type="text" class="form-control" id="title-name" v-model="title">
              </div>
              <div class="form-group">
                <label for="description-text" class="col-form-label">Description:</label>
                <textarea class="form-control" id="description-text" v-model="description"></textarea>
              </div>
              <div class="modal-footer mt-5">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Submit</button>
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
  name: "AddTask",
  props: ["addCategory"],
  data(){
    return {
      title: "",
      description: "",
      category: this.addCategory.id
    }
  },
  methods: {
    requestAddTask(){
      const payload = {
        title: this.title,
        description: this.description,
        CategoryId: this.category
      }
      this.clearForm()
      this.$emit("requestAddTask", payload)
      $(`#addTaskModal${this.category}`).modal("hide")
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
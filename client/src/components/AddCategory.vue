<template>
  <div>
  <!-- Button trigger modal -->
    <div class="text-center">
      <button class="btn btn-primary badge-pill mb-3" data-toggle="modal" data-target="#addCatModal">Add Category</button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addCatModal" tabindex="-1" aria-labelledby="addCatModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="aasa">Add Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="requestAddCat">
              <div class="form-group">
                <label for="title-name" class="col-form-label">Name:</label>
                <input required type="text" class="form-control" id="title-name" v-model="name">
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
  name: "AddCat",
  data(){
    return {
      name: ""
    }
  },
  methods: {
    requestAddCat(){
      const payload = {
        name: this.name
      }
      this.clearForm()
      this.$emit("requestAddCat", payload)
      $(`#addCatModal`).modal("hide")
    },
    clearForm() {
      this.name = ""
    }
  }
}
</script>

<style>

</style>
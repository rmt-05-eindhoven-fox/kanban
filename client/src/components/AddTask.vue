<template>
  <div class="AddTask">
    <!-- Modal Add New Todo-->
    <div
      class="modal fade"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-light">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLongTitle">Add New Task</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="addtodoform" @submit.prevent="addTask">
              <div class="form-group">
                <label for="title">Title</label>
                <input v-model="title" id="title" class="form-control" type="text" />
              </div>
              <div class="form-group">
                <label for="tag">Tag</label>
                <input v-model="tag" id="description" class="form-control" type="text" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button id="add" type="submit" class="btn btn-primary">
                  Save changes
                </button>
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
  data(){
    return{
      title:"",
      tag:""
    }
  },
  methods: {
    addTask(){
      const payload = {
        title: this.title,
        tag: this.tag,
        category:"backlog"
      }
      this.clearForm()
      this.$emit("addTask", payload)
      $('#exampleModalLong').modal('hide');
    },
    clearForm(){
      this.title = ""
      this.tag = ""
    }
  },
};
</script>

<style>
</style>
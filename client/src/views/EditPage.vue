<template>
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <form id="dataToEdit" @submit.prevent="editPage">
                        <center>
                              <div class="form-group col-md-6">
                                    <label for="title">Title</label>
                                    <input v-model="title" type="text" class="form-control" id="title-edit" 
                                    style="text-align: center;">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="description">Description</label>
                                    <input v-model="description" type="text" class="form-control" id="description-edit"
                                    style="text-align: center;">
                                </div>
                        </center>
                    <div class="modal-footer">
                        <button  type="submit" class="btn btn-primary">Save</button>
              </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name : "EditPage", 
  data() { 
    return { 
      title : "", 
      description : "", 
      CategoryId : ""
    }
  }
}
</script>

<style>

</style>
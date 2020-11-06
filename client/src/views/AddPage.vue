<template>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Task</h5>
                        <button  type="button"  class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="dataTodoAdd" @submit.prevent="addTask">
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
    name : "AddPage", 

    data() { 
      return { 
        title : "", 
        description : ""
      }
    }, 

    methods : { 
      addTask() { 
        const payload = { 
          title : this.title, 
          description : this.description
        }
        console.log(payload, "<<< ini payload");
        this.$emit("addTask", payload)
      }
    }
}
</script>

<style>

</style>
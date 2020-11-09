<template>
 <div class="items border border-light">
   <div class="card draggable shadow-sm rounded" id="cd1" draggable="true">
    <div class="card-body p-2">
        <div class="card-title">
                <a href="" class="lead font-weight-light"><h6>title:</h6>{{task.title}}</a>
        </div>
           <div>
            <h6>description:</h6>
            {{task.description}}    
           </div>    
           <div>
            <button @click="editTask" type="danger" class="btn btn-outline-dark" data-toggle="modal"
             data-target="#editModal"><i class="fa fa-pencil-square-o"></i></button>

              <button @click="deleteTask" type="danger" class="btn btn-outline-dark"><i class="fa fa-trash" aria-hidden="true"></i></button>
           </div>
    </div>
   </div>
 </div>
</template>

<script>

export default {
    name : "InnerCard",
    props : ["task", "phase"], 
    methods : { 
        changePage() { 
        this.$emit("changePage", payload)
        },
        deleteTask() { 
          this.$emit("deleteTask", this.task.id)
        }, 
        editTask() { 
          const payload = { 
            id: this.task.id,
            title : this.task.title, 
            description : this.task.description, 
            CategoryId : this.task.CategoryId
          }
          this.$emit("editTask", payload)
        }
    }
}
</script>

<style>

</style>
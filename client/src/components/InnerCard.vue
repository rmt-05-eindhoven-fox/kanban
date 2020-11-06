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
            <button @click="changePage" type="danger" class="btn btn-outline-dark" data-toggle="modal"
             data-target="#editModal"><i class="fa fa-pencil-square-o"></i></button>

              <button @click="deleteData" type="danger" class="btn btn-outline-dark"><i class="fa fa-trash" aria-hidden="true"></i></button>
           </div>
    </div>
   </div>
 </div>
</template>

<script>

export default {
    name : "ChildCard",
    props : ["task"], 
    methods : { 
      changePage() { 
      this.$emit("changePage", payload)
    },
    deleteData() { 
      this.$emit("deleteData", this.task.id)
    }
    }
}
</script>

<style>

</style>
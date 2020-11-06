<template>
  
    <div 
      class = "kanban-card">
        
      <!-- Normal Card -->
      <div>
      <div 
        draggable = true
        @dragstart="startDrag($event, taskDetail.id, taskDetail.CategoryId)" 

        v-if="!showEdit"
        class = kanban-card-body>
        <p>{{ taskDetail.description }}</p>

        <div class = "kanban-card-footer">

          <p style="margin:0; font-size:small; color:grey">{{ taskDetail.User.name }}</p>

          <div class = "kanban-card-control" style = "align-self: flex-end;">
            <img 
              @click="showEditForm"
              src="../../img/icons8-edit-24.png" 
              class = "control-button"
              >

            <img 
              @click="deleteTask"
              src="../../img/icons8-delete-30.png" 
              class = "control-button"
              >
          </div>

        </div>

      </div>

      <!-- Toggle edit -->
      <!-- v-model="task.description" -->

      <div 
        draggable="false"
        v-else
        class="kanban-card-edit">
        <textarea 
          v-model="taskDescription"
          class="form-control" 
          rows="3"></textarea>

        <button 
          @click="editTask"
          type="button" 
          class="btn btn-outline-success btn-sm mt-2"
          style ="align-self: flex-end; width:100px"
        >Edit</button>

      </div>

    </div>
</template>

<script>
export default {
  name : 'Task',
  data() {
    return {
      taskDescription : '',
      showEdit : false,
    }
  },
  props : [ 'taskDetail' ],
  methods : {
    toggleShowEdit(){
      if(this.showEdit){
        this.showEdit = false;
      } else {
        this.showEdit = true
      }
    },
    showEditForm(){
      this.toggleShowEdit()
      this.taskDescription = this.taskDetail.description
    },
    startDrag: (evt, TaskId, TaskCategoryId) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('TaskId', TaskId)
      evt.dataTransfer.setData('TaskCategoryId', TaskCategoryId)
    },
    editTask(){
      let payload = {
        taskId : this.taskDetail.id,
        description : this.taskDescription
      }
      this.$emit('editTask', payload)
      this.toggleShowEdit()
    },
    deleteTask(){
      this.$confirm ('Are you sure?', 'Delete Task', 'question' )
      .then(_=> {
        let payload = {
          taskId : this.taskDetail.id
        }
        this.$emit('deleteTask', payload)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
  }
 
}
</script>

<style>
.control-button{
  width : 13px;
  cursor: pointer;
}
.kanban-card{
  transition: 0.3s;
}
.kanban-card:hover{
  background-color:rgb(223, 243, 255);
  /* box-shadow: 2px 2px 2px rgb(32, 60, 90, 0.2); */
  margin-left : 1px;
  margin-right: 1px;
}
</style>
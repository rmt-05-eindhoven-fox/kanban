<template>
  <li class="card-body">
    <div style="background: rgba(255, 255, 255, 0.5);" class="card">
      <div class="card-body">
        <h5 class="card-title">{{task.title}}</h5>
        <p class="card-text">{{task.description}}</p>
        <div class="container" :class="{ hide: isActive  }">
          <div class="d-flex justify-content-end">
            <EditTask
              :task="task"
              @changeActive="changeActive"
              @requestEditTask="requestEditTask">
            </EditTask>
            <DeleteTask
              :idTask="task.id"
              @deleteTask="deleteTask">
            </DeleteTask>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import EditTask from "./EditTask"
import DeleteTask from "./DeleteTask"

export default {
  name: "Task",
  components: {
    EditTask,
    DeleteTask
  },
  data() {
    return {
      isActive: true
    }
  },
  props: ["task"],
  methods: {
    deleteTask(payload){
      this.$emit("deleteTask", payload)
    },
    changeActive(payload){
      this.isActive = !payload
    },
    requestEditTask(payload){
      this.$emit("requestEditTask", payload)
    }
  }
}
</script>

<style>

</style>
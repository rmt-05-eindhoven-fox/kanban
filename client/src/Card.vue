<template>
  <div class="overflow-auto" style="height: 84%;">
    <div v-for="(task, index) in tasks" :key="task.id" class="d-flex justify-content-center mb-1">
      <div class="card shadow " style="width: 18rem;">
        <div class="card-body" style="padding: 10px;">
          <div v-if="task.UserId === true">
            <textarea v-model="task.title" cols="30" rows="1"></textarea>
            <a href="" @click.prevent="editTask(task)">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="green" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </a>
            <a href="" @click.prevent="cancelEdit(index)">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-square-fill" fill="red" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
              </svg>
            </a>
          </div>
          <p v-else class="card-text font-weight-normal">{{ task.title }}</p>
          <div class="card-text d-flex " style="justify-content: space-between">

            <div class="d-flex">
              <svg width="1em" style="margin-top: 6px;" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
              <p class="font-weight-light" style="font-size: 11px; margin-top: 4px;">{{ task.User.email }}</p>
            </div>
            
            <div style="">
              <a href="" v-if="task.UserId !== true" @click.prevent="editing(index)">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="blue" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              </a>
              <a href="" @click.prevent="delTask(task.id)">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              </a>

            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['tasks'],
  methods: {
    delTask(id) {
      this.$emit('hapus', id)
    },
    editing(i) {
      this.tasks[Number(i)].UserId = true
    },
    editTask(obj) {
      // this.edit = false
      this.$emit('editTask', obj)
    },
    cancelEdit(i) {
      this.tasks[Number(i)].UserId = this.tasks[Number(i)].User.id
    }
  },
}
</script>

<style>

</style>


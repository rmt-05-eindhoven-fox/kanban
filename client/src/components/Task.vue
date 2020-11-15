<template>
  <div class="p-2 pl-3 task-body" style=" min-height: 700px;" :style="bodyColor">
    <div :ref="categoryName" class="add-form" style="margin-right: 10px; display: none" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
              <h4 class="modal-title">Add Task</h4>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                  <form>
                      <input v-model="title" type="text" placeholder="title">
                  </form>
              </div>
              <!-- Modal footer -->
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="addTask(categoryName)">Submit</button>
              <button type="button" class="btn btn-danger" @click="closeModal(categoryName)" >Close</button>
              </div>
          </div>
        </div>
    </div>
    <div class="list-group tasks flex-wrap" v-for="(task, i) in tasks" :key="i">
      <a href="#" class="list-group-item list-group-item-action mb-3 text-left">
        {{task.title}}
      </a>
    </div>
    <a ref="addButton" @click="showModal(categoryName)"><font-awesome-icon icon="plus-circle" size="lg" /></a>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data () {
    return {
      bodCol: '',
      title: '',
      description: ''
    }
  },
  computed: {
    tasks: function () {
      return this.$store.state.tasks.filter(task => task.category === this.categoryName)
    }
  },
  methods: {
    fetchTasks () {
      const accessToken = localStorage.getItem('access_token')
      this.$store.dispatch('fetchData', accessToken)
    },
    showModal (form) {
      this.$refs[form].style.display = 'block'
      this.$refs.addButton.style.display = 'none'
    },
    closeModal (form) {
      this.$refs[form].style.display = 'none'
      this.$refs.addButton.style.display = 'block'
    },
    addTask (form) {
      const accessToken = localStorage.getItem('access_token')
      const payload = {
        title: this.title,
        category: this.categoryName,
        accessToken
      }
      this.$store.dispatch('addTask', payload)
      this.$refs[form].style.display = 'none'
      this.$refs.addButton.style.display = 'block'
      this.fetchTasks()
    }
  },
  mounted () {
    this.fetchTasks()
  },
  props: [
    'bodyColor',
    'categoryName'
  ]
}
</script>

<style>

</style>

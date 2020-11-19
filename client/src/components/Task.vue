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
                      <textarea v-model="title" class="uk-textarea" rows="4" id="delivery" placeholder="Input your task here"></textarea>
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
    <div :ref="categoryName + 'edit'" class="add-form" style=" display: none" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
              <h4 class="modal-title">Edit Task</h4>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                  <form>
                    <textarea v-model="title" class="uk-textarea" rows="4" id="delivery" placeholder="Input your task here"></textarea>
                  </form>
              </div>
              <!-- Modal footer -->
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="editTask(categoryName+'edit')">Submit</button>
              <button type="button" class="btn btn-danger" @click="closeModal(categoryName+'edit')" >Close</button>
              </div>
          </div>
        </div>
    </div>
    <div class="list-group tasks flex-wrap mb-2" v-for="(task, i) in tasks" :key="i">
      <span class="list-group-item">
        <a href="#" class="list-group-item-action"><p class="text-left">{{task.title}}</p></a>
        <p class="text-right">{{task.User.email}}</p>
        <p class="text-right text-light">
        <button v-if="before" class="bg-warning mr-2" href="#" @click="pushTask(task.id, before)" style="border: 0"> { </button>
        <button class="bg-info text-light mr-2" style="border: 0" href="#" @click="showEditModal(categoryName+'edit', task.title, task.id)">Edit</button>
        <button class="bg-danger text-light mr-2" href="#" @click="deleteTask(task.id)" style="border: 0"> Delete</button>
        <button v-if="after" class="bg-warning" href="#" @click="pushTask(task.id, after)" style="border: 0"> } </button>
        </p>
      </span>
    </div>
    <a v-if="categoryName !== 'Done'"  href="#" ref="addButton" @click="showModal(categoryName)"><font-awesome-icon icon="plus-circle" size="lg" /></a>
  </div>
</template>

<script>
export default {
  name: 'Task',
  data () {
    return {
      bodCol: '',
      id: 0,
      title: '',
      description: '',
      userEmail: ''
    }
  },
  computed: {
    tasks: function () {
      return this.$store.state.tasks.filter(task => task.category === this.categoryName)
    },
    watchData () {
      return this.$store.state.watchData
    },
    email () {
      return this.$store.state.email
    }
  },
  methods: {
    pushTask (id, category) {
      console.log(id, category)
      const accessToken = localStorage.getItem('access_token')
      const payload = {
        id,
        category,
        accessToken
      }
      this.$store.dispatch('patchTask', payload)
    },
    fetchTasks () {
      const accessToken = localStorage.getItem('access_token')
      this.$store.dispatch('fetchData', accessToken)
    },
    showModal (form, val = '') {
      this.title = val
      this.$refs[form].style.display = 'block'
      this.$refs.addButton.style.display = 'none'
    },
    showEditModal (form, title, id) {
      this.title = title
      this.id = id
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
    },
    editTask (form) {
      const accessToken = localStorage.getItem('access_token')
      const payload = {
        id: this.id,
        title: this.title,
        category: this.categoryName,
        accessToken
      }
      this.$store.dispatch('editTask', payload)
      this.$refs[form].style.display = 'none'
      this.$refs.addButton.style.display = 'block'
    },
    deleteTask (id) {
      const accessToken = localStorage.getItem('access_token')
      const payload = {
        id,
        accessToken
      }
      this.$store.dispatch('deleteTask', payload)
    }
  },
  watch: {
    watchData () {
      this.fetchTasks()
    }
  },
  mounted () {
    this.fetchTasks()
  },
  props: [
    'bodyColor',
    'categoryName',
    'after',
    'before'
  ]
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    opacity: 0;
    transition: opacity .5s;
  }
</style>

<template>
  <div class="add-page">
      <div class="add-page-container">
          <div class="add-page-head">
              <h3>add task</h3>
          </div>
          <form @submit.prevent="addTask" class="addForm-body">
              <div class="addForm-input">
                  <label for="title">
                  <i class="fas fa-thumbtack"></i>
                  Title
                  </label>
                  <input type="text" v-model="title">
              </div>

              <div class="addForm-button">
                  <button>Add</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
export default {
    name: 'addPage',
    data() {
        return {
            title: '',
            category: 'Backlog'
        }
    },
    methods: {
        addTask(){
            let payload = {
                title: this.title,
                category: this.category
            }
            this.$emit('addTask', payload)
        }
    }

}
</script>

<style>

</style>
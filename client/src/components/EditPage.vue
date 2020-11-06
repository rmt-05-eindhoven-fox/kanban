<template>
  <div class="edit-page">
      <div class="edit-page-container">
          <div class="edit-page-head">
              <h3>edit task</h3>
          </div>
          <form @submit.prevent="editTask" class="editForm-body">
              <div class="editForm-input">
                  <label for="title">
                  <i class="fas fa-thumbtack"></i>
                  Title
                  </label>
                  <input type="text" v-model="title">
              </div>
              <div class="editForm-dropdown">
                   <label for="name">
                  <i class="far fa-list-alt"></i>
                  Category
                  </label>
                  <select name="category" id="category" v-model="category">
                      <option disabled value="please select"></option>
                      <option value="Backlog">Backlog</option>
                      <option value="ToDo">Todo</option>
                      <option value="Doing">Doing</option>
                      <option value="Done">Done</option>
                  </select>
              </div>
              <div class="editForm-button">
                  <button>edit</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
export default {
    name: 'editPage',
    data() {
        return {
            title: this.detailTask.title,
            category: this.detailTask.category
        }
    },
    props: ['detailTask'],
    methods: {
        editTask(){
            let payload = {
                id: this.detailTask.id,
                title: this.title,
                category: this.category
            }
            this.$emit('editTask', payload)
        }
    }

}
</script>

<style>

</style>
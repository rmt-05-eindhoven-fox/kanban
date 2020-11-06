<template>
  <!--CONTENT-->
  <div class="">

    <div class="row">

      <Category
        v-for="(cat, index) in categories"
        :key="index"
        :cat="cat"
        :tasks="tasks"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @editTask="editTask"
      ></Category>

    </div>

  </div>
  <!--END CONTENT-->
</template>

<script>
import Category from './Category'
export default {
  name: 'HomePage',
  components: {
    Category
  },
  props: [
    'categories',
    'tasks'
  ],
  methods: {
    addTask (addTask) {
      this.$emit('addTask', addTask)
    },
    deleteTask (id) {
      this.$emit('deleteTask', id)
    },
    editTask (edit) {
      this.$emit('editTask', edit)
    }
  }
}
</script>

<style>

</style>
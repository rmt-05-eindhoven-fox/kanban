<template>
  <section class="container-fluid my-5" id="main-page">
    <div class="row justify-content-center">
      <TaskBoard
        v-for="(cat, i) in categories"
        :key="i"
        :categoryDetails='cat'
        :tasks='tasks'
        @toAddPage="toAddPage"
        @toEditPage="toEditPage"
        @deleteTask="deleteTask"
        >

      </TaskBoard>
    </div>
  </section>

</template>

<script>
import TaskBoard from './TaskBoard'

export default {
  name: 'BoardList',
  components: {
    TaskBoard
  },
  props: [ 'categories', 'tasks' ],
  methods:{
    toAddPage(payload) {
      this.$emit('toAddPage', payload)
    },
    toEditPage(payload) {
      this.$emit('toEditPage', payload)
    },
    deleteTask(payload) {
      this.$emit('deleteTask', payload)
    }
  }
}
</script>

<style>

</style>
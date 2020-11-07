<template>
  <div>
    <BoardList
      :categories='categories'
      :tasks='tasks'
      @toAddPage="toAddPage"
      @toEditPage="toEditPage"
      @deleteTask="deleteTask"
      >

    </BoardList>
  </div>
</template>

<script>
import BoardList from './BoardList'

export default {
  name: 'MainPage',
  components: {
    BoardList
  },
  props: ['categories', 'tasks'],
  methods: {
    logout() {
      this.$emit('logout')
    },
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
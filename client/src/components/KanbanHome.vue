<template>
<div>
 <navigation @logout="logout" @toLoginPage="toLoginPage" @toAddPage="toAddPage"></navigation>
 <div>
  <board-list @deleteTask="deleteTask" @toEditPage="toEditPage" :category="data" :tasks="tasks"></board-list>

 </div>
</div>
</template>

<script>
import Navigation from "./Navigation.vue"
import BoardList from "./BoardList.vue"
export default {
 name: "KanbanHome",
 components: {
  Navigation,
  BoardList
 },
 props: ['data', 'tasks'],
 methods: {
  toAddPage(payload) {
   this.$emit('toAddPage', payload)
  },
  toLoginPage(payload) {
   this.$emit('toLoginPage', payload)
  },
  toEditPage(payload) {
   this.$emit('toEditPage', payload)
  },
  logout() {
   this.$emit('logout')
  },
  toHomePage(payload) {
   this.$emit('toHomePage', payload)
  },
  deleteTask(payload) {
   this.$emit('deleteTask', payload)
  }
 },
};
</script>

<style scoped></style>

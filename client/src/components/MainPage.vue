<template>
  <section id="main-page">
    <div class="board">
      <div class="row">
        <Category
          v-for="(board, i) in boards"
          :key="i"
          :cardData="cards[board]"
          :boardName="board"
          :arrOfBoardName="boards"
          @addCardPage2="addCardPage3"
          @deleteCard="deleteCard"
          @updateCard="updateCard"
        ></Category>
      </div>
    </div>
  </section>
</template>

<script>
import Category from './Category.vue'
export default {
  name: 'MainPage',
  components: {
    Category
  },
  props: ['cards', 'boards'],
  methods: {
    addCardPage3(name) {
      let payload = {
        name: name
      }
      this.$emit('addCardPage4', payload)
    },
    deleteCard(id) {
      this.$emit('deleteCard', id)
    },
    updateCard(payload) {
      this.$emit('updateCard', payload)
    }
  }
}
</script>

<style>

</style>
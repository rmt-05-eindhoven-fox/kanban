<template>
  <div class="category-container col-sm">
    <div class="card bg-light p-2 ">
      <h6 class="ml-3 mb-0 font-weight-bold">{{ boardName }}</h6>

      <div class="card-container overflow-auto">
        <Card 
          v-for="(data) in cardData"
          :key="data.id"
          :cardData="data"
          @deleteCard="deleteCard"
          :boardName="boardName"
          :arrOfBoardName="arrOfBoardName"
          @updateCard="updateCard"
        ></Card>
      </div>

      <a class="font-weight-bold mt-2 mb-0 ml-3" @click.prevent="addCardPage1">Add a card...</a>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  name: 'Category',
  components: {
    Card
  },
  props: ['cardData', 'boardName', 'arrOfBoardName'],
  methods: {
    addCardPage1() {
      this.$emit('addCardPage2', 'add-card-page')
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
<template>
  <div>
    <div
      class="card p-2 m-2"
    >
      <p 
        v-if="displayUpdate === 'no'"
        class="title mb-0 ">{{ cardData.title }}</p>
      <div v-else-if="displayUpdate === 'yes'">
        Title:
        <input 
        v-model="title"
        type="text">
        Category:
        <select 
          name="category"
          v-model="category">
          <option 
            v-for="(cat, i) in arrOfBoardName"
            :key="i"
            :value="cat"
          >{{ cat }}</option>
        </select>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span
          class="sub-title text-muted">{{ cardData.createdAt.substr(0, 10) }}</span>
        <span>{{ userName }}</span>
      </div>
      <div>
        <!-- <span 
          class="mb-0 badge" 
          :class="{'badge-warning' : card.role == 'admin', 'badge-info' : card.role == 'member'}"
          style="height: 90%;">
            {{card.role}}
        </span> -->
        <div
           v-if="displayUpdate === 'no'"
           class="d-flex justify-content-between align-items-center"
        >
          <span class="mb-0 badge badge-danger" @click="deleteCard(cardData.id)">Delete</span>
          <span class="mb-0 badge badge-warning" @click="update()">Update</span>
        </div>
        <div
           v-else-if="displayUpdate === 'yes'"
           class="d-flex justify-content-between align-items-center"
        >
          <span class="mb-0 badge badge-warning" @click="updateCard(cardData.id)">Update</span>
          <span class="mb-0 badge badge-info" @click="cancel()">Cancel</span>
        </div>
      </div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: [ 'cardData', 'boardName', 'arrOfBoardName' ],
  data: function() {
    return {
      displayUpdate: 'no',
      title: this.cardData.title,
      category: this.cardData.category
    }
  },
  computed: {
    userName: function () {
      let user_name = this.cardData.User.email.split('@')
      return user_name[0]
    }
  },
  methods: {
    deleteCard(id) {
      this.$emit('deleteCard', id)
    },
    cancel() {
      this.displayUpdate = 'no'
    },
    update() {
      this.displayUpdate = 'yes'
    },
    updateCard(id) {
      let payload = {
        id,
        title: this.title,
        category: this.category
      }
      this.$emit('updateCard', payload)
    },
  }
}
</script>

<style>

</style>
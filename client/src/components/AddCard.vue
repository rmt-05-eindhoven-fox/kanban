<template>
   <div  class="container">
      <form @submit.prevent="addCard">
        <h1>Add card</h1>
        <div class="form-group">
          <label>Title</label>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Enter title"
            v-model="title"
            >
        </div>
        <div class="form-group">
          <label>Category: </label>
          <select 
            name="category"
            v-model="category">
            <option 
              v-for="(cat, i) in categoryNames"
              :key="i"
              :value="cat"
            >{{ cat }}</option>
          </select>
        </div>
        <!-- <div class="form-group">
          <label>date</label>
          <input 
            type="date" 
            class="form-control" 
            placeholder="Enter date"
            >
        </div>
        <div class="form-group">
          <label>role</label>
          <input 
            type="role" 
            class="form-control" 
            placeholder="Enter role"
            >
        </div>
        <div class="form-group">
          <label>author</label>
          <input 
            type="author" 
            class="form-control" 
            placeholder="Enter author"
            >
        </div>
        <div class="form-group">
          <label>content</label>
          <input 
            type="content" 
            class="form-control" 
            placeholder="Enter content"
            >
        </div> -->
        
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Add</button>
          <button class="btn btn-secondary" @click.prevent="mainPage">Back</button>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'AddCard',
  data: function() {
    return {
      title: '',
      category: ''
    } 
  },
  props: ['categoryNames'],
  methods: {
    mainPage() {
      this.$emit('mainPage', {name: 'main-page'})
    },
    addCard() {
      let payload = {
        title: this.title,
        category: this.category
      }
      this.$emit('addCard', payload)
    }
  }
}
</script>

<style>

</style>
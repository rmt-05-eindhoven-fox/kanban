<template>
  <!--ADD CARD-->
  <div class="card mb-3" style="width: 100%;">
    <div class="card-body">
      <form @submit.prevent="addTask(cat.name)">
        <div class="form-group">
          <input
          v-model="title"
            class="form-control"
            type="text"
            placeholder="Title">
        </div>
        <div class="form-group">
          <input
          v-model="description"
            class="form-control"
            type="text"
            placeholder="Description">
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
        <a @click.prevent="cancelForm(cat.name)" href="#" class="btn btn-primary">Cancel</a>
      </form>
    </div>
  </div>
  <!--END ADD CARD-->
</template>

<script>
export default {
  name: 'AddTask',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    cancelForm(name) {
      this.$emit('cancelForm', name)
    },
    addTask (name) {
      const addTask = {
        title: this.title,
        description: this.description,
        status: name.toLowerCase()
      }
      this.$emit('addTask', addTask)
    }
  },
  props: [
    'cat'
  ]
}
</script>

<style>

</style>
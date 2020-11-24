<template>
  <section id="add-task-form"> 
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
          <div class="p-5 bg-light shadow" style="width: 30%; height: 80%; border-radius: 10px;">
            <h2 class="text-center">Add new Task</h2>
            <img class="w-100" src="../assets/undraw_To_do_list_re_9nt7.png" alt="task-list">
            <form class="mt-4" @submit="add">
              <div class="form-group">
                <label for="title">Title</label>
                <input v-model="title" class="form-control" type="text" id="title" placeholder="task title">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input v-model="description" class="form-control" type="text" id="description" placeholder="first name">
              </div>
              <div class="form-group">
                <label for="last_name">Progress</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                    </div>
                    <select v-model="progress" class="custom-select" id="inputGroupSelect01">
                        <option selected>Task progress</option>
                        <option value="backlog">Backlog</option>
                        <option value="products">Products</option>
                        <option value="development">Development</option>
                        <option value="done">Done</option>
                    </select>
                </div>
              </div>
              <button class="btn btn-block text-white" type="submit" style="background-color: #42b0f8;"> Add</button>
            </form>
            <button @click="switchPage" class="btn btn-block btn-danger text-white" > Cancel</button>
          </div>
        </div>
      </section>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      title: '',
      description:'',
      progress:''
    }
  },
  methods: {
    add () {
      const payload = {
        title: this.title,
        description: this.description,
        progress: this.progress
      }

      this.$emit('add', payload)
    },
    switchPage () {
      this.$emit('switchPage', 'home')

    }
  },
}
</script>

<style>

</style>
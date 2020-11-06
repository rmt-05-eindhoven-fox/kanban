<template>
  <section>
    <div class="d-flex m-0" style="height: 90vh;">
      <div v-for="(category, name, i) in task" :key="i" class="col-3">
        <div class="p-2 shadow rounded" style="margin-top: 4em; height: 87vh; background-color: wheat;">

          <div class="row mb-2">
            <div class="col-12">
              <p class="h4 rounded shadow text-shadow bg-info" style="text-align: center; background-color: rgba(118, 10, 100, 0.5); height: 100%; color: white;">{{ name }}</p>
            </div>
          </div>

          <card
            @hapus="delTask"
            @editTask="editTask"
            :tasks='category'>
          </card>


        </div>
      </div>

    </div>
  </section>
</template>

<script>
import card from './Card'

export default {
  components: {
    card
  },
  props: ['task'],
  methods: {
    delTask(id) {
      this.$emit('hapus', id)
    },
    editTask(obj) {
      this.$emit('editTask', obj)
    }
  },
}
</script>

<style>

</style>
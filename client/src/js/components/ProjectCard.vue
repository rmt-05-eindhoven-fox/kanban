<template>
  <div>
    <v-card color="orange darken-2">
      <v-card-title style="display: block; margin-top: 2vh; margin-left: 18vh; margin-bottom: 2vh;" class="headline">{{ project.Project.name }}</v-card-title>
      <v-card-actions>
        <v-btn text v-if="project.Project.owner == userId" @click.stop="deleteProject(project.ProjectId)"><i class="fas fa-trash"></i></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
  computed: {
    userId() {
      return localStorage.getItem('id')
    }
  },
  methods: {
    deleteProject(val) {
      this.$emit('DELETE_PROJECT', val)
    },
  }
}
</script>

<style lang="css" scoped>
.v-btn,
.v-card {
  color: white !important;
  font-weight: 500;
  cursor: pointer;
  background-color: #C62828;
  border-radius: 5px;
}
.v-btn:hover {
    background-color: #EF5350;
}
.v-card:hover {
  box-shadow: 2px 5px 5px black;
}
</style>

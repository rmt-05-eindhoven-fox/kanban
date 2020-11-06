<template>
    <div class="card m-2"
    v-if="task.category == data">
        <p>{{ task.title }}</p>
        <p>
            <i @click="editForm" class="material-icons">create</i> 
            <i @click="deleteTask" class="material-icons">delete</i>
        </p>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: ['task', 'data'],
    methods: {
        editForm(){
            let data = this.task
            this.$emit('editForm', data)
        },
        deleteTask(){
            let index = this.task.id
            this.$emit('deleteTask', index)
        }
    }
}
</script>

<style>

</style>
<template>
    <div class="card bg-danger">
        <div class="bg-dark">
            {{ data }}
        </div>
        <Task
            v-for="(task, i) in tasks"
            :key="i"
            :task="task"
            :data="data"
            @editForm="editForm"
            @deleteTask="deleteTask">
        </Task>
    </div>
    
</template>

<script>
import Task from './Task'
export default {
    name: 'Content',
    data() {
        return {
            message: 'halo',
        };
    },
    components: {
        Task
    },
    methods: {
        editForm(data){
            this.$emit('editForm', data)
        },
        deleteTask(index){
            this.$emit('deleteTask', index)
        }
    },
    props: ['data', 'tasks']
}
</script>
    
<style>

</style>
<template>
    <div class="container">
        <div class="row">
            <category 
            v-for="(cat, i) in types" 
            :key="i" 
            :catDetail="cat"
            :tasks="tasks"
            @listTasks="listTasks"
            :server="server"
            ></category>
        </div>
    </div>
</template>

<script>
import taskCard from './TaskCard'
import category from './Category'
export default {
    name: 'Dashboard',
    data () {
        return {
            types: ['Backlog', 'Todo', 'Doing', 'Done']
        }
        
    },
    components: {
        taskCard,
        category
    },
    props: ['server', 'tasks', 'server'],
    methods: {
        listTasks () {
            this.$emit('listTasks')
        }
    }
}
</script>

<style>

</style>
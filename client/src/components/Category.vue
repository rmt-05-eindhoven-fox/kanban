<template>
        <div class="col-md-3 item">
            <h5 class="mt-3 text-center text-white p-4 rounded bg-primary">{{titleDetails.title}}</h5>
            <!-- {{titleDetails}} -->
            <div class="bg-light p-2 task-overflow shadow card rounded">    
                {{taskPerPhase}}
                <Task v-for="task in tasks"
                :key="task.id"></Task>
            </div>
        </div>
</template>



<script>
import Task from './Task'
export default {
    name: 'category',
    components: {
        Task
    },
    props: ['titleDetails', 'tasks'],
    computed : { 
        taskPerPhase() { 
             return this.tasks.filter(task => task.category == this.titleDetails.category)
        }
    }
}
</script>

<style>

</style>
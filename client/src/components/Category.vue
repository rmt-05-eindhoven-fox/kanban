<template>
    <div  class="col-3" >
        
        <h5  class="text-center font-weight-bolder py-2 align-middle rounded " >{{categories.category}}</h5>
        <div class="item px-3 scrollbar scrollbar-rainy-ashville" >
            <TaskCard
                v-for="task in taskPerCategory"
                :key="task.id"
                :task="task"
                @toEditPage="toEditPage"
                @deleteTask="deleteTask"
                :email="email"
            >
            </TaskCard>
        </div>
    </div>
</template>

<script>
import TaskCard from './TaskCard'
export default {
    name: 'Category',
    components: {
        TaskCard
    },
    props: ['categories', 'tasks', 'email'],
    computed: {
        taskPerCategory() {
            return this.tasks.filter(el=> {
                return el.category == this.categories.category
            })
        }
    },
    methods: {
        toEditPage(payload) {
            this.$emit('toEditPage', payload)
        },
        deleteTask(payload) {
            this.$emit('deleteTask', payload)
        }
    }
}
</script>

<style>

</style>
<template>
    <div class="flex col-md-3 item pt-2">
        <h3 class="mt-3 text-center p-2">{{catDetail}}</h3>
        <div class="bg-light p-2 task-overflow shadow">
            <taskCard v-for="(task, i) in categoryTasks" :key="i" :task="task" :server="server" :catDetail="catDetail" @listTask="listTask"></taskCard>
        </div>
        <button type="button" class="btn btn-info mt-3" @click.prevent="openAdded" v-if="!addNewTask">Add Task</button>
        <form @submit.prevent="addTask" v-if="addNewTask">
            <textarea class="p-2 bg-light shadow form-control" v-model="title" placeholder="Enter Task" rows="1px" cols="15px" style="overflow: hidden;"></textarea>
            <button type="submit" class="btn btn-success">Add Task</button>
            <button @click.prevent="openAdded" class="btn btn-danger">Cancel</button>
        </form>
    </div>
</template>

<script>
import taskCard from './TaskCard'
import axios from 'axios'
export default {
    name: 'Category',
    components:{
        taskCard
    },
    props: ['catDetail', 'tasks', 'listTasks', 'server'],
    computed: {
        categoryTasks() {
            return this.tasks.filter(task => task.category == this.catDetail)
        }
    },
    data() {
        return {
            addNewTask: false,
            title: ""
        }
    },
    methods: {
        openAdded() {
            this.addNewTask = !this.addNewTask
            this.title = ''
        },
        addTask() {
            axios({
                method: 'POST',
                url: this.server + '/tasks',
                data: {
                    title: this.title,
                    category: this.catDetail
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(res => {
                this.$emit('listTasks')
                this.openAdded()
            })
            .catch(err => {
                console.log(err.message)
            })
        },
        listTask() {
            this.$emit("listTasks")
        },

    }
}
</script>

<style>
</style>
<template>
    <div class="card hover-pink my-2 shadow-sm">
        <div class="card-body">
            <h6 class="card-title font-weight-bolder pb-n3">{{task.title}}</h6>
            <p  class="card-text pt-n5 ">
                {{task.description}}
                <br>
                <small class="card-email ">{{task.User.email}}</small>
                <br>
                <small class="card-date">{{time}}</small>
                <span  v-if="email == task.User.email">
                    <i @click.prevent="deleteTask" role="button" class="fas fa-trash float-right"></i>
                    <i @click.prevent="toEditPage" role="button" class="fas fa-pen float-right mr-2" data-toggle="modal" data-target="#edit-task"></i>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'TaskCard',
    props: ['task', 'email'],
    computed: {
        time() {
            let d = new Date(this.task.updatedAt)
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
]
            return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        }
    },
    methods: {
        toEditPage() {
            let payload = {
                page: 'edit-task',
                task: this.task
            }
            this.$emit('toEditPage', payload)
        },
        deleteTask() {
            
            let payload = {
                page: 'edit-task',
                task: this.task
            }
            this.$emit('deleteTask', payload)
        }
    }
}
</script>

<style>

</style>
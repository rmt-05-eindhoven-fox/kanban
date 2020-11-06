<template>
    <div class="card text-white mb-3" :class="`card-${ card.type }`" >
        <div class="card-header" :class="`card-${ card.type }`">
            <i class="fa fa-user"></i> {{`${task.User.first_name} ${task.User.last_name}`}}
        </div>
        <div class="card-body">
            <div class="card-title">
            <h5>{{task.title}}
                <a @click.prevent="editTask" class="btn-del-edit float-right" :class="card.type" data-toggle="modal" data-target="#editModal"><i class="fa fa-pencil-square-o"></i></a>
                <a @click.prevent="deleteTask(task.id)" class="btn-del-edit float-right" :class="card.type" ><i class="fa fa-trash"></i></a>
            </h5>
            </div>
        <hr :color="card.color">
        <p class="card-text">{{task.description}}</p>
        <p class="card-text tag mt-2"> Deadline: <button class="btn-tag" >{{task.due_date}}</button></p>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardContent",
    props: [ 'card' , 'task' ],
    methods: {
        deleteTask(id){
            this.$emit("deleteTask", id);
        },
        editTask(){
            let task = {
                id: this.task.id,
                title: this.task.title,
                description: this.task.description,
                due_date: this.task.due_date,
                CategoryId: this.task.CategoryId
            }
            // let payload = {
            //     task: this.task
            // }
            // console.log(task)
            this.$emit('editTask', task)
        }
    }
}
</script>

<style>

</style>
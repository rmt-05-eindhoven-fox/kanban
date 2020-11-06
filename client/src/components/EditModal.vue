<template>
    <div class="modal fade" id="editModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" style="background-color: black; color: white">
                    <h4>Update Task</h4>
                    <h4>{{editTask}}</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="kanban-form">
                        <form @submit.prevent="updateTask(editTask.id)" class="signin-form" >
                            <div class="one-frm">
                                <label class="col-form-label">Task</label>
                                <input type="text" id="title" v-model="title" required="">
                                <label>Description</label>
                                <input type="text" id="description" v-model="description" required="">
                                <label>Due Date</label>
                                <input type="date" id="due_date" v-model="due_date" required="">
                            </div>
                            <br>
                            <center><button type="submit" class="btn btn-add">Update</button></center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     </div>
</template>

<script>
export default {
    name: "EditModal",
    data(){
        return {
            title: '',
            description: '',
            due_date: '',
        }
    },
    props: [ 'editTask' ],
    watch: {
        editTask(){
            this.title = this.editTask.title
            this.description = this.editTask.description
            this.due_date = this.editTask.due_date
        }
    },
    methods : {
        updateTask(){
            let task = {
                id: this.editTask.id,
                title: this.title,
                description: this.description,
                due_date: this.due_date,
                CategoryId: this.editTask.CategoryId
            }
            this.$emit("updateTask", task);
            console.log(task)
        }
    }
}
</script>

<style>

</style>
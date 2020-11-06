<template>
    <div class="modal fade" id="addModal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background-color: black; color: white">
                    <h4>Add Task</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="kanban-form">
                        <form @submit.prevent="addTask" class="signin-form" >
                            <div class="one-frm">
                                <label class="col-form-label">Task</label>
                                <input type="text" id="title" v-model="title" required="">
                                <label>Description</label>
                                <input type="text" id="description" v-model="description" required="">
                                <label>Due Date</label>
                                <input type="date" id="due_date" v-model="due_date" required="">
                            </div>
                            <br>
                            <center><button type="submit" class="btn btn-add" >Add</button></center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddModal",
    data(){
        return{
            title: '',
            description: '',
            due_date: ''
        }
    },
    props: [ 'CategoryId' ],
    methods: {
        addTask(){
            let task = {
                title: this.title,
                description: this.description,
                due_date: this.due_date,
                CategoryId: this.CategoryId
            }
            this.$emit("addTask", task);
        }
    }
}
</script>

<style>

</style>
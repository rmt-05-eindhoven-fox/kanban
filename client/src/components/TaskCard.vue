<template>
    <div class="bg-light p-2 task-overflow shadow card rounded">
        <div class="card-body bg-light p-2 task-overflow rounded">
            <h4 class="font-weight-bold">{{task.title}}</h4>
            <p class="h6">By : {{task.User.email}}</p>
            <h6>{{new Date(task.createdAt).toDateString()}}</h6>
            <div class="card-icons">
                <div>
                    <a href="#" @click.prevent="openUpdated"><i class="fas fa-edit"></i></a>
                    <a href="#" @click.prevent="deleteTask"><i class="fas fa-trash-alt"></i></a>
                </div>
                <form @submit.prevent="editTask" v-if="updateTask">
                    <textarea class="p-2 bg-light shadow form-control" v-model="valueUpdate" rows="1px" cols="15px" style="overflow: hidden;"></textarea>
                    <div>
                        <label for="edit">Move To:</label>
                        <select name="categoryTask" v-model="categoryTask">
                            <option value="Backlog">Backlog</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-success">Edit Task</button>
                    <button @click.prevent="openUpdated" class="btn btn-danger">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'TaskCard',
    props: ['task', 'server', 'catDetail', 'listTasks'],
    data() {
        return {
            updateTask: false,
            valueUpdate: '',
            categoryTask: this.task.category
        }
    },
    methods: {
        openUpdated() {
            this.updateTask = !this.updateTask
            this.valueUpdate = this.task.title
        },
        editTask() {
            const id = this.task.id
            axios({
                method: 'PUT',
                url: this.server + `/tasks/${id}`,
                data: {
                    title: this.valueUpdate,
                    category: this.categoryTask
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(result => {
                this.$emit('listTasks')
                this.updateTask = false
                swal.fire({
                    icon: 'success',
                    title: 'Edit Success!',
                    text: 'Edit Done',
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        },
        deleteTask() {
            const id = this.task.id
            const category = this.catDetail
            const swalWithBootstrapButtons = swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        axios({
                            method: 'DELETE',
                            url: this.server + `/tasks/${id}`,
                            headers: {
                                access_token: localStorage.access_token
                            }
                        })
                        .then(res => {
                            this.$emit('listTasks')
                            swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                        })
                        .catch(err => {
                            swalWithBootstrapButtons.fire(
                            'Not Allowed!',
                            'Not Allowed to delete this file!',
                            'error'
                            )
                        })
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                        )
                    }
                })
        }
    }
}
</script>

<style>

</style>
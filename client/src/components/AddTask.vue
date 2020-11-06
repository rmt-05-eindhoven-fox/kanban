<template>
   <div class="container p-5">
        <div class="row">
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column">
                    <div>
                        <h3>Add your Task!</h3>
                    </div>
                    <div>
                        <form @submit.prevent="addTask">
                            <div class="form-group">
                                <label for="title">Title</label><br>
                                <input v-model="taskData.title" type="text" name="fullname" placeholder="Cleaning house"><br>
                            </div>
                            <div class="form-group">
                                <label for="category">Category</label><br>
                                <input v-model="taskData.category" type="text" placeholder="Backlog"><br>
                            </div>
                            <div class="form-group">
                                <label for="status">Status</label><br>
                                <input v-model="taskData.status" type="text" placeholder="Just added"><br>
                            </div>
                            <input type="submit" value="Add Task" class="btn btn-primary">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addTask',
    data() {
        return {
            taskData: {
                title: '',
                category: '',
                status: ''
            }
        }
    },
    methods: {
        addTask() {
            let data = this.taskData
            this.$emit('addTask', data)
        }
    }
}
</script>

<style>

</style>
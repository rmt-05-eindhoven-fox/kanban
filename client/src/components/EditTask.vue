<template>
   <div class="container p-5">
        <div class="row">
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column">
                    <div>
                        <h3>Edit your Task!</h3>
                    </div>
                    <div>
                        <form @submit.prevent="editTask">
                            <div class="form-group">
                                <label for="title">Title</label><br>
                                <input v-model="data.title" type="text" name="fullname" placeholder="Cleaning house"><br>
                            </div>
                            <div class="form-group">
                                <label for="category">Category</label><br>
                                <input v-model="data.category" type="text" placeholder="Backlog"><br>
                            </div>
                            <div class="form-group">
                                <label for="status">Status</label><br>
                                <input v-model="data.status" type="text" placeholder="Just added"><br>
                            </div>
                            <input type="submit" value="Edit Task" class="btn btn-primary">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editTask',
    data() {
        return {
            data: {
                title: this.taskData.title,
                category: this.taskData.category,
                status: this.taskData.status
            }
        }
    },
    methods: {
        editTask() {
            let data = this.data
            this.$emit('editTask', data)
        }
    },
    props: ['taskData']
}
</script>

<style>

</style>
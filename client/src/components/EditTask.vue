<template>
    <section id="edit-task" class="modal fade" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Task</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent='editTask'>
                        <div class="form-group ">
                            <label for="title-form">
                                Task
                            </label>
                            <input 
                                v-model="title"
                                class="form-control text-success"
                                type="text"
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="description-form">
                                Description
                            </label>
                            <input 
                                v-model="description"
                                class="form-control text-success"
                                type="text"
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="due-date-form">
                                Category
                            </label>
                            <select  v-model="category"  class="form-control">
                                <option value="Backlog">Backlog</option>
                                <option value="Todo">Todo</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                                </select>
                        </div>
                        
                
                        <button type="submit" class="btn btn-success btn-block">Edit</button>
                        
                    </form>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'EditTask',
    data() {
        return {
            title: '',
            description: '',
            category: ''
        }
    },
    props: ['detailTask'],
    watch: {
        detailTask() {
            this.title = this.detailTask.title
            this.description = this.detailTask.description
            this.category = this.detailTask.category
        }
    },
    methods: {
        editTask() {
            let payload = {
                id: this.detailTask.id,
                title: this.title,
                description: this.description,
                category: this.category
            }
            this.$emit('editTask', payload)
        }
    }
}
</script>

<style>

</style>
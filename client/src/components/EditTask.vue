<template>
    <section id="edit-task" class="modal fade" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <img class="rotate-img" width="90px" src="../assets/monsterDir.svg" style="position: absolute; z-index: 999999; right: 400px; top: 55px;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title text-purple">Edit Task</h4>
                    <button id="close-edit" type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                class="form-control text-purple"
                                type="text"
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="description-form">
                                Description
                            </label>
                            <input 
                                v-model="description"
                                class="form-control text-purple"
                                type="text"
                            >
                        </div>
                        
                        <div class="form-group">
                            <label for="due-date-form">
                                Category
                            </label>
                            <select  v-model="category"  class="form-control text-purple">
                                <option value="" disabled>Choose the category...</option>
                                <option value="Backlog">Backlog</option>
                                <option value="Todo">Todo</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                                </select>
                        </div>
                        
                
                        <button type="submit" class="btn btn-purple btn-block">Edit</button>
                        
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
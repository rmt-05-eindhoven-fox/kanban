<template>
    <div class="card">
        <div class="progress">
            <div :class="category.class" class="progress-bar" role="progressbar" :style="category.progress" aria-valuenow="25"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5 class="card-title">{{task.title}}</h5>

                <!-- EDIT TASK BUTTON -->
                <div class="dropdown">
                    <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </a>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a @click="changeToEditPage()" class="dropdown-item" href="#">Edit Task</a>
                        <a @click="deleteTask()" class="dropdown-item" href="#">Delete Task</a>
                    </div>
                </div>

            </div>

            <p class="card-text">{{task.description}}</p>

            <div class="d-flex justify-content-between pt-3">
                <h6 class="footer ">Created by {{task.User.username}}</h6>

                <!-- MOVE TASK -->
                <div class="dropdown">
                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrows-move" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
                        </svg>
                    </a>
                    <!-- {{moveTask()}} -->
                    <div class="dropdown-menu">
                        <a  class="dropdown-item">Move to:</a>
                        <div  class="dropdown-divider"></div>
                        <a @click="moveCategory(cat.name)" v-for="(cat, i) in newCategories" :key="i" class="dropdown-item" href="#">{{cat.name}}</a>    
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: 'Task',
        data() {
            return {
            }
        },
        props: ['task', 'category', 'categories'],
        methods: {
            changeToEditPage() {
                let payload = {
                    pageName: 'edit-page',
                    task: this.task
                }
                this.$emit('changeToEditPage', payload)
            },
            deleteTask() {
                let id = this.task.id
                this.$emit('deleteTask', id)
            },
            moveCategory(name){
                let payload = {
                    id: this.task.id,
                    name: name.toLowerCase()
                }
                this.$emit('moveCategory', payload)
            }
           
        },
        computed: {
            newCategories() {
                return this.categories.filter(
                    el => el.name.toLowerCase() !== this.category.name.toLowerCase())
            },
        }
    }
</script>

<style>

</style>
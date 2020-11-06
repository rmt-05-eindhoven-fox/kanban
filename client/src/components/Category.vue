<template>
    <div class="category-container">
        <!-- CATEGORY TITLE -->
        <div class="card-header">
            {{categoryName.name}}
            <!-- ADD TASK -->
            <a @click="changeToAddPage(categoryName)" href="#">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </a>
        </div>

        <!-- TASK CONTAINER-->
        <div class="task-container overflow-auto">
            <!-- CARD TASK -->
            <Task v-for="task in categoryTasks" :key="task.id"
            :task="task"
            :category="categoryName"
            :categories="categories"
            @changeToEditPage="changeToEditPage"
            @deleteTask="deleteTask"
            @moveCategory="moveCategory">
            </Task>
        </div>


    </div>
</template>

<script>
    import Task from './Task';  
    export default {
        name: 'Category',
        components: {
            Task
        },
        props: ['categoryName', 'tasks', 'categories'],
        methods: {
            changeToAddPage(categoryName) {
                let payload = {
                    page: 'createTask-page',
                    name: categoryName.name.toLowerCase()
                }

                this.name = payload.name
                // console.log(payload);
                this.$emit('changePage', payload)
            },
            changeToEditPage(payload) {
                this.$emit('changeToEditPage', payload)
            },
            deleteTask(id) {
                this.$emit('deleteTask', id)
            },
            moveCategory(payload){
                this.$emit('moveCategory', payload)
            }
        },
        computed: {
            categoryTasks() {
                return this.tasks.filter(
                    task => task.category == this.categoryName.name.toLowerCase())
            },
        }
    }
</script>

<style>

</style>
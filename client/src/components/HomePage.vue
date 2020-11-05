<template>
    <section>
        <!-- NAVBAR -->
        <div class="py-1 shadow-sm" style="background-color: #745c97;">
            <nav class="px-4">
                <div id="logo" class="text-white font-weight-bold">
                    <div >KANBAN</div>
                </div>
                <div style="display: flex; align-items: center;">
                    <i type="button" class="fas fa-plus-square pr-4 text-white" data-toggle="modal" data-target="#add-task" >
                    </i>
                    <div class="text-white">{{email}}</div>
                    <a @click.prevent = "logout" class="text-decoration-none px-2 text-white" href="#">LOG OUT</a>
                </div>
            </nav>
        </div>
        
    
        <!-- MAIN-PAGE -->
        <div class="container" >
            <div class="row mt-4" >
                <Category 
                    v-for="(el, i) in categories"
                    :key="i"
                    :categories="el"
                    :tasks="tasks"
                    @toEditPage="toEditPage"
                    @deleteTask="deleteTask"
                    :email="email"
                >
                </Category>
            </div>

        <!-- ADD TASK -->
        <AddTask
            @addTask="addTask"
        >
        </AddTask>

        <!-- EDIT TASK -->
        <EditTask
            :detailTask="detailTask"
            @editTask="editTask"
        >
        </EditTask>
    </section>
</template>

<script>
import EditTask from './EditTask'
import AddTask from './AddTask'
import Category from './Category'
export default {
    name: 'HomePage',
    components: {
        Category, AddTask, EditTask
    },
    props: ['categories', 'tasks', 'detailTask', 'email'],
    methods: {
        pindahKeLogin() {
            let payload = {
                name: 'login'
            }
            this.$emit('changePage', payload)
        },
        addTask(payload) {
            // console.log(payload)
            this.$emit('addTask', payload)
        },
        toEditPage(payload) {
            this.$emit('toEditPage', payload)
        },
        editTask(payload) {
            this.$emit('editTask', payload)
        },
        deleteTask(payload) {
            this.$emit('deleteTask', payload)
        },
        logout() {
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>
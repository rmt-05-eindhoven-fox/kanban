<template>
    <div id="kanban">
    <!-- ======= NAVBAR ======= -->
    <nav class="navbar navbar-expand-lg ">
        <a class="navbar-brand" href="#">Kanban.</a>
        <button class="navbar-toggler btn btn-log-out my-2 my-sm-0" type="button">
            <span><i class="fa fa-sign-out fa-lg"></i></span>
        </button>
        <div class="navbar-toggler collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto nav-flex-icons">
                <li class="nav-item">
                    <button v-on:click="toLogin('logout')" class="btn btn-log-out my-2 my-sm-0" type="submit" ><i class="fa fa-sign-out fa-lg"></i></button>
                </li>
            </ul>
        </div>
    </nav>

    <!-- ======= SECTION Kanban  ======= -->
    <section class="kanban">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div class="container-fluid" data-aos="fade-up">
            <div class="scrolling-wrapper row flex-row pb-4">
                <Card
                    v-for="(card,i) in cards"
                    :key="i"
                    :card="card"
                    :tasks="tasks"
                    @generateCategory="generateCategory"
                    @deleteTask="deleteTask"
                    @editTask="editTask"
                ></Card>
            </div>
        <!--  Add Modal -->
            <AddModal
                :CategoryId="category"
                @addTask="addTask"
                @deleteTask="deleteTask"
            ></AddModal>
        <!--  Edit Modal -->
            <EditModal
                :editTask="show_task"
                @updateTask="updateTask"
            ></EditModal>
        </div>
        <!-- <div class="copy-right" >
            <p>&copy; 2020 Kanban</p>
        </div> -->
        <div class="footer">
            <p>&copy 2020 Kanban</p>
        </div>
    </section>
    </div>
</template>

<script>
import AddModal from "./AddModal"
import EditModal from "./EditModal"
import Card from "./Card"
export default {
    name: 'KanbanPage',
    components: {
        AddModal, Card, EditModal
    },
    data() {
        return {
            category: '',
            show_task: ''
        }
    },
    props: [ 'cards' , 'tasks' ],
    methods: {
        toLogin(){
            this.$emit('logout','Login-Page')
        },
        generateCategory(categoryId){
            this.category = categoryId
        },
        addTask(task){
            this.$emit("addTask", task);
        },
        deleteTask(id){
            this.$emit("deleteTask", id);
        },
        editTask(task){
            this.show_task = task
        },
        updateTask(task){
            this.$emit("updateTask", task);
        }
    }
}
</script>

<style>

</style>
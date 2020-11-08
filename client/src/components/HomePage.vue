<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">My kanban</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0 mr-2" onsubmit="addTodo(event)">
                    <button class="btn btn-primary my-2 my-sm-0" type="submit">add new task</button>
                </form>
                <form class="form-inline ml-20 my-2 my-lg-0" @submit.prevent="signOut">
                    <button class="btn btn-danger my-2 my-sm-0" type="submit">Sign out</button>
                </form>
            </div>
        </nav>
        <div class="boards-container">
            <div class="boards-container-board">
                <h1>Back Log </h1>
                <!-- <h2 v-text="text"></h2>
                <div v-html="pesan"></div> -->
                <Card v-for="task in filterBackLog" :key="task.id" :task=task>
                
                </Card> 
                
            </div>
            <div class="boards-container-board">
                <h1>Products</h1>
                
                <Card v-for="task in filterProducts" :key="task.id" :task=task>
                
                </Card> 
            </div>
            <div class="boards-container-board">
                <h1>Development</h1>
                
                <Card v-for="task in filterDevelopment" :key="task.id" :task=task>
                
                </Card> 
            </div>
                <div class="boards-container-board">
                <h1>Done</h1>
                
                <Card v-for="task in filterDone" :key="task.id" :task=task>
                
                </Card> 
            </div>
        </div>
    </section>
</template>

<script>
import Card from "./Card"
export default {
    name: "HomePage",
    props: ["kanban"],
    computed:{
        filterBackLog(){
            const list = this.kanban.filter(item => item.progress === "backlog")
            return list
        },
        filterProducts(){
            const list = this.kanban.filter(item => item.progress === "products")
            return list
        },
        filterDevelopment(){
            const list = this.kanban.filter(item => item.progress === "development")
            return list
        },
        filterDone(){
            const list = this.kanban.filter(item => item.progress === "done")
            return list
        },
    },
    methods: {
        signOut(){
            this.$emit("signOut")
        }
    },
    components: {
        Card
    }
}
</script>

<style>

</style>
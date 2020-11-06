<template>
    <section>
                <nav class="navbar">
                <a href="#" class="navbar-brand">Kanban</a>

            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
                Add Task
            </button> 




        <button  @click.prevent="signout" class="btn btn-primary my-2 my-sm-0" type="button">Logout</button>
    </nav>
        <AddPage 
        @addTask="addTask"> 
        </AddPage>
              <div class="container pt-3">
                <div class="row flex-row flex-sm-nowrap py-3">
                    <Phase 
                    v-for="(phase, i) in phases" 
                    :key="i" 
                    :phase="phase"
                    :tasks="tasks"
                    @deleteData="deleteData"></Phase>
                </div>
            </div>
            </section>
</template>

<script>
import Phase from "../components/Phase"
import AddPage from "./AddPage"
export default {
    name : "HomePage", 
    components : { 
        Phase, 
        AddPage, 

    }, 
    props : ["phases", "tasks"], 
    methods : { 
        signout() { 
            this.$emit("signout")
        }, 

        addTask(payload) { 
            this.$emit("addTask", payload)
        }, 

        deleteData(id){ 
            this.$emit("deleteData", id)
        }, 
        

    }
}
</script>

<style>

</style>
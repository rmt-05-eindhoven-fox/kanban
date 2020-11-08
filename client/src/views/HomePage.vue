<template>
    <section>
        <nav class="navbar">
            <a href="#" class="navbar-brand">Kanban</a>

            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
                    Add Task
            </button> 


            <button  @click.prevent="signout" class="btn btn-primary my-2 my-sm-0" type="button">Logout</button>
        </nav>
        <add-modal 
        @addTask="addTask"> 
        </add-modal>
              <div class="container pt-3">
                <div class="row flex-row flex-sm-nowrap py-3">
                    <phase 
                    v-for="(phase, i) in phases" 
                    :key="i" 
                    :phase="phase"
                    :tasks="tasks"
                    @deleteTask="deleteTask"
                    @editTask="editTask"
                    @updateCategory="updateCategory"></phase>
                </div>
                    <edit-modal
                    :editTask="show_task"
                    @updateTask="updateTask">
                    </edit-modal>
                </div>
    </section>
</template>

<script>
import Phase from "../components/Phase"
import AddModal from "./AddModal"
import EditModal from "../components/EditModal"
export default {
    name : "HomePage", 
    components : { 
        Phase, 
        AddModal, 
        EditModal
    }, 
    props : ["phases", "tasks"],
    data() {
        return { 
            show_task : ""
        }
    },
    methods : { 
        signout() { 
            this.$emit("signout")
        }, 

        addTask(payload) { 
            this.$emit("addTask", payload)
        }, 

        updateTask(payload) { 
            this.$emit("updateTask", payload)
        },

        deleteTask(id){ 
            this.$emit("deleteTask", id)
        }, 
        
        editTask(payload) { 
            this.show_task = payload
        }, 

        updateCategory(payload) { 
            this.$emit("updateCategory", payload)
        }

    }
}
</script>

<style>

</style>
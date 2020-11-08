<template>
  <div class="col-md-3 col-12">
    <div class="card border border-info rounded">
        <div class="card-body">
            <h6 class="card-title text-uppercase text-truncate py-2" 
                style="text-align: center;">{{phase.phase}}
            </h6>
            <draggable
            :list="taskPerPhase" 
            group="task" 
            :move="onMove"
            :phase="phase"
            @end="updateCategory"
            >
                <inner-card v-for="task in taskPerPhase"
                :key="task.id"
                :task="task"
                :id="task.id"
                @editTask="editTask"
                @deleteTask="deleteTask"
                ></inner-card>
            </draggable>
        </div>
    </div>
 </div>
</template>

<script>

import InnerCard from "./InnerCard"
import draggable from "vuedraggable"
export default {
    name : "Phase", 
    components : { InnerCard, draggable },
    props : ["phase", "tasks"], 
    data() { 
        return { 
            currentId : null, 
            categoryId : null
        }
    },
    
    methods : { 
        deleteTask(id) { 
            this.$emit("deleteTask", id)
        }, 

        editTask(payload) {
            this.$emit("editTask", payload)
        },

        onMove(e) { 
            console.log(e, "event handler");
            // console.log(e.draggedContext.element.id, "<<<< event dragged");
            // console.log( e.draggedContext.element.id, "event dragged");
            // console.log( e.relatedContext.component.$attrs.phase.id, "event 2");
            this.currentId = e.draggedContext.element.id
            this.categoryId = e.relatedContext.component.$attrs.phase.id
            
        },

        updateCategory() { 
            const payload =  {
                id : this.currentId,
                CategoryId : this.categoryId
            }
            // console.log(payload, "<<<< payload dari update");
            this.$emit("updateCategory", payload)
        }

    },

    computed : { 
        taskPerPhase() { 
            return this.tasks.filter(task => task.CategoryId === this.phase.id)
        }
    }
}
</script>

<style>
</style>
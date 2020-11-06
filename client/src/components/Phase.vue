<template>
  <div class="col-md-3 col-13">
    <div class="card border border-info rounded">
        <div class="card-body">
            <h6 class="card-title text-uppercase text-truncate py-2" 
                style="text-align: center;">{{phase.phase}}</h6>
                <InnerCard v-for="task in taskPerPhase"
                :key="task.id"
                :task="task"
                @deleteData="deleteData"></InnerCard>
        </div>
    </div>
 </div>
</template>

<script>
import InnerCard from "./InnerCard"
export default {
    name : "Phase", 
    components : { InnerCard },
    props : ["phase", "tasks"], 
    computed : { 
        taskPerPhase() { 
            return this.tasks.filter(task =>  task.CategoryId == this.phase.id)
        }
    }, 

    methods : { 
        deleteData(id) { 
            this.$emit("deleteData", id)
        }
    }

}
</script>

<style>

</style>
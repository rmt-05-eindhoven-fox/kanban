<template>
    <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div class="box"
            :class="card.type">
            <div class="box-header">
            <h3>{{card.type}}</h3>
            </div>
            <div class="overflow-auto container-fluid box-content">
                <!-- <div class="card text-white mb-3" :class="`card-${ card.type }`" >
                  {{taskPerCategory}}
                </div> -->
                <CardContent 
                    :card="card"
                    v-for="task in taskPerCategory" 
                    :key="task.id"
                    :task="task"
                    @deleteTask="deleteTask"
                    @editTask="editTask"
                ></CardContent>
            </div>
            <div class="btn-wrap">
                <button @click="generateCategory" class="btn" :class="card.type" data-toggle="modal" data-target="#addModal"><i class="fa fa-plus"></i></button>
            </div>
        </div>
    </div>
   
</template>

<script>
import CardContent from "./Card-Content"
export default {
    name:'Card',
    components: {
        CardContent
    },
    
    props: [ 'card', 'tasks' ],
    methods: {
        generateCategory(){
            let categoryId = this.card.id
            this.$emit("generateCategory", categoryId);
            console.log(categoryId)
        },
        deleteTask(id){
            this.$emit("deleteTask", id);
        },
        editTask(task){
            this.$emit('editTask', task)
        }
    },
    computed: {
        taskPerCategory(){
            return this.tasks.filter(task => task.CategoryId == this.card.id)
        }
    }
}
</script>
<style>

</style>
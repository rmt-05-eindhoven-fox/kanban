<template>
    <div class="col-3 mb-5">
        <div class="p-2 text-center" :class="`bg-${detailCategories.color}`">
            <div>
                <h5>{{detailCategories.name}}</h5>
            </div>
            <div class="todo">
                <Todo v-for="todo in tiapTodo"
                :key="todo.id"
                :todo="todo"
                @toEditPage="toEditPage"
                @deleteTodo="deleteTodo"></Todo>
            </div>
        </div>
    </div>
</template>

<script>
import Todo from './Todo'
export default {
    name: 'Board',
    components: {
        Todo
    },
    methods: {
        toEditPage(payload){
            this.$emit('toEditPage', payload)
        },
        deleteTodo(payload){
            this.$emit('deleteTodo', payload)
        }
    },
    props: ['detailCategories', 'dataTodo'],
    computed: {
        tiapTodo(){
            return this.dataTodo.filter(elemen => elemen.category === this.detailCategories.name)
        }
    }
}
</script>

<style>

</style>
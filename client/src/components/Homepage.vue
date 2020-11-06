<template>
    <section>
        <Card
            :categories="categories"
            :tasks="tasks"
            @editForm="editForm"
            @deleteTask="deleteTask">
        </Card>
    </section>
</template>

<script>
import Card from './Card.vue'
export default {
    name: 'Homepage',
    data() {
        return {
            message: 'halo',
        };
    },
    components: {
        Card
    },
    methods: {
        editForm(data){
            this.$emit('editForm', data)
        },
        deleteTask(index){
            this.$emit('deleteTask', index)
        }
    },
    props: ['categories', 'tasks']
}
</script>

<style>

</style>
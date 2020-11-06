<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3">
                <Content
                    v-for="(category, i) in categories"
                    :key="i"
                    :data="category"
                    :tasks="tasks"
                    @editForm="editForm"
                    @deleteTask="deleteTask">
                </Content>
            </div>
        </div>
    </div>
</template>

<script>
import Content from './Content'
export default {
    name: 'Card',
    data() {
        return {
            message: 'halo',
        };
    },
    components: {
        Content
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
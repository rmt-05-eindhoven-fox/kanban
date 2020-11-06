<template>
        <div class="row justify-content-center mt-4">
            <div class="col-4 container">
                <form @submit.prevent="addTodo">
                    <h1>CREATE TODO</h1>
                    <div class="form-group">
                        <label for="title-todo">Title</label>
                        <input v-model="title" type="text" id="title-todo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="description-todo">Description</label>
                        <input v-model="description" type="text" id="description-todo" class="form-control">
                    </div>
                    <div class="form-group dropdown">
                        <label for="category">
                            <i class="fas fa-layer-group"></i>
                            Choose a category:
                        </label><br>
                        <select name="category" id="category" v-model="category">
                            <option disabled value="">---Select one---</option>
                            <option value="Backlog">Backlog</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div class="addForm-button">
                    <button type="submit" class="btn btn-primary">Add Todo</button>
                    </div>
                </form>
                <div class="mt-3">
                    <button v-on:click="pindahKe('home-page')" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'AddTodo',
    data(){
        return {
            title: '',
            description: '',
            category: ''
        }
    },
    methods: {
        pindahKe(page){
            this.$emit('changePage', page)
        },
        addTodo(){
            let payload = {
                title: this.title,
                description: this.description,
                category: this.category
            }
            this.$emit('addTodo', payload)
        }
    }
}
</script>

<style>

</style>
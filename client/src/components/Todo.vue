<template>
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <b>Title:</b> {{todo.title}} <br>
                        <b>Desc:</b> {{todo.description}} <br>
                        <b>Author:</b> {{todo.User.email}} <br>
                        <div class="container mt-2">
                        <button @click="toEditPage" class="btn btn-success">Edit</button>
                        <button @click="deleteTodo" class="btn btn-danger">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
</template>

<script>
export default {
    name: 'Todo',
    props: ['todo'],
    methods: {
        toEditPage() {
            let payload = {
                pageName: 'edit-todo',
                id: this.todo.id,
                title: this.todo.title,
                description: this.todo.description,
                category: this.todo.category
            }
            this.$emit('toEditPage', payload)
        },
        deleteTodo() {
            let payload = {
                id: this.todo.id
            }
            this.$emit('deleteTodo', payload)
        }
    }
}
</script>

<style>

</style>
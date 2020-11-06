<template>
    <div>
        <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light py-3">
                <div class="container">
                    <a href="" @click.prevent="pindahKe('home-page')" class="navbar-brand">
                        <h1>KANBAN APP</h1>
                    </a>
                </div>
                <div class="row">
                    <a href="" @click.prevent="pindahKe('add-todo')" class="navbar-brand">
                        <h3><button class="btn btn-primary">Add Todo</button></h3>
                    </a>
                    <a href="" @click.prevent="logout" class="navbar-brand">
                        <h3><button class="btn btn-danger">Logout</button></h3>
                    </a>
                </div>
            </nav>
        </header>
        <div class="container-fluid row mt-5 justify-content-center">
        <Board
        v-for="(elemen, i) in categories"
        :key="i"
        :detailCategories="elemen"
        :dataTodo="dataTodo"
        @toEditPage="toEditPage"
        @deleteTodo="deleteTodo"></Board>
        </div>
    </div>
</template>

<script>
    import Board from './Board'
export default {
    name: 'HomePage',
    components: {
        Board
    },
    methods: {
        pindahKe(page){
            this.$emit('changePage', page)
        },
        toEditPage(payload){
            this.$emit('toEditPage', payload)
        },
        deleteTodo(payload){
            this.$emit('deleteTodo', payload)
        },
        logout(){
            this.$emit('logout')
        }
    },
    props: ['categories', 'dataTodo']
}
</script>

<style>

</style>
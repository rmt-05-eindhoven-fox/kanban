<template>
    <section id="homepage">
        <nav class="navbar navbar-light">
            <a class="navbar-brand p-2" href="#">
                Logo here
            </a>

            <a @click="logout" href="#" class="btn btn-info btn-lg">
                <span class="glyphicon glyphicon-log-out"></span> Log out
            </a>

        </nav>

        <div class="board-container">
            <Category 
                v-for="(category, i) in categories" :key="i"
                :categoryName="category"
                :categories="categories"
                :tasks="tasks"
                @changePage="changeToAddPage"
                @changeToEditPage="changeToEditPage"
                @deleteTask="deleteTask"
                @moveCategory="moveCategory">
            </Category>
        </div>
    </section>
</template>

<script>
    import Category from './Category'
    export default {
        name: 'HomePage',
        components: {
            Category
        },
        props: ['categories', 'tasks'],
        methods: {
            changeToAddPage(payload) {
                this.$emit('changePage', payload)
            },
            changeToEditPage(payload) {
                this.$emit('changeToEditPage', payload)
            },
            deleteTask(id) {
                this.$emit('deleteTask', id)
            },
            logout(){
                this.$emit('logout')
            },
            moveCategory(payload){
                this.$emit('moveCategory', payload)
            }
        }
    }
</script>

<style>

</style>
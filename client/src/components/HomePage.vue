<template>
    <section id="homepage">
        <nav class="navbar navbar-light">
           <a href="" class="navbar-brand p-2">
               <svg width="30px" height="30px" viewBox="0 0 16 20" class="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
               </svg>
               Logged in as:  <small>{{username}}</small>
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
        data() {
           return {
              username: localStorage.getItem('username'),
              email: localStorage.getItem('email'),
           }
        },
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
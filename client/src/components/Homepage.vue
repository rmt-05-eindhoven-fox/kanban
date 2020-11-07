<template>
  <section>
    <nav>
        <div id="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1zG4guiendpemb-ol_9fcxTIYTDQSJ5Iz0A&usqp=CAU" width="70px">
        </div>
        <div class="link">
            <ul>
                <li><a href="#" @click.prevent='$emit("changePage", "add-page")'>Create New Task</a></li>
            </ul>
        </div>
        <div class="link icon">
            <ul>
                <li><a href="#"><button @click.prevent="signOut" type="button" class="btn btn-danger">Sign Out</button></a></li>
            </ul>
        </div>
    </nav>
    
    <div class="container-category">
        <div class="category-body">
            <div class="row">
                <Category 
                v-for="(cat,i) in categories"
                :key="i"
                :titleDetails="cat"
                :tasks='tasks'
                @editTask="editTask"
                @fetchTask="$emit('fetchTask')"
                 ></Category>
            </div>
        </div>
    </div>
</template>

<script>
import Category from './Category'
export default {
    name: 'Homepage',
    components: {
        Category
    },
    props: ['categories', 'tasks'],
    methods: {
        signOut() {
            this.$emit('signout')
        },
        editTask(task){
            this.$emit('editTask', task)
        }
    }
    
};
</script>

<style>
</style>
<template>
  <section>
    <nav>
        <div id="logo">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1zG4guiendpemb-ol_9fcxTIYTDQSJ5Iz0A&usqp=CAU" width="70px">
        </div>
        <div class="link">
            <ul>
                <li><a href="#">Create New Task</a></li>
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
                <category 
                v-for="(cat,i) in categories"
                :key="i"
                :titleDetails="cat"
                :tasks='tasks'
                 ></category>
            </div>
        </div>
    </div>
</template>

<script>
import category from './Category'
export default {
    name: 'Homepage',
    components: {
        category
    },
    props: ['categories', 'tasks'],
    methods: {
        signOut() {
            this.$emit('signout')
        }
    }
    
};
</script>

<style>
</style>
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
                <li><a href="#"><button type="button" class="btn btn-danger">Sign Out</button></a></li>
            </ul>
        </div>
    </nav>
    
    <div class="container">
        <Category></Category>
    </div>
</template>

<script>
import Category from './Category'
export default {
    name: 'Homepage',
    components: {
        Category
    }
};
</script>

<style>
</style>
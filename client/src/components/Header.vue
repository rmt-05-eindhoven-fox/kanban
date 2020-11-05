<template>
     <section>
        <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light py-3">
                <div class="container">
                    <a href="#" v-on:click="changePage('home-page')" class="navbar-brand">
                        <h1>KANBAN APP</h1>
                    </a>
                    <a href="#" v-on:click="changePage('add-page')" class="navbar-brand">
                        <h3><button class="btn btn-primary">Add Todo</button></h3>
                    </a>
                </div>
                <div class="row">
                    <a href="#" v-on:click="changePage('register-page')" class="navbar-brand">
                        <h3><button class="btn btn-danger">Logout</button></h3>
                    </a>
                </div>
            </nav>
        </header>
    </section>  
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>

</style>
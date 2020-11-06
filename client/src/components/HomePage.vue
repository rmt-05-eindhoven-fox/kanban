<template>

<div>
    <!-- Navbar -->
    <nav class="row navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Kanban App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a @click.prevent="changePage('new-task')" class="nav-link" href="#"><img src="./icons/plus.png" width="32px" alt="add-task" title="add task"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="logout" href="#"><img src="./icons/exit.png" width="32px" alt="logout" title="logout"></a>
                </li>                           
            </ul>
        </div>
    </nav>
    <!-- KANBAN BOARD -->
    <div class="row p-2 justify-content-between">
        <!-- BACKLOG -->
        <div class="col-sm p-2">
            <div class="card bg-light mb-3">
                <div class="card-header bg-danger text-white mb-4">BACKLOG</div>
                <div class="card-body border-bottom border-top border-danger shadow bg-light mb-3 mr-3 ml-3 p-2 rounded">
                    <h5 class="card-title">baris 1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, delectus? Accusamus beatae, quis, esse explicabo nemo fuga praesentium architecto ullam reiciendis error laboriosam, consequatur perspiciatis ex. In molestiae ex debitis.</p>
                    <button @click="changePage('detail-backlog')" class="btn btn-secondary">Detail</button>
                </div>
            </div>
        </div>
        <!-- TODO -->
        <div class="col-sm p-2">
            <div class="card bg-light mb-3">
                <div class="card-header text-white mb-4" style="background-color: orange;">TODO</div>
                <div class="card-body border-bottom border-top border-warning shadow bg-light mb-3 mr-3 ml-3 p-2 rounded">
                    <h5 class="card-title">{{ }}</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, delectus? Accusamus beatae, quis, esse explicabo nemo fuga praesentium architecto ullam reiciendis error laboriosam, consequatur perspiciatis ex. In molestiae ex debitis.</p>
                </div>
            </div>
        </div>
        <!-- DOING -->
        <div class="col-sm p-2">
            <div class="card bg-light mb-3">
                <div class="card-header bg-info text-white mb-4">DOING</div>
                <div class="card-body border-bottom border-top border-info shadow bg-light mb-3 mr-3 ml-3 p-2 rounded">
                    <h5 class="card-title">baris 1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, delectus? Accusamus beatae, quis, esse explicabo nemo fuga praesentium architecto ullam reiciendis error laboriosam, consequatur perspiciatis ex. In molestiae ex debitis.</p>
                </div>
            </div>
        </div>
        <!-- DONE -->
        <div class="col-sm p-2">
            <div class="card bg-light mb-3">
                <div class="card-header bg-success text-white mb-4">DONE</div>
                <div class="card-body border-bottom border-top border-success shadow bg-light mb-3 mr-3 ml-3 p-2 rounded">
                    <h5 class="card-title">baris 1</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, delectus? Accusamus beatae, quis, esse explicabo nemo fuga praesentium architecto ullam reiciendis error laboriosam, consequatur perspiciatis ex. In molestiae ex debitis.</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'HomePage',
    methods:{
        logout(){
            this.$emit('logout')
        },
        changePage(name){
            this.$emit('changePage', name)
        }
    }
}
</script>

<style>

</style>
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-info">
            <a class="navbar-brand">KANBAN APP</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="PageName !== 'dashboard'" @click.prevent="changePage('login')">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="PageName !== 'dashboard'" @click.prevent="changePage('register')">Register</a>
                </li>
                </ul>
            </div>
            <div v-if="PageName === 'dashboard'">
                <button type="button" class="btn btn-warning" v-on:click.prevent="logout">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    props:['PageName'],
    methods:{
        logout() {
            this.$emit('logout')
        },
        changePage(PageName) {
            this.$emit("changePage", PageName)
        }
    }
    
}
</script>

<style>

</style>
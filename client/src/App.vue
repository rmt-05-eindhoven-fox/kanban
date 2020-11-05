<template>
    <div>
        <h1>{{ message }}</h1>
        <Login></Login>
    </div>
</template>

<script>
import Login from './Login'
export default {
    name: 'App',
    components: {
        Login
    },
    data() {
        return {
            message: 'Hello world',
        };
    },
};
</script>

<style scoped>
</style>
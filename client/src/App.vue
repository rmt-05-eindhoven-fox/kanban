<template>
    <div>
        <!-- <taskpage></taskpage> -->
        <landingpage></landingpage>
    </div>
</template>

<script>
import landingpage from './components/landingpage'
import taskpage from './components/taskpage'

export default {
    name: 'App',
    components: {
        landingpage,
        taskpage
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
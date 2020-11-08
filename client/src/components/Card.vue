<template>
    <div class="boards-container-board-card" >{{this.task.title}}<br> {{this.task.description}} <br></div>
</template>

<script>
export default {
    name: "Card",
    props: ["task"]
}
</script>

<style>

</style>
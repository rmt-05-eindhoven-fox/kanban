<template>
    <div>
        <Header></Header>
        <div class="container-fluid row mt-5 justify-content-center">
        <Board
        v-for="(elemen, i) in categories"
        :key="i"
        :detailCategories="elemen"></Board>
        </div>
    </div>
</template>

<script>
    import Header from './Header'
    import Board from './Board'
export default {
    name: 'HomePage',
    components: {
        Header, Board
    },
    props: ['categories']
}
</script>

<style>

</style>
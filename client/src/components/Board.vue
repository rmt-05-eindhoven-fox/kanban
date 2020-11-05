<template>
    <div class="col-3 mb-5">
        <div class="p-2 text-center" :class="`bg-${detailCategories.color}`">
            <div>
                <h5>{{detailCategories.name}}</h5>
            </div>
                <Todo></Todo>
        </div>
    </div>
</template>

<script>
import Todo from './Todo'
export default {
    name: 'Board',
    components: {
        Todo
    },
    props: ['detailCategories']
}
</script>

<style>

</style>
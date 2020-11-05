<template>
<div class="row">
             <div class="col-md-3 item">
                <h5 class="mt-3 text-center text-white p-4 rounded bg-primary">Backlog</h5>
                <div class="bg-light p-2 task-overflow shadow card rounded">
                    <div class="card"></div>
                </div>
             </div>
             <div class="col-md-3 item">
                <h5 class="mt-3 text-center text-white p-4 rounded bg-secondary">Todo</h5>
                <div class="bg-light p-2 task-overflow shadow card rounded">
                    <div class="card"></div>
                </div>
             </div>
             <div class="col-md-3 item">
                <h5 class="mt-3 text-center text-white p-4 rounded bg-success">Doing</h5>
                <div class="bg-light p-2 task-overflow shadow card rounded">
                    <div class="card"></div>
                </div>
             </div>
             <div class="col-md-3 item">
                <h5 class="mt-3 text-center text-white p-4 rounded bg-danger">Completed</h5>
                <div class="bg-light p-2 task-overflow shadow card rounded">
                    <div class="card"></div>
                </div>
             </div>
         </div>
</template>

<script>
export default {
    name: 'Category'
}
</script>

<style>

</style>
<template>
<div id="add-page" class="global-container">
    <nav class="navbar navbar-dark bg-custom-2">
        <a class="navbar-brand" href="#a">Kanban Web</a>
    </nav>

    <div class="card login-form">
        <div class="card-body">
            <h3 class="card-title text-center">Add Task</h3>
            <div class="card-text">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Title your Task</label>
                        <input type="" class="form-control form-control-sm" id="" >
                        <label for="exampleInputEmail1">Description</label>
                        <input type="" class="form-control form-control-sm" id="" >
                    </div>
                    <div class="form-group">
                        <div class="addForm-dropdown">
                            <label for="cars">
                                <i class="fas fa-layer-group"></i>
                                Choose a Task
                            </label>
                            <select name="category" id="category" v-model="selected">
                                <option value="0">Backlog</option>
                                <option value="0">Todo</option>
                                <option value="0">Done</option>
                                <option value="0">Completed</option>                   
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Add Task</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
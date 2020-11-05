<template>
  <div class="container">
            <div class="row content">
                <div class="col-md-6 mb-3">
                    <h3 class="signin-text mb-3">Create Task</h3>
                    <form>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="title" name="title" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <input type="text-area" name="description" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select class="form-control">
                                <option>Backlog</option>
                                <option>Todo</option>
                                <option>Doing</option>
                                <option>Completed</option>
                            </select>
                        </div>
                        <button class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'AddForm'
}
</script>

<style>

</style>
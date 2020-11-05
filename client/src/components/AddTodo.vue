<template>
      <section>
        <div class="row justify-content-center">
            <div class="col-4">
                <form>
                    <h1>CREATE TODO</h1>
                    <div class="form-group">
                        <label for="title-todo">Title</label>
                        <input type="text" id="title-todo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="description-todo">Description</label>
                        <input type="text" id="description-todo" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="category-todo">Category</label><br>
                        <input type="radio" id="Backlog" name="category-todo" value="Backlog">
                        <label for="Backlog">Backlog</label><br>
                        <input type="radio" id="Production" name="category-todo" value="Production">
                        <label for="Production">Production</label><br>
                        <input type="radio" id="Development" name="category-todo" value="Development">
                        <label for="Development">Development</label><br>
                        <input type="radio" id="Done" name="category-todo" value="Done">
                        <label for="Done">Done</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Todo</button>
                </form>
                <div class="mt-3">
                    <button v-on:click="changePage('home-page')" class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AddTodo'
}
</script>

<style>

</style>
<template>
<div>
    <div class="row bg-dark text-white justify-content-center align-items-center" style="height: 100vh;">
        <form @submit.prevent="newTask">
            <div class="col bg-light text-dark rounded shadow" style="width: 50vw;">
                <div class="row card-header mb-4">New Task</div>
                <div class="mb-2">
                    <label for="title">Title</label>
                    <input v-model="title" class="form-control form-control-sm" type="text" id="title" placeholder="Task title">
                </div>
                <div class="mb-2">
                    <label for="category">Category</label>
                    <select v-model="category" id="category" class="form-control form-control-sm">
                        <option value="">Please Choose Category</option>
                        <option value="backlog">Backlog</option>
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div class="d-flex justify-content-end mt-5">
                    <div class="mb-4">
                        <button @click="changePage('homepage')" type="reset" class="btn btn-white">Cancel</button>
                        <button type="submit" class="btn btn-info">Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    name: 'AddTask',
    data(){
        return{
            title: '',
            category: '',
        }
    },
    methods:{
        newTask(){
            let payload = {
                title: this.title,
                category: this.category
            }
            this.$emit('newTask', payload)
            this.title = ''
            this.category = ''
        },
        changePage(name){
            this.$emit('changePage', name)
        }
    }
}
</script>

<style>

</style>
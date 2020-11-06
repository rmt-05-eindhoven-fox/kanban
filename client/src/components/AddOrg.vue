<template>
   <div class="container p-5">
        <div class="row">
            <div class="col-4 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column">
                    <div>
                        <h3>Create new Organization!</h3>
                    </div>
                    <div>
                        <form @submit.prevent="addOrg">
                            <div class="form-group">
                                <label for="name">Name</label><br>
                                <input v-model="data.org_name" type="text" placeholder="RMT-01"><br>
                            </div>
                            <div class="form-group">
                                <label for="special-code">Special code</label><br>
                                <input v-model="data.org_code" type="text" placeholder="1JKS9219K"><br>
                            </div>
                            <input type="submit" value="Add Task" class="btn btn-primary">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addTask',
    data() {
        return {
            data: {
                org_name: '',
                org_code: ''
            }
        }
    },
    methods: {
        addOrg() {
            let data = this.data
            this.$emit('addTask', data)
        }
    }
}
</script>

<style>

</style>
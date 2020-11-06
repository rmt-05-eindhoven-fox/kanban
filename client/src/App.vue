<template>
    <div>
        <div 
        v-if="pageName == 'home-page'">
            <nav>
                <div class="d-flex justify-content-between p-2 bg-primary">
                    <div>
                        <div>
                            <div @click="addOrgForm" class="navbar-brand">
                                + New Organization
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex">
                            <div>
                                <div @click="showAddForm" class="navbar-brand">
                                    Add Task
                                </div>
                            </div>
                            <div>
                                <div @click="signout" class="navbar-brand">
                                    <a>SignOut</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <h3>
                <select v-model="OrganizationId">
                    <option value="">SELECT ORGANIZATION</option>
                    <Organization
                        v-for="(organization, i) in organizations"
                        :key="i"
                        :data="organization">
                    </Organization>
                </select>
            </h3>
            <Homepage
                :categories="categories"
                :tasks="tasks"
                @editForm="editForm"
                @deleteTask="deleteTask">
            </Homepage>
        </div>

        <!-- Start Sign Up -->
        <Signup
            v-else-if="pageName == 'signup-page'"
            @signup="signup">
        </Signup>
        <!-- End Sign Up -->

        <!-- Start Sign In -->
        <Signin
            v-else-if="pageName == 'signin-page'"
            @signin="signin">
        </Signin>
        <!-- End Sign In -->

        <AddOrg
            v-else-if="pageName == 'addOrg-page'"
            @addOrg="addOrg">
        </AddOrg>

        <AddTask
            v-else-if="pageName == 'addTask-page'"
            @addTask="addTask">
        </AddTask>

        <EditTask
            v-else-if="pageName == 'editform-page'"
            :taskData="taskData"
            @editTask="editTask">
        </EditTask>
    </div>
</template>

<script>
import Homepage from './components/Homepage.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import axios from './config/axios'
import AddTask from './components/AddTask.vue'
import EditTask from './components/EditTask.vue'
import AddOrg from './components/AddOrg'
import Organization from './components/Organization'
export default {
    name: 'Home',
    data() {
        return {
            pageName: 'home-page',
            organizations: null,
            OrganizationId: '',
            tasks: {},
            categories: [
                'backlog',
                'todo',
                'doing',
                'done'
            ],
            taskData: {}
        };
    },
    components: {
        Homepage,
        Signin,
        Signup,
        AddTask,
        EditTask,
        AddOrg,
        Organization
    },
    methods: {
        signup(data) {
           axios({
                url: `/users/signup`,
                method: 'POST',
                data: data
            })
            .then(result => {
                this.pageName = 'signin-page'
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
        },
        signin(data) {
            axios({
                url: `/users/signin`,
                method: 'POST',
                data: data
            })
            .then(result => {
                const token = result.data.access_token
                this.pageName = 'home-page'
                localStorage.setItem('token', token)
                this.fecthTask()
                this.fecthOrg
            })
            .catch(err => {
                console.log(err)
            })
        },
        signout() {
            this.pageName = 'signin-page'
            localStorage.removeItem('token')
        },

        fecthOrg() {
            console.log('terjadi')
            axios({
                url: `/organizations/`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                console.log(result)
                this.organizations = result.data.result
                console.log(this.organizations)
            })
            .catch(err => {
                console.log('hehe')
                console.log(err)
            })
        },

        organizationID(data){

        },

        addOrgForm() {
            this.pageName = 'addOrg-page'
        },

        addOrg(data) {
            axios({
                url: `/organizations/`,
                method: 'POST',
                data: data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                this.pageName = 'home-page'
                this.fecthTask()
                this.fecthOrg()
            })
            .catch(err => {
                console.log(err)
            })
        },

        fecthTask() {
            axios({
                url: `/tasks/4`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                this.tasks = result.data.result
            })
            .catch(err => {
                console.log(err)
            })
        },

        showAddForm() {
            this.pageName = 'addTask-page'
        },

        addTask(data) {
            axios({
                url: `/tasks/4`,
                method: 'POST',
                data: data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                this.pageName = 'home-page'
                this.fecthTask()
                this.fecthOrg()
            })
            .catch(err => {
                console.log('hehe')
                console.log(err)
            })
        },

        editForm(data) {
            this.pageName = 'editform-page'
            this.taskData = data
        },

        editTask(data) {
            axios({
                url: `/tasks/${this.taskData.id}`,
                method: 'PUT',
                data: data,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                this.fecthTask()
                this.fecthOrg()
                this.pageName = 'home-page'
            })
            .catch(err => {
                console.log(err)
            })
        },

        deleteTask(index){
            axios({
                url: `/tasks/${index}`,
                method: 'DELETE',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(result => {
                this.fecthTask()
                this.fecthOrg()
                this.pageName = 'home-page'
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.pageName = 'home-page'
            this.fecthTask()
            this.fecthOrg()
        } else {
            this.pageName = 'signin-page'
        }
    }
    
};
</script>

<style scoped>
</style>
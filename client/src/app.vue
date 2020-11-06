<template>
  <div>
      <section class="main">
          <Register v-if="pageName === 'registerPage'"></Register>
          <Login v-else-if="pageName === 'loginPage'"></Login>
          <HomePage 
          v-else-if="pageName === 'Homepage'"
          :categories="categories"
          :tasks="tasks"
          @changePage='changePage'
          @toEditPage='toEditPage'
          @deleteTask='deleteTask'>
          </HomePage>

          <AddPage v-else-if="pageName === 'addPage'" 
          @addTask='addTask'>

          </AddPage>

          <EditPage v-else-if="pageName === 'editPage'" 
          :detailTask='detailTask'
          @editTask='editTask'>

          </EditPage>
      </section>
  </div>
</template>

<script>
import Register from './components/Register'
import Login from './components/Login'
import HomePage from './components/HomePage'
import AddPage from './components/AddPage'
import EditPage from './components/EditPage'
import axios from './config/axios'
export default {
    name: 'app',
    data(){
        return {
            msg: '',
            pageName: 'loginPage',
            categories: ['Backlog', 'Todo', 'Doing', 'Done'],
            tasks: [],
            detailTask: null,
            email: '',
            password: ''
        }
    },
    components: {
        HomePage, AddPage, EditPage
    },
    methods: {
        changePage(page){
            this.pageName = page
        },
        toEditPage(payload){
            console.log(payload)
            this.pageName = payload.pageName
            this.detailTask = {
                id: payload.id,
                title: payload.title,
                category: payload.category
            }
        },
        fetchTasks(){
            axios({
                url: '/tasks',
                method: 'get',
                headers: {
                    'access_token': localStorage.setItem('token')
                }
            })
            .then( data => {
                console.log(data);
                this.tasks = data.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        addTask(payload){
            axios({
                url: '/tasks',
                method: 'post',
                data: {
                    title: payload.title,
                    category: payload.category
                },
                headers: {
                    'access_token': localStorage.setItem('token')
                }
                
            })
            .then( ({data}) => {
                this.fetchTasks()
                this.pageName="Homepage"
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTask(payload){
            console.log(payload)
            axios({
                url: `/tasks/${payload.id}`,
                method: 'put',
                data: {
                    title: payload.title,
                    category: payload.category
                },
                headers: {
                    'access_token': localStorage.setItem('token')
                }
                
            })
            .then( ({data}) => {
                this.fetchTasks()
                this.pageName="Homepage"
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTask(payload){
            axios({
                url: `/tasks/${payload.id}`,
                method: 'Delete',
                headers: {
                    'access_token': localStorage.setItem('token')
                }
            })
            .then( data => {
                this.fetchTasks()
                this.pageName="Homepage"
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
            this.fetchTasks()
    }
}
</script>

<style>

</style>
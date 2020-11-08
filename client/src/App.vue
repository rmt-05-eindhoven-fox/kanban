<template>
   <section id="home-page">
            <login-page v-if="pageName == 'LoginPage'" 
            @login="login"
            @changeRegister="changeRegister"
            @loginGoogle="loginGoogle">
            </login-page>
            <register-page v-else-if="pageName == 'RegisterPage'"
            @register="register">
            </register-page>
            <home-page 
             v-else-if="pageName == 'home-page'"
             :phases="phases"
             :tasks="tasks"
             @signout="signout"
             @addTask="addTask"
             @deleteTask="deleteTask"
             @updateTask="updateTask"
             @updateCategory="updateCategory"
             >
            </home-page>
            <add-modal v-else-if="pageName == 'add-page'">
            </add-modal>

        </section>
</template>

<script>
import LoginPage from "./views/Login"
import RegisterPage from "./views/Register"
import HomePage from "./views/HomePage"
import AddModal from "./views/AddModal"
import axios from "./config/axios"
export default {
    name : "App",
    components : { 
        LoginPage,
        RegisterPage,
        HomePage, 
        AddModal 
    },
 data: function () {
    return {
        pageName : 'LoginPage', 
        phases : [
            { 
                phase : "BackLog", 
                id : 1
            }, 
            { 
                phase : "ToDo", 
                id : 2
            }, 
            { 
                phase : "Doing", 
                id : 3
            }, 
            { 
                phase : "Done", 
                id : 4
            }
        ],
    tasks : [], 
    }   
 }, 
 methods : { 
    login(payload)  {
        axios ({ 
            url : "/login", 
            method : "POST", 
            data : { 
                email : payload.email, 
                password : payload.password, 
            }
            
        }).then( res => { 
            const access_token = res.data.access_token
            localStorage.setItem("access_token", access_token)
            this.checkLogin()
    
        }).catch(err => { 
            console.log(err.response);
        })
    },



    
    register(payload) { 

        axios({ 
            url : "/register", 
            method : "POST", 
            data : { 
                email : payload.email, 
                password : payload.password
            }
        }).then(res => { 
            this.pageName = 'LoginPage'
        }).catch(err => { 
            console.log(err);
        })
    },

    changeRegister(name) { 
        this.pageName = name
    },

    loginGoogle(google_token) { 
        axios({ 
            url : "/googleLogin", 
            method : "POST", 
            data : {    
                google_token
            }
        }).then(({data}) => { 
          console.log(data, "<< data dari google");
          localStorage.setItem("access_token", data.access_token);
          this.checkLogin()

          this.pageName = "home-page"
        }).catch(err => { 
            console.log(err);
        })
    },

    signout() { 
        localStorage.removeItem("access_token")
        this.pageName = 'LoginPage' 
    },

    fetchTasks() { 
        const access_token = localStorage.getItem("access_token")
        axios({ 
            url : "/tasks", 
            method : "GET", 
            headers: { access_token },

        }).then(({data}) => {
            this.tasks = data
         }).catch(err => { 
             console.log(err.response);
         })
    },

    checkLogin() { 
        const access_token =  localStorage.getItem("access_token")
        if(access_token) { 
            this.pageName = 'home-page'
            this.fetchTasks()
        } else { 
            this.pageName = 'LoginPage'
        }
    },

    addTask(payload) { 
        const access_token =  localStorage.getItem("access_token")
        axios({ 
            url : "/tasks", 
            method : "POST", 
            data : { 
                title : payload.title, 
                description : payload.description
            }, 
            headers : {
                access_token
            }
        }).then(({data}) => { 
            console.log(data)
            this.fetchTasks()       

        }).catch(err => { 
            console.log(err);
        })
    },

    updateTask(payload) { 
        const access_token = localStorage.getItem("access_token")
        axios({ 
           url : `/tasks/${payload.id}`, 
           method : "PUT", 
           data : { 
               title : payload.title, 
               description : payload.description
           }, 
           headers : { 
               access_token
           }
        }).then(({data}) => { 
            console.log(data);
            this.fetchTasks()
        }).catch(err => { 
            console.log(err);
        })

    },


    updateCategory(payload) { 
        console.log(payload, "<<<< payload updateCategory");
        const access_token = localStorage.getItem("access_token")
        axios({ 
            url : `/tasks/${payload.id}`,
            method : "PATCH", 
            data : { 
                CategoryId : payload.CategoryId
            }, 
            headers : { 
                access_token
            }
        }).then(({data}) => { 
            console.log(data, "<<< data dari updateCategory");
            this.fetchTasks()
        }).catch(err => {
            console.log(err);
        })
    },

    deleteTask(id) { 
        const access_token =  localStorage.getItem("access_token")
        axios({ 
            url: `/tasks/${id}`,
            method : "DELETE", 
            headers : { 
                access_token 
            }
        }).then(({data}) => { 
            console.log(data)
            this.fetchTasks()
        }).catch(err => { 
            console.log(err);
        })
    }


 }, 
 created() { 
     this.checkLogin()
     
 }
}
</script>

<style>

</style>
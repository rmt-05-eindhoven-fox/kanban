<template>
   <section id="home-page">
            <LoginPage v-if="pageName == 'LoginPage'" 
            @login="login"
            @changeRegister="changeRegister"
            @gAuth="googleLogin">
            </LoginPage>
            <RegisterPage v-else-if="pageName == 'RegisterPage'"
            @register="register">
            </RegisterPage>
            <HomePage 
             v-else-if="pageName == 'home-page'"
             :phases="phases"
             :tasks="tasks"
             @signout="signout"
             @addTask="addTask"
             @deleteData="deleteData"
             @logoutEvent = "logout"
             >
            </HomePage>
            <AddPage v-else-if="pageName == 'add-page'">
            </AddPage>

        </section>
</template>

<script>
import LoginPage from "./views/Login"
import RegisterPage from "./views/Register"
import HomePage from "./views/HomePage"
import AddPage from "./views/AddPage"
import axios from "./config/axios"
export default {
    name : "App",
    components : { 
        LoginPage,
        RegisterPage,
        HomePage, 
        AddPage 
    },
 data: function () {
    return {
        pageName : 'AddPage', 
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
    tasks : []
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
                clientId : "931729982611-knngcbecfkuufm822u2vca4f22mhchfq.apps.googleusercontent.com" 
            }
            
        }).then( res => { 
            const access_token = res.data.access_token
            localStorage.setItem("access_token", access_token)
            this.checkLogin()

        }).catch(err => { 
            console.log(err.response);
        })
    },

        OnGoogleAuthSuccess (idToken) {
        console.log(idToken, "token")
        // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
        console.log(error)
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

    googleLogin(auth) { 
        axios({ 
            url : "/googleLogin", 
            method : "POST", 
            data : { 
                id_token : auth
            }
        }).then(({data}) => { 
            localStorage.token = data.token 
            localStorage.email = data.email
            this.checkLogin()
        }).catch(err => { 
            console.log(err);
        })
    },

    signout() { 
        localStorage.removeItem('access_token')
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

    deleteData(id) { 
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
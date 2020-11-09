<template>
   <section id="HomePage">
            <login-page v-if="pageName == 'LoginPage'" 
            @login="login"
            @changeRegister="changeRegister"
            @loginGoogle="loginGoogle">
            </login-page>
            <register-page v-else-if="pageName == 'RegisterPage'"
            @register="register">
            </register-page>
            <home-page 
             v-else-if="pageName == 'HomePage'"
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
import Swal from "sweetalert2";
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
        error : { 
            email : "", 
            password : "", 
            passwordLength : ""
        },
        isError : { 
            email : false, 
            password : false, 
            passwordLength : false
        },
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


    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }); 

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
            this.checkAuth()
            Toast.fire({
                icon: "success", 
                title : "Log in successfully"
            })
        }).catch(err => { 
            console.log(err.response.data)
            Swal.fire({ 
                icon : "error", 
                title : "Error", 
                text : err.response.data.message
            })
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

         const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

        axios({ 
            url : "/googleLogin", 
            method : "POST", 
            data : {    
                google_token
            }
        }).then(({data}) => { 
          localStorage.setItem("access_token", data.access_token);
          this.checkAuth()
          this.pageName = "HomePage"
          Toast.fire({ 
              icon :"success", 
              title : "Log in successfully"
          })
        }).catch(err => { 
            console.log(err.response.data.message);
              Swal.fire({ 
                icon : "error", 
                title : "Error", 
                text : err.response.data.message
            })
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

    checkAuth() { 
        const access_token =  localStorage.getItem("access_token")
        if(access_token) { 
            this.pageName = 'HomePage'
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
            this.fetchTasks()   
            console.log(data, "<<< data addTask"); 
            this.data.title = ""
            this.data.description = ""
         
        }).catch(err => { 

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
            this.$swal(
                "success move task to another phase"
            )
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
        }).then(res => { 
            console.log(res)
            this.$swal(
                "success delete message", 
            )
            this.fetchTasks()
        }).catch(err => { 
            console.log(err);
        })
    }


 }, 
 created() { 
     this.checkAuth()
     
 }
}
</script>

<style>

</style>
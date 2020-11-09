<template>
      <section class="Form my-4 mx-5" id="RegisterPage">
        <div class="container">
            <div class="row no-gutters">
                <div class="col-lg-5">
                    <img src="../../scrum_board.png" class="img-fluid" alt="">
                </div>
                <div class="col-lg-7 px-5 pt-5">
                    <h3>Register your account</h3>
                    <form @submit.prevent="register">
                        <div class="form-row">
                            <div class="col-lg-7">
                                <input v-model="user.email" type="email" id="register-email" class="form-control my-3 p-4"
                                    placeholder="Email address" required="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                <input v-model="user.password" type="password" id="register-password" class="form-control my-3 p-4"
                                    placeholder="password" required="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-7">
                                <button type="submit" class="btn btn-primary" mt-3 mb-5>Register</button>
                            </div>
                        </div>
                        <div class="checkbox mb-3">
                            <p>
                                Already have an account? <br>
                                <a href="">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {
    name : "RegisterPage",
  
  data() { 
      return { 
          user : { 
              email : "", 
              password : ""
          }
      }
  }, 
  methods : { 
      changeName(name) { 
          this.pageName  =name
      }, 

      register() { 
          let payload = this.user
          this.$emit('register', payload)
      }
  }
  
}
</script>

<style>

</style>
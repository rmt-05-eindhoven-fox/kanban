<template>
      <section id="register">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">

          <div class="" style="height: 70%; background: wheat url('./assets/kanban.png'); background-size: contain; background-repeat: no-repeat; border-radius: 5%; box-shadow: 0px 9px 24px 8px rgba(0,0,0,0.75);">
            <div class="row m-2">
              <div class="col">
                <p style="text-align: center; text-shadow: -2px -1px 1px rgb(245, 226, 238);" class=" h1">Welcome to Kanban App</p>
              </div>
            </div>

            <div class="row justify-content-center " style="height: 70%; ">
              <div class="col-5 rounded" style="">
                <div class="rounded p-2" style="background-color: rgba(250, 250, 250, 0.7);">
                  <ul class="list-group list-group-flush">
                    <li class="p-2 list-group-item" style="align-text: center">What you can get with kanban</li>
                    <li class="p-2 list-group-item" style="background: none;">Flexibility.</li>
                    <li class="p-2 list-group-item" style="background: none;">Focus on continuous delivery.</li>
                    <li class="p-2 list-group-item" style="background: none;">Reduction of wasted work / wasted time.</li>
                    <li class="p-2 list-group-item" style="background: none;">Increased productivity.</li>
                    <li class="p-2 list-group-item" style="background: none;">Increased efficiency.</li>
                  </ul>
                </div>

              </div>
              <div class="col-6">
                <div class="p-2" >
                  <form action=" " @submit.prevent="register" required>
                    <p class="h5 rounded" style="text-align: center; background-color: rgba(158, 10, 109, 0.6); height: 30px; color: white;">Register</p>
                    <div class="form-group">
                      <p class="h6 " style="text-shadow: -1px -1px 0px gainsboro;">Email</p>
                      <input v-model="email" type="text" class="form-control" placeholder="Your email here" required>
                    </div>
                    <div class="form-group">
                      <p class="h6 " style="text-shadow: -1px -1px 0px gainsboro;">Password</p>
                      <input v-model="password" type="password" class="form-control" placeholder="Your password here" required>
                    </div>
                    <div class="form-group">
                      <input v-model="confirmPassword" type="password" class="form-control" placeholder="Retype your password" required>
                    </div>
                    <div class="form-group">
                      <input type="submit" class="form-control btn btn-success">
                    </div>
                  </form>
                  <p class="h6 " style="text-align: center; text-shadow: -1px -1px 0px gainsboro;">OR</p>
                  <div class="row" style="justify-content: center;">
                    <p class="mr-1" >Already have account?</p>
                    <a href="" @click.prevent="form" style="text-decoration: none;"><p>log in here</p></a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: '',
      confirmPassword: ""
    }
  },
  methods: {
    form() {
      this.$emit('form', 'login')
    },
    register() {
      let data = {
        email : this.email, password: this.password
      }
      if(this.password !== this.confirmPassword) {
        this.$emit('error', { msg : 'Password doesn\'t match'})
      } else {
        this.email = ""
        this.password = ""
        this.confirmPassword = ""
        this.$emit('register', data)
      }
    }
  }
}
</script>

<style>

</style>
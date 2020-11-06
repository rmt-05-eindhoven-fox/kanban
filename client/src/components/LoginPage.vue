<template>
  <section>
    <div class="container" id="login-page">
      <div class="row justify-content-center" style="width: 100%;">
        <div class="card mb-10" style="width: 768px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form @submit.prevent="login">
                  <div class="form-group">
                    <label for="">Email</label>
                    <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="" v-model="email">
                  </div>
                  <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" class="form-control" name="" id="" placeholder="" v-model="password">
                  </div>
                  <button class="btn btn-primary" >Login</button>
                  <a @click="movePage">Register ??</a>
                </form>
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
  name: 'LoginPage',
  data(){
    return {
     email: "",
     password: ""
    }
  },
  methods: {
    movePage(){
      this.$emit('changePage', 'regis-page');
    },
    login(){
      let payload = {
        email: this.email,
        password: this.password
      }

      this.$emit('login', payload);
    }
  }
}
</script>

<style>

</style>
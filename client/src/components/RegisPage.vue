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
                <h5 class="card-title">Register</h5>
                <form @submit.prevent="regis">
                  <div class="form-group">
                    <label for="">Email</label>
                    <input v-model="email" type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="">
                  </div>
                  <div class="form-group">
                    <label for="">Password</label>
                    <input v-model="password" type="password" class="form-control" name="" id="" placeholder="">
                  </div>
                  <button class="btn btn-primary">Submit</button>
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
  name: 'RegisPage',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    regis() {
      let payload = {
        email : this.email,
        password : this.password
      }

      this.$emit('regis', payload);
    }
  }
}
</script>

<style>

</style>
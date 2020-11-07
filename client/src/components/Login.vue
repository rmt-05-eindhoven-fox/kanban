<template>
  <div id="login page" class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-5 shadow p-5 bg-dark">
        <form onsubmit="login(event)">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="login-email" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="login-password" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <a href="#" id="register-link">Register now</a><br><br>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
          <br>
          <div class="error-message"></div>
          <br>
          <div class="register-success"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Login"

}
</script>

<style>

</style>
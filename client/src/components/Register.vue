<template>
  <div id="register-page" class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-5 shadow p-5 bg-dark">
        <form onsubmit="register(event)">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="reg-email" class="form-control" />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="reg-password" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <a href="#" class="cancel-button">Cancel</a><br /><br />
          <div class="error-message"></div>
          <div class="register-success"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Register"
};
</script>

<style>
</style>
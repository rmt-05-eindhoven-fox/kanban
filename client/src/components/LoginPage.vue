<template>
  <div>
    <section id="login-page">
      <div class="container d-flex justify-content-center">
        <div class="row">
          <div class="col-12 logo-kanban">
            Logo<!-- <img src="assets/logo-kanban@2x.png" alt="" srcset=""> -->
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <h3 class="text-center">Login to your account</h3>
        <div class="row justify-content-center">
          <div class="col-12 col-lg-4">
            <form>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  id="login-email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="login-password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div class="btn-section">
                <button type="submit" class="btn btn-login">Login</button><br />
                <button class="btn btn-link">Create your account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
}
</script>

<style></style>

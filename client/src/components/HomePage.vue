<template>
  <section id="home-page" style="width: 100vw; height: 100vh; align-items: center; position: relative;">
    <video autoplay muted loop id="myVideo" style="height: auto; width: 100%; position: absolute; z-index: -2;">
      <source src="../assets/discussing_features.mp4" type="video/mp4">
    </video>
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="jumbotron jumbotron-fluid px-4 bg-light shadow h-75" style="opacity: 0.8;">
        <h1 class="display-4">Welcome to Kanban!</h1>
        <p class="lead">This is an app for your company to help you and your colleagues manage your projects.</p>
        <hr class="my-4">
        <p>Sometimes managing tasks can be hard, right?</p>
      </div>
      <div class="jumbotron jumbotron-fluid text-right px-4 bg-light shadow h-75" style="opacity: 0.8;">
        <form>
          <div class="form-group">
            <label for="sign-up-name">Name</label>
            <input type="text" class="form-control" id="sign-up-name" aria-describedby="emailHelp" placeholder="Enter name" style="border: bottom;">
          </div>
          <div class="form-group">
            <label for="sign-up-email">Email address</label>
            <input type="email" class="form-control" id="sign-up-email" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="sign-up-password">Password</label>
            <input type="password" class="form-control" id="sign-up-password" placeholder="Password">
          </div>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">
              Sign In
            </button>            
            <button type="submit" class="btn btn-primary">Sign Me Up</button>
        </form>          
      </div>
    </div>

    <!-- ! Modal Sign in -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <form>
          <div class="modal-body">
              <div class="form-group p-4">
                <label for="sign-in-email">Email address</label>
                <input type="email" class="form-control" id="sign-in-email" aria-describedby="emailHelp" placeholder="Enter email">
              </div>
              <div class="form-group p-4">
                <label for="sign-in-password">Password</label>
                <input type="password" class="form-control" id="sign-in-password" placeholder="Password">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" data-dismiss="modal">Save changes</button>
            </form>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>

</style>
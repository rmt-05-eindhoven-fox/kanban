<template>
<section id="registerbody">
 <div class="container">
  <div class="row">
   <div class="col-md-6">
    <div class="card">
     <form class="box rounded">
      <h1 style="font-family: Impact; letter-spacing: 7px">Register</h1>
      <p class="text-muted" style="font-family: monospace;">
       Lets place a spot for yourself in our app
      </p>
      <input type="text" name="" placeholder="Email" />
      <input type="password" name="" placeholder="Password" />
      <p style="color: white; font-size: 1em; font-family: monospace">
       Already got an account? Let's
       <a class="to-login" href="#" style="font-family: monospace;"> login</a>
      </p>
      <input type="submit" class="register-ipt" name="" value="Register" href="#" />
      <div class="col-md-12">
       <ul class="social-network social-circle">
        <li>
         <a href="#" class="icoGoogle" title="Google +"><i class="fab fa-google-plus"></i></a>
        </li>
       </ul>
      </div>
     </form>
    </div>
   </div>
  </div>
 </div>
</section>
</template>

<script>
export default {
 name: "RegisterPage"
}
</script>

<style>

</style>

<template>
  <section id="user-page" style="width: fit-content; padding-top: 10%; height: 100vh; background-color: #2c3e50;">
    <!-- ! Navbar -->
    <div class="fixed-top m-0 p-0 bg-info shadow" style="width: 100vw !important;">
      <nav class="navbar row navbar-expand-lg navbar-dark w-100 py-0 px-4 m-0" style="height: fit-content;">
        <div class="col-4">
        </div>
        <div class="col-4 d-flex justify-content-center h-100">
          <img src="../assets/logo.png" alt="logo" height="100px">
        </div>
        <div class="col-4 d-flex justify-content-end">
          <button class="navbar-toggler align-self-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="project" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Project1
                  <span class="sr-only">(current)</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="project">
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#addMember">Collaborators</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="projects" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  My Projects
                </a>
                <div class="dropdown-menu" aria-labelledby="projects">
                  <a class="dropdown-item" href="#">Project1</a>
                  <a class="dropdown-item" href="#">Project2</a>
                  <a class="dropdown-item" href="#">Project3</a>
                </div>
              </li>
              <li class="nav-item align-items-center d-flex">
                <a class="nav-link fa fa-power-off" role="button" href="#"></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <Project></Project>
  </section>
</template>

<script>
import Project from './UserPage/Project'
export default {
  name: 'UserPage',
  components: {
    Project
  }
}
</script>

<style>

</style>
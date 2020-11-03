const SERVER = "http://localhost:3000"

$(document).ready(function () {
  const token = localStorage.getItem("token")

  if (!token) {
    $("#login").show()
    $("#register").hide()

  }
  else {
    afterLogin()
  }

  $("#btn-register").on("click", function () {
    $("#login").hide()
    $("#register").show()
  })
})
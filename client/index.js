const SERVER = "http://localhost:3000";

$(document).ready(function () {
  const access_token = localStorage.getItem("access_token");
  // untuk sementara auto dalam kondisi login
  if (access_token) {
    $("#landing").show();
    $("#content").hide();
  } else {
    $("#landing").hide();
    $("#content").show();
  }
});

function login() {
  $("#landing").hide();
  $("#content").show();
}

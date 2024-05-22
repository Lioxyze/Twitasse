function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "/Auth/Login_Register/login.html";
}

function myFunction(x) {
  x.classList.toggle("fa-thumbs-down");
}

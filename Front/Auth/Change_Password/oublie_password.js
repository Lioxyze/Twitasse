async function MailForgetPassword() {
  const email = document.querySelector("#email").value;
  let bodyEmail = {
    email: email,
  };
  let request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(bodyEmail),
  };

  let apiRequest = await fetch(
    "http://localhost:3000/UpdateMailpassword",
    request
  );

  if (apiRequest.status === 200) {
    alert("un email pour changer votre mot de passe a été envoyer ");
    window.location.href = "./login.html";
  }
}

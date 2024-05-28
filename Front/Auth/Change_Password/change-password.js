async function changePassword() {
  try {
    let jwt = window.localStorage.getItem("jwt");

    const password = document.querySelector("#password").value;
    const newPassword = {
      password: password,
    };
    let request = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newPassword),
    };

    const dbUpdate = await fetch(
      `http://localhost:3000/updatePassword/${jwt}`,
      request
    );

    if (dbUpdate.status === 200) {
      window.location.href = "../Home/homeAdmin.html";
    } else {
      alert("Probleme de changement du mdp");
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

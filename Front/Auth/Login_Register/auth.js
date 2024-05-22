async function handleLogin() {
  const Email = document.querySelector(".email").value;
  const Password = document.querySelector(".password").value;

  let user = {
    Email: Email,
    Password: Password,
  };

  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  let apiRequest = fetch("http://localhost:3000/api/login", request);
  let response = await apiRequest;
  const data = await response.json();

  if (response.status === 200) {
    let jwt = data.jwt;
    let role = data.role;

    window.localStorage.setItem("jwt", jwt);

    if (role === 1) {
      window.location.href = "/Auth/Home/homeAdmin.html";
    } else {
      window.location.href = "/Auth/Home/homeUser.html";
    }
  }
}

async function handleRegister() {
  let Email = document.querySelector(".email").value;
  let Password = document.querySelector(".password").value;
  let Pseudo = document.querySelector(".pseudo").value;
  let image = document.querySelector(".image");

  //insertion de l'image

  const formData = new FormData();
  formData.append("image", image.files[0]);

  const response = await fetch("http://localhost:3000/api/insert/picture", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  console.log(result.newFileName);
  // Inserer un utilisateur
  let user = {
    Email: Email,
    Password: Password,
    Pseudo: Pseudo,
    Image: result.newFileName,
  };

  console.log(user);
  try {
    let response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("Utilisateur enregistré avec succès.");
      window.location.href = "./login.html";
    } else {
      console.error("Échec de l'enregistrement de l'utilisateur.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la tentative d'enregistrement :",
      error
    );
  }
}

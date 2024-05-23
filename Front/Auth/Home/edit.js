async function UpdatePost(id) {
  let Image = document.querySelector(".image").value;
  let Title = document.querySelector(".title").value;
  let Description = document.querySelector(".description").value;

  if (!Image || !Title || !Description) {
    console.error("One or more input elements not found");
    return;
  }

  let jwt = window.localStorage.getItem("jwt");
  if (!jwt) {
    console.log("Problème");
  }
  const response = await fetch(`http://localhost:3000/api/UpdatePost/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message);
    window.location.reload();
  } else {
    console.error("La modif a échoué :", response.statusText);
  }
}
// reload the current page

async function updatePost(_id) {
  const title = document.querySelector(".postTitle").value;
  const image = document.querySelector(".postImage").value;
  const description = document.querySelector(".postDescription").value;

  const updatedPost = { title, image, description };

  try {
    const jwt = window.localStorage.getItem("jwt");
    console.log(_id);
    const response = await fetch(
      `http://localhost:3000/api/UpdatePost/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(updatedPost),
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("La mise à jour a échoué :", response.statusText);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
}

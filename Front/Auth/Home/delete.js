async function deletePost(id) {
  try {
    let jwt = window.localStorage.getItem("jwt");

    const response = await fetch(`http://localhost:3000/api/deletePost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.ok) {
      window.location.reload();

      const data = await response.json();
      alert(data.message);
    } else {
      console.error("La suppression a échoué :", response.statusText);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}

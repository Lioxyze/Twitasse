async function DeleteUser(UserId) {
  try {
    let jwt = window.localStorage.getItem("jwt");

    const response = await fetch(
      `http://localhost:3000/api/DeleteUser/${UserId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      window.location.reload();
    } else {
      console.error("La suppression a échoué :", response.statusText);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}
// reload the current page

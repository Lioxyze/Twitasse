async function getAllListings() {
  try {
    let apiCall = await fetch("http://localhost:3000/api/getAllUsers");
    let response = await apiCall.json();
    console.log(response);

    let cardsContainer = document.querySelector(".profile");

    // Accéder directement à response.data
    response.data.forEach((listing) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.padding = "23px";
      card.style.margin = "5px";

      card.innerHTML = `
<div class="d-flex align-items-center mb-3">
                <img
                  src="${listing.Image}"
                  alt="User"
                  class="rounded-circle mr-2"
                />
                <h6 class="card-subtitle text-muted">@${listing.Pseudo}</h6>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  }
}
getAllListings();

function logout() {
  localStorage.removeItem("jwt");
}

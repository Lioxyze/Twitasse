async function getAllListings() {
  try {
    let apiCall = await fetch("http://localhost:3000/api/getAllUsers");
    let response = await apiCall.json();
    console.log(response);

    let cardsContainer = document.querySelector(".cards");

    // Accéder directement à response.data
    response.data.forEach((listing) => {
      let imageUrl = `http://localhost:3000/src/uploads/${listing.profilePicture}`;

      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.padding = "23px";
      card.style.margin = "5px";

      card.innerHTML = `
        <div class="card mb-4">
                        <img
                src="../../../Back/src/uploads/${imageUrl}"
                alt="Profil"
                class="img-fluid rounded-circle mb-3"
              />

          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
            </div>
            <h5 class="card-title">Pseudo :@${listing.Pseudo}</h5>
            <p class="card-text">UserId :
              ${listing.UserId}
            </p>
            <p class="card-text">Email :
              ${listing.Email}
            </p>
                        <p class="card-text">Token :
              ${listing.Token}
            </p>
                        <p class="card-text">id_role :
              ${listing.id_role}
            </p>
            <div class="btn-group">
            </div>
            <button onclick="deletePublication(id)" class="btn btn-link">Delete</button>
            <button onclick="(id)" class="btn btn-link">Edit</button>

          </div>
        </div>
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

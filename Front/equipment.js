async function getAllListings() {
  try {
    let apiCall = await fetch("http://localhost:3000/api/allEquipment");
    let response = await apiCall.json();
    console.log(response);

    let cardsContainer = document.querySelector(".cards");

    response.data.forEach((listing) => {
      // Accéder à response.data
      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.padding = "23px";
      card.style.margin = "5px";

      card.innerHTML = `
<div class="container">
  <div class="row">
    <div class="col">
      <div class="card">
        <img src="${listing.Image}" class="card-img-top" alt="Equipment Image"> <!-- Image en haut de la carte -->
        <div class="card-body">
          <h5 class="card-title">${listing.EquipmentName}</h5>
          <p class="card-text">${listing.Description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: ${listing.Price} $</li>
            <li class="list-group-item">Quantity: ${listing.Quantity}</li>
          </ul>
          <div class="card-footer text-center"> <!-- Pied de carte avec les boutons -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Equipment</button>
            <button type="button" class="btn btn-danger deleteButton" onclick="deleteEquipment(${listing.EquipmentID})">Delete</button>
            <button type="button" id="rentButton" class="btn btn-success">Buy</button>
          </div>
        </div>
      </div>
    </div>
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

function logout() {
  localStorage.removeItem("jwt");
}

getAllListings();
async function deleteEquipment(EquipmentID) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/equipementDelete/${EquipmentID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}

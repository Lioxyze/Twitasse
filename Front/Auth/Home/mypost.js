async function GetPublicationByUserId() {
  try {
    let jwt = window.localStorage.getItem("jwt");
    let apiCall = await fetch(
      "http://localhost:3000/api/GetPublicationByUserId",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    let response = await apiCall.json();
    console.log(response);

    let cardsContainer = document.querySelector(".cards");

    if (Array.isArray(response)) {
      response.forEach((listing) => {
        let imageUrl = `http://localhost:3000/uploads/${listing.profilePicture}`;
        console.log(imageUrl);
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.style.padding = "23px";
        card.style.margin = "5px";

        card.innerHTML = `
          <div class="card mb-4">
            <img src="${listing.image}" class="card-img-top imagesize" alt="Image">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <img src="${imageUrl}" class="rounded-circle mr-2" height="30" />
                <h6 class="card-subtitle text-muted">@${listing.pseudo}</h6>
              </div>
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">${listing.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="like"></div>
        <button  type="button"  onclick="deletePost('${listing._id}')" class="btn-primary">Delete</button>
        <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#createPostModal"
              >
                Edit
              </button>
              </div>
            </div>
          </div>
        `;

        cardsContainer.appendChild(card);
      });
    } else {
      console.error(
        "La réponse de l'API ne contient pas de données valides:",
        response
      );
    }

    initializeLikes();
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données:",
      error
    );
  }
}

async function deleteEquipment(_id) {
  try {
    let jwt = window.localStorage.getItem("jwt");

    const response = await fetch(
      `http://localhost:3000/api/deletePost/${_id}`,
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
      alert(data.message);
    } else {
      const errorData = await response.json();
      console.error("Erreur lors de la suppression :", errorData);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}

GetPublicationByUserId();

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
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createPostModal" onclick="updatePost('${listing._id}')" 
        > Edit </button>
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

async function GetPublicationByUserProfileId() {
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

    let cardsContainer = document.querySelector(".cardsUser");

    if (Array.isArray(response) && response.length > 0) {
      let listing = response[0]; // Prendre le premier élément de la réponse
      let imageUrl = `http://localhost:3000/uploads/${listing.profilePicture}`;
      console.log(imageUrl);
      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";
      card.style.padding = "23px";
      card.style.margin = "5px";

      card.innerHTML = `
        <div class="card mb-4">
          <div class="card-body text-center">
            <img
              src="${imageUrl}"
              alt="Profil"
              class="img-fluid rounded-circle mb-3"
            />
            <h5 class="card-title">@${listing.pseudo}</h5>
            <p class="card-text">Bio de l'utilisateur.</p>
            <button class="btn btn-primary">Modifier le profil</button>
          </div>
        </div>
      `;

      cardsContainer.appendChild(card);
    } else {
      console.error(
        "La réponse de l'API ne contient pas de données valides ou est vide:",
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

GetPublicationByUserId();
GetPublicationByUserProfileId();

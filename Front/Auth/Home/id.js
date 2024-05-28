async function getAllListings() {
  try {
    let apiCall = await fetch("http://localhost:3000/api/AllPost");
    let response = await apiCall.json();
    console.log(response);

    let cardsContainer = document.querySelector(".cardss");

    if (Array.isArray(response)) {
      response.forEach((listing) => {
        let imageUrl = `http://localhost:3000/uploads/${listing.profilePicture}`;

        console.log(imageUrl);

        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
<div class="card mb-4 position-relative">
  <img src="${listing.image}" class="card-img-top imagesize" alt="Image">
  <div class="card-body">
    <div class="d-flex align-items-center mb-3">
      <img src=${imageUrl} class="rounded-circle mr-2" height="30" />
      <h6 class="card-subtitle text-muted">@${listing.pseudo}</h6>
      <div class="follow-unfollow ml-auto">
        <button type="button" class="btn btn-link follow-button" onclick="toggleFollow(this)">
          <i class="fas fa-user-plus"></i> Follow
        </button>
      </div>
    </div>
    
    <h5 class="card-title">${listing.title}</h5>
    <p class="card-text">${listing.description}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
                <button  type="button"  onclick="deletePost('${listing._id}')" class="btn-primary">Delete</button>
        </button>
      </div>
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

function initializeLikes() {
  const likeButtons = document.querySelectorAll(".like");

  likeButtons.forEach((like) => {
    let countLike = 0;
    like.addEventListener("click", () => {
      if (countLike === 0) {
        like.classList.toggle("anim-like");
        countLike = 1;
        like.style.backgroundPosition = "right";
      } else {
        countLike = 0;
        like.style.backgroundPosition = "left";
      }
    });

    like.addEventListener("animationend", () => {
      like.classList.toggle("anim-like");
    });
  });
}

getAllListings();

function logout() {
  localStorage.removeItem("jwt");
}

async function createPost() {
  let ImageElement = document.querySelector("#postImage");
  let NameRentalElement = document.querySelector("#postTitle");
  let DescriptionRentalElement = document.querySelector("#postContent");

  if (!ImageElement || !NameRentalElement || !DescriptionRentalElement) {
    console.error("One or more input elements not found");
    return;
  }

  let Image = ImageElement.value;
  let NameRental = NameRentalElement.value;
  let DescriptionRental = DescriptionRentalElement.value;
  let jwt = window.localStorage.getItem("jwt");

  console.log(jwt);

  let rental = {
    image: Image,
    title: NameRental,
    description: DescriptionRental,
  };

  try {
    let response = await fetch("http://localhost:3000/api/AddPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(rental),
    });

    if (response.ok) {
      window.location.reload();

      console.log("Rental created successfully.");
      window.location.href = "./homeAdmin";
    } else {
      console.error("Failed to save the rental.");
    }
  } catch (error) {
    console.error("An error occurred while creating the rental:", error);
  }
}

function toggleComments(button) {
  const icon = button.querySelector("i");
  button.classList.add("clicked");
  // Retirer la classe 'clicked' après l'animation
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 300); // La durée doit correspondre à celle définie dans @keyframes bounce
}

function toggleLike(button) {
  const icon = button.querySelector("i");
  if (icon.classList.contains("far")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.classList.add("liked");
    icon.classList.add("clicked");
  } else {
    icon.classList.remove("fas");
    icon.classList.remove("liked");
    icon.classList.add("far");
    icon.classList.remove("clicked");
  }

  // Retirer la classe 'clicked' après l'animation
  setTimeout(() => {
    icon.classList.remove("clicked");
  }, 300); // La durée doit correspondre à celle définie dans @keyframes pulse
}

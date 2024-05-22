async function searchUser() {
  const searchInput = document.getElementById("searchInput").value;
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = ""; // Clear previous results

  if (searchInput.trim() === "") {
    searchResults.innerHTML = "<p>Veuillez entrer un terme de recherche.</p>";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/searchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: searchInput }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.length === 0) {
      searchResults.innerHTML = "<p>Aucun utilisateur trouvé.</p>";
    } else {
      data.forEach((listing) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-result");
        userDiv.innerHTML = `
         <div class="card mb-4">
                        <img
                src="../../../Back/src/uploads/${listing.image}"
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
        searchResults.appendChild(userDiv);
      });
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    searchResults.innerHTML =
      "<p>Erreur lors de la recherche. Veuillez réessayer plus tard.</p>";
  }
}

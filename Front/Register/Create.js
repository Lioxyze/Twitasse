function logout() {
  localStorage.removeItem("jwt");
  location.reload();
}

async function createRental() {
  let Image = document.querySelector(".Image").value;
  let NameRental = document.querySelector(".NameRental").value;
  let DescriptionRental = document.querySelector(".DescriptionRental").value;
  let RentalStartDate = document.querySelector(".RentalStartDate").value;
  let RentalEndDate = document.querySelector(".RentalEndDate").value;
  let TotalRentalAmount = document.querySelector(".TotalRentalAmount").value;

  let rental = {
    Image: Image,
    NameRental: NameRental,
    DescriptionRental: DescriptionRental,
    RentalStartDate: RentalStartDate,
    RentalEndDate: RentalEndDate,
    TotalRentalAmount: TotalRentalAmount,
  };

  try {
    let response = await fetch("http://localhost:3000/api/creatRental", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(rental),
    });

    if (response.ok) {
      console.log("rental cree avec succès.");
      window.location.href = "./rental.html";
    } else {
      console.error("Échec de l'enregistrement du rental.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la creation rental :",
      error
    );
  }
}

async function createEquipment() {
  let Image = document.querySelector(".Image").value;
  let EquipmentName = document.querySelector(".EquipmentName").value;
  let Description = document.querySelector(".Description").value;
  let Price = document.querySelector(".Price").value;
  let Quantity = document.querySelector(".Quantity").value;
  let rental = {
    Image: Image,
    EquipmentName: EquipmentName,
    Description: Description,
    Price: Price,
    Quantity: Quantity,
  };

  try {
    let response = await fetch("http://localhost:3000/api/creatEquipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(rental),
    });

    if (response.ok) {
      console.log("rental cree avec succès.");
      window.location.href = "./equipment.html";
    } else {
      console.error("Échec de l'enregistrement du Equipment.");
    }
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la creation Equipment :",
      error
    );
  }
}

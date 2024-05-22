let client = document.querySelector(".client");

async function insertAnimal() {
  let Image = document.querySelector(".Image");
  let EquipmentName = document.querySelector(".EquipmentName").value;
  let Description = document.querySelector(".Description").value;
  let Price = document.querySelector(".Price").value;
  let Quantity = document.querySelector(".Quantity").value;

  const formData = new FormData();
  formData.append("Image", Image);
  formData.append("NameRental", EquipmentName.value);
  formData.append("DescriptionRental", Description.value);
  formData.append("RentalStartDate", Price.value);
  formData.append("RentalEndDate", Quantity.value);

  const response = await fetch("http://localhost:3000/api/insert", {
    method: "POST",
    body: formData,
  });
  console.log(await response.json());
}

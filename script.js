const entrernom = document.getElementById("reserve-name");
const selectionSiege = document.getElementById("reserve-seat");
const btnConfirmer = document.getElementById("btn-confirm");

btnConfirmer.addEventListener("click", reserver);
function reserver() {
  const nom = entrernom.value.trim();
  const siege = selectionSiege.value;

  console.log("Nom :", nom);
  console.log("Siège :", siege);
}
let noms = [];
const price = 80;
let reservations = [];
const totalS = 20;








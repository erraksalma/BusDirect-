const entrernom = document.getElementById("reserve-name");
const selectionSiege = document.getElementById("reserve-seat");
const btnConfirmer = document.getElementById("btn-confirm");
let noms = [];
let reservations = [];
const price = 80;
const totalS = 20;
function remplirrselect() {
  selectionSiege.innerHTML = '<option value="">Premier siege libre</option>';
  for (let i = 1; i <= totalS; i++) {
    selectionSiege.add(new Option("Siège " + i, i));
  }
}
remplirrselect();

function siegeEtpris(n) {
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].siege === n) {
      return true;
    }
  }
  return false;
}
function reserver() {
  const nom = entrernom.value.trim();
  const siege = Number(selectionSiege.value);

  if (nom === "") {
    alert("Le nom introvable");
    return;
  }

  const name = nom.toLowerCase();
  if (noms.includes(name)) {
    alert("Ce passager a une reservation");
    return;
  }

  if (siege === 0) {
    alert("Choisis un siège");
    return;
  }

  if (siegeEtpris(siege)) {
    alert("Ce siège est deja reserve");
    return;
  }

  reservations.push({ nom: nom, siege: siege });
  noms.push(name);
  entrernom.value = "";
  console.log(reservations);
}
btnConfirmer.addEventListener("click", reserver);




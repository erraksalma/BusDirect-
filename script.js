const entrernom = document.getElementById("reserve-name");
const selectionSiege = document.getElementById("reserve-seat");
const btnConfirmer = document.getElementById("btn-confirm");
let noms = [];
let reservations = [];
const price = 80;
const totalS = 20;
function remplirrselect() {
    selectionSiege.innerHTML = '<option value="">choix automatique</option>';
    for (let i = 1; i <= totalS; i++) {
        selectionSiege.add(new Option("Siège " + i, i));
    }
}
remplirrselect();

function siegeEtpris(pris) {
    for (let i = 0; i < reservations.length; i++) {
        if (reservations[i].siege === pris) {
            return true;
        }
    }
    return false;
}
function colorerSiege(num, nom) {
    let numconverti = String(num);
    const cartdusiege = document.querySelector('[data-seat="' + numconverti + '"]');
    const texte = cartdusiege.children[1];

    cartdusiege.classList.remove("bg-yellow-50");
    cartdusiege.classList.add("bg-red-200");

    texte.textContent = nom;
    texte.classList.add("text-red-800");
}

function reserver() {
    const nom = entrernom.value.trim();
    let siege = Number(selectionSiege.value);

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
        for (let i = 1; i <= totalS; i++) {
            if (!siegeEtpris(i)) {
                siege = i;
                break;
            }
        }
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
    remplirpassagerexict();
    remplirsiegeexict();
    colorerSiege(siege, nom);
    
    const option = selectionSiege.querySelector('option[value="' + siege + '"]');
    option.remove();
    selectionSiege.value = "";
    entrernom.value = "";
    console.log("Nom du passager :", nom);
    console.log("Siège reserve :", siege);
}
const formres = document.getElementById("reservation-form");
formres.addEventListener("submit", e => {
    e.preventDefault();
    reserver();
});

const selectpasagerexict = document.getElementById("edit-passagerexict");
const nouveaupasager = document.getElementById("edit-name");
const nouveausiege = document.getElementById("edit-seat");
const btnModifier = document.getElementById("btn-edit");
const formmod = document.getElementById("modification-form");

function remplirpassagerexict() {
    selectpasagerexict.innerHTML = '<option value="">meme passager</option>';
    for (let i = 0; i < noms.length ; i++) {
        selectpasagerexict.add(new Option( noms[i], noms[i]));
    }
} 

function remplirsiegeexict() {
    nouveausiege.innerHTML = '<option value="">meme siege</option>';
    for (let i = 0; i < reservations.length ; i++) {
        nouveausiege.add(new Option( reservations[i].siege, reservations[i].siege));
    }
} 


const entrernom = document.getElementById("reserve-name");
const selectionSiege = document.getElementById("reserve-seat");
const btnConfirmer = document.getElementById("btn-confirm");
let noms = [];
let reservations = [];
const price = 80;
const totalS = 20;

 let msg1 = document.createElement("p");
    msg1.classList.add("text-red-500");
    entrernom.after(msg1);



function remplirrselect() {
    selectionSiege.innerHTML = '<option value="">choix automatique</option>';
    for (let i = 1; i <= totalS; i++) {
        
        selectionSiege.add(new Option("Siège " + i, i));
    }
}
remplirrselect();
miseAjour();

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
  let msg = document.createElement("p");
    msg.classList.add("text-red-500");
    btnConfirmer.after(msg);

function reserver() {
    const nom = entrernom.value.trim();
    let siege = Number(selectionSiege.value);

  
    if (nom === "") {
        msg1.textContent = "Le nom introvable";
        return;
    }

    const name = nom.toLowerCase();
    if (noms.includes(name)) {
    msg1.textContent = "Ce passager a une reservation";
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
  

    reservations.push({ nom: nom, siege: siege });
    noms.push(name);
    miseAjour();
    sauv();
    remplirsiegeexict();
    remplirpassagerexict();
    remplirpassagerexictDel();
    
    colorerSiege(siege, nom);

    msg.textContent= " reservation bien fait";

    
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


function remplirpassagerexict() {
selectpasagerexict.innerHTML = '<option value="">même passager</option>'; 
   for (let i = 0; i < noms.length ; i++) {
        selectpasagerexict.add(new Option( noms[i]));
    }
} 

function remplirsiegeexict() {
    nouveausiege.innerHTML = '<option value="">meme siege</option>';
    for (let i = 1; i <= totalS; i++) {
        if (!siegeEtpris(i)) {
          nouveausiege.add(new Option("Siège " + i, i));
        }
    }
}
remplirsiegeexict(); 

 let msg2 = document.createElement("p");
    msg2.classList.add("text-red-500");
    selectpasagerexict.after(msg2);


 let msg3 = document.createElement("p");
    msg3.classList.add("text-red-500");
    btnModifier.after(msg3);

function liberersiege(num) {
    const carte = document.querySelector('[data-seat="' + num + '"]');

    if (carte === null) return;

    const texte = carte.children[1];
    carte.classList.remove("bg-red-200");
    carte.classList.add("bg-yellow-50");
    texte.textContent = "Libre";
    texte.classList.remove("text-red-800");
}

function modifier(){
    const passagerexict = selectpasagerexict.value;
    let passagernew = nouveaupasager.value.trim();
    let siegenew = Number(nouveausiege.value);

if(passagerexict ===""){
    msg2.textContent = "tu doix entrer le nom"
    return;
}
let reser = null;
for(let i = 0; i < reservations.length; i++){
  if(reservations[i].nom.toLowerCase()===passagerexict.toLowerCase()){
    reser = reservations[i];
    break;
  }
} 
if (reser === null){
    msg2.textContent = "reserv intouvable";
    return;
}
let ancienSiege = reser.siege;
if(siegenew!== 0 && siegeEtpris(siegenew)&& siegenew!== reser.siege){
    msg2.textContent  = "siege deja reserve";
    return;
}
if (passagernew !== "") {
    for (let i = 0; i < noms.length; i++) {
        if (noms[i].toLowerCase() === passagerexict.toLowerCase()) {
             noms[i] = passagernew.toLowerCase();
            break;
        }
    }

    reser.nom = passagernew;
    colorerSiege(reser.siege, reser.nom);
}
if (siegenew !== 0 && siegenew !== ancienSiege) {
    liberersiege(ancienSiege);
    reser.siege = siegenew;
    colorerSiege(siegenew, reser.nom);
}


remplirpassagerexict();
remplirpassagerexictDel();
remplirsiegeexict();
miseAjour();

sauv();
msg3.textContent= " modification bien fait";



    nouveaupasager.value = "";
    console.log("Nom du passager :", reser.nom);
    console.log("Siège reserve :", reser.siege)
 

}




const formmod = document.getElementById("modification-form");
formmod.addEventListener("submit", function(e) {
    e.preventDefault();
    modifier();
});

const selectpassDel = document.getElementById("select-passagerexist");
const btnSupprimer = document.getElementById("btn-delete");
function remplirpassagerexictDel(){
    selectpassDel.innerHTML= '<option value="">choisi passagere</option>';
    for( let i=0 ; i < noms.length; i++){
   selectpassDel.add(new Option(noms[i]));
    }
}
 let msgDel = document.createElement("p");
    msgDel.classList.add("text-red-500");
    selectpassDel.after(msgDel);

function Supprimer(){
   const passagerDel = selectpassDel.value;
   if(passagerDel===""){
   msgDel.textContent="aucun passager n est choisi";
   return;
   }msgDel.textContent="";

   let cont = -1;
   for( let i = 0; i < reservations.length; i++){
    if(reservations[i].nom.toLowerCase()===passagerDel.toLowerCase()){
        cont = i;
        break;
    }
   }
   if(cont==-1){
    msgDel.textContent="pasager introuvable";
    return;
   }

   let siegeSupprime = reservations[cont].siege;
   liberersiege(siegeSupprime);
   reservations.splice(cont, 1);
   noms.splice(cont, 1);
   sauv();  
   miseAjour();
   remplirpassagerexict(); 
   remplirpassagerexictDel();
   remplirsiegeexict();
   msgDel.textContent="suppression bien fait";
}
const formsup = document.getElementById("supresion-form");
formsup.addEventListener("submit", e=> {
    e.preventDefault();
    Supprimer();
})

function miseAjour(){
    let siegelibre = totalS-reservations.length;
    let recettetotal = reservations.length*price;

    document.getElementById("total").textContent =totalS;
    document.getElementById("libres").textContent = siegelibre;
    document.getElementById("recette").textContent = recettetotal;
}

function sauv(){
    localStorage.setItem("reservations", JSON.stringify(reservations));
    localStorage.setItem("noms", JSON.stringify(noms));
}
function char(){
    const donreservations = localStorage.getItem("reservations");
    const donnoms = localStorage.getItem("noms");
if(donreservations!==null){
    reservations= JSON.parse(donreservations);
}
if(donnoms!==null){
    noms= JSON.parse(donnoms);
}
}char();

for(let i=0; i<reservations.length;i++){
    colorerSiege(reservations[i].siege, reservations[i].nom);
}
remplirpassagerexict();
remplirpassagerexict();
remplirpassagerexictDel();
miseAjour();
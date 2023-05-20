const userToken = window.sessionStorage.getItem("token");
console.log(userToken);

// Fonction Fetch pour récupérer les données de l'API
let data = [];
async function fetchCard() {
  const response = await fetch("http://localhost:5678/api/works");
  data = await response.json();
  createCard(data);
  createCardInModal(data);
}
fetchCard();

let categoryData = [];
async function fetchCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  categoryData = await response.json();
  if (!userToken) {
    createButton(categoryData);
    const deleteModifier = document.querySelector("#modifier");
    deleteModifier.remove();
  }
}
fetchCategory();

// Fonction pour afficher les différentes travaux avec leurs noms
function createCard(works) {
  for (let i = 0; i < works.length; i++) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    image.setAttribute("alt", works[i].title);
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = works[i].title;

    //DOM pour lier le HTML
    document.querySelector(".gallery").appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
  }
}

// Création des 4 boutons  avec leurs ID

function createButton(category) {
  //création du bouton TOUT
  const buttonTout = document.createElement("button");
  buttonTout.setAttribute("id", "Tout");
  buttonTout.setAttribute("class", "activate")
  buttonTout.innerText = "Tout";

  document.querySelector(".filtre").appendChild(buttonTout);

  buttonTout.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    createCard(data);
  })

  //création des 3 derniers boutons avec une boucle 
  for (let i = 0; i < category.length; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", category[i].name);
    button.innerText = category[i].name;

    document.querySelector(".filtre").appendChild(button);
    // Ajout du gestionnaire d'événements "click" au bouton
    button.addEventListener("click", function () {
      const objetsWorks = data.filter(
        (work) => work.category.name === category[i].name
      );
      //filtre (en haut) les images par rapport à la catégorie
      document.querySelector(".gallery").innerHTML = "";
      createCard(objetsWorks);
      //Effacement de la page HTML et apparition des images filtrer
    });
  }

  //Fonctionalité pour que les boutons soit d'une différente couleur lorque l'on clique dessus
  const butonActivate = document.querySelectorAll("button");

  butonActivate.forEach(btnActive => {
    btnActive.addEventListener("click", () => {
      document.querySelector(".activate")?.classList.remove("activate");
      btnActive.classList.add("activate");
    });
  });
}

//Redirection vers la page login (l'id est un peu confus)
document.getElementById("logout").addEventListener("click", function () {
  window.location.assign("login.html")
})

//si on a un token on change le login pars logout, et quand on clique sur logout celui-ci nous redirige vers la page index.html
if (userToken) {
  const logout = document.getElementById("logout");
  const a = document.createElement("a");
  a.innerText = "logout";
  a.setAttribute("href", "#");
  logout.innerText = "";
  logout.appendChild(a);
  logout.addEventListener("click", function () {
    window.sessionStorage.removeItem("token");
    window.location.assign("index.html");
  })
}else{
  const modeEdition = document.querySelector("#mode_edition");
  modeEdition.remove();
}



//Fenêtre modal
//Ouverture de la fenêtre modal

let modal = null


const openModal = function(e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute("href"))
  target.style.display = null
  target.removeAttribute("aria-hidden")
  target.setAttribute("aria-modal", "true")
  modal = target
  modal.addEventListener("click", closeModal)
  modal.querySelector(".js-modal-close")?.addEventListener("click", closeModal) /* attention au point d'interrogation */
  modal.querySelector(".js-modal-stop")?.addEventListener("click", stopPropagation) /* attention au point d'interrogation */
}


//Fermeture de la fenêtre modal

const closeModal = function(e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute("aria-hidden", "true")
  modal.removeAttribute("aria-modal")
  modal.removeEventListener("click", closeModal)
  modal.querySelector(".js-modal-close")?.removeEventListener("click", closeModal) /* attention au point d'interrogation */
  modal.querySelector(".js-modal-stop")?.removeEventListener("click", stopPropagation) /* attention au point d'interrogation */
  modal = null
}

const stopPropagation = function(e) {
  e.stopPropagation()
}

//Pour chaque <a> ayant la class js-modal ouvrir la modal

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal)
})


function createCardInModal (works) {
  for(let i = 0; i < works.length; i++) {
    const div = document.createElement("div");
    const divPoubelle = document.createElement("div");
    divPoubelle.setAttribute("class", "div-poubelle");
    const poubelle = document.createElement("i");
    poubelle.setAttribute("class", "fa-solid fa-trash-can")
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    image.setAttribute("class", "image-modal");
    const p = document.createElement("p");
    p.innerText = "éditer";


    document.querySelector(".gallery-supp").appendChild(div);
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(divPoubelle);
    divPoubelle.appendChild(poubelle);
    
  }
}
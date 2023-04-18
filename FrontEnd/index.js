// Fonction Fetch pour récupérer les données de l'API
let data = [];
async function fetchCard() {
  const response = await fetch("http://localhost:5678/api/works");
  data = await response.json();
  createCard(data);
}
fetchCard();

let categoryData = [];
async function fetchCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  categoryData = await response.json();
  createButton(categoryData);
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



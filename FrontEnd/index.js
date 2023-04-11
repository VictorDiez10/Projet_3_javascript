// Fonction Fetch pour récupérer les données de l'API
let data = []
async function fetchCard() {
    const response = await fetch("http://localhost:5678/api/works");
    data = await response.json(); 
    createCard(data);
} 
fetchCard();

let categoryData = []
async function fetchCategory() {
    const response = await fetch("http://localhost:5678/api/categories");
    categoryData = await response.json();
    createButton(categoryData);
}
fetchCategory();

// Fonction pour afficher les différentes travaux avec leurs noms
function createCard (works) {
    for (let i = 0; i < works.length; i++){
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
};

// Création des 4 boutons  avec leurs ID

const buttonTout = document.createElement("button");
buttonTout.setAttribute("id", "Tout")
buttonTout.innerText = "Tout";

document.querySelector(".filtre").appendChild(buttonTout);


function createButton (category) {
    for (let i = 0; i < category.length; i++){
        const button = document.createElement("button");
        button.setAttribute("id", category[i].name);
        button.innerText = category[i].name;

        document.querySelector(".filtre").appendChild(button);
    }
};



const buttonObjetsTrier = document.querySelector("#Objets");
buttonObjetsTrier.addEventListener("click", function () {
    const imagesFiltrees = data.filter (data => data.category.id === category.id);
    document.querySelector('.gallery').innerHTML = "";
});

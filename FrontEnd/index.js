// Fonction Fetch pour récupérer les données de l'API
let data = []
async function fetchCard() {
    const response = await fetch("http://localhost:5678/api/works");
    data = await response.json(); 
    createCard(data);
} 
fetchCard();

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

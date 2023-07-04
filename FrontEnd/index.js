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
  optionCategorie(categoryData);
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
  buttonTout.setAttribute("class", "activate");
  buttonTout.innerText = "Tout";

  document.querySelector(".filtre").appendChild(buttonTout);

  buttonTout.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    createCard(data);
  });

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

  butonActivate.forEach((btnActive) => {
    btnActive.addEventListener("click", () => {
      document.querySelector(".activate")?.classList.remove("activate");
      btnActive.classList.add("activate");
    });
  });
}

//Redirection vers la page login (l'id est un peu confus)
document.getElementById("logout").addEventListener("click", function () {
  window.location.assign("login.html");
});

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
  });
  const notification = document.querySelector(".alert")
  notification.style.position = "fixed"
  const succes = document.querySelector(".succes")
  succes.style.position = "fixed"
} else {
  const modeEdition = document.querySelector("#mode_edition");
  modeEdition.remove();
}

//Fenêtre modal
//Ouverture de la fenêtre modal



const openModale = function (e) {
  e.preventDefault();
  modale = document.getElementById("modal1");
  modale.style.display = "flex";
  modale.addEventListener("click", closeModale);
  modale.querySelector(".js-modal-close").addEventListener("click", closeModale);
  modale.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modale.querySelector(".js-modal-add").addEventListener("click", closeModale)
};
//Fonction pour fermer la modale
const closeModale = function (e) {
  e.preventDefault();
  modale.style.display = "none";
  modale.removeEventListener("click", closeModale);
  modale.querySelector(".js-modal-close").removeEventListener("click", closeModale);
  modale.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modale.querySelector(".js-modal-add").removeEventListener("click", closeModale);
};
//pour stopper la propagation de l'événement vers les éléments parents
const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal, .fa-arrow-left").forEach(a => {
  a.addEventListener("click", openModale);
});

async function createCardInModal(works) {
  const gallerySupp = document.querySelector(".gallery-supp");
  gallerySupp.innerHTML = ""
  for (let i = 0; i < works.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("data-id", works[i].id); //mettre un Id pour pouvoir les selectionner
    div.setAttribute("class", "div-modal")
    const divPoubelle = document.createElement("div");
    divPoubelle.setAttribute("class", "div-poubelle");
    const poubelle = document.createElement("i");
    poubelle.setAttribute("class", "fa-solid fa-trash-can");
    poubelle.setAttribute("id", works[i].id)  //mettre un Id pour pouvoir les selectionner
    const image = document.createElement("img");
    image.src = works[i].imageUrl;
    image.setAttribute("class", "image-modal");
    const p = document.createElement("p");
    p.innerText = "éditer";


    //Pour les faire apparaître dans le DOM
    gallerySupp.appendChild(div);
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(divPoubelle);
    divPoubelle.appendChild(poubelle);

    //Add event Listener pour entendre le click et faire appel a la fonction deleteWork
    poubelle.addEventListener("click", function() {
      console.log(poubelle);
      deleteWork(div);
    })
  };
};



//Faire appel à l'API pour être sûr de supprimer l'image
function deleteWork(div) {
  console.log(div);
  const id = div.dataset.id;
  console.log(id);
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then(handleResponse)
    .then(handleSuccess)
    .catch(handleError);
}

// Erreur lors de la suppression
function handleResponse(response) {
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du travail');
  }
  return response
}


function handleSuccess() {
  const workElement = document.querySelector("data-id");
  //workElement.remove(); // Supprimer l'élément du DOM après la suppression réussie
  const suppression = document.querySelector(".suppression")
  suppression.style.bottom = "2rem";
  setTimeout(() => {
    suppression.style.bottom = "-8rem"
  }, 2000)
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""
  fetchCard()
}

function handleError(error) {
  console.error(error);
  
  // Afficher un message d'erreur à l'utilisateur
}




const openModal = function (e) {
  e.preventDefault();
  modal = document.getElementById("modal2");
  modal.style.display = "flex";
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  modal.querySelector(".fa-arrow-left").addEventListener("click", closeModal);
};
//Fonction pour fermer la modale
const closeModal = function closeModal2(e) {
  e.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  modal.querySelector(".fa-arrow-left").removeEventListener("click", closeModal);
};

document.querySelectorAll(".js-modal-add").forEach(a => {
  a.addEventListener("click", openModal, closeModale);
});     

function optionCategorie(categories) {
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", categories[i].id);
    option.innerText = `${categories[i].name}`

    document.querySelector("#objet").appendChild(option)
  }
};


//Utilisation du FormData pour l'envoi des données de formulaire
const form = document.querySelector(".formulaire form ");


form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

   for(item of formData) {
    console.log(item[0], item[1]);
  };
  
//Appel à l'API
if(titleImage.value != "" && divHidden.style.display == "none" && categorieOption.value != "0") {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      'ContentType': 'multipart/form-data'
    },
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const succes = document.querySelector(".succes");
  succes.style.bottom = "2rem";
  setTimeout(() => {
    succes.style.bottom = "-8rem"
  }, 2000)
  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = ""
  if(validButton.style.backgroundColor = "#1D6154") {
    const modal2 = document.querySelector("#modal2")
    modal2.style.display = "none"
    titleImage.value = "";
    categorieOption.value = "0"
    const img = document.querySelector(".ajout-photo img")
    img.remove()
    img.style.display = "none"
    divHidden.style.display = "flex"
  }
  
  fetchCard();

  } )
  .catch(error => console.log(error));

  
}else{
  const notification = document.querySelector(".alert");
  notification.style.bottom = "2rem";
  setTimeout(() => {
    notification.style.bottom = "-8rem"
  }, 2000)
}
}
)

//click sur le bouton affiche le selecteur de document
const realFile = document.querySelector("#file");
const customButton = document.querySelector(".ajout");

customButton.addEventListener("click", function() {
  realFile.click()
});

const imagePreview = document.querySelector(".ajout-photo");
const divHidden = document.querySelector(".hidden")
realFile.addEventListener("change", updateImageDisplay);

//Fonction pour afficher l'image selectioner 
function updateImageDisplay() {
  divHidden.style.display = "none"

  const currentFiles = realFile.files;
    for(let i = 0; i < currentFiles.length; i++) {
      if(validFileType(currentFiles[i])) {
        const image = document.createElement('img');
        image.src = window.URL.createObjectURL(currentFiles[i]);
        image.style.width = "130px"
        image.style.height = "170px"

        imagePreview.appendChild(image);

      }
    }
   updateButtonColor();

}


var fileTypes = [
  'image/jpeg',
  'image/jpeg',
  'image/png'
]
//fonction pour vérifier le type d'image 
function validFileType(file) {
  for(let i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}


const titleImage = document.querySelector("#titre");
const validButton = document.querySelector("#valider");
const categorieOption = document.querySelector("select");



function updateButtonColor() {
  if(titleImage.value != "" && divHidden.style.display == "none" && categorieOption.value != "0") {
      validButton.style.backgroundColor = "#1D6154";
      validButton.style.cursor = "pointer"
  }else{
      validButton.style.backgroundColor = "";
      validButton.style.cursor = "default"
  }
};

titleImage.addEventListener("input", updateButtonColor);
categorieOption.addEventListener("input", updateButtonColor);


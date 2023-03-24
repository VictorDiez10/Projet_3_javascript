

fetch('http://localhost:5678/api/works') /* appel à l'api*/
.then(reponse => reponse.json())
.then(data => {
    /* affichage des images grace à l'api*/
    console.log(data);
    let figure = '';
    for (let images of data){
        figure += `<figure><img src="${images.imageUrl}"></figure>`
    }
    document.querySelector('.gallery').innerHTML = figure;
})
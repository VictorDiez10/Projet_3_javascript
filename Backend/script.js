const img = document.createElement('img')

fetch('http://localhost:5678/api/works')
.then(res => res.json())
.then(data => console.log(data))
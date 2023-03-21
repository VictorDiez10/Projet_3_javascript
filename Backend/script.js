fetch('http://localhost:5678/api-docs/#/')
.then(res => res.json())
.then(data => img.src = data[0].url)
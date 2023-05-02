document.getElementById("se_connecter").addEventListener("click", function() {
 login();
})


async function login() {
 const data = {email: document.getElementById("email").value, password: document.getElementById("mdp").value};
 const response = await fetch("http://localhost:5678/api/users/login", {
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(data)
 });
 console.log(response);
 const resultToken = await response.json();

 if (response.status === 200){
    window.localStorage.setItem("token", resultToken.token);
    window.location.assign("index.html");
    console.log("vous êtes connectés");
 }else{
   console.log("Désolé, vous avez saisi une adresse e-mail ou un mot de passe incorrect.");
 }
}

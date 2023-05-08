document.getElementById("se_connecter").addEventListener("click", function () {
  login();
})


async function login() {
  const data = { email: document.getElementById("email").value, password: document.getElementById("mdp").value };
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const resultToken = await response.json();

  if (response.status === 200) {
    window.sessionStorage.setItem("token", resultToken.token);
    window.location.assign("index.html");
  } else {
    const error = document.createElement("div");
    error.setAttribute("class", "error");
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Désolé, vous avez saisi une adresse e-mail ou un mot de passe incorrect.";
    document.querySelector(".message_error").appendChild(error);
    error.appendChild(errorMessage);
  }
}

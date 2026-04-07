// MENU RESPONSIVO
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

// VALIDAÇÃO DO FORMULÁRIO
const form = document.getElementById("formContato");
const msg = document.getElementById("msg");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome === "" || email === "" || mensagem === "") {
        msg.innerText = "Preencha todos os campos!";
        msg.style.color = "red";
    } else {
        msg.innerText = "Mensagem enviada com sucesso!";
        msg.style.color = "green";
        form.reset();
    }
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});

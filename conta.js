//criar
document.getElementById("btnCadastrar").addEventListener("click", () => {
    const nome = document.getElementById("cadNome").value.trim();
    const senha = document.getElementById("cadSenha").value;

    if (!nome || !senha) {
        alert("Preencha nome e senha!");
        return;
    }

    let contas = JSON.parse(localStorage.getItem("contas")) || {};

    if (contas[nome]) {
        alert("Esse nome já está sendo usado!");
        return;
    }

    contas[nome] = {
        senha: senha,
        pontos: 0
    };

    localStorage.setItem("contas", JSON.stringify(contas));

    alert("Conta criada com sucesso!");
});

//login
document.getElementById("btnLogin").addEventListener("click", () => {

    const nome = document.getElementById("loginNome").value.trim();
    const senha = document.getElementById("loginSenha").value;

    let contas = JSON.parse(localStorage.getItem("contas")) || {};

    if (contas[nome] && contas[nome].senha === senha) {

        alert("Login realizado com sucesso!");

        localStorage.setItem("usuario_atual", nome);

        localStorage.setItem("pontos_atual", contas[nome].pontos);

    } else {
        alert("Nome/senha incorretos!");
    }
});


function salvarPontuacao() {
    let usuarioAtual = localStorage.getItem("usuario_atual");
    if (!usuarioAtual) return;

    let contas = JSON.parse(localStorage.getItem("contas")) || {};
    if (!contas[usuarioAtual]) return;

    contas[usuarioAtual].pontos = pontos;

    localStorage.setItem("contas", JSON.stringify(contas));
    localStorage.setItem("pontos_atual", pontos);
}
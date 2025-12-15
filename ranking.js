 const tbody = document.getElementById("ranking");

    let contas = JSON.parse(localStorage.getItem("contas")) || {};

    let lista = Object.keys(contas).map(nome => ({
        nome: nome,
        pontos: contas[nome].pontos || 0
    }));

    lista.sort((a, b) => b.pontos - a.pontos);

    lista.forEach((player, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}º</td>
            <td>${player.nome}</td>
            <td>${player.pontos}</td>
        `;
        tbody.appendChild(tr);
    });
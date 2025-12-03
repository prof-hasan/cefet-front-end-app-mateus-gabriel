const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const corEl = document.getElementById('cor');
const rostoEl = document.getElementById('rosto');
const salvarEl = document.getElementById('salvar');

function desenha() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = corEl.value;
    ctx.fillRect(50, 50, 100, 100);

    desenharRosto(ctx, 100, 100, rostoEl.value);
}

function desenharFeliz(ctx, x, y) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 10);
    ctx.quadraticCurveTo(x, y + 25, x + 15, y + 10);
    ctx.lineWidth = 2;
    ctx.stroke();
}

function desenharTriste(ctx, x, y) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 15, y + 25);
    ctx.quadraticCurveTo(x, y + 10, x + 15, y + 25);
    ctx.lineWidth = 2;
    ctx.stroke();
}

function desenharApaixonado(ctx, x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x - 15, y - 10);
    ctx.arc(x - 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 15, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x - 10, y + 15);
    ctx.quadraticCurveTo(x, y + 25, x + 10, y + 15);
    ctx.lineWidth = 2;
    ctx.stroke();
}

function desenharRosto(ctx, x, y, tipo) {
    if (tipo === 'feliz') desenharFeliz(ctx, x, y);
    else if (tipo === 'triste') desenharTriste(ctx, x, y);
    else if (tipo === 'apaixonado') desenharApaixonado(ctx, x, y);
}

rostoEl.addEventListener('change', desenha);

corEl.addEventListener('input', desenha);

salvarEl.addEventListener('click', function() {
    const personagem = {
        cor: corEl.value,
        rosto: rostoEl.value
    };
    localStorage.setItem('personagem', JSON.stringify(personagem));
    alert('Personagem salvo!');
});

desenha();
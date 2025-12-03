const inimigoEl = document.querySelector(".inimigo");

//-----------------------------------------------------personagem
const canvasPlayer = document.getElementById("player");
const ctxPlayer = canvasPlayer.getContext("2d");

let tempo = 0;
let tempoInterval;
let jogoAtivo = false; 

function desenharPlayer() {
    const skin = JSON.parse(localStorage.getItem('personagem'));
    ctxPlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);

    if (!skin) return;

//------------------------------------------------------Corpo
    ctxPlayer.fillStyle = skin.cor;
    ctxPlayer.fillRect(50, 100, 100, 100);

    function desenharFeliz() {
        ctxPlayer.fillStyle = 'black';
        ctxPlayer.beginPath(); ctxPlayer.arc(85, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.arc(115, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.moveTo(85, 150);
        ctxPlayer.quadraticCurveTo(100, 165, 115, 150);
        ctxPlayer.stroke();
    }

    function desenharTriste() {
        ctxPlayer.fillStyle = 'black';
        ctxPlayer.beginPath(); ctxPlayer.arc(85, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.arc(115, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.moveTo(85, 165);
        ctxPlayer.quadraticCurveTo(100, 150, 115, 165);
        ctxPlayer.stroke();
    }

    function desenharApaixonado() {
        ctxPlayer.fillStyle = 'red';
        ctxPlayer.beginPath(); ctxPlayer.arc(85, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.arc(115, 130, 5, 0, Math.PI * 2); ctxPlayer.fill();
        ctxPlayer.beginPath(); ctxPlayer.moveTo(90, 150);
        ctxPlayer.quadraticCurveTo(100, 165, 110, 150);
        ctxPlayer.stroke();
    }

    if (skin.rosto === "feliz") desenharFeliz();
    if (skin.rosto === "triste") desenharTriste();
    if (skin.rosto === "apaixonado") desenharApaixonado();
}


let descendo = false;

//--------------------------------
function loop() {
    desenharPlayer();
    requestAnimationFrame(loop);
}
loop();

//-----------------------------------tempo

let dezSEl = document.querySelector('#dezS');
let imagemFundo = document.querySelector('.principal');

 let nomeDaImagem = [
    'https://epicorpg.com.br/wp-content/uploads/2019/03/caverna-complexo.gif',
    'https://i.pinimg.com/originals/e8/99/f8/e899f8cc9ee082c8743abdfe7d66fa5b.gif',
 ];
 function atualizarImagem(a){
  const caminhoDaImagem = nomeDaImagem[a];
  
  imagemFundo.style.backgroundImage = `url(${caminhoDaImagem})`;
}

function iniciarTimer() {
    tempo = 0;
    document.getElementById("timer").textContent = `Tempo: 0s`;

    tempoInterval = setInterval(() => {
        tempo++;
        document.getElementById("timer").textContent = `Tempo: ${tempo}s`;

        if (tempo === 5) document.documentElement.style.setProperty("--velocidade", "3.5s");
        if (tempo === 10){ 
            document.documentElement.style.setProperty("--velocidade", "3s");
            dezSEl.style.backgroundColor = 'green';
        }
        if (tempo === 15) document.documentElement.style.setProperty("--velocidade", "2.5s");
        if (tempo === 20){
            document.documentElement.style.setProperty("--velocidade", "2s");

            atualizarImagem(0);
            inimigoEl.src = 'https://art.ngfiles.com/comments/1055000/iu_1055299_8284187.gif';
            inimigoEl.style.width = "400px";
            inimigoEl.style.height = "300px";
            inimigoEl.style.bottom = "-100px";
            personagem.style.bottom = "-60px";
        } 
        if (tempo === 30){ document.documentElement.style.setProperty("--velocidade", "1.5s")
            atualizarImagem(1);

            inimigoEl.src = 'https://i.pinimg.com/originals/66/03/ab/6603ab4db145ecb11873519ccc3d3055.gif';

            inimigoEl.style.width = "400px";
            inimigoEl.style.height = "300px";
            inimigoEl.style.bottom = "-50px";
        }
        if (tempo === 60) document.documentElement.style.setProperty("--velocidade", "1s");
    }, 1000);
}

function pararTimer() {
    clearInterval(tempoInterval);
}

//---------------------------morte
function morreu(){
    document.body.innerHTML = `<p>Você sobreviveu ${tempo} segundos!</p>`;
    document.body.style.display = "block";
    document.body.style.textAlign = "center";
    document.body.style.marginTop = "200px";
    document.body.style.fontSize = "100px";
    document.body.style.borderRadius = "5px";
    document.body.style.color = "gold";
    document.body.style.textShadow = "6px 5px 5px black";
    
    const botao = document.createElement("button");
    botao.textContent = "Voltar";
    botao.style.fontSize = "100px";
    botao.style.backgroundColor =  "gray";
    botao.style.backgroundColor =  "gold";
    botao.style.marginTop =  "250px";
    botao.style.borderRadius = "20px";
    botao.style.padding = "10px 20px";
    botao.style.cursor = "pointer";

    document.body.appendChild(botao);

    botao.addEventListener("click", function(){
        location.href = "lobby.html";
    });
}

setInterval(() => {
    if (!jogoAtivo) return;

    const inimigoLeft = inimigoEl.offsetLeft;

    if (inimigoLeft <= 150 && inimigoLeft > 50 && alturaPulo < 30) {
        jogoAtivo = false;
        pararTimer();
        jogoAtivo = false;

        morreu();
    }

}, 10);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {

        if (!jogoAtivo) {
            jogoAtivo = true;
            iniciarTimer();
        }

        const player = document.getElementById("player");

        if (!player.classList.contains("pulando")) {
            player.classList.add("pulando");

            setTimeout(() => {
                player.classList.remove("pulando");
            }, 800); 
        }
    }
});

setInterval(() => {
    if (!jogoAtivo) return;

    const inimigoLeft = inimigoEl.offsetLeft;
    const playerBottom = parseInt(getComputedStyle(canvasPlayer).bottom);

    if (inimigoLeft <= 60 && inimigoLeft > 50 && playerBottom < 100) {
        jogoAtivo = false;
        pararTimer();

        morreu();
    }

}, 10); 
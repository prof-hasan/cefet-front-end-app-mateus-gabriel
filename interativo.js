const personagem = document.querySelector(".pessoa");
const barreiras = document.querySelector(".barreiras");

let tempo = 0;
let tempoInterval;
let jogoAtivo = false; 

let imagemFundo = document.querySelector('.principal');

 let nomeDaImagem = [
    'https://png.pngtree.com/thumb_back/fw800/background/20250731/pngtree-volcano-erupting-background-image_17673419.webp',
 ];

 function atualizarImagem(){
  const caminhoDaImagem = nomeDaImagem[0];
  
  imagemFundo.style.backgroundImage = `url(${caminhoDaImagem})`;
}

function iniciarTimer() {
    tempo = 0;
    document.getElementById("timer").textContent = `Tempo: 0s`;

    tempoInterval = setInterval(() => {
        tempo++;
        document.getElementById("timer").textContent = `Tempo: ${tempo}s`;

        if (tempo === 5) barreiras.style.animationDuration = "3.5s";
        if (tempo === 10) barreiras.style.animationDuration = "3.8s";
        if (tempo === 15) barreiras.style.animationDuration = "2.0s";
        if (tempo === 30){
            barreiras.style.animationDuration = "1.0s";

            atualizarImagem();
        } 
        if (tempo === 40) barreiras.style.animationDuration = "0.9s";
        if (tempo === 60) barreiras.style.animationDuration = "0.8s";
    }, 1000);
}

function pararTimer() {
    clearInterval(tempoInterval);
}


let index = 0;
setInterval(() => {
    barreiras.src = imagens[index];
    index = (index + 1) % imagens.length;
}, 1000);

const loopColisao = setInterval(() => {
    if (!jogoAtivo) return;

    const barreirasPosition = barreiras.offsetLeft;
    const pessoaPosition = +window.getComputedStyle(personagem).bottom.replace('px', '');

    if (barreirasPosition <= 70 && barreirasPosition > 0 && pessoaPosition < 80) {
        barreiras.style.animation = 'none';
        barreiras.style.left = `${barreirasPosition}px`;
        personagem.style.animation = 'none';
        personagem.src = 'https://png.pngtree.com/png-clipart/20230914/original/pngtree-tombstone-clipart-cartoon-grave-with-a-skull-and-grass-vector-png-image_11091955.png';
        personagem.style.width = '8%';

        jogoAtivo = false;
        pararTimer();
        alert(`Você sobreviveu por ${tempo} segundos!`);

        setTimeout(() => location.reload(), 3000);
    }
}, 10);

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (!jogoAtivo) {
            jogoAtivo = true;
            barreiras.style.animation = 'barreiras 4s infinite linear';
            iniciarTimer();
        }

        if (!personagem.classList.contains("pulando")) {
            personagem.classList.add("pulando");

            setTimeout(() => personagem.classList.remove("pulando"), 800);
        }
    }
});

//----------------------------------------------------

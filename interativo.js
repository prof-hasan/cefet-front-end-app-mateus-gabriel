const personagem = document.querySelector(".pessoa");
const inimigoEl = document.querySelector(".inimigo");

let tempo = 0;
let tempoInterval;
let jogoAtivo = false; 

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
        if (tempo === 10) document.documentElement.style.setProperty("--velocidade", "3s");
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

const loopColisao = setInterval(() => {
    if (!jogoAtivo) return;

    const inimigoElPosition = inimigoEl.offsetLeft;
    const pessoaPosition = +window.getComputedStyle(personagem).bottom.replace('px', '');

    if (inimigoElPosition <= 70 && inimigoElPosition > 0 && pessoaPosition < 80) {
        inimigoEl.style.animation = 'none';
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
            inimigoEl.style.animation = 'inimigo var(--velocidade) linear infinite';
            iniciarTimer();
        }

        if (!personagem.classList.contains("pulando")) {
            personagem.classList.add("pulando");

            setTimeout(() => personagem.classList.remove("pulando"), 800);
        }
    }
});

//----------------------------------------------------


let engrenagem = document.querySelector('#alterna-menu');
let bodyEl = document.querySelector('body');

engrenagem.addEventListener('click', function(){
    bodyEl.classList.toggle('menu-visivel');
});


/*-----------------MUSICA------------------------*/
let somEl = document.querySelector('#botaoAudio');
let musicaEl = document.querySelector('#musica');

somEl.addEventListener('click', function(){
    somEl.classList.toggle('selecionado');

    if(musicaEl.paused){
        musicaEl.play();
    }else{
        musicaEl.pause();
    }
});
 
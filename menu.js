//MENU
let engrenagem = document.querySelector('#alterna-menu');
let bodyEl = document.querySelector('body');

engrenagem.addEventListener('click', function(){
    bodyEl.classList.toggle('menu-visivel');
});


//MUSICA
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

//Ester egg
let eggEl = document.querySelector("#esterEgg");

cheet('a a a', function(){
    eggEl.currentTime = 0;
    eggEl.play();
});
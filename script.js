const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer')

const startPauseBt = document.querySelector('#start-pause');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
const musica = new Audio ('/sons/luna-rise-part-one.mp3'); 
musica.loop = true

let tempoDecorridoEmsegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 1500
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 300
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmsegundos = 900
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');

})

function alterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":    
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
         case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`   
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmsegundos <= 0){
        audioTempoFinalizado.play()
        alert('Tempo finalizado!');
        zerar();
        return
    }
    tempoDecorridoEmsegundos -= 1
    mostrarTempo()
    
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {
    if(intervaloId){
        audioPausa.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar (){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function mostrarTempo(){
    const minutos = Math.floor(tempoDecorridoEmsegundos / 60);
    const segundos = tempoDecorridoEmsegundos % 60;
    const tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    tempoNaTela.innerHTML = tempoFormatado;}
 
mostrarTempo()
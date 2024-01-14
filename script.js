/* ----- Inputs ----- */
var inputNumeroJogadores = document.getElementById('numero-jogadores');
var inputNumeroImpostores = document.getElementById('numero-impostores');

/* ----- Buttons ----- */
const iniciarBtn = document.getElementById('btnIniciar');
const sortearBtn = document.getElementById('btnSortear');
const fecharTelaUsuarioSorteadoBtn = document.getElementById('btnFecharTelaUsuarioSorteado');
const fecharTelaImpostorSorteadoBtn = document.getElementById('btnFecharTelaImpostorSorteado');

/* ----- Exibir ----- */
const telaSorteio = document.querySelector('.tela-sorteio');
const telaUsuarioSorteado = document.querySelector('.tela-usuario-sorteado');
const telaImpostor = document.querySelector('.tela-impostor-sorteado');
const mensagemSorteio = document.getElementById('mensagem-sorteio');
const telaFimDeJogo = document.querySelector('.fim-de-jogo');

/* ----- Eventos ----- */
iniciarBtn.addEventListener('click', showTelaSorteio);
sortearBtn.addEventListener('click', showTelaUsuarioSorteado);
fecharTelaUsuarioSorteadoBtn.addEventListener('click', hideTelaUsuarioSorteado);
fecharTelaImpostorSorteadoBtn.addEventListener('click', showTelaImpostor );

//#region Exibir Resultado Sorteio
async function atualizarResultadoSorteio() {
    mensagemSorteio.textContent = await carregarDesenhosJSON()
}
//#endregion

/* ----- Funções ----- */
function showTelaSorteio(e) {
    e.preventDefault();
    if(inputNumeroJogadores.value > 2 && inputNumeroImpostores.value > 0) {
        telaSorteio.classList.add('active')
        carregarDesenhosJSON();
        atualizarResultadoSorteio()
    } else {
        alert("O número de jogadores deve ser maior que 2 e deve-se ter pelo menos um impostor!")
    }
    
}

function showTelaUsuarioSorteado(e) {
    e.preventDefault
    telaUsuarioSorteado.classList.add('active')
    revelarImpostor()
}

function hideTelaUsuarioSorteado() {
    telaUsuarioSorteado.classList.remove('active')
}

function showTelaImpostor() {
    telaImpostor.classList.toggle('active')
}

async function carregarDesenhosJSON() {
    try{
        const resposta = await fetch('desenhos.json');
        const desenhos = await resposta.json(); // Array dos desenhos

        var indiceAleatorioDesenho = Math.floor(Math.random() * desenhos.nomes.length );
        var resultado = desenhos.nomes[indiceAleatorioDesenho];

        return resultado.toString();
    } catch(error) {
        console.error('Erro ao carregar o arquivo "desenhos.json":', error);
    }
}

function embaralharJogadores () {
    var jogadores = []

    for (var i=1; i <= inputNumeroJogadores.value; i++) {
        jogadores.push(i)
    }

    jogadores.sort(() => Math.random() - 0.5);
    //console.log(jogadores)
    return jogadores
}

function sorteioImpostor() {
    let numeroImpostores = inputNumeroImpostores.value;
        
    let impostores = embaralharJogadores().slice(0, numeroImpostores);
    console.log(`Impostor(es): ${impostores}`)

    return impostores;
}

let impostor; // variável para armazenar o(s) impostor(es)
let jogadorAtual = 0;

function revelarImpostor() {
    let jogadoresOrdemRevelacao = embaralharJogadores();
    jogadoresOrdemRevelacao.sort((a,b) => a-b)

    //console.log(`Ordem revelação ${jogadoresOrdemRevelacao}`);
    console.log(`Jogadores nessa partida: ${jogadoresOrdemRevelacao}`)
    console.log(`O jogador atual é o ${jogadoresOrdemRevelacao[jogadorAtual]}`);
    jogadorAtual++;

    if(!impostor){
        impostor = sorteioImpostor()
    }

    //console.log(impostor[jogadorAtual-1]);

    if(impostor.includes(jogadoresOrdemRevelacao[jogadorAtual-1]))
    {
        console.log(impostor.includes(jogadoresOrdemRevelacao[jogadorAtual-1])) 
        hideTelaUsuarioSorteado()
        showTelaImpostor()
    } 

    if(jogadorAtual > jogadoresOrdemRevelacao.length) {
        fimDeJogo()
        setTimeout(function() {
            location.reload();
        }, 5000);
    }
}

function fimDeJogo() {
    telaFimDeJogo.classList.add('active');
}



// Exibir e esconder tela de sorteio

//const showTelaSorteio = () => {telaSorteio.classList.add('active')};
//const hideTelaSorteio = () => {telaSorteio.classList.remove('active')};
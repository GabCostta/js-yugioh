// Armazenando os elementos do DOM em variáveis para evitar a busca repetida
const scoreBox = document.getElementById("score_points");
const avatar = document.getElementById("card-image");
const name = document.getElementById("card-name");
const type = document.getElementById("card-type");
const playerFieldCard = document.getElementById("player-field-card");
const computerFieldCard = document.getElementById("computer-field-card");
const nextDuelButton = document.getElementById("next-duel");

// Objeto de estado que armazena informações do jogo
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox,
    },
    cardSprite: {
        avatar,
        name,
        type,
    },
    fieldCards: {
        player: playerFieldCard,
        computer: computerFieldCard,
    },
    button: nextDuelButton,
};  

// Constante para identificar os jogadores
const player = {
    player1: "player-cards",
    computer: "computer-cards",
};  

// Dados das cartas disponíveis
const cardData = [
    // ... (dados de várias cartas)
];

// Função para obter um ID de carta aleatório
function getRandomCardId() {
    return Promise.resolve(Math.floor(Math.random() * cardData.length));
}

// Função para configurar as cartas no campo de jogo
function setCardsField(cardId) {
    // ... (lógica para configurar as cartas no campo de jogo)
}

// Função para verificar os resultados de um duelo
function checkDuelResults(playerCardId, computerCardId) {
    // ... (lógica para verificar resultados do duelo)
}

// Função para criar um elemento de imagem representando uma carta
function createCardImage(randomIdCard, fieldSide) {
    // ... (lógica para criar um elemento de imagem para uma carta)
}

// Função para remover todas as imagens de cartas do campo
function RemoveAllCardImages() {
    // ... (lógica para remover todas as imagens de cartas do campo)
}

// Função para desenhar as cartas no campo
function drawCards(cardNumbers, fieldSide) {
    // ... (lógica para desenhar as cartas no campo)
}

// Função para desenhar informações sobre uma carta selecionada
function drawSelectCard(index) {
    // ... (lógica para desenhar informações sobre uma carta selecionada)
}

// Função para desenhar um botão com um texto específico
function drawButton(text) {
    // ... (lógica para desenhar um botão com um texto específico)
}

// Função para redefinir o estado do duelo
function resetDuel() {
    // ... (lógica para redefinir o estado do duelo)
}

// Função para reproduzir áudio com base no resultado do duelo
function playAudio(status) {
    // ... (lógica para reproduzir áudio com base no resultado do duelo)
}

// Função para atualizar a pontuação exibida
function updateScore() {
    // ... (lógica para atualizar a pontuação exibida)
}

// Função de inicialização do jogo
function init() {
    // ... (lógica de inicialização do jogo)
}

// Chamada da função de inicialização
init();

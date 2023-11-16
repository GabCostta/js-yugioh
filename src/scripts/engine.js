// Objeto de estado do jogo contendo pontuações dos jogadores, sprites de cartas, cartas no campo e botões
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprite: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    button: document.getElementById("next-duel"),
};  

// Identificadores de jogador para as caixas de cartas do jogador e do computador
const player = {
    player1: "player-cards",
    computer: "computer-cards",
};  

// Dados das cartas, incluindo ID, nome, tipo, imagem e informações sobre vitórias e derrotas
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Papel",
        img: "./src/assets/icons/dragon.png",
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Pedra",
        img: "./src/assets/icons/magician.png",
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Tesoura",
        img: "./src/assets/icons/exodia.png",
        WinOf: [0],
        LoseOf: [1],
    },
];

// Função assíncrona para obter um ID de carta aleatório
async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

// Função assíncrona para configurar as cartas no campo, verificar os resultados do duelo e atualizar a pontuação
async function setCardsField(cardId) {
    await RemoveAllCardImages();  
    let computerCardId = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
    let duelResults = await checkDuelResults(cardId, computerCardId);
    await updateScore();
    await drawButton(duelResults);
}  

// Função assíncrona para verificar os resultados do duelo com base nas interações das cartas
async function checkDuelResults(playerCardId, computerCardId) {
    let playerCard = cardData[playerCardId];
    let duelResults = "Empate";

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Ganhou";
        await playAudio("win");
        state.score.playerScore++;
    }
    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Perdeu";
        await playAudio("lose");
        state.score.computerScore++;
    }
    return duelResults;
}

// Função assíncrona para criar elementos de imagem de cartas com manipulação de eventos
async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");
    if (fieldSide === player.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });
        cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    } 
    return cardImage;
}

// Função assíncrona para remover todas as imagens de cartas nas caixas do jogador e do computador
async function RemoveAllCardImages() {
    let cards = document.querySelector(".card-box.framed#computer-cards");
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
    cards = document.querySelector(".card-box.framed#player-cards");
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

// Função assíncrona para desenhar um número específico de cartas em um lado específico
async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }  
}

// Função para desenhar a carta selecionada na interface do usuário
function drawSelectCard(index) {
    state.cardSprite.avatar.src = cardData[index].img;
    state.cardSprite.name.innerText = cardData[index].name;
    state.cardSprite.type.innerText = "Atributo: " + cardData[index].type;
}

// Função assíncrona para desenhar um botão com o texto especificado
async function drawButton(text) {
    state.button.innerText = text;
    state.button.style.display = "block";
}

// Função assíncrona para redefinir o estado do duelo
async function resetDuel() {
    state.cardSprite.avatar.src = "";
    state.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    drawCards(5, player.player1);
    drawCards(5, player.computer);
}  

// Função assíncrona para reproduzir um arquivo de áudio com base no status fornecido
async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

// Função assíncrona para atualizar a pontuação exibida com base no estado atual do jogo
async function updateScore() {
    state.score.scoreBox.innerText = `Vitórias: ${state.score.playerScore} | Derrotas: ${state.score.computerScore}`;
}  

// Função de inicialização do jogo, desenhando cartas e iniciando a música de fundo
function init() {
    drawCards(5, player.player1);
    drawCards(5, player.computer);
    const bgm = document.getElementById("bgm");
    bgm.play();
}

// Inicialização do jogo ao carregar a página
init();

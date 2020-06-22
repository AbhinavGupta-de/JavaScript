// Challenge 1: Your age in days

function ageInDays() {
  var birthyear = prompt("In which year you were born... Good Friend?");
  var ageInDayss = (2020 - birthyear) * 365 * 0.25;
  var result = parseInt(ageInDayss);
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode("You are " + result + " days old.");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

//Challenge 2
function catGenerator() {
  var image = document.createElement("img");
  var div = document.getElementById("cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=verysmall";
  div.appendChild(image);
}

//Challenge 3
function rpsGame(yourchoice) {
  var humanChoice = yourchoice.id;
  var botChoice = compChoice();
  var result = resultDecider(humanChoice, botChoice);
  var message = messageMaker(result);
  messageDisplayer(message, humanChoice, botChoice);
}

function messageDisplayer(message, userChoice, botChoice) {
  var userImg = document.getElementById(userChoice).src;
  var botImg = document.getElementById(botChoice).src;

  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var humanDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  var colorOfResult;
  if (message == "You Lost!") {
    colorOfResult = "red";
  } else if (message == "You Won!") {
    colorOfResult = "green";
  } else {
    colorOfResult = "yellow";
  }

  humanDiv.innerHTML =
    "<img src='" + userImg + "'width='140px' heigth='150px'> ";
  botDiv.innerHTML = "<img src='" + botImg + "' width='140px' heigth='150px'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    colorOfResult +
    " ; padding-top: 50px; '>" +
    message +
    "</h1>";

  document.getElementById("fles-box-rps-div").appendChild(humanDiv);
  document.getElementById("fles-box-rps-div").appendChild(messageDiv);
  document.getElementById("fles-box-rps-div").appendChild(botDiv);
}

function messageMaker(result) {
  var message;
  if (result == -1) {
    message = "You Lost!";
  } else if (result == 0) {
    message = "You Tied!";
  } else if (result == 1) {
    message = "You Won!";
  }
  return message;
}

// Make the computer to choice one of the choices.
function compChoice() {
  var botChoice = Math.floor(Math.random() * 3);
  if (botChoice == 0) {
    var compChoice = "scissors";
    return compChoice;
  } else if (botChoice == 1) {
    var compChoice = "rock";
    return compChoice;
  } else {
    var compChoice = "paper";
    return compChoice;
  }
}

// Decide who win.
function resultDecider(userChoice, botChoice) {
  var result;
  if (userChoice == "scissors") {
    if (botChoice == "rock") {
      result = -1;
      return result;
    } else if (botChoice == "scissors") {
      result = 0;
      return result;
    } else {
      result = 1;
      return result;
    }
  }
  if (userChoice == "rock") {
    if (botChoice == "rock") {
      result = 0;
      return result;
    } else if (botChoice == "scissors") {
      result = 1;
      return result;
    } else {
      result = -1;
      return result;
    }
  }
  if (userChoice == "paper") {
    if (botChoice == "rock") {
      result = 1;
      return result;
    } else if (botChoice == "scissors") {
      result = -1;
      return result;
    } else {
      result = 0;
      return result;
    }
  }
}

// Challenge 4
var blackjackGame = {
  you: { spanScore: "PLAYER-score", div: "player-box", score: 0 },
  dealer: { spanScore: "DEALER-score", div: "dealer-box", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardMap: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draw: 0,
  isStand: false,
  turnsOver: false,
};

const hitSound = new Audio("/static/sounds/swish.m4a");
const winSound = new Audio("/static/sounds/cash.mp3");
const lossSound = new Audio("/static/sounds/aww.mp3");

const PLAYER = blackjackGame.you;
const DEALER = blackjackGame.dealer;

function blackjackHit() {
  if (blackjackGame.isStand == false) {
    document.querySelector("#blackjack-result").textContent = "Let's Play!";
    document.querySelector("#blackjack-result").style.color = "black";
    showCard(PLAYER);
  }
}

function randomCard() {
  let randomCardIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomCardIndex];
}

function showCard(activeDealer) {
  if (activeDealer.score <= 21) {
    var card = randomCard();
    var cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    cardImage.alt = "Image of Queen";
    document.getElementById(activeDealer.div).appendChild(cardImage);
    hitSound.play();
    updateScore(card, activeDealer);
    showScore(activeDealer);
  }
}

function blackjackDeal() {
  showResult(computeResult());
  let yourImages = document
    .querySelector("#player-box")
    .querySelectorAll("img");

  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");

  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }

  PLAYER.score = 0;
  DEALER.score = 0;

  showScore(PLAYER);
  showScore(DEALER);

  document.getElementById(PLAYER["spanScore"]).style.color = "white";
  document.getElementById(DEALER["spanScore"]).style.color = "white";
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer.score + blackjackGame["cardMap"][card][1] <= 21) {
      activePlayer.score += blackjackGame["cardMap"][card][1];
    } else {
      activePlayer.score += blackjackGame["cardMap"][card][0];
    }
  } else {
    activePlayer.score += blackjackGame["cardMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer.score > 21) {
    document.getElementById(activePlayer["spanScore"]).innerText = "Bust!";
    document.getElementById(activePlayer["spanScore"]).style.color = "red";
  } else {
    document.getElementById(activePlayer["spanScore"]).innerText =
      activePlayer.score;
  }
}

function dealerLogic() {
  blackjackGame.isStand == true;
  while (DEALER.score <= 16) {
    setTimeout(showCard(DEALER), 5000);
  }
}

function computeResult() {
  let winner;

  if (PLAYER.score <= 21) {
    if (PLAYER.score > DEALER.score || DEALER.score > 21) {
      winner = PLAYER;
    } else if (PLAYER.score < DEALER.score) {
      winner = DEALER;
    } else if (PLAYER.score == DEALER.score) {
    }
  } else if (PLAYER.score > 21 && DEALER.score <= 21) {
    winner = DEALER;
  } else if (PLAYER.score > 21 && DEALER.score > 21) {
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (winner == PLAYER) {
    message = "You are the winner!";
    messageColor = "green";
    winSound.play();
  } else if (winner == DEALER) {
    message = "You Lose!";
    messageColor = "red";
    lossSound.play();
  } else {
    message = "You drew!";
    messageColor = "yellow";
  }

  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
}

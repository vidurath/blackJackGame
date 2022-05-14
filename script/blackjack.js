var dealerSum = 0;
var yourSum = 0;
var dealerCard = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var shown;
var deck;

var canHit = true;

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  document.getElementById("deal").style.visibility = "hidden";
  let cardImg1 = document.createElement("img");
  shown = deck.pop();
  cardImg1.src = "./cards/" + shown + ".png";
  document.getElementById("dealer-cards").append(cardImg1);

  let cardImg2 = document.createElement("img");
  cardImg2.id = "hiddenImg";
  hidden = deck.pop();
  cardImg2.src = "./cards/BACK.png";
  document.getElementById("dealer-cards").append(cardImg2);

  for (let i = 0; i < 2; i++) {
    let cardImgUser = document.createElement("img");
    let cardUser = deck.pop();
    cardImgUser.src = "./cards/" + cardUser + ".png";
    yourSum += getValue(cardUser);
    yourAceCount += checkAce(cardUser);
    document.getElementById("your-cards").append(cardImgUser);
  }
  //   console.log(yourSum);
  document.getElementById("your-sum").innerText = yourSum;
  dealerCard += getValue(shown);
  document.getElementById("dealer-sum").innerText = dealerCard;

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }

  console.log(`Hit sum = ${yourSum}`);
}

function stay() {
  document.getElementById("hiddenImg").src = "./cards/" + hidden + ".png";

  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  //   console.log(`DealerSum = ${dealerSum}`);
  //   console.log(`DealerAceCount = ${dealerAceCount}`);

  while (dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }

  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  console.log(`DealerSum = ${dealerSum}`);
  console.log(`yourSum = ${yourSum}`);

  let message = "";
  if (yourSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You win!";
  } else if (yourSum == dealerSum) {
    message = "Tie!";
  } else if (yourSum > dealerSum) {
    message = "You Win!";
  } else if (yourSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

function main() {
  buildDeck();
  shuffleDeck();
  startGame();
}

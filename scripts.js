let circleTurn;
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const container = document.getElementById("container");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById("winningMessage");
const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  circleTurn = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("mouseenter", setBoardCLassOnHover);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("mouseenter", setBoardCLassOnHover);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
}

const buttonClick = document.getElementById("refreshButton");
buttonClick.addEventListener("click", handleRefresh);

function handleRefresh() {
  startGame();
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const requiredClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, requiredClass);
  if (isWin(requiredClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapMark();
    setBoardCLassOnHover();
  }
}

function isWin(requiredClass) {
  return WIN_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(requiredClass);
    });
  });
}

function isDraw(){
    return [...cells].every((cell)=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Its a Draw";
  } else {
    winningMessageTextElement.innerText = circleTurn ? "O Win" : "X Win";
  }
  winningMessageElement.classList.add("show");
}

function setBoardCLassOnHover() {
  container.classList.remove(CIRCLE_CLASS);
  container.classList.remove(X_CLASS);
  if (circleTurn) {
    container.classList.add(CIRCLE_CLASS);
  } else {
    container.classList.add(X_CLASS);
  }
}

function placeMark(cell, requiredClass) {
  cell.classList.add(requiredClass);
}

function swapMark() {
  circleTurn = !circleTurn;
}

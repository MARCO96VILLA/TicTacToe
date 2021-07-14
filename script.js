const gameBoard = (() => {
  let board = [];
  const emptyBoardArr = (arr) => {
    for (let i = 0; i < 9; i++) {
      arr.pop();
    }
    for (let i = 0; i < 9; i++) {
      arr.push("");
    }
    return arr;
  };
  const updateBoard = () => {
    let index = 0;
    for (let i = 1; i < 4; i++) {
      for (let el = 1; el < 4; el++) {
        document.querySelector(
          `tr:nth-of-type(${i}) th:nth-of-type(${el})`
        ).textContent = gameBoard.board[index];
        index++;
      }
    }
  };
  emptyBoardArr(board);
  return {
    board,
    updateBoard,
    emptyBoardArr,
  };
})();
const player = (name, letterEl, color) => {
  let letter = letterEl.toUpperCase();
  const turn = true;
  return { name, letter, color, turn };
};
const game = () => {
  secondPlayer.turn = false;
  const makeMove = () => {
    for (let i = 0; i < th.length; i++) {
      th[i].addEventListener("click", () => {
        if (th[i].textContent === "") {
          if (firstPlayer.turn === true && secondPlayer.turn === false) {
            gameBoard.updateBoard();
            gameBoard.board[i] = firstPlayer.letter;
            th[i].textContent = firstPlayer.letter;
            th[i].style.color = firstPlayer.color;
            firstPlayer.turn = false;
            secondPlayer.turn = true;
            winCheck();
            console.log(gameBoard.board);
          }
        }
        const gb = gameBoard.board;
        if (
          gb[0] !== "" ||
          gb[1] !== "" ||
          gb[2] !== "" ||
          gb[3] !== "" ||
          gb[4] !== "" ||
          gb[5] !== "" ||
          gb[6] !== "" ||
          gb[7] !== "" ||
          gb[8] !== ""
        ) {
          findBestMove(gameBoard.board);
          let oneMove = bestMove.index;
          if (th[oneMove].textContent === "") {
            gameBoard.updateBoard();
            gb[oneMove] = secondPlayer.letter;
            th[oneMove].textContent = secondPlayer.letter;
            th[oneMove].style.color = secondPlayer.color;
            firstPlayer.turn = true;
            secondPlayer.turn = false;
            winCheck();
          }
        }
      });
    }
  };
  const winCheck = () => {
    const b = gameBoard.board;
    const fp = firstPlayer.letter;
    const sp = secondPlayer.letter;
    if (
      (b[0] === fp && b[1] === fp && b[2] === fp) ||
      (b[3] === fp && b[4] === fp && b[5] === fp) ||
      (b[6] === fp && b[7] === fp && b[8] === fp) ||
      (b[0] === fp && b[3] === fp && b[6] === fp) ||
      (b[1] === fp && b[4] === fp && b[7] === fp) ||
      (b[2] === fp && b[5] === fp && b[8] === fp) ||
      (b[0] === fp && b[4] === fp && b[8] === fp) ||
      (b[2] === fp && b[4] === fp && b[6] === fp)
    ) {
      document.querySelector(
        ".results"
      ).textContent = `Congratulations! ${firstPlayer.name} won the game!`;
      reset();
    } else if (
      (b[0] === sp && b[1] === sp && b[2] === sp) ||
      (b[3] === sp && b[4] === sp && b[5] === sp) ||
      (b[6] === sp && b[7] === sp && b[8] === sp) ||
      (b[0] === sp && b[3] === sp && b[6] === sp) ||
      (b[1] === sp && b[4] === sp && b[7] === sp) ||
      (b[2] === sp && b[5] === sp && b[8] === sp) ||
      (b[0] === sp && b[4] === sp && b[8] === sp) ||
      (b[2] === sp && b[4] === sp && b[6] === sp)
    ) {
      document.querySelector(
        ".results"
      ).textContent = `Congratulations! ${secondPlayer.name} won the game!`;
      reset();
    } else if (
      b[0] !== "" &&
      b[1] !== "" &&
      b[2] !== "" &&
      b[3] !== "" &&
      b[4] !== "" &&
      b[5] !== "" &&
      b[6] !== "" &&
      b[7] !== "" &&
      b[8] !== ""
    ) {
      document.querySelector(
        ".results"
      ).textContent = `The game is over! It's a draw!`;
      reset();
    }
  };
  return { makeMove, winCheck };
};
const reset = () => {
  gameBoard.emptyBoardArr(gameBoard.board);
  gameBoard.updateBoard();
  firstPlayer.turn = true;
  secondPlayer.turn = false;
};
document.querySelector("#playerone-save").addEventListener("click", () => {
  firstPlayer.name = document.querySelector("#playerone-name").value;
  firstPlayer.letter = document
    .querySelector("#playerone-letter")
    .value.toUpperCase();
  firstPlayer.color = document.querySelector("#playerone-color").value;
});
document.querySelector("#playertwo-save").addEventListener("click", () => {
  secondPlayer.name = document.querySelector("#playertwo-name").value;
  secondPlayer.letter = document
    .querySelector("#playertwo-letter")
    .value.toUpperCase();
  secondPlayer.color = document.querySelector("#playertwo-color").value;
});
const random = () => Math.floor(Math.random() * 9);

let firstPlayer = player("Player1", "o", "red");
let secondPlayer = player("Player2", "x", "blue");
const th = document.querySelectorAll("th");
game().makeMove();

const isMoveLeft = (b) => {
  for (let i = 0; i < b.length; i++) {
    if (b[i].value === "") {
      return true;
    } else {
      return false;
    }
  }
};
const evaluate = (b) => {
  const fp = firstPlayer.letter;
  const sp = secondPlayer.letter;
  if (
    (b[0] === sp && b[1] === sp && b[2] === sp) ||
    (b[3] === sp && b[4] === sp && b[5] === sp) ||
    (b[6] === sp && b[7] === sp && b[8] === sp) ||
    (b[0] === sp && b[3] === sp && b[6] === sp) ||
    (b[1] === sp && b[4] === sp && b[7] === sp) ||
    (b[2] === sp && b[5] === sp && b[8] === sp) ||
    (b[0] === sp && b[4] === sp && b[8] === sp) ||
    (b[2] === sp && b[4] === sp && b[6] === sp)
  ) {
    return 10;
  } else if (
    (b[0] === sp && b[1] === sp && b[2] === sp) ||
    (b[3] === sp && b[4] === sp && b[5] === sp) ||
    (b[6] === sp && b[7] === sp && b[8] === sp) ||
    (b[0] === sp && b[3] === sp && b[6] === sp) ||
    (b[1] === sp && b[4] === sp && b[7] === sp) ||
    (b[2] === sp && b[5] === sp && b[8] === sp) ||
    (b[0] === sp && b[4] === sp && b[8] === sp) ||
    (b[2] === sp && b[4] === sp && b[6] === sp)
  ) {
    return -10;
  } else {
    return 0;
  }
};
const minimax = (board, depth, isMax) => {
  let score = evaluate(board);
  if (score === 10) {
    return score;
  }
  if (score === -10) {
    return score;
  }
  if (isMoveLeft(board) === false) {
    return 0;
  }
  if (isMax) {
    let best = -1000;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = secondPlayer.letter;
        best = Math.max(best, minimax(board, depth + 1, !secondPlayer.turn));
        b[i] = "";
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = firstPlayer.letter;
        best = Math.min(best, minimax(board, depth + 1, !secondPlayer.turn));
        b[i] = "";
      }
    }
    console.log(best);
    return best;
  }
};
const moveFactory = (index) => {
  return { index };
};
let bestMove = moveFactory(-1);
const findBestMove = (board) => {
  let bestVal = -1000;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = secondPlayer.letter;
      let moveVal = minimax(board, 0, false);
      console.log(moveVal);
      board[i] = "";
      if (moveVal > bestVal) {
        bestMove.index = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};
/*const cpuMove = () => {
  let oneRandom = random();
  if (th[oneRandom].textContent === "") {
    gameBoard.updateBoard();
    gameBoard.board[oneRandom] = secondPlayer.letter;
    th[oneRandom].textContent = secondPlayer.letter;
    th[oneRandom].style.color = secondPlayer.color;
    firstPlayer.turn = true;
    secondPlayer.turn = false;
    game().winCheck();
  } else {
    cpuMove();
  }
};*/
/*const cpuMove = () => {
  findBestMove(gameBoard.board);
  let oneMove = bestMove.index;
  if (th[oneMove].textContent === "") {
    gameBoard.updateBoard();
    gameBoard.board[oneMove] = secondPlayer.letter;
    th[oneMove].textContent = secondPlayer.letter;
    th[oneMove].style.color = secondPlayer.color;
    firstPlayer.turn = true;
    secondPlayer.turn = false;
    game().winCheck();
  } else {
    cpuMove();
  }
};*/
/*else if (firstPlayer.turn === false && secondPlayer.turn === true) {
  gameBoard.updateBoard();
  gameBoard.board[i] = secondPlayer.letter;
  th[i].textContent = secondPlayer.letter;
  th[i].style.color = secondPlayer.color;
  firstPlayer.turn = true;
  secondPlayer.turn = false;
  winCheck();
}*/

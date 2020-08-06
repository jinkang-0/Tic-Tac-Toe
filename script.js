var grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]
var turn = "X";
var round = 0;
var winner;
var x_score = 0;
var o_score = 0;

function addPiece(id) {
  let row = Math.ceil(parseInt(id)/3)-1;
  let col = parseInt(id)-1;
  if (col + 1 > 6) {
    col = (col+1)%7;
  } else if (col + 1 > 3) {
    col = (col+1)%4;
  }
  console.log(turn, "at", row, col);

  if (grid[row][col] == "" && document.getElementById(id).classList.contains("empty")) {
    if (turn == "X") {
      turn = "O";
      grid[row][col] = "X";
    } else {
      turn = "X";
      grid[row][col] = "O";
    }
    document.getElementById(id).classList.remove("empty");
    document.getElementById(id).innerHTML = `<span>${grid[row][col]}</span>`;
    document.getElementById("turn").innerHTML = `${turn}'s Turn`;

    checkWin();
  }
}

function checkWin() {
  // vertical
  for (var i = 0; i < 3; i++) {
    if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] != "") {
      winner = grid[i][0];
      console.log("winner by vertical check");
    }
  }

  // horizontal
  for (var i = 0; i < 3; i++) {
    if (grid[0][i] == grid[1][i] && grid[1][i]== grid[2][i] && grid[0][i] != "") {
      winner = grid[0][i];
      console.log("winner by horizontal check");
    }
  }

  // diagonal
  if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[0][0] != "") {
    winner = grid[0][0];
    console.log("winner by diagonal check");
  }

  if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[0][2] != "") {
    winner = grid[0][2];
    console.log("winner by diagonal check");
  }
  
  let square = document.getElementsByClassName("square");

  if (winner) {
    [].forEach.call(square, function(el) {
      el.classList.remove("empty");
    });

    document.getElementById("message").innerHTML = `${winner} Won!`;
    document.getElementById("turn").style.display = "none";
    document.getElementById("restart").style.display = "block";

    if (winner == "X") {
      x_score++;
      document.getElementById("x-score").innerHTML = x_score;
    } else {
      o_score++;
      document.getElementById("o-score").innerHTML = o_score;
    }
  } else {
    let empty = 0;

    for (var i = 0; i < 9; i++) {
      if (square[i].classList.contains("empty")) {
        break;
      } else {
        empty++;
      }
    }

    if (empty >= 9) {
      document.getElementById("message").innerHTML = "Tied!";
      document.getElementById("turn").style.display = "none";
      document.getElementById("restart").style.display = "block";
    }
  }
}

function restart() {
  grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]
  winner = "";
  round++

  if (round%2 == 0) {
    turn = "X";
  } else {
    turn = "O";
  }

  let square = document.getElementsByClassName("square");
  [].forEach.call(square, function(el) {
    el.innerHTML = "";
    el.classList.add("empty");
  });

  document.getElementById("message").innerHTML = '';
  document.getElementById("turn").innerHTML = `${turn}'s Turn`;
  document.getElementById("turn").style.display = "inline";
  document.getElementById("restart").style.display = "none";
}

function clearBoard() {
  restart();
  round--;
  if (turn == "X") {
    turn = "O";
  } else {
    turn = "X";
  }
  document.getElementById("turn").innerHTML = `${turn}'s Turn`;
}

function clearScore() {
  x_score = 0;
  o_score = 0;
  document.getElementById("x-score").innerHTML = x_score;
  document.getElementById("o-score").innerHTML = o_score;
}

function randomMove() {
  
  let square = document.getElementsByClassName("empty");
  let random = Math.floor(Math.random() * square.length);

  addPiece(square[random].id);

}
"use strict";

var game;

var fields = document.querySelectorAll(".field");

var menu = document.querySelector(".menu");
var buttons = document.getElementsByClassName("btn");

buttons[0].addEventListener("click", function () {
  menu.style.display = "none";
  game = new Game("x");
});

buttons[1].addEventListener("click", function () {
  menu.style.display = "none";
  game = new Game("o");
});

fields.forEach(function (element, index) {
  element.addEventListener("click", function () {
    game.playerMove(index);
  });
});

var infoBtn = document.querySelector(".info-btn");

infoBtn.addEventListener("click", function () {
  modal();
  menu.style.display = "flex";
});

document.addEventListener("keydown", function (which) {
  if (which.key == "Enter") {
    modal();
    menu.style.display = "flex";
  }
});

function Game(playerRole) {
  fields.forEach(function (field) {
    field.innerText = "";
    field.classList.remove("clicked");
  });

  this.blocked = 0;
  this.fieldsLeft = 9;
  this.board = [null, null, null, null, null, null, null, null, null];
  var _this = this;

  this.move = function (field, sign) {
    this.append(field, sign);
    fields[field].classList.add("clicked");
    this.board[field] = sign;
    this.fieldsLeft--;
    this.check();
  };

  this.append = function (field, sign) {
    var moveSign = document.createTextNode(sign);
    fields[field].appendChild(moveSign);
  };

  this.playerMove = function (field) {
    if (this.fieldsLeft != 0) {
      if (this.blocked != 1) {
        this.move(field, this.player);
        this.blocked = 1;
        setTimeout(this.computerMove, "500");
      } else console.warn("Wait for your turn!");
    } else console.warn("The game has ended.");
  };
  this.computerMove = function () {
    var chooseField = null;
    var firstMove = [0, 2, 4, 4, 4, 4, 4, 6, 8];

    if (_this.fieldsLeft != 0) {
      if (_this.fieldsLeft == 9) {
        chooseField = firstMove[Math.floor(Math.random() * firstMove.length)];
      } else {
        var freeFields = _this.board
          .map(function (element, index) {
            if (element === null) return index;
            return element == 0;
          })
          .filter(function (element) {
            return element !== false;
          });

        if (_this.fieldsLeft == 8 && chooseField == null) {
          while (true) {
            chooseField =
              firstMove[Math.floor(Math.random() * firstMove.length)];
            if (freeFields.indexOf(chooseField) != -1) break;
          }
        }

        if (_this.fieldsLeft <= 5 && chooseField == null) {
          var checkThis = [
            [0, 1, [2]],
            [1, 2, [0]],
            [3, 4, [5]],
            [4, 5, [3]],
            [6, 7, [8]],
            [7, 8, [6]],
            [0, 3, [6]],
            [1, 4, [7]],
            [2, 5, [8]],
            [3, 6, [0]],
            [4, 7, [1]],
            [5, 8, [2]],
            [0, 4, [8]],
            [4, 8, [0]],
            [2, 4, [6]],
            [4, 6, [2]],
            [0, 2, [1]],
            [3, 5, [4]],
            [6, 8, [7]],
            [0, 6, [3]],
            [1, 7, [4]],
            [2, 8, [5]],
            [0, 8, [4]],
            [2, 6, [4]]
          ];

          for (var i = 0; i < checkThis.length; i++) {
            if (
              _this.board[checkThis[i][0]] == _this.computer &&
              _this.board[checkThis[i][1]] == _this.computer &&
              _this.board[checkThis[i][2][0]] === null
            ) {
              chooseField = checkThis[i][2][0];
              break;
            }
          }
        }

        if (_this.fieldsLeft <= 6 && chooseField == null) {
          var checkThis = [
            [0, 1, [2]],
            [1, 2, [0]],
            [3, 4, [5]],
            [4, 5, [3]],
            [6, 7, [8]],
            [7, 8, [6]],
            [0, 3, [6]],
            [1, 4, [7]],
            [2, 5, [8]],
            [3, 6, [0]],
            [4, 7, [1]],
            [5, 8, [2]],
            [0, 4, [8]],
            [4, 8, [0]],
            [2, 4, [6]],
            [4, 6, [2]],
            [0, 2, [1]],
            [3, 5, [4]],
            [6, 8, [7]],
            [0, 6, [3]],
            [1, 7, [4]],
            [2, 8, [5]],
            [0, 8, [4]],
            [2, 6, [4]]
          ];

          for (var i = 0; i < checkThis.length; i++) {
            if (
              _this.board[checkThis[i][0]] == _this.player &&
              _this.board[checkThis[i][1]] == _this.player &&
              _this.board[checkThis[i][2][0]] === null
            ) {
              chooseField = checkThis[i][2][0];
              break;
            }
          }
        }

        if (chooseField == null) {
          var previous = _this.board
            .map(function (a, index) {
              if (a == _this.computer) return index;
            })
            .filter(function (a) {
              return a != undefined;
            });

          var checkThis = [
            [
              [1, 2],
              [3, 6],
              [4, 8]
            ],
            [
              [4, 7],
              [0, 2]
            ],
            [
              [0, 1],
              [5, 8],
              [4, 6]
            ],
            [
              [0, 6],
              [4, 5]
            ],
            [
              [3, 5],
              [1, 7],
              [0, 6],
              [2, 6]
            ],
            [
              [3, 4],
              [2, 8]
            ],
            [
              [0, 3],
              [7, 8],
              [2, 4]
            ],
            [
              [1, 4],
              [6, 8]
            ],
            [
              [6, 7],
              [2, 5],
              [0, 4]
            ]
          ];

          for (var i = 0; i < previous.length; i++) {
            for (var j = 0; j < checkThis[previous[i]].length; j++) {
              if (
                _this.board[previous[i]] == _this.computer &&
                _this.board[checkThis[previous[i]][j][0]] === null &&
                _this.board[checkThis[previous[i]][j][1]] === null
              ) {
                var choice = Math.floor(
                  Math.random() * checkThis[previous[i]][j].length
                );
                chooseField = checkThis[previous[i]][j][choice];
                break;
              }
            }
          }
        }
      }

      if (chooseField === null) {
        chooseField = freeFields[Math.floor(Math.random() * freeFields.length)];
      }
      _this.move(chooseField, _this.computer);
      _this.lastMove = chooseField;
      _this.blocked = 0;
    }
  };

  this.check = function () {
    if (
      this.board[0] !== null &&
      this.board[0] == this.board[1] &&
      this.board[0] == this.board[2]
    )
      this.end(this.board[0]);
    else if (
      this.board[3] !== null &&
      this.board[3] == this.board[4] &&
      this.board[3] == this.board[5]
    )
      this.end(this.board[3]);
    else if (
      this.board[6] !== null &&
      this.board[6] == this.board[7] &&
      this.board[6] == this.board[8]
    )
      this.end(this.board[6]);
    else if (
      this.board[0] !== null &&
      this.board[0] == this.board[3] &&
      this.board[0] == this.board[6]
    )
      this.end(this.board[0]);
    else if (
      this.board[1] !== null &&
      this.board[1] == this.board[4] &&
      this.board[1] == this.board[7]
    )
      this.end(this.board[1]);
    else if (
      this.board[2] !== null &&
      this.board[2] == this.board[5] &&
      this.board[2] == this.board[8]
    )
      this.end(this.board[2]);
    else if (
      this.board[0] !== null &&
      this.board[0] == this.board[4] &&
      this.board[0] == this.board[8]
    )
      this.end(this.board[0]);
    else if (
      this.board[2] !== null &&
      this.board[2] == this.board[4] &&
      this.board[2] == this.board[6]
    )
      this.end(this.board[2]);
    else if (this.fieldsLeft == 0) this.end();
  };

  this.end = function (winner) {
    if (this.fieldsLeft == 0 && winner == undefined) {
      modal("<strong>Draw</strong><br>Nobody wins.");
    } else {
      this.fieldsLeft = 0;

      fields.forEach(function (element) {
        element.classList.add("clicked");
      });
      var name;
      winner == "x" ? (name = "Crosses") : (name = "Naughts");

      if (winner == this.player) {
        modal(
          "<strong>Victory!</strong><br>Congratulations, you win as <em>" +
            name +
            "</em>" +
            "."
        );
      } else {
        modal(
          "<strong>You loose!</strong><br>Computer wins as <em>" +
            name +
            "</em>" +
            "."
        );
      }
    }
  };

  this.player = playerRole || "x";
  if (this.player == "x") this.computer = "o";
  else {
    this.computer = "x";
    this.computerMove();
  }
}

function modal(content) {
  if (content) {
    info.style.display = "none";
    infoText.innerHTML = content;
    info.style.display = "flex";
  } else {
    info.style.display = "none";
  }
}

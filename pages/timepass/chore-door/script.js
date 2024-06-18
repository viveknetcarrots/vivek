// variables holding the door images
const chorebot_src =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beach_src =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const space_src =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closed_door_src =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

// getting elements into variables
var leftDoor = document.getElementById("left-door");
var middleDoor = document.getElementById("middle-door");
var rightDoor = document.getElementById("right-door");
var startButton = document.getElementById("gamebutton");
var current = document.getElementById("current");
var best = document.getElementById("best");

// declaring variables holding the image src's of the open doors
var openLeftDoor = "";
var openMiddleDoor = "";
var openRightDoor = "";

// initializing values
var current_val = 0;
var best_val = 0;
var numClosedDoors = 3;
var currentlyPlaying = true;

function door_open(door, openDoor) {
  door.src = openDoor;
}

function door_reset(door) {
  door.src = closed_door_src;
}

function randomChoreDoorGenerator() {
  var random = Math.floor(Math.random() * 3) + 1;
  let random_2 = Math.floor(Math.random() * 2) + 1;
  switch (random) {
    case 1:
      openLeftDoor = chorebot_src;
      if (random_2 == 1) {
        openMiddleDoor = space_src;
        openRightDoor = beach_src;
      } else {
        openMiddleDoor = beach_src;
        openRightDoor = space_src;
      }
      break;
    case 2:
      openMiddleDoor = chorebot_src;
      if (random_2 == 1) {
        openLeftDoor = space_src;
        openRightDoor = beach_src;
      } else {
        openLeftDoor = beach_src;
        openRightDoor = space_src;
      }
      break;
    case 3:
      openRightDoor = chorebot_src;
      if (random_2 == 1) {
        openLeftDoor = space_src;
        openMiddleDoor = beach_src;
      } else {
        openLeftDoor = beach_src;
        openMiddleDoor = space_src;
      }
      break;
  }
}

leftDoor.onclick = function () {
  if (!isClicked(leftDoor) && currentlyPlaying == true) {
    door_open(leftDoor, openLeftDoor);
    playDoor(leftDoor);
  }
};

middleDoor.onclick = function () {
  if (!isClicked(middleDoor) && currentlyPlaying == true) {
    door_open(middleDoor, openMiddleDoor);
    playDoor(middleDoor);
  }
};

rightDoor.onclick = function () {
  if (!isClicked(rightDoor) && currentlyPlaying == true) {
    door_open(rightDoor, openRightDoor);
    playDoor(rightDoor);
  }
};

function startRound() {
  currentlyPlaying = true;
  door_reset(leftDoor);
  door_reset(middleDoor);
  door_reset(rightDoor);
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck!";
  randomChoreDoorGenerator();
}

startButton.onclick = function () {
  startRound();
};

function isBot(door) {
  if (door.src == chorebot_src) {
    return true;
  } else {
    return false;
  }
}

function isClicked(door) {
  if (door.src == closed_door_src) {
    return false;
  } else {
    return true;
  }
}

function playDoor(door) {
  numClosedDoors--;
  if (numClosedDoors == 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver();
  }
}

function gameOver(status) {
  if (status == "win") {
    startButton.innerHTML = "You win! Play again?";
    current_val++;
    current.innerHTML = current_val;
    if (current_val > best_val) {
      best.innerHTML = current_val;
    }
  } else {
    startButton.innerHTML = "Game over! Play again?";
    current_val = 0;
    current.innerHTML = current_val;
  }
  currentlyPlaying = false;
}

startRound();

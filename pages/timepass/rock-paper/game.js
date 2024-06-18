const choices = ['rock', 'paper', 'scissors'];
let playerChoice;
let computerChoice;
let playerScore = 0;
let computerScore = 0;
const info = document.querySelector('#info');
const result = document.querySelector('#result');

document.querySelector('#rock').addEventListener('click', () => {
    playerChoice = 0;
    Start(playerChoice);
});
document.querySelector('#paper').addEventListener('click', () => {
    playerChoice = 1;
    Start(playerChoice);
});
document.querySelector('#scissors').addEventListener('click', () => {
    playerChoice = 2;
    Start(playerChoice);
});


document.querySelector('#reset-score').addEventListener('click', () => {

    playerScore = 0;
    computerScore = 0;
    document.querySelector('#player-score').innerText = playerScore;
    document.querySelector('#computer-score').innerText = computerScore;
    info.innerText = "";
    result.innerText = "";
})


function Start(choice) {
    computerChoice = Math.floor(Math.random() * 3);
    playerChoice = choice;
    info.innerText = `You chose ${choices[playerChoice]}, computer chose ${choices[computerChoice]}`;
    if (playerChoice === computerChoice) {
        result.innerText = 'TIE!';
    }
    else if (playerChoice - computerChoice == -2 || playerChoice - computerChoice == 1) {        //player wins
        playerScore++;
        document.querySelector('#player-score').innerText = playerScore;
        result.innerHTML = '<p style="color:green">' + 'You win!' + '</p>';
    }
    else {
        computerScore++;
        document.querySelector('#computer-score').innerText = computerScore;
        result.innerHTML = '<p style="color: red">' + 'You lose!' + '</p>';
    }

}
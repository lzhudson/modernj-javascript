// Game values
let min = 1,
max = 10,
winningNum = getRandomNumber(min, max),
guessesLeft = 3;

// UI Elements
const gameWrapper = document.querySelector('#game'),
minNum = document.querySelector('.min-num'),
maxNum = document.querySelector('.max-num'),
guessBtn = document.querySelector('#guess-btn'),
guessInput = document.querySelector('#guess-input'),
message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;


// Play Again event listener
gameWrapper.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // Validade
  if(isNaN(guess) || guess < min || guess > max || guess === ''){
    setMessage(`Please enter a number betwenn ${min} and ${max}`, 'red');
  } 
  // Check if won
  if(guess === winningNum) {  
    // Game over - won
    
    gameOver(true, `${winningNum} is correct, you WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `Game Over, you lost. The Correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong
      
      // Change border color
      guessInput.style.borderColor = 'red';
      
      // Clear Input
      guessInput.value = '';  
      
      //Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});
// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
  
}


function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
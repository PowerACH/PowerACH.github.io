//ADD SOLO PLAYER OPTIONS AND STARTING MODAL//


//THE FIRST CLICK//
let activeCard = false;

//CHOICE VARIABLES//
let firstChoice;
let secondChoice;

//DISABLES CARDS WHILE PICKING 
let stopBoard = false;

//MODAL VARIABLE//
let modal = document.getElementById("modalContainer")

//MODAL BLUR FEATURE//
let blur = document.getElementById("memoryWrap")

//MATCH COUNTER//
let matchCards = 0;
// let match = document.getElementById('matches');

//MOVES COUNTER//
let moves = 0;
// let moveCounter = document.getElementById('moves');

//TIMER (STARTS AFTER FIRST CLICK)//
let clock;
function moveFunc() {
    moves += 1
    // moveCounter.innerHTML = moves;
    if (moves == 1) {
        clock = setInterval(currentTime, 1000)
    }
}

//GAME TIMER//
let seconds = 00;
let s = document.getElementById('seconds');
let m = document.getElementById('minutes');
function currentTime() {
    ++seconds
    s.innerHTML = formatt(seconds % 60)
    m.innerHTML = formatt(Math.trunc(seconds / 60))
}

//GAME TIMER FORMATTING//
function formatt(x) {
    let xvalue = x + "";
    if (xvalue.length < 2) {
        return "0" + xvalue;
    } else {
        return xvalue;
    }
}

//STOP THE CLOCK//
function stopClock() {
    clearInterval(clock)
}

//TIMER RESET//
function timerReset() {
    seconds = 0;
    minute = 0;
}


///PLAYER PROPERTIES///
let playerOne = {
    turn: true,
    matches: 0
}

let playerTwo = {
    turn: false,
    matches: 0
}
let pOneMatch = document.getElementById('pOne');
let pTwoMatch = document.getElementById('pTwo');



// ******************Match Board Functions*****************//

//CARD VARIABLE//
const memoryCard = window.document.querySelectorAll(".card");
//ALLOWS CARDS TO BE CLICKABLE
memoryCard.forEach(card => card.addEventListener("click", cardTurn))



function cardTurn() {
    moveFunc()//STARTS MOVE COUNTER//
    if (stopBoard) {
        return
    }
    if (this === firstChoice) {
        return
    }
    
    this.classList.toggle('flip'); 

    if (!activeCard) {
        //FIRST CARD CHOICE
        activeCard = true;
        firstChoice = this;
        return
    } else {
        //SECOND CARD CHOICE
        activeCard = false;
        secondChoice = this;
        matched()
    }
}

//CHECKS FOR CARD MATCH//
function matched() {

    if (firstChoice.dataset.name === secondChoice.dataset.name) { 
        
        //WILL KEEP CARDS OPEN IF MATCHED//
        
        matchCards += 1;
        // match.innerHTML = matchCards;
        firstChoice.removeEventListener('click', cardTurn)
        secondChoice.removeEventListener('click', cardTurn)
        resetBoard()
        if (playerOne.turn == true) {
            playerOne.matches += 1
            pOneMatch.innerHTML = playerOne.matches
        } else if (playerTwo.turn == true) {
            playerTwo.matches += 1
            pTwoMatch.innerHTML = playerTwo.matches
        }
        setTimeout(gameOver, 700)


        //UNFLIP CARDS AFTER NO MATCH
    } else {
        stopBoard = true;
        setTimeout(() => {
            firstChoice.classList.remove('flip')
            secondChoice.classList.remove('flip')
            stopBoard = false;
        }, 1000)
        playerOne.turn = !playerOne.turn
        playerTwo.turn = !playerTwo.turn
    }
}

//BOARD RESETS 
function resetBoard() {
    activeCard = false
    stopBoard = false
    firstChoice = null
    secondChoice = null

}

// SHUFFLES CARDS//
(function shuffle() {
    memoryCard.forEach(card => {
        let random = Math.floor(Math.random() * 16)
        card.style.order = random;
    })
})()
// ///////////////////////////////////////////


//AFTER ALL CARD ARE MATCHED//
function gameOver() {
    if (matchCards === 8) {
        stopClock() 
        //MODAL POP UP//
        modal.classList.toggle("after")
        memoryWrap.classList.toggle("blur")
       
        //MODAL MESSAGE//
        if (playerOne.matches > playerTwo.matches) {
            document.getElementById("winnerMessage").innerHTML = ("Player One Wins!")
        } else if (playerTwo.matches > playerOne.matches) {
            document.getElementById("winnerMessage").innerHTML = ("Player Two Wins!")
        } else if (playerTwo.matches === playerOne.matches) {
            document.getElementById("winnerMessage").innerHTML = ("Its a tie!")
        }
    }
}

//MODAL RESTART BUTTON//
function startGame() {
    window.location.reload
}

// function shuffle(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }


// (function turns() {
//     if(playerOne.turn == true) {
//         document.getElementById("msg1").innerHTML = "PLAYER ONES TURN"
//     } else {
//         alert("PLAYER TWOS TURN")
//         document.getElementById("msg1").innerHTML = "PLAYER TWOS TURN"
//     }
// })()

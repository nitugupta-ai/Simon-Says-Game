let gameSeq =[];
let userSeq = [];
 console.log("Hello")

let started = false;
let level = 0;
let highestScore = 0;
let btns = ["yellow", "red", "purple", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game started");
        started = true;
    }
    

    levelUp();
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}
function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3 + 1);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    btnFlash(randBtn);
}

function checkAns(idx) {
    // console.log("Current level" , level);
    
    if(gameSeq[idx] === userSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp(), 1000);
        }
    } else {
        if(highestScore <= level) {
            highestScore = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}! Your highestScore was ${highestScore}</b> <br>Press any to start   `;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        

        reset();
    }
    
}


function btnPress() {
    let btn = this;
    userFlash(btn);
    console.log(this);

    userColor = btn.getAttribute("id");
    // console.log(userColor)
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length -1);
}

let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
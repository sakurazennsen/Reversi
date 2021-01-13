// change player
let player = 1; // 1 is black

// get dom elemtns of cell
const cell = document.getElementsByClassName("cell");

for(let i = cell.length - 1; i >= 0; i--){
        cellAction(cell[i])
　　}

function cellAction(cellDOM){
    // register to eventlistener 
    cellDOM.addEventListener("click", function(){
        this.classList.toggle("active");
        playersAction();
        this.classList.remove("active")
    });
}

// click and put stone
const playersAction = () => {
    const stone = (player % 2 ==0 ) ? "○" :  "●" // identify player
    const elem = document.getElementsByClassName("active")[0]; 
    elem.innerHTML = stone;

    // turn change
    const headText = (player % 2 ==0 ) ? "Black Turn" :  "White Turn"
    changeTurn(headText);
    player += 1;
}

// chenge turn
const changeTurn = (str) => {
    const elem = document.getElementById("turnOfPlayer");
    elem.innerHTML = str;
}

// jadge winner
const judgeWinner = () => {
    let cellTexts = [];
    for (i = 0; i < cell.length; i++){
        cellTexts.push(cell[i].textContent);
    }

    let countOfBlack = 0;
    let countOfWhite = 0;

    for (i = 0; i < cellTexts.length; i++){
        if(cellTexts[i] ==  "●") {countOfBlack ++;}
        else if(cellTexts[i] == "○") {countOfWhite ++;}
    }

    console.log(countOfBlack);
    console.log(countOfWhite);

    let judgingText = "";
    if(countOfBlack > countOfWhite) {judgingText = "BLACK IS WINNER!!!!"}
    else if(countOfBlack < countOfWhite) {judgingText = "WHITE IS WINNER!!!!"} 

    console.log(judgingText);

    const elem = document.getElementById("turnOfPlayer");
    elem.innerHTML = judgingText;
}
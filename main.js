//-----------------PREPARING------------------
let player = 2; 
let whiteStone = "○";
let blackStone = "●";
let currentStone = blackStone;
let nextStone = whiteStone;

// get dom elemtns of cell
var cell = document.getElementsByClassName("cell");

//-----------------MAIN PROCESS------------------
for(let i = 0; i < cell.length ;  i++){
    cell[i].addEventListener("click", function(){
        // to Array
        let cellElements = [].slice.call(cell);
        let index = cellElements.indexOf(this);

        putStone(index);
        changeStone(index);
        changeOrder();
        headTextChange();
    })};

//-----------------FUNCTIONS------------------
// put stone
const putStone = (index) =>{
    cell[index].innerHTML = currentStone;
}

// change order
const changeOrder = () =>{
    if(player % 2 == 0){
        currentStone = whiteStone;
        nextStone = blackStone;
        player ++;
    } else {
        currentStone = blackStone;
        nextStone = whiteStone;
        player ++;
    }
}

// change head text
const headTextChange = () =>{
    const headText = (player % 2 ==0) ? "Black Turn" :  "White Turn";
    const elem = document.getElementById("turnOfPlayer");
    elem.innerHTML = headText;
    return headText;
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
        if(cellTexts[i] ==  blackStone) {countOfBlack ++;}
        else if(cellTexts[i] == whiteStone) {countOfWhite ++;}
    }

    let judgingText = "";
    if(countOfBlack > countOfWhite) {judgingText = "BLACK IS WINNER!!!!"}
    else if(countOfBlack < countOfWhite) {judgingText = "WHITE IS WINNER!!!!"}
    else{judgingText = "DRAW!!"}

    const elem = document.getElementById("turnOfPlayer");
    elem.innerHTML = judgingText;
}

// check whether there are different stones in top, right, left, and bottom sides
const changeStone = (index) => {
    let numIndex = 8;

    //// horizontal directions
    /// left
    if(index > 2){
        let prevLeftCell = cell[index - 2].innerHTML;
        let prevCell = cell[index - 1].innerHTML;

        if (prevLeftCell.match(currentStone) && prevCell.match(nextStone)){
            let targetIndex = index - 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
            putStone(targetIndex);
            }
        }
    }
    
    /// right
    if(index < cell.length - 2){
        let nextRightCell = cell[index + 2].innerHTML;
        let nextCell = cell[index + 1].innerHTML;

        if (nextRightCell.match(currentStone) && nextCell.match(nextStone)){
            let targetIndex = index + 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
                putStone(targetIndex);
            }
        }
    }


    //// vertical direction
    /// top to bottom
    if(index < cell.length - numIndex*2 ){
        let downBottomCell = cell[index + numIndex*2].innerHTML;
        let downCell = cell[index + numIndex].innerHTML;

        if (downBottomCell.match(currentStone) && downCell.match(nextStone)){
            let targetIndex = index + numIndex;
            putStone(targetIndex);
        }
    }
        
    /// bottom to top
    if(index > numIndex*2 -1 ){
        let upTopCell = cell[index - numIndex*2].innerHTML;
        let upCell = cell[index - numIndex].innerHTML;
        
        if (upTopCell.match(currentStone) && upCell.match(nextStone)){
            let targetIndex = index - numIndex;
            putStone(targetIndex);
        }
    }
}

// indentify edge cell
const identifyEdgeCell = (index, numberOfIndex) => {
    let edgeCell = false;
    if(index % numberOfIndex == 0 || (index + 1) % numberOfIndex == 0 ){
        edgeCell = true; 
    }
    return edgeCell;
}
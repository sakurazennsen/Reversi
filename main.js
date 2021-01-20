//-----------------PREPARING------------------
let player = 2; 
let whiteStone = "○";
let blackStone = "●";
let currentStone = blackStone;

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
        player ++;
    } else {
        currentStone = blackStone;
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
    if(index > 2){
        let prevLeftCell = cell[index - 2].innerHTML;
        let prevCell = cell[index - 1].innerHTML;
        /// left
        // black
        if (prevLeftCell.match(blackStone) && prevCell.match(whiteStone)){
            let targetIndex = index - 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
            putStone(targetIndex);
            }
        }
        // white
        if (prevLeftCell.match(whiteStone) && prevCell.match(blackStone)){
            let targetIndex = index - 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
            putStone(targetIndex);
            }
        }
    }


    if(index < cell.length - 2){
        let nextRightCell = cell[index + 2].innerHTML;
        let nextCell = cell[index + 1].innerHTML;
        /// right
        // black
        if (nextRightCell.match(blackStone) && nextCell.match(whiteStone)){
            let targetIndex = index + 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
                putStone(targetIndex);
            }
        }
        // white
        if (nextRightCell.match(whiteStone) && nextCell.match(blackStone)){
            let targetIndex = index + 1;
            if(!identifyEdgeCell(targetIndex,numIndex)){
                putStone(targetIndex);
            }
        }
    }
    //// vertical direction
    if(index < cell.length - numIndex*2 ){
        let downBottomCell = cell[index + numIndex*2].innerHTML;
        let downCell = cell[index + numIndex].innerHTML;
        /// top to bottom
        // black
        if (downBottomCell.match(blackStone) && downCell.match(whiteStone)){
            let targetIndex = index + numIndex;
            putStone(targetIndex);
        }

        // white
        if (downBottomCell.match(whiteStone) && downCell.match(blackStone)){
            let targetIndex = index + numIndex;
            putStone(targetIndex);
        }
    }

    if(index > numIndex*2 -1 ){
        let upTopCell = cell[index - numIndex*2].innerHTML;
        let upCell = cell[index - numIndex].innerHTML;
        /// bottom to top
        // black 
        if (upTopCell.match(blackStone) && upCell.match(whiteStone)){
            let targetIndex = index - numIndex;
            putStone(targetIndex);
        }
        // white
        if (upTopCell.match(whiteStone) && upCell.match(blackStone)){
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
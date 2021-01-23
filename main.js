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

        // the case of previous cell and indexCell were same
        // if(prevCell.match(currentStone)){
        //     break;
        // }
        if (prevLeftCell.match(currentStone) && prevCell.match(nextStone)){
            let targetIndex = index - 1;
            if(!identifyEdgeCell(targetIndex)){
            putStone(targetIndex);
            }
        }
        //※There is a BUG!!!! need to modify
        // the case of there are no same stone of indexCell in the same row
        if(prevCell.match(nextStone)){
            let changeIndexList = [];
            let i = 0;
            while(prevLeftCell.match(nextStone) || !(prevLeftCell == currentStone ||  prevLeftCell == nextStone)){
                if(identifyEdgeCell(index - 1 - i)){
                    changeIndexList = [];
                    break;
                }
                changeIndexList.push(index - 1 - i);
                prevCell = cell[index - 1 - i].innerHTML;
                prevLeftCell = cell[index - 2 - i].innerHTML;
                i ++;
            }
            for(var j = 0; j<changeIndexList.length; j++){
                let targetIndex = changeIndexList[j];
                if(!identifyEdgeCell(targetIndex)){
                    putStone(targetIndex);
                }
            }
        }
    }
    
    /// right
    if(index < cell.length - 2){
        let nextRightCell = cell[index + 2].innerHTML;
        let nextCell = cell[index + 1].innerHTML;

        if (nextRightCell.match(currentStone) && nextCell.match(nextStone)){
            let targetIndex = index + 1;
            if(!identifyEdgeCell(targetIndex)){
                putStone(targetIndex);
            }
        }

        if(nextCell.match(nextStone)){
            let changeIndexList = [];
            let i = 0;
            while(nextRightCell.match(nextStone) || !(nextRightCell == currentStone ||  nextRightCell == nextStone)){

                if(identifyEdgeCell(index + 1 + i)){
                    changeIndexList = [];
                    break;
                }
                changeIndexList.push(index + 1 + i);
                nextCell = cell[index + 1 + i].innerHTML;
                nextRightCell = cell[index + 2 + i].innerHTML;
                i ++;
            }
            for(var j = 0; j<changeIndexList.length; j++){
                let targetIndex = changeIndexList[j];
                if(!identifyEdgeCell(targetIndex)){
                    putStone(targetIndex);
                }
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
const identifyEdgeCell = (index) => {
    edgeCells = [0,7,8,15,16,23,24,31,32,39,40,47,48,55,56,63]
    return edgeCells.includes(index);
}
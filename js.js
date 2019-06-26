let counter = 0,
whoWin = [],
posision = [],
idPosision = [],
boardSize = 3;

var OorX = (id, pos) => {
let item = document.querySelector(`#${id}`);
if (item.innerHTML != "☺") {
    return alert("already selected! please select a different box.");
} else {
    if (counter % 2 == 0) {
        item.innerHTML = "X";
    } else {
        item.innerHTML = "O";
    }
    posision.push(pos);
    idPosision.push(id);
}
counter++;
if (posision.length > 4) {
    endGame(posision, (counter % 2));
}
if (posision.length >= (boardSize * boardSize)) {
    alert("tai! - start again.")
    reset();
}

}

var endGame = (array, isOdd) => {
if (isOdd == 1) {
    isOdd = 0;
} else if (isOdd == 0) {
    isOdd = 1;
}

let tempArray = [],
    slant1 = [],
    slant2 = [],
    numberSelector = [];
    for (let i = 0; i < boardSize; i++) { numberSelector[i] = 0;}
for (let index = isOdd; index < array.length; index = index + 2) {
    tempArray.push(array[index]);
}
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < boardSize; i++) { numberSelector[i] = 0; }
    slant1 = [];
    slant2 = [];
    for (let i = 0; i < tempArray.length; i++) {
        let tempLoc = tempArray[i][j];
        console.log(tempArray[i][j])
numberSelector[tempLoc] += 1;
console.log(numberSelector);
        if (tempArray[i][0] == tempArray[i][1]) {
            slant1.push(tempArray[i]);
        } if (tempArray[i][0] + tempArray[i][1] == boardSize - 1) {
            slant2.push(tempArray[i]);
        }
        for (let a = 0; a < numberSelector.length; a++) {
            if (numberSelector[a] == boardSize || slant1.length == boardSize || slant2.length == boardSize) {
                if (!localStorage.record) {
                    localStorage.record = posision.length;
                } else if (localStorage.record > posision.length) {
                    localStorage.record = posision.length;
                }
                if (isOdd == 0) {
                    reset();
                    return alert("game over!  - X is the winner")
                } else {
                    reset();
                    return alert("game over! - O is the winner")
                }
            }
        }
    }
}

}
var undo = () => {
posision.pop();
idPosision.pop();
board(boardSize);
let egol = [],
    exs = [];
for (let i = 0; i < idPosision.length; i++) {
    if (i % 2 == 0) {
        exs.push(idPosision[i])
    } else {
        egol.push(idPosision[i]);
    }
    egol.forEach(id => {
        let change = document.querySelector(`#${id}`);
        change.innerHTML = "O";
    })
    exs.forEach(id => {
        let change = document.querySelector(`#${id}`);
        change.innerHTML = "X";
    })
}
counter--;
}
var record = () => alert(`the best record is: ${localStorage.record}`);
var save = () => { localStorage.setItem(`save${boardSize}`, JSON.stringify(idPosision)); localStorage.setItem(`posision${boardSize}`, JSON.stringify(posision)); }
var load = () => {
if(JSON.parse(localStorage.getItem(`posision${boardSize}`)) && JSON.parse(localStorage.getItem(`save${boardSize}`)) ){
posision = JSON.parse(localStorage.getItem(`posision${boardSize}`));
idPosision = JSON.parse(localStorage.getItem(`save${boardSize}`));
board(boardSize);
let egol = [],
    exs = [];
    counter = posision.length;
for (let i = 0; i < idPosision.length; i++) {
    if (i % 2 == 0) {
        exs.push(idPosision[i])
    } else {
        egol.push(idPosision[i]);
    }
    egol.forEach(id => {
        let change = document.querySelector(`#${id}`);
        if (change) {
            change.innerHTML = "O";
        }
    })
    exs.forEach(id => {
        let change = document.querySelector(`#${id}`);
        if (change) {
            change.innerHTML = "X";
        }
    })
}
}
else{
return alert(`Ther is no game saved. please save firt!`)
}
}
var reset = () => {
posision = [];
idPosision = [];
counter = 0;
board(boardSize)
}
var newBoard = () => {
boardSize = prompt("Please enter size board");
board(boardSize);
}
var board = (size) => {
tempCounter = 0;
if (size >= 3) {
    let item = document.querySelector(".row"),
        col = 100 / size;
    item.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            item.innerHTML += `<li id="item${tempCounter}" style="width: ${col}%" class="btn-outline-warning border border-danger item" onclick="OorX(id, [${i}, ${j}])">☺</li>`
            tempCounter++;
        }

    }

}
}
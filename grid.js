const SIZE = 3;
let Grid;
let val  = 0;

$(document).ready(function() {
    setUpGrid();
    play();   
});

function setUpGrid() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            let $cell = $("<button>", { class: "cell", id: "cell-" + i + "-" + j });
            $(".Grid").append($cell);
            $("#cell-" + i + "-" + j).append($("<p>"));
        }
    }

    Grid = new Array(SIZE);

    for (let i = 0; i < SIZE; i++) {
        Grid[i] = new Array(SIZE).fill(-1);
    }  
}

function play() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            $("#cell-" + i + "-" + j).click(() => {
                update(i, j);
            });
        }
    }
    
}

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function update(i, j) {
    if(Grid[i][j] !== -1) return;
    Grid[i][j] = val++ % 2;
    if(Grid[i][j] === 1){
             $("#cell-" + i + "-" + j + " p").text("O");
    } else 
    if(Grid[i][j] === 0) {
            $("#cell-" + i + "-" + j + " p").text("X");
    }
    let winner  = ckeckWinner();
    if( winner != -1){ 
        let text = winner? "O":"X";
        $("#title").text("Player '" + text + "' won");
        $("#title").css("color", "#472D30");
    } 
}

function ckeckWinner() {
    for(let w of win) {
        const [a, b, c] = w;
        if(Grid[Math.floor(a / SIZE)][a % SIZE] === Grid[Math.floor(b / SIZE)][b % SIZE]
            && 
           Grid[Math.floor(a / SIZE)][a % SIZE] === Grid[Math.floor(c / SIZE)][c % SIZE]
           &&
           Grid[Math.floor(a / SIZE)][a % SIZE] !== -1){
            return Grid[Math.floor(a / SIZE)][a % SIZE];
        }
    }
    return -1;
}


$("#reset").click(() => {
        $("#title").text("TIC TAC TOE");
        $("#title").css("color", "#E26D5C");
        $(".Grid *").remove();
         val = 0;
         setUpGrid();
         play();
    });
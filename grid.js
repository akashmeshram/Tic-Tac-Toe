const SIZE = 9;
let Grid;
let val  = 0;

$(document).ready(function() {
    setUpGrid();
    play();   
});

function setUpGrid() {
    for (let i = 0; i < SIZE; i++) {
            let $cell = $("<button>", { class: "cell", id: "cell-" + i});
            $(".Grid").append($cell);
            $("#cell-" + i).append($("<p>"));
    }
    Grid = new Array(SIZE).fill(-1);
}

function play() {
    for (let i = 0; i < SIZE; i++) {
        $("#cell-" + i).click(() => {
            update(i);
        });        
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

function update(i) {
    if(Grid[i] !== -1) return;
    Grid[i] = val++ % 2;
    if(Grid[i] === 1){
             $("#cell-" + i + " p").text("O");
    } else 
    if(Grid[i] === 0) {
            $("#cell-" + i + " p").text("X");
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
        if(Grid[a] === Grid[b] && Grid[a] === Grid[c] && Grid[a] !== -1){
            return Grid[a];
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
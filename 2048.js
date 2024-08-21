
var board;
var score = 0;
var rows = 4;
var columns = 4;


function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

  /*board = [
        [2, 2, 4, 4],
        [2, 2, 4, 4],
        [2, 2, 4, 4],
        [2, 2, 4, 4]
    ]*/

    for(let r = 0;r < rows;r++){
        for(let c=0;c < columns;c++){

            let tile=document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();

}

function hasEmptyTile(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c] == 0 ){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        if (checkGameOver()) {
            const audio = new Audio();
            audio.src = "audio/Game over sound effect [TubeRipper (mp3cut.net).mp3";

            audio.addEventListener('canplaythrough', function () {
                audio.play().catch(error => {
                    console.log("Audio playback failed:", error);
                });
            });
            setTimeout(() => {
                alert("Game Over!");

                setTimeout(() => {
                    if(confirm("New Game?")){
                        resetGame();
                    }
                }, 100);//100 delay for the second alert
            }, 100); // 100ms delay
        }
        return;
    }

    // Collect all empty tiles
    let emptyTiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r: r, c: c });
            }
        }
    }

    // Choose a random empty tile
    let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[randomTile.r][randomTile.c] = 2;
    let tile = document.getElementById(randomTile.r.toString() + "-" + randomTile.c.toString());
    tile.innerText = "2";
    tile.classList.add("x2");

    
}


function updateTile(tile,num){
    tile.innerText = "";
    tile.classList.value = "";//clear the classlist
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText=num;
        if(num<=4096){
            tile.classList.add("x"+num.toString());
        }else{
            tile.classList.add("x8192");   
        }
    }
}

function resetGame(){
    score=0;
    document.getElementById("score").innerText=score;

    const boardElement = document.getElementById("board");
    document.getElementById("board").innerHTML="";


    setGame();
}

document.addEventListener("keyup",(e)=>{
    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num=>num!=0);//create a new array without zeros
}

function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row); //->[2, 2, 2
    
    //slide
    for(let i=0;i<row.length;i++){
        if(row[i] === row[i+1] && row[i]!==0){
            row[i] *= 2;
            score += row[i];
            row[i+1] = 0;
            i++;
        }    //[2, 2, 2] -> [4, 0, 2]
    }

    row = filterZero(row); //[4,2]

    while (row.length < columns){
        row.push(0);
    }//[4, 2, 0, 0]

    return row;
}



function slideLeft() {
    const audio =new Audio();
    audio.src="audio/converted.mp3";

    audio.addEventListener('canplaythrough', function() {
        audio.play().catch(error => {
            console.log("Audio playback failed:",error);
        });
    });

    for(let r=0;r<rows;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row; 

        for(let c=0;c< columns;c++){
            let tile=document.getElementById(r.toString() + "-" + c.toString());
            let num =board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight() {
    const audio =new Audio();
    audio.src="audio/converted.mp3";

    audio.addEventListener('canplaythrough', function() {
        audio.play().catch(error => {
            console.log("Audio playback failed:",error);
        });
    });

    for(let r=0;r<rows;r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row; 

        for(let c=0;c< columns;c++){
            let tile=document.getElementById(r.toString() + "-" + c.toString());
            let num =board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    const audio =new Audio();
    audio.src="audio/converted.mp3";

    audio.addEventListener('canplaythrough', function() {
        audio.play().catch(error => {
            console.log("Audio playback failed:",error);
        });
    });

    for(let c=0;c<columns;c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]];
        row =slide(row);
      /*board[0][c]=row[0];
        board[1][c]=row[1];
        board[2][c]=row[2];
        board[3][c]=row[3];*/

        for(let r=0;r< rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString() + "-" + c.toString());
            let num =board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    const audio =new Audio();
    audio.src="audio/converted.mp3";

    audio.addEventListener('canplaythrough', function() {
        audio.play().catch(error => {
            console.log("Audio playback failed:",error);
        });
    });

    for(let c=0;c<columns;c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]];
        row.reverse();
        row =slide(row);
        row.reverse();
      /*board[0][c]=row[0];
        board[1][c]=row[1];
        board[2][c]=row[2];
        board[3][c]=row[3];*/

        for(let r=0;r< rows;r++){
            board[r][c]=row[r];
            let tile=document.getElementById(r.toString() + "-" + c.toString());
            let num =board[r][c];
            updateTile(tile,num);
        }
    }
}

function checkGameOver() {
    if (hasEmptyTile()) {
        return false;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Check if adjacent tiles horizontally are the same
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return false;
            }
            // Check if adjacent tiles vertically are the same
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }
    return true;
}

function restartGame(){
    if(document.getElementById("resetImage")){
        score=0;
        document.getElementById("score").innerText=score;

        const boardElement = document.getElementById("board");
        document.getElementById("board").innerHTML="";


        setGame();
    }
}
window.onload = function() {
    setGame();

    document.getElementById("resetImage").addEventListener("click", restartGame);
};
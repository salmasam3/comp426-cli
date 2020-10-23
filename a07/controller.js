$(document).ready(() => {
    const $board = $("#grid-container");
    let game = new Game(4);
    updateBoardView($board, game);
    game.onMove(() => $());
    $("#restart-button").on("click", () => {
      game.setupNewGame();
      updateBoardView($board, game);
      $("#win").addClass("hidden");
      $("#lose").addClass("hidden");
    });
    game.onWin(() => {
      $("#win").removeClass("hidden");
    });
    game.onLose(() => {
      $("#lose").removeClass("hidden");
    });  
    $(document).keydown(function(e) {
      switch (e.keyCode) {
        case 65:
        case 37:
          game.move("left");
        break;

        case 87:
        case 38:
          game.move("up");
        break;

        case 68:
        case 39:
          game.move("right");
        break;
        
        case 83:
        case 40:  
          game.move("down");
        break;
      }
      updateBoardView($board, game);
    });
  });
  
  let updateBoardView = ($board, game) => {
    $board.empty();
    let $board_table = $("<table></table>");
    let index = 0;
    for (let y = 0; y < 4; y++) {
      let row = $("<tr></tr>");
      for (let x = 0; x < 4; x++) {
        let spot = game.gameState.board[index];
        let spot_div = $(`<div class='spot value${spot}'></div>`);
        index++;
        spot_div.append(`<h1>${spot != 0 ? spot : ""} </h1>`);
        row.append($("<td></td>").append(spot_div));
      }
      $board_table.append(row);
    }
    $board.append($board_table);
    $(".score-container").text(`${game.gameState.score}`);
  };
  

class Game {
    constructor(size){
        this.size = size;
        this.callOnMove = [];
        this.callOnWin = [];
        this.callOnLose = [];
        this.checkAvailMoves = false;
        this.gameState = {
            board: new Array(size*size).fill(0),
            score: 0,
            won: false,
            over: false
        };
        this.setupNewGame();
    }
    setupNewGame() {
        this.tiles = this.makeNewArray(this.size,this.size,null);
        this.gameState = {
            board: new Array(this.size*this.size).fill(0),
            score: 0,
            won: false,
            over: false
        };
        this.addNewTile();
        this.addNewTile();
        this.update();
    }
    loadGame(gameState){
        this.gameState = gameState;
    }
    move(direction) {
        this.tiles = this.makeArray(this.size,this.size,null);
        if(this.gameState.over) {
            return false;
        }
        let countDown;
        let yI;
        let xI;
        switch(direction) {
            case "up":
                countDown = 0;
                yI = -1;
                xI = 0;
                break;
            case "down":
                countDown = this.size*this.size-1;
                yI = 1;
                xI = 0;
                break;
            case "left":
                countDown = 0;
                yI = 0;
                xI = -1;
                break;
            case "right":
                countDown = this.size*this.size-1;
                yI = 0;
                xI = 1;
                break;
        }
        let moved = false;
        for(let i = 0;i<this.size*this.size;i++) {
            let n = Math.abs(countDown - i);
            let row = Math.floor(n/this.size);
            let col = n % this.size;

            if(this.tiles[row][col] === null) {
                continue;
            }

            let nextRow = row + yI;
            let nextCol = col + xI;

            while(nextRow >= 0 && 
                nextRow < this.size && 
                nextCol >= 0 && 
                nextCol < this.size) {
                let next = this.tiles[nextRow][nextCol];
                let current = this.tiles[row][col];
                if(next === null) {
                    if(this.checkAvailMoves) {
                        return true;
                    }
                    this.tiles[nextRow][nextCol] = current;
                    this.tiles[row][col] = null;
                    row = nextRow;
                    col = nextCol;
                    nextRow += yI;
                    nextCol += xI;
                    moved = true;
                } else if(next.canMergeWith(current)) {
                    if(this.checkAvailMoves) {
                        return true;
                    } 
                    let value = next.mergeWith(current);
                    this.gameState.score += value;
                    this.tiles[row][col] = null;
                    moved = true;
                    break;
                } else {
                    break;
                }
            }
        }
        if(moved) {
            this.addNewTile();
            this.update();
            if(this.callOnMove.length > 0) {
                this.callOnMove.forEach(x => x(this.gameState));
            }
        }
        

        this.clearMerged();
        return moved;
        
    }
    toString() {
        let string = "";
        for(let i = 0; i < this.gameState.board.length; i++) {
            if(i % this.size == 0) {
                string += "\n";
            }
            string += this.gameState.board[i] + " ";
        }
        string += "\n\n";
        string += "Score: " + this.gameState.score + "\n";
        string += "Won: " + this.gameState.won + "\n";
        string += "Over: " + this.gameState.over + "\n";
        return string;    
    }
    onMove(callback) {
        this.callOnMove.push(callback);
    }
    onWin(callback) {
        this.callOnWin.push(callback);
    }
    onLose(callback) {
        this.callOnLose.push(callback);
    }
    getGameState(){
        return this.gameState;
    }
    clearMerged() {
        for (let i = 0; i < this.tiles.length; i++) {
          for (let j = 0; j < this.tiles[i].length; j++) {
            if (this.tiles[i][j] != null) {
              this.tiles[i][j].setMerged(false);
            }
          }
        }
    }
    makeArray(w,h,hold){
        let index = 0;
        let array = [];
        for(let i = 0; i < h; i++) {
            array[i] = [];
            for(let x = 0; x < w;x++) {
                if(this.gameState.board[index] == 0){
                    array[i][x] = hold;
                } else {
                    array[i][x]= new Tile(this.gameState.board[index]);
                }
                index++;
            }
        }
        return array;

    }
    makeNewArray(w,h,hold) {
        let array = [];
        for(let i = 0; i < h; i++){
            array[i] = [];
            for(let x = 0; x < w;x++) {
                array[i][x] = hold;
            } 
        }
        return array;
    }
    addNewTile() {
        let position = Math.floor(Math.random() * this.size * this.size);
        let col;
        let row;
        do {
            position = (position + 1) % (this.size * this.size);
            row = Math.floor(position / this.size);
            col = position % this.size;
        } while(this.tiles[row][col] != null);
        let value = Math.random() < 0.9 ? 2:4;
        this.tiles[row][col] = new Tile(value);
    }
    update() {
        let array = [].concat.apply([],this.tiles);
        this.gameState.board = array.map(x => {
            return x==null ? 0: x.value;
        });
        if(this.gameState.board.some(x => x===2048)) {
            if(this.callOnWin.length > 0){
                this.callOnWin.forEach(x => x(this.gameState));
            }
            this.gameState.won = true;
        }
        if(!this.movesAvailable()) {
            this.gameState.over = true;
            if(this.callOnLose.length > 0) {
                this.callOnLose.forEach(x =>x(this.gameState));
            }
        }
    }
    movesAvailable(){
        this.checkAvailMoves = true;
        let hasMoves = 
            this.move("left") ||
            this.move("right") ||
            this.move("up") ||
            this.move("down");
        this.checkAvailMoves = false;
        return hasMoves;
    }

}

class Tile {
    constructor(value) {
        this.value = value;
        this.merged = false;
    }
    setMerged(merged) {
        this.merged = merged;
    }
    canMergeWith(tile) {
        return(
            !this.merged &&
            tile != null &&
            !tile.merged &&
            this.value == tile.value
        );
    }
    mergeWith(tile) {
        if(this.canMergeWith(tile)) {
            this.value += tile.value;
            this.merged = true;
            return this.value;
        }
        return -1;
    }
}
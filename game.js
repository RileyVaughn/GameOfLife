'strict'

class GameOfLife {
    
    constructor(start = [[10,10],[11,10],[12,11],[10,11],[13,11]]) {
        
        this.board = new Board(window.innerHeight,2);
        
        this.alive = this.InitArray();
        this.recentDead = this.InitArray();
        
        for (let i = 0; i < start.length; i++){
            this.alive[start[i][0]][start[i][1]] = 1;
        }
        
        this.DrawBoard();
    }
    
    
    InitArray() {
        let array = [];
        for (let i = 0; i < this.board.height; i++){
            let temp = [];
            for (let j = 0; j < this.board.width; j++) {
                temp.push(0);
            }
            
            array.push(temp);
        }   
        return array;
    }
    
    
    DrawBoard() {
        
        this.board.SetBoardDead();
        
        for (let i = 0; i < this.board.height; i++) {
            for (let j = 0; j < this.board.width; j++) {
                if (this.alive[i][j] == 1) {
                    this.board.LiveCell(j,i);
                }
                else if (this.recentDead[i][j] == 1) {
                    this.board.RecentDead(j,i);
                }
            }
        }
    }
    
    
    NextRound(checkRecent) {
    
        let nextAlive = this.InitArray();
        this.recentDead = this.InitArray();
        
        for (let i = 0; i < this.board.height; i++) {
            for (let j = 0; j < this.board.width; j++) {
                let live = this.CheckNeighbors(i,j);
                if(live < 2 || live > 3){
                    if (checkRecent && this.alive[i][j] == 1) {
                        this.recentDead[i][j] = 1;
                        
                    }
                    nextAlive[i][j] = 0;
                }
                else if (live == 3){
                    nextAlive[i][j] = 1;
                }
                else {
                    nextAlive[i][j] = this.alive[i][j];
                }
                
            }
        } 
        
        
        this.alive = nextAlive;
        
    }
    
    
    CheckNeighbors(x,y) {
        let live = 0;
        let xLess = x+1 < this.board.height;
        let xGreat = x-1 >= 0;
        let yLess = y+1 < this.board.width;
        let yGreat = y-1 >= 0;
        
        
        
        
        if(xLess && this.alive[x+1][y] == 1){
            live++;
        }
        if(xGreat && this.alive[x-1][y] == 1){
            live++;
        }
        if(yLess && this.alive[x][y+1] == 1){
            live++;
        }
        if(yGreat && this.alive[x][y-1] == 1){
            live++;
        }
        if(yGreat && xGreat && this.alive[x-1][y-1] == 1){
            live++;
        }
        if(yGreat && xLess && this.alive[x+1][y-1] == 1){
            live++;
        }
        if(yLess && xGreat && this.alive[x-1][y+1] == 1){
            live++;
        }
        if(yLess && xLess && this.alive[x+1][y+1] == 1){
            live++;
        }
        return live;
        
    }
    
    
    PlayGame(colorRecent) {
        
        this.ExtraRandom();
        this.NextRound(colorRecent);
        this.DrawBoard();
        
        setTimeout(this.PlayGame.bind(this,colorRecent),30);
        
    }
    
    
    ExtraRandom() {
        
        let randX = Math.floor(Math.random()*this.board.height);
        let randY = Math.floor(Math.random()*this.board.width);
        this.alive[randX][randY] = 1;
    }
    
    
    RandomizeBoard() {
        
        for (let i = 0; i < this.board.width; i++) {
            for (let j = 0; j < this.board.height; j++) {
                if (Math.floor(Math.random()+.1)) {
                    this.alive[j][i] = 1;
                }
                else {
                    this.alive[j][i] = 0;
                }
            }
        }
    }
    
}

let game = new GameOfLife();
game.RandomizeBoard();
game.PlayGame(true);

'strict'

class Board {
    
    constructor (boardHeight,cellSize) {
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = boardHeight;
        document.body.appendChild(this.canvas);
    
        this.cellSize = cellSize;
        this.height = this.canvas.height/ cellSize;
        this.width = this.canvas.width/ cellSize;
        
        
    }
    
    
    LiveCell(x,y) {
        
        this.ctx.fillStyle = "hsl(120,100%,30%)";
        
        this.ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
        
    }
   
    
    DeadCell(x,y) {
        
        this.ctx.fillStyle = "hsl(240,100%,5%)";
        
        this.ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
        
    }
    
    
    RecentDead(x,y) {
        
        this.ctx.fillStyle =  "hsl(120,60%,60%)";
        
        this.ctx.fillRect(x*this.cellSize,y*this.cellSize,this.cellSize,this.cellSize);
        
    }
    
    SetBoardDead() {
        this.ctx.fillStyle = "hsl(240,100%,5%)";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    }
    

}




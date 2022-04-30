class BoardManager {
    constructor(g) {
        this.g = g;
        this.tileWidth = 110;
        this.tileHeight = 110;

        this.boardWidth = 7;
        this.boardHeight = 7;
        this.boardTileList = []

        for (let x = 0; x < this.boardWidth; x++) {
            for (let y = 0; y < this.boardHeight; y++) {
                this.boardTileList.push(new BoardTile(x,y,x*this.tileWidth,y*this.tileHeight));
            }
        }

        this.handTileList = []

        for (let i = 0; i < 7; i++) {
            this.handTileList.push(new Tile(i*this.tileWidth,700));
        }
    }
    GetBoardSquares() {
        return this.boardTileList;
    }
    GetHandPieces() {
        return this.handTileList.map(th => th.piece).filter(t => t !== null);
    }
    AddPieceToHand(piece) {
        this.handTileList.filter(x => x.piece === null)[0].AddPiece(piece);
    }
    GetSquares(){
        return this.boardTileList;
    }
    PlacePiecesInHand(pieces){
        pieces.forEach(t => {
            if (t.currentTile !== null) 
            {
                t.currentTile.ClearTile();
            }
            this.handTileList.filter(x => x.piece === null)[0].AddPiece(t)
        })
    }

    isPointInsideTile(x, y){
        return this.boardTileList.concat(this.handTileList).filter(d => 
            x >= d.x- this.tileWidth / 2 && 
            x <= d.x+ this.tileWidth / 2 &&
            y >= d.y- this.tileHeight / 2 && 
            y <= d.y+ this.tileHeight / 2
            )[0];
    }

    colorInvalidMove(tilestocolor){
        this.boardTileRects 
            .filter(d => tilestocolor.some(t => t.id === d.id))
            .transition()
            .duration(200)
            .attr('fill','red')
            .transition()
            .duration(500)
            .attr('fill','green')
        
        
        
        
        //this.currentStatusMessage.msg = response.msg;
        //this.statusMsg.interrupt()
        //this.statusMsg
        //    .style('opacity', 1)
        //    .transition()
        //    .duration(5000)
        //    .style('opacity', 0)
    }

    draw(){
        var g = this.g;


        var boardTileList = this.boardTileList;
        boardTileList.forEach((d,i) => d.id = i);

        var percentage = window.percentage
        
        this.boardTileRects = g
           .selectAll('.square')
           .data(boardTileList, d => d.id)
           .join(
               enter => enter
                   .append('rect')
                   .attr('class', 'square')
                   .attr('x', d => `${(100-percentage - percentage/this.boardWidth)/2 + (percentage*(d.boardX/(this.boardWidth-1)))}%`)
                   .attr('y', d => `${5+percentage*(d.boardY/(this.boardHeight-1))}%`)
                   .attr('width', `${percentage/this.boardWidth}%`)
                   .attr('height', `${percentage/this.boardWidth}%`)
                   .attr('fill', 'green')
                   .style('stroke-width', 2)
                   .style('stroke', 'black')
                   .on('click', (d) => window.gameManager.ClickTile(d)),
                   
           )

    }
}

class Tile {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.piece = null;
    }
    AddPiece(piece) {
        this.piece = piece;
        piece.x = this.x;
        piece.y = this.y;
        console.log(piece.x)
        piece.currentTile = this;
    }
    ClearTile() {
        this.piece.currentTile = null;
        this.piece = null;
    }
}

class BoardTile extends Tile {
    constructor(boardX, boardY, x,y) {
        super(x,y)
        this.boardX = boardX;
        this.boardY = boardY;
    }
}
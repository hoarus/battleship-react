class GameBoard {
  constructor(){
    this.length = 10;
    this.board = this.createCleanBoard();
    this.ships = [];
    this.shotsReceived = 0;
  }

  // Value of 0 = empty; 1 = miss; 2 = hit;

  createCleanBoard(){
    let board = [];
    for (let i = 0; i < this.length; i++ ) {
      let row = [];
      for (let j = 0; j < this.length; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  }

  // Display and return actual board positions based upon coordinations

  display(){
    return this.board;
  }

  lookupPosition(coordinates){
    let pos = this.convertPosition(coordinates);
    return this.board[pos[0]][pos[1]];
  }

  convertPosition(coordinates){
    let x = convertXPosition(coordinates[0]);
    let y = Number(coordinates[1]) - 1;
    return [y, x]

    function convertXPosition(x){
      let position = x.toUpperCase();
      return position.charCodeAt(0) - 65;
    }
  }

  updatePosition(pos, newValue){
    this.board[pos[0]][pos[1]] = newValue;
  }

  // Place Ships

  placeShip(ship, position, orientation){
    let pos = this.convertPosition(position);
    // Break function if not a possible move
    if (!isPlacementPossible()) {
      return "Impossible Move";
    }

    (this.ships).push(ship);

    for (let i = 0; i < ship.length; i++) {
      this.updatePosition(pos, ship);
      orientation == "x" ? pos[1] += 1 : pos[0] += 1;
      console.log(pos);
    }


    function isPlacementPossible(){
      if (orientation == "x") {
        return (pos[1] + ship.length < 10);
      } else  {
        return (pos[0] + ship.length < 10);
      }
    }
  }

  // Attacking

  receiveAttack(coordinates){
    let pos = this.convertPosition(coordinates);
    let target = this.lookupPosition(coordinates);
    // Bounce back illegal attacks
    if (target == 1 || target== 2) {
      return "Error"
    }
    if (typeof target == "object"){
      hitShip();
      this.updatePosition(pos, 2);
    } else {
      this.updatePosition(pos, 1);
    }

    // Update shots received
    this.shotsReceived += 1;

    // Returns target so that calling method can test whether the ship is sunk for hits
    return target;

    function hitShip(){
      target.hit();
    }
  }

  // All Ships Sunk?
  allShipsSunk(){
   return this.ships.every((ship) => ship.isSunk() == true )

  }

  totalHitsRemaining(){
    let totalHealh = 0;
    return this.ships.reduce((health, ship) => health + ship.getHealth(), 0);
  }

  totalShotsReceived(){
    return this.shotsReceived
  }

}

export { GameBoard }

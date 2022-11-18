
class Player {
  constructor(name = "AI") {
    this.name = name;
    this.allShots = [];
    this.mostRecentTarget = "";
    this.identifiedShip = false;
    this.identifiedShipOrientation = false;
  }

  getName() {
    return this.name;
  }

  set myGameBoard(gameboard) {
    this.myGameboard = gameboard;
  }

  get myGameBoard() {
    return this.myGameboard;
  }

  set enemyGameBoard(gameboard) {
    this.enemyGameboard = gameboard;
  }

  get enemyGameBoard() {
    return this.enemyGameboard;
  }

  fireShot(coordinates){
    let target = this.enemyGameBoard.receiveAttack(coordinates)
    this.mostRecentTarget = target;
    // Save location of ship if a hit
    if (this.identifiedShip === false && typeof target == "object") {
      this.identifiedShip = coordinates;
    }
    // Save shot
    this.allShots.push(coordinates);
    this.saveShipOrientationIfKnown();
    return target
  }

  saveShipOrientationIfKnown(){
    if (this.identifiedShip && this.allShots.length >= 2) {
      // Get two most recent shots
      let arrayLength = this.allShots.length
      let shotOne = this.allShots[arrayLength - 2];
      let shotTwo = this.allShots[arrayLength - 1];
      // Determine Axis
      if (shotOne[0] == shotTwo[0]) {
        // If letter is the same, it is y-axis. 
        this.identifiedShipOrientation = "y"
      } else if (shotOne[1] == shotTwo[1]) {
        //If the number is the same, it is X-axis.
        this.identifiedShipOrientation = "x"
      } else {
        this.identifiedShipOrientation = false;
      }
    }
  }

  aiTurn(){
    let coordinates;
      do {
        if (this.identifiedShipOrientation){
          coordinates = fireOnAxis(this.identifiedShip, this.allShots[this.allShots.length - 1], this.identifiedShipOrientation, this.mostRecentTarget);
        } else if (typeof this.mostRecentTarget == "object") { //If ship hit
          coordinates = generateAdjacentShot(this.allShots[this.allShots.length - 1]);
        } else if (this.identifiedShip) { 
          // If identified ship has not been sunk, fire adjacent to it
          coordinates = generateAdjacentShot(this.identifiedShip);
        } else {
          coordinates = generateRandomCoordinates();
        }
      } while (this.allShots.includes(coordinates));
        // Keep generating if this shot has already been fired
    
    this.fireShot(coordinates)

    function fireOnAxis(originalShot, previousShot, orientation, mostRecentTarget){
      // Need to make sure I don't fire again in the same shot
      let direction;
      let coordinates;

      // Determine direction of next shot
      if (orientation == "x") {
        if (previousShot.charCodeAt(0) > originalShot.charCodeAt(0)) {
          if ((typeof mostRecentTarget == "object")) {
            direction = "Right";
          } else {
            direction = "Left"; 
          }
        } else {
          if ((typeof mostRecentTarget == "object")) {
            direction = "Left";
          } else {
            direction = "Right";
          }
        }
      };
      if (orientation == "y") {
        if (previousShot.substring(1) > originalShot.substring(1)) {
          if ((typeof mostRecentTarget == "object")) {
            direction = "Down";
          } else {
            direction = "Up";
          }
        } else {
          if ((typeof mostRecentTarget == "object")) {
            direction = "Up";
          } else {
            direction = "Down";
          }
        }
      }
      let baseShot;
      if (typeof mostRecentTarget == "object"){
        baseShot = previousShot;
      } else {
        baseShot = originalShot;
      }
      let x = baseShot[0];
      let y = Number(baseShot.substring(1));
      let xChar = x.charCodeAt(0);
      // If last shot was a miss, reverse direction starting at original shot
        //Base shot = identifiedShip
        //Direction = reverse

      // If last shot was a hit, continue current direction
        //Base shot = last 
        //Direction = same
      switch(direction){
        case "Right":
          xChar += 1;
          x = String.fromCharCode(xChar);
          break;
        case "Left":
          xChar -= 1;
          x = String.fromCharCode(xChar);
          break;
        case "Up":
          y -= 1;
          break
        case "Down":
          y += 1;
          break;
        default:
          break;
      }
      coordinates = (x).concat(y);
      return coordinates;
    }

    function generateRandomCoordinates(){
      let x = String.fromCharCode(randomCoordinate() + 65);
      let y = randomCoordinate() + 1;
      let coordinates = x.concat(y);
      return coordinates;

      function randomCoordinate(){
        return Math.floor(Math.random() * 10);
      }
    }

    function generateAdjacentShot(previousShot){
      let illegalMove = true;
      // Generate a number between 1 & 4
      let coordinates;
      while (illegalMove) {
        let x = previousShot[0];
        let y = Number(previousShot.substring(1));
        let xChar = x.charCodeAt(0);
        let randomNumber = Math.floor((Math.random() * 10)/ 2.5) + 1;
        switch(randomNumber) {
          case 1:
            y +=1;
            break;
          case 2:
            y -=1;
            break
          case 3:
            xChar += 1;
            x = String.fromCharCode(xChar);
            break;
          case 4:
            xChar -= 1;
            x = String.fromCharCode(xChar);
            break;
          default:
            break;
        }
        coordinates = (x).concat(y);
        illegalMove = (coordinates.charCodeAt(0) < 65) || (coordinates.charCodeAt(0) > 74) || Number(coordinates.substring(1)) < 1 || Number(coordinates.substring(1)) > 10;
          // Loops to ensure a legal move.
      } 
      return coordinates;

    }
  }





}



export { Player }


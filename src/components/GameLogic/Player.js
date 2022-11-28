
class Player {
  constructor(name = "AI") {
    this.name = name;
    this.allShots = [];
    this.mostRecentTarget = "";
    this.identifiedShip = false;
    this.identifiedShipCoordinates = "";
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
    console.log("START SHOT");
    let target = this.enemyGameBoard.receiveAttack(coordinates)
    // Save shot
    this.allShots.push(coordinates);
    this.mostRecentTarget = target;
    console.log(`target is ${target}`);
    console.log(`coordinates is ${coordinates}`);
    console.log(`allshots is ${this.allShots}`);
    this.updateAIValues(target, coordinates);
    console.log("FINISHED SHOT");
    return target
  }

  updateAIValues(target, coordinates) {
    if ((this.identifiedShip === false && typeof target == "object") || ((target !== this.identifiedShip && typeof target == "object")) ) {
      // Save location of ship if a hit and no identified ship
      this.identifiedShipCoordinates = coordinates;
      this.identifiedShip = target;
      console.log("IdentifyShip")
    } 
    if (typeof target == "object") {
      // Save ship oritentation
      this.saveShipOrientationIfKnown();
      if (target.isSunk() === true) {
        // Clear values
        console.log("CLEAR VALUES")
        this.identifiedShip = false;
        this.identifiedShipCoordinates = "";
        this.identifiedShipOrientation = false;
      }
    };
  }

  saveShipOrientationIfKnown(){
    if (this.identifiedShip && this.allShots.length >= 2) {
      // Get two most recent shots
      let arrayLength = this.allShots.length
      let shotOne = this.identifiedShipCoordinates;
      let shotTwo = this.allShots[arrayLength - 1];
      if (shotOne == shotTwo) {
        return
      }
      else if (shotOne[0] == shotTwo[0]) {
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
          console.log("1");
          coordinates = fireOnAxis(this.identifiedShipCoordinates, this.allShots[this.allShots.length - 1], this.identifiedShipOrientation, this.mostRecentTarget, this.allShots);
        } else if (this.identifiedShip) { 
          // If identified ship has not been sunk, fire adjacent to it
          console.log("3");
          coordinates = generateAdjacentShot(this.identifiedShipCoordinates, this.allShots);
        } else {
          console.log("4");
          coordinates = generateRandomCoordinates();
        }
      } while (this.allShots.includes(coordinates));
        // Keep generating if this shot has already been fired
    
    

    return [this.fireShot(coordinates), coordinates];

    function isIllegalMove(coordinates, allShots){
      if (allShots.includes(coordinates)) {
        return true;
      } else {
        return (coordinates.charCodeAt(0) < 65) || (coordinates.charCodeAt(0) > 74) || Number(coordinates.substring(1)) < 1 || Number(coordinates.substring(1)) > 10;
      }
    }

    function fireOnAxis(originalShot, previousShot, orientation, mostRecentTarget, allShots){
      let determineDirection = function (orientation, previousShot, originalShot) {
        if (orientation == "x") {
          if (previousShot.charCodeAt(0) > originalShot.charCodeAt(0)) {
              return "Right";
            } else {
              return "Left"; 
            }
          } else if (orientation == "y") {
          if (previousShot.substring(1) > originalShot.substring(1)) {
              return "Down";
            } else {
              return "Up";
            }
          }
      }
      let reverseDirection = function(direction) {
        switch(direction){
          case "Right":
            return "Left";
          case "Left":
            return "Right"
          case "Up":
            return "Down";
          case "Down":
            return "Up";
          default:
            break;
        }
      }
      let determineBaseShot = function(previousShot, originalShot, direction) {
        let previousShotSuccessful = (typeof mostRecentTarget == "object");
        if (previousShotSuccessful){
          return [previousShot, direction];
        } else {
          return [originalShot, reverseDirection(direction)]
        }
      }

      let determineNewCoordinates = function(baseShot, direction) {
        let x = baseShot[0];
        let y = Number(baseShot.substring(1));
        let xChar = x.charCodeAt(0);       
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
        return (x).concat(y);
      }

      let originalDirection = determineDirection(orientation, previousShot, originalShot);
      let [baseShot, direction] = determineBaseShot(previousShot, originalShot, originalDirection);
      let coordinates = determineNewCoordinates(baseShot, direction);
      if (isIllegalMove(coordinates, allShots)) {
        console.log("illegal");
        console.log(coordinates);
        console.log(allShots);
        coordinates = determineNewCoordinates(originalShot, reverseDirection(direction));
      }
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



    function generateAdjacentShot(previousShot, allShots){
      let illegalMove = true;
      // Generate a number between 1 & 4
      let coordinates;
      let counter = 0;
      while (illegalMove && counter < 30) {
        counter += 1;
        console.log("illegal adjacent shot");
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
        illegalMove = isIllegalMove(coordinates, allShots);
      } 
      return coordinates;

    }
  }

  aiPlaceShip(ship){
    let placementResult = "";
    do {
      let randY = String.fromCharCode(Math.floor(Math.random() * 10) + 65);
      let randX = Math.floor(Math.random() * 10) + 1;
      const coordinates = `${randY}${randX}`
      let orientation = "x";
      if (Math.random() > 0.5) {
        orientation = "y"
      };
        placementResult = this.myGameBoard.placeShip(ship, coordinates, orientation)
      }
      while (placementResult == "Illegal Move");
  }
}



export { Player }


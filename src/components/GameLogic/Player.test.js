import { Ship } from './Ship';
import { GameBoard } from './GameBoard';
import { Player } from './Player';

test('player can input name', () => {
  let player = new Player("Sam");
  expect(player.getName()).toEqual("Sam");
}); 

test('player is AI if no name provided', () => {
  let player = new Player();
  expect(player.getName()).toEqual("AI");
}); 


test('player can access its own gameboard', () => {
  let player = new Player();
  let myGameBoard = new GameBoard ();
  player.myGameBoard = myGameBoard;
  expect(player.myGameBoard).toEqual(myGameBoard);
}); 

test('player can access its enemy gameboard', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  expect(player.enemyGameBoard).toEqual(enemyGameBoard);
}); 


test('player can accept ships', () => {
  let player = new Player();
  let startingShips = {
    Destroyer: (new Ship(2)),
    Submarine: (new Ship(3)),
    Cruiser: (new Ship(3)),
    Battleship: (new Ship(4)),
    Carrier: (new Ship(5)),
  }
  player.availableShips = startingShips;
  expect(player.availableShips).toEqual(startingShips);
}); 

test('player can fire shot at enemy gameboard', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  player.fireShot("C1");
  expect(enemyGameBoard.lookupPosition("C1")).toBe(1);
}); 

test('player records all shots fired', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  player.fireShot("C1");
  player.fireShot("C2");
  player.fireShot("C3");
  expect(player.allShots).toEqual(["C1", "C2", "C3"]);
}); 

test('player firing shot at enemy ship returns object', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  let ship = new Ship(5);
  enemyGameBoard.placeShip(ship, "C1", "y");
  player.enemyGameBoard = enemyGameBoard;
  expect(typeof player.fireShot("C1")).toBe("object");
}); 

test('player firing shot and missing enemy ship returns 0', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  let ship = new Ship(5);
  enemyGameBoard.placeShip(ship, "C2", "y");
  player.enemyGameBoard = enemyGameBoard;
  expect(player.fireShot("C1")).toBe(0);
}); 


test ('ai places a ship', () => {
  let player = new Player();
  let playerBoard = new GameBoard();
  player.myGameBoard = playerBoard;
  let ship = new Ship(3);
  player.aiPlaceShip(ship);
  let allSquares =playerBoard.display().flat();
  let shipSquares = 0;
  for (let i = 0; i < allSquares.length; i++) {
    if (typeof allSquares[i] == "object") {
      shipSquares += 1;
    }
  }
  expect(shipSquares).toBe(3);
});

test ('ai places 3 ships', () => {
  let player = new Player();
  let playerBoard = new GameBoard();
  player.myGameBoard = playerBoard;
  let ships = [new Ship(3), new Ship(4), new Ship(5)];
  for (let ship of ships) {
    player.aiPlaceShip(ship);
  }
  let allSquares =playerBoard.display().flat();
  let shipSquares = 0;
  for (let i = 0; i < allSquares.length; i++) {
    if (typeof allSquares[i] == "object") {
      shipSquares += 1;
    }
  }
  expect(shipSquares).toBe(12);
});

test('ai turn takes only legal shot', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  for (let i = 0; i < 100; i++) {
    player.aiTurn();
  }
  let allShots = player.allShots;
  let allShotsXCoordinates = allShots.map((coords) => coords[0]);
  let allShotsYCoordinates = allShots.map((coords) => Number(coords.substring(1)));
  let test = allShotsXCoordinates.every((x) => x <= "J") && allShotsYCoordinates.every((y) => y <= 10)
  // Potentially replace the above with a matcher if possible
  expect(test).toEqual(true);
}); 

test('ai turn never repeats the same shot', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  for (let i = 0; i < 100; i++) {
    player.aiTurn();
  }
  let shotsTaken = player.allShots;
  let uniqueShots =  [...new Set(shotsTaken)] 
  expect(shotsTaken).toEqual(uniqueShots);
}); 

test('after succesful hit, AI targets adjacent square 1', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("C3");
  let expectedMoves = ["B3", "D3", "C2", "C4"];
  player.aiTurn();
  let lastMove = player.allShots[1];
  expect(expectedMoves).toContain(lastMove);
}); 

test('after succesful hit, AI targets adjacent square 2', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "A1", "x");
  player.fireShot("A1");
  let expectedMoves = ["A2", "B1"];
  player.aiTurn();
  let lastMove = player.allShots[1];
  expect(expectedMoves).toContain(lastMove);
}); 

test('If adjacent shot is a miss, AI tries another adjacent shot', () => {
  // This test causes tests to run indefinitely
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("C3"); //Hit
  player.fireShot("C4") //Miss
  let expectedMoves = ["B3", "D3", "C2"];
  player.aiTurn();
  let lastMove = player.allShots[2];
  expect(expectedMoves).toContain(lastMove);
});


test('Once AI has determined ship orientation, it will continue firing on orientation', () => {
  // This test fails
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("C3"); //Hit
  player.fireShot("D3"); //Hit/
  let expectedMoves = ["B3", "E3"];
  player.aiTurn();
  let lastMove = player.allShots[player.allShots.length - 1];
  expect(expectedMoves).toContain(lastMove);
});


test('AI will sink 3-piece ship in at least 6 turns', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("C3"); //Hit
  for (let i =0; i < 5; i++) {
    player.aiTurn();
  }
  expect(ship.isSunk()).toBe(true);
});

test('AI will sink 3-piece ship in at least 6 turns 2', () => {
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("D3"); //Hit
  for (let i =0; i < 5; i++) {
    player.aiTurn();
  }
  expect(ship.isSunk()).toBe(true);
});

test('AI will sink 3-piece ship in at least 6 turns even if already fire in logical path', () => {
  // Note that AI will get stuck if it's already fired somewhere in it's desired path
  let player = new Player();
  let enemyGameBoard = new GameBoard();
  player.enemyGameBoard = enemyGameBoard;
  let ship = new Ship(3);
  enemyGameBoard.placeShip(ship, "C3", "x");
  player.fireShot("F3"); //Miss
  player.fireShot("D3"); //Hit
  for (let i =0; i < 8; i++) {
    player.aiTurn();
  }
  console.log(player.allShots)
  expect(ship.isSunk()).toBe(true);
});




// Specs
// AI should keep track of most recent hit
// It should remember this ship and target it until it sinks the ship
// First, it targets adjacent square
// Then, it determines if the adjacent square is a hit
// If so, it determines the direction of the ship
// It then continues along that direction until the ship is sunk
// If it reaches a miss, it returns to the original shot and goes in the other direction
// If it does not sink the ship after completing both directions, it goes to the original source and tries another direction



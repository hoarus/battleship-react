import { Ship } from './Ship.js';
import { GameBoard } from './GameBoard';

test('creates and displays new GameBoard', () => {
  let board = new GameBoard();
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('lookup position 1', () => {
  let board = new GameBoard();
  expect(board.lookupPosition("A6")).toBe(0
  );
}); 

test('lookup position 2', () => {
  let board = new GameBoard();
  expect(board.lookupPosition("B7")).toBe(0
  );
}); 

test('lookup position lowercase', () => {
  let board = new GameBoard();
  expect(board.lookupPosition("a7")).toBe(0
  );
}); 



test('places horizontal ship 1', () => {
  let board = new GameBoard();
  let ship = new Ship(3);
  board.placeShip(ship, "A3", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ship, ship, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('places horizontal ship 2', () => {
  let board = new GameBoard();
  let ship = new Ship(5);
  board.placeShip(ship, "D9", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, ship, ship, ship, ship, ship, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('places horizontal ship 3', () => {
  let board = new GameBoard();
  let ship = new Ship(2);
  board.placeShip(ship, "I1", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, ship, ship],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('places horizontal ship 4', () => {
  let board = new GameBoard();
  let ship = new Ship(2);
  board.placeShip(ship, "I10", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, ship, ship]
  ]
  );
}); 


test('places vertical ship', () => {
  let board = new GameBoard();
  let ship = new Ship(5);
  board.placeShip(ship, "C3", "y");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, ship, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 


test('Prohibits impossible ship placement 1', () => {
  let board = new GameBoard();
  let ship = new Ship(5);
  board.placeShip(ship, "A9", "y");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('Prohibits impossible ship placement 2', () => {
  let board = new GameBoard();
  let ship = new Ship(2);
  board.placeShip(ship, "J1", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('Prohibits impossible ship placement 3', () => {
  let board = new GameBoard();
  let shipOne = new Ship(2);
  let shipTwo = new Ship(2);
  board.placeShip(shipOne, "I1", "x");
  board.placeShip(shipTwo, "H1", "x");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, shipOne, shipOne],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  );
}); 

test('Prohibits impossible ship placement 4', () => {
  let board = new GameBoard();
  let shipOne = new Ship(2);
  let shipTwo = new Ship(2);
  board.placeShip(shipOne, "J9", "y");
  board.placeShip(shipTwo, "J8", "y");
  expect(board.display()).toEqual(
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, shipOne],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, shipOne]
  ]
  );
}); 

test('Impossible ship placement return "Illegal Move"', () => {
  let board = new GameBoard();
  let ship = new Ship(5);
  expect(board.placeShip(ship, "A9", "y")).toBe("Illegal Move"
  );
}); 


test('Receive attack updates coordinates with miss 1', () => {
  let board = new GameBoard();
  board.receiveAttack("A6");
  expect(board.lookupPosition("a6")).toBe(1
    );
}); 

test('Receive attack updates coordinates with miss 2', () => {
  let board = new GameBoard();
  board.receiveAttack("D7");
  expect(board.lookupPosition("D7")).toBe(1
    );
}); 


test('Receive attack updates coordinates with hit 1', () => {
  let board = new GameBoard();
  let ship = new Ship(2);
  board.placeShip(ship, "C1", "x");
  board.receiveAttack("C1");
  expect(board.lookupPosition("C1")).toBe(2
    );
}); 

test('Receive attack updates coordinates with hit 2', () => {
  let board = new GameBoard();
  let ship = new Ship(3);
  board.placeShip(ship, "D3", "y");
  board.receiveAttack("D5");
  expect(board.lookupPosition("D5")).toBe(2
    );
}); 

test('Receive attack returns target', () => {
  let board = new GameBoard();
  let ship = new Ship(3);
  board.placeShip(ship, "D3", "y");
  expect(board.receiveAttack("D5")).toBe(ship
    );
}); 

test('Receive attack returns "Error" if same location hit twice', () => {
  let board = new GameBoard();
  board.receiveAttack("D5");
  expect(board.receiveAttack("D5")).toBe("Error"
    );
}); 


test('Gameboard confirms not all ships have been sunk 1', () => {
  let board = new GameBoard();
  let ship = new Ship(3);
  board.placeShip(ship, "D3", "y");
  expect(board.allShipsSunk()).toBe(false
    );
}); 

test('Gameboard confirms not all ships have been sunk 2', () => {
  let board = new GameBoard();
  let ship = new Ship(3);
  board.placeShip(ship, "D3", "y");
  ship.hit();
  ship.hit();
  expect(board.allShipsSunk()).toBe(false
    );
}); 

test('Gameboard confirms all ships have been sunk 1', () => {
  let board = new GameBoard();
  let ship = new Ship(2);
  board.placeShip(ship, "D3", "y");
  board.receiveAttack("D3");
  board.receiveAttack("D4");
  expect(board.allShipsSunk()).toBe(true
    );
}); 

test('Gameboard confirms all ships have been sunk 2', () => {
  let board = new GameBoard();
  let ship1 = new Ship(2);
  let ship2 = new Ship(3);
  board.placeShip(ship1, "D3", "y");
  board.placeShip(ship2, "A1", "x");
  ship1.hit();
  ship1.hit();
  ship2.hit();
  ship2.hit();
  ship2.hit();
  expect(board.allShipsSunk()).toBe(true
    );
}); 

test('Gameboard returns how many total hits remaining 1', () => {
  let board = new GameBoard();
  let ship1 = new Ship(2);
  let ship2 = new Ship(3);
  board.placeShip(ship1, "D3", "y");
  board.placeShip(ship2, "A1", "x");
  expect(board.totalHitsRemaining()).toBe(5
    );
}); 

test('Gameboard returns how many total hits remaining 2', () => {
  let board = new GameBoard();
  let ship1 = new Ship(2);
  let ship2 = new Ship(3);
  board.placeShip(ship1, "D3", "y");
  board.placeShip(ship2, "A1", "x");
  ship1.hit();
  ship1.hit();
  ship2.hit();
  expect(board.totalHitsRemaining()).toBe(2
    );
}); 

test('Gameboard returns how many shots received 1', () => {
  let board = new GameBoard();
  board.receiveAttack("A7");
  board.receiveAttack("A5");
  board.receiveAttack("A4");
  expect(board.totalShotsReceived()).toBe(3
    );
}); 

test('Gameboard returns how many shots received 2', () => {
  let board = new GameBoard();
  board.receiveAttack("A7");
  board.receiveAttack("A7");
  board.receiveAttack("A4");
  expect(board.totalShotsReceived()).toBe(2
    );
}); 
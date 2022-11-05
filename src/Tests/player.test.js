import { Ship } from '../GameLogic/ship.js';
import { GameBoard } from '../GameLogic/gameboard';
import { Player } from '../GameLogic/player.js';

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



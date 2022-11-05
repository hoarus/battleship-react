import { Ship } from '../GameLogic/ship.js';

test('creates new ship with length 3', () => {
  let ship = new Ship(3);
  expect(ship.getLength()).toBe(3);
}); 

test('creates new ship with length 1', () => {
  let ship = new Ship(1);
  expect(ship.getLength()).toBe(1);
}); 

test('Ship with 1 length is sunk after being hit', () => {
  let ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
}); 

test('Ship with 2 length is sunk after being hit twice', () => {
  let ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
}); 

test('Ship with 2 length is not sunk after being hit once', () => {
  let ship = new Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
}); 
test('Check Ship Health 1', () => {
  let ship = new Ship(2);
  expect(ship.getHealth()).toBe(2);
}); 






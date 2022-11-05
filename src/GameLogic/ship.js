class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
  }

  getLength() {
    return this.length;
  }

  getHealth() {
    return this.health;
  }

  hit(){
    this.health -= 1;
  }

  isSunk(){
    return this.health == 0;
  }

  
}

export { Ship }
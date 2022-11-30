# Colors

  --black: #121212;
  --yellow: #ffc600;
  --flame: #D8572A
  --red: #C32F27
  --pewterBlue: #8EB1C7  
  --gray(maybe): #726953
 

# README: Basic Battleship

## Overview
I developed this project as part of the [Odin Project](https://www.theodinproject.com/lessons/javascript-battleship). It is a simple pass-and-play version of the battleship board game. 

You can play a live version at: https://hoarus.github.io/battleship-react/

## Technical Notes
I developed this project to practice a number of skills:
- Test Driven Deployment: I wrote all the underlying game logic and associated unit tests separately before adding a UI.
- React: I learned React and associated components to develop a User Interface.
- Responsive Design: I had to modify not only the styling, but also the underlying game logic and conditional rendering of elements, to provide a user-friendly experience on both mobile and desktop.

This project leverages the following technologies:
- React
- Git & GitHub
- Jest

## Functionality

### Get Started
The first screen requires the player to input their name and select One-Player or Two-Player before starting the game.
![Search](/readme_images/battleship-get-started.jpg)

### Place Ships
Players are required to place all their ships before their opponent's turn. They can rotate the ship and see where it will be placed before making their decision. 
![Search](/readme_images/battleship-place-ships.jpg)


### Fire Shots
Players can click anywhere on their opponent's board to fire a shot.  Once they have taken their shot, they can end their turn.
![Search](/readme_images/battleship-fire-shot.jpg)

### View Own Board
Players can also view the shots their opponent has made on their own board.
![Search](/readme_images/battleship-show-board.jpg)

### Ending the Game
Once one player has sunk all their opponent's ships, the game comes to an end. Players are prompted to 'Play Again', which reloads the app.
![Search](/readme_images/battleship-game-over.jpg)

## Installation
This project was created with [Create React App](https://github.com/facebook/create-react-app).
You will need to install the below before getting started:
- npm `sudo apt install npm`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Support
For any questions in relation to the project, please reach out to me at [hoarus@gmail.com](mailto:hoarus@gmail.com)

## Color Themes

Light: #CCE8E6
SecondLight: #A8BDC5
DarkBlue: #0E3744
Red: #d24531
Ship: #FBA346

# Backlog
- Readme
- Show boards side by side if on computer
- Display error color if ship placement illegal
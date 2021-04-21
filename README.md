# ChessPedition

## A play 'til you lose version of chess that gets harder everytime you win.

#### Turing School of Software Design - Mod4 Capstone Project

The goal of this project was to undertake new technologies while building a fullstack application from scratch, demonstrating the collective knowledge we've gained throughout our time at Turing. 

### Contributors

**Chris Spohn**: [github profile](https://github.com/CJSpohn)

**Elsa Fluss**: [github profile](https://github.com/ElsaFluss)

### Technologies

**Build**: TypeScript, React.js, React Hooks, React Router, Action Cable (for websocket communication)

**Chess Logic**: Chessboardjsx, Chess.js

**Testing**: Cypress

**CI**: GitHub Actions

**Deployment**: Heroku

## Table of Contents
1. [Introduction](#introduction)
3. [Instructions](#setup-instructions)
4. [How-To](#using-kitchen-sink)
5. [Future Plans](#notes-and-plans-for-future-iterations)

## Introduction
ChessPedition is a multi-user experience, where you can play chess against a friend. When a game ends, the winner begins with only the pieces they had left, and the loser receives a full board. ChessPedition utilizes websockets for live gameboard updates as each player makes their move. Additional users are welcome in the game room and can spectate the moves being made, but cannot participate in the game. 

User authentication is handled with encrypted password storage on the backend so that a user can return to their profile to see stats from previous games. User details are stored in local storage so a player can return to their machine without having to log back in. 

More details about the context for the project can be found in [this project spec](https://mod4.turing.edu/projects/capstone.html).

## Setup Instructions
To run the project locally:
- `git clone` this repo
- `git clone` our backend repo from [here](https://github.com/ChessAdventure/chess-adventure-backend) and follow its setup instructions
- `cd` into the client repo
- run `npm install`
- go into `constants/index.js` and uncomment the localhost link variables and comment out the Heroku link variables.
- run `npm start` to run the React App in your browser
- Make sure that the backend is running before attempting to log in

OR

This site is deployed using Heroku. To visit, click the link below!
- [ChessPedition](https://chesspedition.herokuapp.com/)


### Testing

Cypress was used to implement end-to-end-tests of the user flow. To run these tests, `cd` into the project repository.

Then run `npx cypress open`

Cypress.js should open a window with a list of test files. Click on app-spec.js to run the tests in that file.
Note that the Cypress tests are built to run locally, so you must follow the instructions for setting up the project locally in order for the tests to pass.

[Back to Top of Page](#table-of-contents)

---

## Using ChessPedition

First, click sign up and create an account!

<p align="center">
  <img width="300" alt="Log in" src="https://user-images.githubusercontent.com/69563078/115630179-c952cf00-a2c0-11eb-9ed3-f8d2938b474a.png"><img width="300" alt="Sign Up" src="https://user-images.githubusercontent.com/69563078/115629851-53e6fe80-a2c0-11eb-9dc7-3a3456f0b9de.png">
</p>

Once logged in you are taken to your dashboard where the rules of a ChessPedition can be found.

<p align="center">
<img width="632" alt="Dashboard" src="https://user-images.githubusercontent.com/69563078/115630275-fa330400-a2c0-11eb-87a0-f10a4a628f1f.png">
</p>

If a user has no past games they will see an empty 'past game' board. Once they play a game they see the previous end game and their high score displayed on the screen.

<p align="center">
<img width="632" alt="Past game board" src="https://user-images.githubusercontent.com/69563078/115630370-264e8500-a2c1-11eb-9796-966adfa2efa5.png">
</p>

A user can click 'Start a New ChessPedition' and be taken to a game room connected to a websocket.

<p align="center">
<img width="632" alt="Waiting screen" src="https://user-images.githubusercontent.com/69563078/115630485-5138d900-a2c1-11eb-9199-24d519260bc3.png">
</p>

Once another registered user joins the room they are both able to begin playing chess!

<p align="center">
<img width="310" alt="Game start" src="https://user-images.githubusercontent.com/69563078/115630564-788fa600-a2c1-11eb-8fee-5d1a90bb785a.png">
</p>

A user can return to the dashboard and be prompted to rejoin the active game they are involved in.

<p align="center">
<img width="310" alt="Game start" src="https://user-images.githubusercontent.com/69563078/115630660-9eb54600-a2c1-11eb-8cc9-453e17c7bd69.png">
</p>
 
When a game ends, both users see the result of their game displayed, with the option to continue the ChessPedition.

<p align="center">
<img width="310" alt="Loss" src="https://user-images.githubusercontent.com/69563078/115630777-d91ee300-a2c1-11eb-9237-0b7e53f09d2d.png">
<img width="310" alt="Win" src="https://user-images.githubusercontent.com/69563078/115630795-e1771e00-a2c1-11eb-83f8-e9efbcdea75f.png">
</p>
 
If the ChessPedition is continued, the winner of the previous game starts with only the pieces they had at the time of victory.

<p align="center">
<img width="310" alt="Win" src="https://user-images.githubusercontent.com/69563078/115630904-14b9ad00-a2c2-11eb-904d-330b14612594.png">
</p>

The website is replete with error handling.

<p align="center">
<img width="300" alt="Error3" src="https://user-images.githubusercontent.com/69563078/115630957-2c913100-a2c2-11eb-96da-fc9fc4ff0f8f.png">
</p>

<p align="center">
<img width="300" alt="Error1" src="https://user-images.githubusercontent.com/69563078/115630982-361a9900-a2c2-11eb-81b7-daeb2d293e05.png">
</p>
  
<p align="center">
<img width="300" alt="Error2" src="https://user-images.githubusercontent.com/69563078/115631007-3ca91080-a2c2-11eb-9a51-3c57c0677050.png">
</p>

[Back to Top of Page](#table-of-contents)

---

### Wins

The biggest win of this project was working with ActionCable in an environment where both the front end and back end were built from scratch. We had a lot of fun working with a dedicated back end team for the first time and navigating that relationship while practicing our technical communication. This was our first time working with a back end from the ground up, allowing us to contribute at every stage, from defining MVP to deploying the final product. 

Additionally, the front end problem of needing to render three different instances (white player, black player, observer) at the same time was very enjoyable to solve. This was also our first time using TypeScript and our first time using websockets and building an event driven architecture. 


### Notes and Plans for Future Iterations
- **Statistics:** Avid chess players love statistics. We have the information to provide certain statistics to players that is not currently implemented. We would love to do a deep dive to see what's possible and explore providing this information.
- **User Authentication:** Real user authentication (through a third party service) would be lovely. A lot of the work was setting up users and tracking API keys for each user so that moves are validated on the back end. 
- **Choosing where the winning pieces are placed:** There are a lot of fun options to explore with the ChessPedition format. One of which would be choosing where your pieces are placed after you win a game to strategize for the follow up game. The piece reset comes from the back end, but implementing the UI with the chessboardjsx library would be a challenge but add a lot of value.


[Back to Top of Page](#table-of-contents)


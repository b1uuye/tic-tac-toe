const prompt = require("prompt-sync")({sigint:true}); //Used to take a input before running code after

class Player {
    constructor(){

    }
}

class HumanPlayer extends Player{
    constructor(names){
        super()
    }
    select(options){
        let selection = prompt("Please enter an option: ").toUpperCase()
        let selected = false //Asking user for an input of their choice
        while (selected === false)
            if(options.includes(selection) === false){
                selection = prompt("Please enter a valid option: ").toUpperCase() //checks if the input is still available in the options array
            }
            else{
                selected = true
            }
        return selection 
    }
}

class ComputerPlayer extends Player {
    constructor() {
        super()
    }
    select(options){
    return options[Math.floor(Math.random() * options.length)] //randomises its choice over the options array (choosing 1 from the array)
    }
}

class Board {
    constructor(){
    }
    boardSquares = {
    A1: '-',
    A2: '-',
    A3: '-',
    B1: '-', //leaving the board as empty to begin with
    B2: '-',
    B3: '-',
    C1: '-',
    C2: '-',
    C3: '-'
    }
    createGame(){
        let options = ['A1','A2','A3','B1','B2','B3','C1','C2','C3'] //all options of spaces on the board
        let player = new HumanPlayer()
        let computer = new ComputerPlayer() //instantiating new players for the game
        console.log(`
        ${this.boardSquares.A1} | ${this.boardSquares.A2} | ${this.boardSquares.A3}
        ${this.boardSquares.B1} | ${this.boardSquares.B2} | ${this.boardSquares.B3} 
        ${this.boardSquares.C1} | ${this.boardSquares.C2} | ${this.boardSquares.C3}
        `) //showcasing the board as options are inputted
        let result = ''
        while(result == ''){ //while loop used to iterate through player and computer choices repeatedly
            let playerSelection = player.select(options)
            this.boardSquares[playerSelection] = 'X' //changes the board object variables to an 'X' for each of the user's choices
            options = options.filter(item => item != playerSelection)
            console.log("Your turn, choose a space!")

            let computerSelection = computer.select(options)
            this.boardSquares[computerSelection] = 'O'//changes the board object variables to an 'X' for each of the computer's choices
            options = options.filter(item => item != computerSelection) //filters to find the specific variable in the options list above and removes it from possible options
            console.log(`Computer chose ${computerSelection}`)

            console.log(`
                ${this.boardSquares.A1} | ${this.boardSquares.A2} | ${this.boardSquares.A3}
                ${this.boardSquares.B1} | ${this.boardSquares.B2} | ${this.boardSquares.B3}
                ${this.boardSquares.C1} | ${this.boardSquares.C2} | ${this.boardSquares.C3}
                `)//showcasing the board as options are inputted

            result = this.winCons()
            
            if((options == '' || options.length == 0) && result == ''){
                result = 'STALEMATE!!'
            } //if none of the win conditions are met, then its a draw
        }
        console.log(result)
        return result //outputs the result of the game
        
    }


    winCons(){
        if(this.boardSquares.A1 == 'X' && this.boardSquares.A2 == 'X' && this.boardSquares.A3 == 'X'
            || this.boardSquares.B1 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.B3 == 'X'
            || this.boardSquares.C1 == 'X' && this.boardSquares.C2 == 'X' && this.boardSquares.C3 == 'X'
            || this.boardSquares.A1 == 'X' && this.boardSquares.B1 == 'X' && this.boardSquares.C1 == 'X' //all win conditions for player
            || this.boardSquares.A2 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C2 == 'X'
            || this.boardSquares.A3 == 'X' && this.boardSquares.B3 == 'X' && this.boardSquares.C3 == 'X'
            || this.boardSquares.A3 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C1 == 'X'
            || this.boardSquares.A1 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C3 == 'X'
        ){
          return "PLAYER WINS!!"
        }else if(this.boardSquares.A1 == 'O' && this.boardSquares.A2 == 'O' && this.boardSquares.A3 == 'O'
            || this.boardSquares.B1 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.B3 == 'O'
            || this.boardSquares.C1 == 'O' && this.boardSquares.C2 == 'O' && this.boardSquares.C3 == 'O'
            || this.boardSquares.A1 == 'O' && this.boardSquares.B1 == 'O' && this.boardSquares.C1 == 'O'//all win conditions for computer
            || this.boardSquares.A2 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C2 == 'O'
            || this.boardSquares.A3 == 'O' && this.boardSquares.B3 == 'O' && this.boardSquares.C3 == 'O'
            || this.boardSquares.A3 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C1 == 'O'
            || this.boardSquares.A1 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C3 == 'O'){
            return 'COMPUTER WINS!!'
        }else{
            return '' //setting the win conditions to an empty array so the while loop can keep going till there is a winner or draw
        }
    }

}

let board = new Board()
board.createGame() //calling the createGame method so the game can be automtically started
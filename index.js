const prompt = require("prompt-sync")({sigint:true});

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
        let selected = false
        while (selected === false)
            if(options.includes(selection) === false){
                selection = prompt("Please enter a valid option: ").toUpperCase()
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
    return options[Math.floor(Math.random() * options.length)]
    }
}

class Board {
    constructor(){
    }
    boardSquares = {
    A1: '-',
    A2: '-',
    A3: '-',
    B1: '-',
    B2: '-',
    B3: '-',
    C1: '-',
    C2: '-',
    C3: '-'
    }
    createGame(){
        let options = ['A1','A2','A3','B1','B2','B3','C1','C2','C3']
        let player = new HumanPlayer()
        let computer = new ComputerPlayer()
        console.log(`
        ${this.boardSquares.A1} | ${this.boardSquares.A2} | ${this.boardSquares.A3}
        ${this.boardSquares.B1} | ${this.boardSquares.B2} | ${this.boardSquares.B3}
        ${this.boardSquares.C1} | ${this.boardSquares.C2} | ${this.boardSquares.C3}
        `)
        let result = ''
        while(result == ''){
            let playerSelection = player.select(options)
            this.boardSquares[playerSelection] = 'X'
            options = options.filter(item => item != playerSelection)
            console.log("Your turn, choose a space!")

            let computerSelection = computer.select(options)
            this.boardSquares[computerSelection] = 'O'
            options = options.filter(item => item != computerSelection)

            console.log(`
                ${this.boardSquares.A1} | ${this.boardSquares.A2} | ${this.boardSquares.A3}
                ${this.boardSquares.B1} | ${this.boardSquares.B2} | ${this.boardSquares.B3}
                ${this.boardSquares.C1} | ${this.boardSquares.C2} | ${this.boardSquares.C3}
                `)

            result = this.winCons()
            
            if((options == '' || options.length == 0) && result == ''){
                result = 'STALEMATE!!'
            }
        }
        console.log(result)
        return result
        
    }


    winCons(){
        if(this.boardSquares.A1 == 'X' && this.boardSquares.A2 == 'X' && this.boardSquares.A3 == 'X'
            || this.boardSquares.B1 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.B3 == 'X'
            || this.boardSquares.C1 == 'X' && this.boardSquares.C2 == 'X' && this.boardSquares.C3 == 'X'
            || this.boardSquares.A1 == 'X' && this.boardSquares.B1 == 'X' && this.boardSquares.C1 == 'X'
            || this.boardSquares.A2 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C2 == 'X'
            || this.boardSquares.A3 == 'X' && this.boardSquares.B3 == 'X' && this.boardSquares.C3 == 'X'
            || this.boardSquares.A3 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C1 == 'X'
            || this.boardSquares.A1 == 'X' && this.boardSquares.B2 == 'X' && this.boardSquares.C3 == 'X'
        ){
          return "PLAYER WINS!!"
        }else if(this.boardSquares.A1 == 'O' && this.boardSquares.A2 == 'O' && this.boardSquares.A3 == 'O'
            || this.boardSquares.B1 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.B3 == 'O'
            || this.boardSquares.C1 == 'O' && this.boardSquares.C2 == 'O' && this.boardSquares.C3 == 'O'
            || this.boardSquares.A1 == 'O' && this.boardSquares.B1 == 'O' && this.boardSquares.C1 == 'O'
            || this.boardSquares.A2 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C2 == 'O'
            || this.boardSquares.A3 == 'O' && this.boardSquares.B3 == 'O' && this.boardSquares.C3 == 'O'
            || this.boardSquares.A3 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C1 == 'O'
            || this.boardSquares.A1 == 'O' && this.boardSquares.B2 == 'O' && this.boardSquares.C3 == 'O'){
            return 'COMPUTER WINS!!'
        }else{
            return ''
        }
    }

}

let board = new Board()
board.createGame()
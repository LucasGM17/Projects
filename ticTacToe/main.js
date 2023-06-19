const squares = document.querySelectorAll('div');
const resultTxt = document.querySelector('.result');

let playerClick = addEventListener('click', e => {
    if(e.target.className.includes('square')) {
        player.makeMove(e.target);
    }
})

class Game {
    constructor(turn) {
        this.turn = turn;
        this.board = [['', '', ''],
                      ['', '', ''],
                      ['', '', '']]
    }
    makeMove() {
        let winner = this.getWinner(this.board);
        if(winner || winner === 0) {
            this.displayWinner(winner);
            return this.endGame();
        };
        if(this.turn === 'bot') {
            setTimeout(() => {
                bot.makeMove();
                let winner = this.getWinner(this.board);
                if(winner || winner === 0) {
                    this.displayWinner(winner);
                    return this.endGame();
                };
                this.nextTurn();
            }, 60)
        }
    }
    nextTurn() {
        this.turn = this.turn === 'player' ? 'bot' : 'player'; 
        this.makeMove();
    }
    isBoardFull(board) {
        return board.every(row => row.every(col => col !== ''));
    }
    getWinner(board) {
        for(let row = 0; row < board.length; row++) {
            if(board[row].every(col => col === 'X')) {
                return 1;
            }
            if(board[row].every(col => col === 'O')) {
                return -1;
            }
            let cols = [];
            for(let col = 0; col < board.length; col++) {
               cols.push(board[col][row]);
               if(cols.length === 3 && cols.every(col => col === 'X')) {
                return 1;
               }
               if(cols.length === 3 && cols.every(col => col === 'O')) {
                return -1;
            }
        }
        if((board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') || (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X')) {
            return 1;
        }
        if((board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') || (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O')) {
            return -1;
        }
        if(this.isBoardFull(board)) {
            return 0;
        }
    }
  }
  displayWinner(result) {
    if(result === 1) {
        resultTxt.innerText = 'You Win!';
    }
    else if(result === -1) {
        resultTxt.innerText = 'Bot Wins!';
    }
    else {
        resultTxt.innerText = 'Tie!';
    }
  }
  endGame() {
    setTimeout(() => {
        this.board = [['', '', ''], 
                      ['', '', ''],
                      ['', '', '']];
        this.turn = 'player';
        squares.forEach(square => square.innerText = '');
        resultTxt.innerText = '';
    }, 1000)
  }
}
class Player {
    constructor(symbol) {
        this.symbol = symbol;
    }
    click = e => {
        console.log('click')
        e.target.removeEventListener('click', this.click);
    }
    canMoveTo(row, col) {
        return !game.board[row][col];
    }
    makeMove(square)  {
        if(game.turn === 'player') {
            const [_, row, col] = [...square.classList].map(val => {
                if(!isNaN(val[val.length-1])) {
                    return val[val.length-1]-1;
                }
            })
            
            if(this.canMoveTo(row, col)) {
                game.board[row][col] = this.symbol;
                this.draw(square);
                game.nextTurn();
            }
        }
    }
    draw(square) {
        square.innerText = this.symbol;
    }
}

class Bot {
    constructor(symbol) {
        this.symbol = symbol;
    }
    canMoveTo(row, col) {
        return !game.board[row][col];
    }
    makeMove() {
        if(game.isBoardFull(game.board)) return;
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        if(this.canMoveTo(row, col)) {
            game.board[row][col] = this.symbol;
            this.draw(row, col);
            return;
        }
        this.makeMove();
    }
    draw(row, col) {
        document.querySelector(`.row${row+1}.col${col+1}`).innerText = this.symbol;
    }
}

const game = new Game('player');
const player = new Player('X');
const bot = new Bot('O');
player.makeMove();
const gameCells =document.querySelectorAll('.cell');
const player1=document.querySelector('.player1');
const player2=document.querySelector('.player2');
const restartBtn=document.querySelector('.restart');
const alertBox=document.querySelector('.alertBox');


//making variable
let firstPlayer='X';
let secondPlayer='O';
let playerTurn=firstPlayer;
 player1.textContent=`player1: ${firstPlayer}`;
 player2.textContent=`player1: ${secondPlayer}`;

const startGame=()=>{
    gameCells.forEach(cell=>{
        cell.addEventListener('click', handleClick)  
    })
}

const handleClick=(e)=>{
    if(e.target.textContent==='')
        { e.target.textContent=playerTurn;
          if(checkWins()){
            //   console.log(`${playerTurn} is winner!`);
              showAlert(`${playerTurn} is winner!`);
              disable();
          }
          else if(checkTie()){
            //   console.log(`Game is tie`);
            showAlert(`Game is tie`);
              disable();
          }
          else{changePlayerTurn();

          }
          
          }
}

const changePlayerTurn= ()=>{
    playerTurn=playerTurn===firstPlayer ? secondPlayer : firstPlayer;
}

const checkWins=()=>{
    const winningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3]=winningConditions[i];
        if(
            gameCells[pos1].textContent!==''
             && gameCells[pos1].textContent===gameCells[pos2].textContent 
            && gameCells[pos2].textContent===gameCells[pos3].textContent
        ){
            return true;
        }
        
    }
    return false;
}

const checkTie = () =>{
    let emptyCellsCount=0;
    gameCells.forEach(cell =>{
        if(cell.textContent===''){
            emptyCellsCount++;
        }
    });
    return emptyCellsCount===0 && !checkWins();
}

const disable=()=>{
    gameCells.forEach(cell=>{
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
}
const restartGame=()=>{
    gameCells.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('disabled');
    });
    startGame();
}
   
    const showAlert=(msg)=>{
        alertBox.style.display='block';
        alertBox.textContent=msg;
    }

restartBtn.addEventListener('click',restartGame);


startGame();

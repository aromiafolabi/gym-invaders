
//// Make grid Dynamically
///// Make DB and burger an image class
//// Game start by clicking
//// burger to appear on screen and be controlled back and forth by player (removed from cell when player moves it)
// DB to appear on screen and to move down vertically(randomly +10)
// program how many DBs to appear on screen and game ends when all have appeared(also program burger 3 lives)
// player shooting from burger
// DB shooting randomly
// if DB is hit, DB disappears from screen
// if burger is history, one life is lost, if all lives lost game Over
// when game ends final alert
// build in further levels to make game harder
// transition between levels


// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startButton = document.querySelector('#start')

// Grid Variables
const width = 10
const gridCellCount = width * width 

// Game Variables
let burgerPosition = 95
// let dumbbellPosition = 0


// Building the grid
function createGrid (){
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    cell.textContent = i
    grid.appendChild(cell)
  }
}
createGrid()

// Functions
function removeBurger(){
  cells[burgerPosition].classList.remove('burger')
}

function addBurger(){
  cells[burgerPosition].classList.add('burger')
}

// function removeDumbbell(){
//   cells[0].classList.remove('dumbell')
//   cells[1].classList.remove('dumbell')
//   cells[2].classList.remove('dumbell')
//   cells[3].classList.remove('dumbell')
//   cells[4].classList.remove('dumbell')
//   cells[5].classList.remove('dumbell')
//   cells[6].classList.remove('dumbell')
//   cells[7].classList.remove('dumbell')
// }

// function addDumbbell(){
//   cells[0].classList.add('dumbbell')
//   cells[1].classList.add('dumbbell')
//   cells[2].classList.add('dumbbell')
//   cells[3].classList.add('dumbbell')
//   cells[4].classList.add('dumbbell')
//   cells[5].classList.add('dumbbell')
//   cells[6].classList.add('dumbbell')
//   cells[7].classList.add('dumbbell')
// }
function handleGameStart(){
  window.setInterval(() => {
    addBurger()
    // handleComputerControls()
  }, 500)
}
function handlePlayerControls(e){
  const x = burgerPosition % width
  console.log(x)
  
  removeBurger()
  if (e.code === 'ArrowLeft' && x > 0) {
    return burgerPosition-- 
  } else if (e.code === 'ArrowRight' && x < width - 1) {
    return burgerPosition++
  }  else {
    return 'invald do nothing'
  }
}

// function handleComputerControls(){
//   addDumbbell()
//   window.setInterval(() => {
//     dumbbellPosition += width
//   }, 1000)
// }

// Events
startButton.addEventListener('click', handleGameStart)
document.addEventListener('keyup', handlePlayerControls)


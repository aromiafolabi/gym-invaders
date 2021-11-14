
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
// let dumbbellPosition = document.querySelector('.grid > div')

// Grid Variables
const width = 10
const gridCellCount = width * width 

// Game Variables
let burgerPosition = 95
let dumbbellPosition = [0,1,2,3,4,5,6,7,8,9]
let playerLaser = burgerPosition - width



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

function addPlayerLaser(){
  cells[playerLaser].classList.add('playerLaser')
  
}

function removePlayerLaser(){
  cells[playerLaser].classList.remove('playerLaser')

}

function removeDumbbell(){
  dumbbellPosition.forEach((index) => {
    cells[index].classList.remove('dumbbell')
  })
  
}


function addDumbbell(){
  dumbbellPosition.forEach((index) => {
    cells[index].classList.add('dumbbell') 
  })
  
}

function handleGameStart(){
  window.setInterval(() => {
    addBurger()
    addDumbbell()
    removePlayerLaser()
    addPlayerLaser()
  }, 500)
}
function handlePlayerControls(e){
  const x = burgerPosition % width
  console.log(x)
  
  removeBurger()
  removePlayerLaser()

  if (e.code === 'ArrowLeft' && x > 0) {
    return burgerPosition-- 
  } else if (e.code === 'ArrowRight' && x < width - 1) {
    return burgerPosition++
  } else if (e.code === 'space') {
    return playerLaser
  }  else {
    return 'invalid do nothing'
  } 
}


// function handleComputerControls(){
//   removeDumbbell()
//   // dumbbellPosition.forEach((index) => {
//   //   dumbbellPosition = [index]
//   //   const y = dumbbellPosition % length
//   //   console.log(y)
//   //   console.log(dumbbellPosition)
//   // })
//   // window.setInterval(() => {
//   dumbbellPosition.forEach((index) => {
//     dumbbellPosition = [index]
//     const y = Math.floor(dumbbellPosition % width)
//     dumbbellPosition % width
//     Math.floor(dumbbellPosition % width)
//     console.log('y', y)
//     console.log(dumbbellPosition)
//     if (y > 0) {
//       return dumbbellPosition -= width
//     } else if (y < width - 1) {
//       return dumbbellPosition += width
//     }
//     // }, 1000)
    
//   })
//   addDumbbell()
// }
// handleComputerControls()

// Events
startButton.addEventListener('click', handleGameStart)
document.addEventListener('keyup', handlePlayerControls)
// document.addEventListener('mouseenter', handleComputerControls)


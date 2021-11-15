
//// Make grid Dynamically
///// Make DB and burger an image class
//// Game start by clicking
//// burger to appear on screen and be controlled back and forth by player (removed from cell when player moves it)
//// DB to appear on screen and to move down vertically(randomly +10)
// program how many DBs to appear on screen and game ends when all have appeared(also program burger 3 lives)
////player shooting from burger
// DB shooting randomly
// if DB is hit, DB disappears from screen
// if burger is hit, one life is lost, if all lives lost game Over
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
console.log(playerLaser)
// let computerLaser = dumbbellPosition + width


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
function addComputerLaser() {
  cells[computerLaser].classList.add('computerLaser')
}
function removeComputerLaser(){
  cells[computerLaser].classList.remove('computerLaser')
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
  // window.setInterval(() => {
    addBurger()
    // addDumbbell()
    handleComputerLaser()
    handleComputerControls()
    // addPlayerLaser()
  // }, 500)
}
function handlePlayerControls(e){
  e.preventDefault()
  const x = burgerPosition % width
  const y = playerLaser % width
  console.log('x',x)
  console.log('y',y)
  console.log(e.code)
  
  removeBurger()
  removePlayerLaser()
  addBurger()
  if (e.code === 'ArrowLeft' && x > 0) {
    removeBurger()
    burgerPosition-- 
    addBurger()
  } else if (e.code === 'ArrowRight' && x < width - 1) {
    removeBurger()
    burgerPosition++ 
    addBurger()
  } else if (e.code === 'Space' && 'ArrowRight' && 'ArrowLeft') {
    // removeBurger()
    // addBurger()
    console.log(burgerPosition, playerLaser)
    playerLaser = burgerPosition + width
    setInterval(() => {
      console.log(playerLaser)
      removePlayerLaser()
      playerLaser -= width 
      addPlayerLaser()
    }, 1000)
  
  }
  
}



function handleComputerControls(){
  dumbbellPosition.forEach((index) => {
    console.log(index)
    removeDumbbell()
    addDumbbell() 
    setInterval(() => {
      cells[index].classList.remove('dumbbell')
      // removeDumbbell()
      index += width
      // addDumbbell()
      console.log('db', index)
      cells[index].classList.add('dumbbell')
    }, 1000) 
  })
  
}
function handleComputerLaser(){
  dumbbellPosition.forEach((index) => {
    let computerLaser = dumbbellPosition + width
    setInterval(() => {
      cells[index].classList.remove('computerLaser')
      computerLaser = index += width
      console.log('laser', index, computerLaser)
      cells[index].classList.add('computerLaser')
    }, 500)
    // addDumbbell()
  })
}
// handleComputerLaser()

// Events
startButton.addEventListener('click', handleGameStart)
document.addEventListener('keyup', handlePlayerControls)
// document.addEventListener('mouseenter', handleComputerControls)


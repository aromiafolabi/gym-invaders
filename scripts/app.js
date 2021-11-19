

// * * * * * DOM ELEMENTS * * * * *
const grid = document.querySelector('.grid')
const cells = []
const startButton = document.querySelector('#start')
const overallScore = document.querySelector('#Score-Display')
const lifeRemaining = document.querySelector('#life-left')



// * * * * * GRID VARIABLES  * * * * *
const width = 20
const gridCellCount = width * width 


// * * * * * GAME VARIABLES * * * * *
let burgerPosition = 370
let dumbbellPosition = [
  { index: 8, isAlive: true },
  { index: 9, isAlive: true },
  { index: 10, isAlive: true },
  { index: 11, isAlive: true },
  { index: 12, isAlive: true },
  { index: 28, isAlive: true },
  { index: 29, isAlive: true },
  { index: 30, isAlive: true },
  { index: 31, isAlive: true },
  { index: 32, isAlive: true },
  { index: 48, isAlive: true },
  { index: 49, isAlive: true },
  { index: 50, isAlive: true },
  { index: 51, isAlive: true },
  { index: 52, isAlive: true },
  { index: 68, isAlive: true },
  { index: 69, isAlive: true },
  { index: 70, isAlive: true },
  { index: 71, isAlive: true },
  { index: 72, isAlive: true }
] 

let direction = 1
let score = 0
let lives = 3
let hasGameEnded = false


// * * * * * BUILDING THE GRID * * * * *
function createGrid (){
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    grid.appendChild(cell)
  }
}
createGrid()

// * * * * * FUNCTIONS * * * * *
function resetGame(){
  setTimeout(() => {
    location.reload()
  }, 3000)
}

function removeBurger(){ //Removes player
  cells[burgerPosition].classList.remove('burger')
}

function addBurger(){ //Adds player
  cells[burgerPosition].classList.add('burger')
}

function removeDumbbellClass() { //Removes alien class
  dumbbellPosition.forEach((currentDumbbell) => {
    cells[currentDumbbell.index].classList.remove('dumbbell')  
  })
}
function removeDumbbell(){ //Removes alien
  dumbbellPosition.forEach((currentDumbbell) => {
    if (!currentDumbbell.isAlive){
      cells[currentDumbbell.index].classList.remove('dumbbell')
    }
  })
  
}

function addDumbbell(){ //Adds alien
  dumbbellPosition.forEach((currentDumbbell) => {
    if (currentDumbbell.isAlive) {
      cells[currentDumbbell.index].classList.add('dumbbell') 
    }
  })
  
}

function handleGameStart(){ //Handles game start
  startButton.style.visibility = 'hidden'
  addBurger()    
  handleComputerLaser()
  handleComputerControls()   
}

function handlePlayerControls(event){ //Player controls
  event.preventDefault()
  const x = burgerPosition % width
  if (event.code === 'ArrowLeft' && x > 0) {
    cells[burgerPosition].classList.remove('burger')
    burgerPosition-- 
    cells[burgerPosition].classList.add('burger')   
  } else if (event.code === 'ArrowRight' && x < width - 1) {
    removeBurger()
    burgerPosition++ 
    addBurger()    
  } else if (event.code === 'Space') {
    handlePlayerLaser()
  }
}


function handlePlayerLaser(){ // Player Laser controls
  let playerLaser = burgerPosition
  const intervalID = setInterval(() => {
    cells[playerLaser].classList.remove('playerLaser') 
    playerLaser -= width 
    cells[playerLaser].classList.add('playerLaser')
    if (cells[playerLaser].classList.contains('dumbbell') ) {       
      cells[playerLaser].classList.remove('playerLaser')        
      console.log(playerLaser)
      clearInterval(intervalID)
      const dumbbellIndex = dumbbellPosition.find(dumbbell => {
        return dumbbell.index === playerLaser
      })
      dumbbellIndex.isAlive = false // Removes player laser if an alien is hit
      cells[playerLaser].classList.remove('playerLaser')
      score += 1000 // Adds score
      overallScore.innerHTML = score   
    } else if (playerLaser < width) { 
      cells[playerLaser].classList.remove('playerLaser')
      clearInterval(intervalID)
    } else if (score >= 22000) { // Player wins if they score this much
      grid.textContent = `You have defeated the gym heads! You scored ${score}`
      resetGame()
    }   
  }, 120)
  
}

function computerMoveRight() {
  removeDumbbellClass()
  dumbbellPosition = dumbbellPosition.map(dumbbell => {
    dumbbell.index += 1 
    return dumbbell
  })
  addDumbbell()
}
function computerMovesLeft () {
  removeDumbbellClass()
  dumbbellPosition = dumbbellPosition.map(dumbbell => {
    dumbbell.index -= 1
    return dumbbell
  })
  addDumbbell()
}


function handleComputerControls(){ // Programming dynamic movement of aliens
  addDumbbell()

  const clearDB = setInterval(() => {
    removeDumbbell()
    const aliveDb = dumbbellPosition.filter(dumbbell => {
      return dumbbell.isAlive === true
    })
    const dbBottomBorderCheck = aliveDb.map(dumbbell => {//Maping through object array to trigger game end 
      if (dumbbell.index > 360) {
        cells[dumbbell.index].classList.remove('dumbbell')
        clearInterval(clearDB)
        hasGameEnded = true
        grid.textContent = `You lose! You scored ${score}`
        overallScore.innerHTML = `${score}` 
      } else if (aliveDb  === false) //If all aliens are killed, triggers end game
        grid.textContent = `You have defeated the gym heads! You scored ${score}`
    })
    const rightBorder = dumbbellPosition[dumbbellPosition.length - 1].index % width === width - 2//Defining the left and right borders of grid
    const leftBorder = dumbbellPosition[0].index % width === 1
    if (direction === 1) {
      computerMoveRight()
      if (rightBorder) {
        removeDumbbellClass()
        dumbbellPosition = dumbbellPosition.map(dumbbell => {
          dumbbell.index += width
          return dumbbell
        })
        direction = -1
        addDumbbell()
      }
    } else {
      if (direction === -1)  {
        computerMovesLeft()
        if (leftBorder) {
          removeDumbbellClass()
          dumbbellPosition = dumbbellPosition.map(dumbbell => {
            dumbbell.index += width
            return dumbbell
          })
          direction = 1
          addDumbbell()        
          
        }
        addDumbbell()
      } 
        
    }

  }, 300) 
}

function handleComputerLaser(){ //Handles alien laser behaviour
  const computerLaserID = setInterval(() => {
    let isDumbbellFree = false
    const randomDumbbell = dumbbellPosition[Math.floor(Math.random() * dumbbellPosition.length)].index //Generating random alien to shoot from
    const dumbbellToShoot = dumbbellPosition.find(dumbbell => {
      return dumbbell.index === randomDumbbell
    })
    let computerLaserIndex = dumbbellToShoot.index + width
  
    const dbLaserMovement = setInterval(() => {
      cells[computerLaserIndex].classList.remove('computerLaser')
      computerLaserIndex += width 
      cells[computerLaserIndex].classList.add('computerLaser')

      
      if (cells[computerLaserIndex].classList.contains('burger')) {
        clearInterval(dbLaserMovement)
        cells[computerLaserIndex].classList.remove('burger')  
        burgerPosition = 370 
        cells[burgerPosition].classList.add('burger')
        lives = lives - 1 
        lifeRemaining.textContent = lives
        isDumbbellFree = false
        cells[computerLaserIndex].classList.remove('computerLaser') 
      } else if (lives === 0) {
        grid.textContent = `You lose! You scored ${score}`
        overallScore.innerHTML = `${score}`   
        resetGame()      
      } else if (computerLaserIndex > 380){
        clearInterval(dbLaserMovement)
        cells[computerLaserIndex].classList.remove('computerLaser')      
      } else if (hasGameEnded){
        clearInterval(dbLaserMovement)
        clearInterval(computerLaserID)
      }
    }, 120)
  }, 3000)
}


// * * * * * EVENTS  * * * * *
startButton.addEventListener('click', handleGameStart)
document.addEventListener('keyup', handlePlayerControls)



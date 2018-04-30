// Initial values
const playerPosition = [200, 380]
const enemyPosition = [60, 140, 220]
let wins = 0
let loses = 0

// Wins and loses counter nodes
const winsCounterNode = document.querySelector('.win-counter')
const losesCounterNode = document.querySelector('.lose-counter')
winsCounterNode.innerText = `Wins: 0`
losesCounterNode.innerText = `Ooops: 0`

// Randomize functions
const randomizeSpeed = () =>
  100 + Math.floor(Math.random() * 500)

// Prototype of Player and Enemy Classes
class Entity {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  // Draw the entity on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}

// Enemy Class
class Enemy extends Entity {
  constructor(x, y, speed) {
    super(x, y, speed)
    this.sprite = 'images/enemy-bug.png'
  }

  update(dt) {
    this.x += this.speed * dt
    // Restore Enemy position if it crosses the canvas border
    if (this.x > 550) {
      this.x = -100
      this.speed = randomizeSpeed()
    }

    // Check for collision
    if (player.x < this.x + 60 && player.x + 35 > this.x
      && player.y < this.y + 25 && 30 + player.y > this.y) {
      // Reset player position
      [ player.x, player.y ] = playerPosition
      // Handle Loses counter changes
      losesCounterNode.style.visibility = 'visible'
      loses += 1
      losesCounterNode.innerText = `Ooopses: ${loses}`
    }
  }
}

// Player Class
class Player extends Entity {
  constructor(x, y, speed) {
    super(x, y, speed)
    this.sprite = 'images/char-boy.png'
  }

  update() {
    // Check for GG
    if (this.y < 0) {
      // Handle Wins counter changes
      wins += 1
      winsCounterNode.innerText = `Wins: ${wins}`
      this.x = 200
      this.y = 380
    }
  }

  handleInput(direction) {
    // Move character depends on key pressed
    switch (direction) {
      case 'left':
        if (this.x > 0) this.x -= 100
        break
      case 'up':
        if (this.y > 0) this.y -= 80
        break
      case 'right':
        if (this.x < 400) this.x += 100
        break
      case 'down':
        if (this.y < 380) this.y += 80
        break
    }
  }
}

// Initiate Player
const player = new Player(...playerPosition, 50)

// Inititate Enemies
const allEnemies = []
enemyPosition.forEach(initialPosition => {
  const enemy = new Enemy(0, initialPosition, randomizeSpeed())
  allEnemies.push(enemy)
})

// Keypress listener
document.addEventListener('keyup', (e) => {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  player.handleInput(allowedKeys[e.keyCode])
})
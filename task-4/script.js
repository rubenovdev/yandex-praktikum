'use strict'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const centralPosition = {
  x: 200,
  y: 200,
}

ctx.strokeStyle = 'white'
ctx.fillStyle = 'white'
ctx.lineWidth = 16

let testCount = 2

const drawHorizontalLine = (x, y) => {
  if (y < 0) {
    y += 400
  }

  if (y > 400) {
    y -= 400
  }

  if (x <= 25 && x >= -75) {
    ctx.moveTo(x, y)
    ctx.lineTo(x + 100, y)
  }

  if (x >= 325 && x <= 400) {
    ctx.moveTo(x - 400, y)
    ctx.lineTo(x - 300, y)
  }

  if (x < 0) {
    x += 400
  }

  if (x > 400) {
    x -= 400
  }

  ctx.moveTo(x, y)
  ctx.lineTo(x + 100, y)
}

const drawVerticalLine = (x, y) => {
  if (x < 0) {
    x += 400
  }

  if (x > 400) {
    x -= 400
  }

  if (y <= -5 && y >= -130) {
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + 150)
  }

  if (y >= 270 && y <= 395) {
    ctx.moveTo(x, y - 400)
    ctx.lineTo(x, y - 250)
  }

  if (y < 0) {
    y += 400
  }

  if (y > 400) {
    y -= 400
  }

  ctx.moveTo(x, y)
  ctx.lineTo(x, y + 150)
}

const drawLogo = () => {
  ctx.clearRect(0, 0, 400, 400)

  if (centralPosition.x === -200) {
    centralPosition.x = 200
  }

  if (centralPosition.x === 600) {
    centralPosition.x = 200
  }

  if (centralPosition.y === -200) {
    centralPosition.y = 200
  }

  if (centralPosition.y === 600) {
    centralPosition.y = 200
  }

  ctx.beginPath()
  drawHorizontalLine(centralPosition.x - 50, centralPosition.y - 85)
  drawVerticalLine(centralPosition.x - 80, centralPosition.y - 56)
  drawVerticalLine(centralPosition.x + 80, centralPosition.y - 56)
  ctx.stroke()
}

drawLogo()

const handleKeyDown = ({ key }) => {
  event.preventDefault()
  switch (key) {
    case 'ArrowUp':
      centralPosition.y -= 25
      drawLogo()
      break
    case 'ArrowRight':
      centralPosition.x += 25
      drawLogo()
      break
    case 'ArrowDown':
      centralPosition.y += 25
      drawLogo()
      break
    case 'ArrowLeft':
      centralPosition.x -= 25
      drawLogo()
      break
  }
}

document.addEventListener('keydown', handleKeyDown)

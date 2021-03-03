const WIDTH = 3
const HEIGHT = 4
const START_KEY = '1'
const CAPS_LOCK_KEY = '*'

const mobileKeyboard = [
  [[1], [2, 'a', 'b', 'c'], [3, 'd', 'e', 'f']],
  [
    [4, 'g', 'h', 'i'],
    [5, 'j', 'k', 'l'],
    [6, 'm', 'n', 'o'],
  ],
  [
    [7, 'p', 'q', 'r', 's'],
    [8, 't', 'u', 'v'],
    [9, 'w', 'x', 'y', 'z'],
  ],
  [['*'], [0], ['#']],
]

function generateKeyboardMap() {
  return mobileKeyboard.reduce((acc, item, y) => {
    item.forEach((button, x) => {
      button.forEach((key, index) => {
        acc[key] = { x, y, index }
      })
    })

    return acc
  }, {})
}

function getClicks(currentKey, nextKey) {
  const { x, y } = currentKey
  const { x: nextX, y: nextY, index } = nextKey

  const dx = Math.abs(x - nextX)
  const dy = Math.abs(y - nextY)

  return Math.min(dx, WIDTH - dx) + Math.min(dy, HEIGHT - dy) + index + 2
}

function mobileRemote(text) {
  const path = text.split('')
  const keyboardMap = generateKeyboardMap()

  let isCapsLockMode = false
  let currentKey = START_KEY
  let clicks = 0

  path.forEach((rawKey) => {
    const key = rawKey.toLowerCase()
    const inUpperCase = key !== rawKey
    const isLetter = key !== key.toUpperCase()

    if (isLetter && inUpperCase !== isCapsLockMode) {
      clicks += getClicks(keyboardMap[currentKey], keyboardMap[CAPS_LOCK_KEY])
      currentKey = CAPS_LOCK_KEY
      isCapsLockMode = !isCapsLockMode
    }

    clicks += getClicks(keyboardMap[currentKey], keyboardMap[key])
    currentKey = key
  })

  return clicks
}

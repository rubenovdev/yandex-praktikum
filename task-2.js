const UPPER = 'upper'
const LOWER = 'low'

const buttons = [
  {
    chars: ['1'],
    row: 1,
    cell: 1,
  },
  {
    chars: ['2', 'a', 'b', 'c'],
    row: 1,
    cell: 2,
  },
  {
    chars: ['3', 'd', 'e', 'f'],
    row: 1,
    cell: 3,
  },
  { chars: ['4', 'g', 'h', 'i'], row: 2, cell: 1 },

  { chars: ['5', 'j', 'k', 'l'], row: 2, cell: 2 },
  { chars: ['6', 'm', 'n', 'o'], row: 2, cell: 3 },
  { chars: ['7', 'p', 'q', 'r', 's'], row: 3, cell: 1 },
  { chars: ['8', 't', 'u', 'v'], row: 3, cell: 2 },
  { chars: ['9', 'w', 'x', 'y', 'z'], row: 3, cell: 3 },
  { chars: ['*'], row: 4, cell: 1 },
  { chars: ['0'], row: 4, cell: 2 },
  { chars: ['#'], row: 4, cell: 3 },
]

const countStepsToDesiredPosition = (currentButton, desiredButton) => {
  let rowSteps = Math.abs(currentButton.row - desiredButton.row)
  let cellSteps = Math.abs(currentButton.cell - desiredButton.cell)

  return (rowSteps > 2 ? 1 : rowSteps) + (cellSteps === 2 ? 1 : cellSteps)
}

const countStepsToSelectDesiredChar = (chars, desiredChar) => {
  let foundCharIndex

  chars.find((char, index) => {
    if (desiredChar === char) {
      foundCharIndex = index

      return true
    }
  })

  return 2 + foundCharIndex
}

function mobileRemote(text) {
  let currentButton = { row: 1, cell: 1 }
  let actionsCounter = 0
  let currentRegister = LOWER

  const buttonToChangeRegister = buttons[9]

  for (const currentTextChar of text) {
    let stepsToChangeRegister = 0

    const currentTextCharLower = currentTextChar.toLowerCase()
    const isLowerRegister = currentTextCharLower === currentTextChar
    const charRegister = isLowerRegister ? LOWER : UPPER

    if (charRegister !== currentRegister) {
      const stepsToChangePosition = countStepsToDesiredPosition(
        currentButton,
        buttonToChangeRegister
      )

      stepsToChangeRegister = stepsToChangePosition + 2
      currentRegister = charRegister
      currentButton = buttonToChangeRegister
    }

    buttons.find((button) => {
      const foundChar = button.chars.find(
        (char) => char === currentTextCharLower
      )

      if (foundChar) {
        foundButton = button
      }

      return Boolean(foundChar)
    })

    const stepsToDesiredPosition = countStepsToDesiredPosition(
      currentButton,
      foundButton
    )

    const stepsToSelectDesiredChar = countStepsToSelectDesiredChar(
      foundButton.chars,
      currentTextCharLower
    )

    actionsCounter +=
      stepsToDesiredPosition + stepsToSelectDesiredChar + stepsToChangeRegister

    currentButton = foundButton
  }

  return actionsCounter
}

console.log(mobileRemote('C')) // 10
console.log(mobileRemote('yandex')) // 34

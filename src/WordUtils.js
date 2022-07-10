export function computeLetterStates(guess, word) {
    const lettersToCheck = word.split("")
    const letters = guess.split("")
    const letterStates = letters.map(_letter => "miss")
    for (let i = letters.length - 1; i >= 0; i--) {
        if (word[i] === letters[i]) {
            letterStates[i] = "match"
            lettersToCheck.splice(i, 1)
        }
    }
    letters.forEach((letter, i) => {
        if (lettersToCheck.includes(letter) && letterStates[i] !== "match") {
            letterStates[i] = "present"
            lettersToCheck.splice(lettersToCheck.indexOf(letter), 1)
        }
    })
    return letterStates
}

export function computeLetterStates(guess, word) {
    const lettersToCheck = word.split("")
    const letters = guess.split("")
    function letterState(letter, i) {
        if (letter === word[i]) {
            lettersToCheck.splice(i, 1)
            return "match"
        }
        if (lettersToCheck.includes(letter)) {
            lettersToCheck.splice(lettersToCheck.indexOf(letter), 1)
            return "present"
        }
        return "miss"
    }
    return letters.map(letterState)
}

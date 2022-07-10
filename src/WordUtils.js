export function computeLetterStates(guess, word) {
    const lettersToCheck = word.split("")
    const letters = guess.split("")

    function match(obj, i) {
        if (obj.letter === word[i]) {
            lettersToCheck[i] = ""
            return { letter: obj.letter, state: "match" }
        }
        return obj
    }
    function exists(obj, _) {
        if (obj.state !== "match" && lettersToCheck.includes(obj.letter)) {
            lettersToCheck[lettersToCheck.indexOf(obj.letter)] = ""
            return { letter: obj, state: "present" }
        }
        return obj
    }

    return letters.map(letter => ({ letter: letter, state: "miss" }))
        .map(match)
        .map(exists)
        .map(({ state }) => state)
}

#!/usr/bin/env node
const colors = require('colors')

// Tokens
const LETTER_TOKEN = '[LETTER]'
const YELLOW_LETTER_BASE = `:alphabet-yellow-${LETTER_TOKEN}:`
const WHITE_LETTER_BASE = `:alphabet-white-${LETTER_TOKEN}:`

// We can safely skip the first two arguments as they will always be the node path & file name
let arguments = process.argv.slice(2)

// Determine target (take the first element of the array)
const [target] = arguments

// Warn the user if they've provided too many targets
if (arguments.length > 1) {
    console.warn(colors.yellow(`[WARNING]: Encountered more than one input: ${arguments.join(', ')}. This script will use the first target. Ignoring the rest.`))
}

// Validate whether we can actually slackify this word or not
const chars = target.toLowerCase().replace(/\W/g, '').split('')

let counts = {}
let emojis = []

for (const char of chars) {
    if (counts[char] == null) {
        emojis.push(YELLOW_LETTER_BASE.replace(LETTER_TOKEN, char))
        counts[char] = 1
    } else if (counts[char] != null && counts[char] === 1) {
        emojis.push(WHITE_LETTER_BASE.replace(LETTER_TOKEN, char))
        counts[char] = counts[char] + 1
    } else {
        console.log(colors.red(`Cannot slackify this word as it has too many of the letter ${char}. Pick a different word.`))
        process.exit(1)
    }
}

console.log(colors.cyan(emojis.join(' ')))
process.exit(0)
const { last, first, takeWhile, takeRightWhile, capitalize } = require('lodash')

function isCapitalizedWord(str) {
  return capitalize(str) === str
}

function isCapitalizedHeadline(headline) {
  return toWords(headline)
    .filter((word) => word.length > 3)
    .every(isCapitalizedWord)
}

function removePunctuation(str) {
  return str
    .replace(/^['’‘]/, '')
    .replace(/['’‘]$/, '')
    .replace(/[,.?!:]/, '')
}

function toWords(sentence) {
  return sentence
    .split(' ')
    .filter((i) => i !== '')
    .map(removePunctuation)
}

function sanitizeTitle(title) {
  return title.trim()
}

function parseSubjectSnippet(subjectSnippet, { isCapitalized }) {
  const words = toWords(subjectSnippet)
  if (!words.length) return ''
  const lastWord = last(words)
  if (isCapitalizedWord(lastWord) && !isCapitalized) {
    return takeRightWhile(words, isCapitalizedWord).join(' ')
  }
  return lastWord
}

function parseObjectSnippet(objectSnippet, { isCapitalized }) {
  const words = toWords(objectSnippet)
  if (!words.length) return ''
  const firstWord = first(words)
  if (/['’]s$/.test(firstWord)) {
    return firstWord.replace(/['’]s/, '')
  }
  if (isCapitalizedWord(firstWord) && !isCapitalized) {
    return takeWhile(words, isCapitalizedWord).join(' ')
  }
  return firstWord
}

// given a "slam" object, return the slammer and slammee.
function parse(title) {
  const [subjectSnippet, objectSnippet] = sanitizeTitle(title).split(/slams/i)
  const isCapitalized = isCapitalizedHeadline(title)
  const slammer = parseSubjectSnippet(subjectSnippet, { isCapitalized })
  const slammee = parseObjectSnippet(objectSnippet, { isCapitalized })
  return { slammer, slammee }
}

module.exports = parse

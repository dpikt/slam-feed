const { last, first, takeWhile, takeRightWhile, capitalize } = require('lodash')

function isCapitalizedWord(str) {
  return capitalize(str) === str
}

function isShortWord(word) {
  return word.length <= 3
}

function isCapitalizedHeadline(headline) {
  return toWords(headline)
    .filter((w) => !isShortWord(w))
    .every(isCapitalizedWord)
}

function cutOffAfterPunctuation(str) {
  return str.replace(/[,.?!:;].*$/, '')
}
function cutOffBeforePunctuation(str) {
  return str.replace(/^.*[,.?!:;]/, '')
}

function removePunctuation(str) {
  return str.replace(/^['’“"‘]/, '').replace(/['’”‘]$/, '')
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
  const restOfSentence = cutOffBeforePunctuation(subjectSnippet)
  const words = toWords(restOfSentence)
  if (!words.length) return ''
  const lastWord = last(words)
  if (isCapitalizedWord(lastWord) && !isCapitalized) {
    return takeRightWhile(words, isCapitalizedWord).join(' ')
  }
  return lastWord
}

function removePossession(word) {
  if (/['’]s$/.test(word)) {
    return word.replace(/['’]s/, '')
  }
  return word
}

function parseObjectSnippet(objectSnippet, { isCapitalized }) {
  const restOfSentence = cutOffAfterPunctuation(objectSnippet)
  const words = toWords(restOfSentence)
  if (!words.length) return ''
  const firstWord = first(words)
  let objectWords = [firstWord]
  if (isCapitalizedWord(firstWord) && !isCapitalized) {
    objectWords = takeWhile(words, isCapitalizedWord)
  }
  return objectWords.map(removePossession).join(' ')
}

// given a "slam" object, return the slammer and slammee.
function parse(title) {
  if (title.includes('slams into')) throw new Error('wrong type of slam')
  const [subjectSnippet, objectSnippet] = sanitizeTitle(title).split(/slams/i)
  const isCapitalized = isCapitalizedHeadline(title)
  const slammer = parseSubjectSnippet(subjectSnippet, { isCapitalized })
  const slammee = parseObjectSnippet(objectSnippet, { isCapitalized })
  if (isShortWord(slammer) || isShortWord(slammee))
    throw new Error('no short words, please')
  return { slammer, slammee }
}

module.exports = parse

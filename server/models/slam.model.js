const db = require('../../config/db')
const parse = require('../../parser/parse')

function addParsedAttributes(slam) {
  const { slammer, slammee } = parse(slam.title)
  return {
    ...slam,
    slammer,
    slammee,
  }
}

async function all() {
  const result = await db.query(`
    select * from slams
  `)
  return result.rows.map(addParsedAttributes)
}

async function latest() {
  const result = await db.query(`
    select time from slams order by time limit 1
  `)
  return result.rowCount > 0 ? result.rows[0] : null
}

async function create({ title, url, time }) {
  // TODO some validation
  const result = await db.query(
    `
    insert into slams 
    values($1, $2, $3)
    on conflict(title) do nothing
  `,
    [title, url, time]
  )
  return result
}

module.exports = { all, latest, create }

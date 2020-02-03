const db = require('../db')

async function all() {
  const result = await db.query(`
    select * from slams
  `)
  return result.rows
}

module.exports = { all }

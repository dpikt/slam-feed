const db = require('../db')

async function main() {
  await db.query(`
    create table if not exists slams(
       slammer char(50),
       slammee char(50),
       sourceUrl jsonb,
       time timestamp
    )
    `)
  process.exit(0)
}

main()

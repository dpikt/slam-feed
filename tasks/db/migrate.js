const db = require('../../config/db')

async function main() {
  await db.query(`
    create table if not exists slams(
       title char(200),
       url char(200),
       time timestamp,
       primary key(title)
    )
    `)
  process.exit(0)
}

main()

const { Pool } = require('pg')

const pool = new Pool({
  user: 'dpikt',
  // password: PGPASSWORD,
  database: 'slams',
  // port: PGPORT,
  // host: PGHOST,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  // ssl: PGSSL,
})

// Note used currently...
// function end() {
//   pool.end()
// }

function query(queryString, args) {
  return pool.query(queryString, args).catch(console.error)
}

module.exports = {
  // end,
  query,
}

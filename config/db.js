const { Pool } = require('pg')
const url = require('url')

function parseHerokuEnv(databaseUrl) {
  const params = url.parse(databaseUrl)
  const auth = params.auth.split(':')
  return {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  }
}

const pool = process.env.DATABASE_URL
  ? new Pool(parseHerokuEnv(process.env.DATABASE_URL))
  : new Pool({
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

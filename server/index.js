const Koa = require('koa')
const app = new Koa()

const { PORT = 3000 } = process.env

const router = require('./routes')
app.use(router.routes()).use(router.allowedMethods())

async function main() {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
}

main()

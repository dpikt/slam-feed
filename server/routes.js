const Router = require('koa-router')
const apiRouter = new Router()
const router = new Router()
const slamController = require('./controllers/slam.controller')
const serveStatic = require('koa-static')
const fs = require('fs')

apiRouter.get('/slams', slamController.index)
apiRouter.delete('/slams/:id', slamController.destroy)

// Nest API routes
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

// Use build folder for static files
router.use(serveStatic('build'))

// Send main index file for every request
router.get('*', (ctx) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('../build/index.html')
})

module.exports = router

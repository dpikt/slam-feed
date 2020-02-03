const Router = require('koa-router')
const apiRouter = new Router()
const router = new Router()
const slamController = require('./controllers/slam.controller')

apiRouter.get('/slams', slamController.index)

// Nest API routes
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

module.exports = router

const Slam = require('../models/slam.model')

async function index(ctx, next) {
  ctx.body = await Slam.all()
  // return next()
}

async function destroy(ctx, next) {
  await Slam.destroy(ctx.params.id)
  ctx.body = 'Success'
  // return next()
}

module.exports = { index, destroy }

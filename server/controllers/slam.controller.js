const Slam = require('../models/slam.model')

async function index(ctx, next) {
  ctx.body = await Slam.all()
  return next()
}

module.exports = { index }

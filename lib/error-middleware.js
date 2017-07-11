'use strict'

module.exports = (err, req, res, next) => {//eslint-disable-line
  console.error(err.message)
  // if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400)

  if(err.message.toLowerCase().includes('data and salt arguments'))
    return res.sendStatus(401)

  if(err.message.toLowerCase().includes('no authorization provided'))
    return res.sendStatus(401)

  // if duplacte key respond with 409
  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409)

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404)

  res.sendStatus(500)
}

'use strict'

const faker = require('faker')
const User = require('../../model/user.js')

const mockUser = module.exports = {}

mockUser.createOne = () => {
  let result = {}
  result.pass = faker.internet.password()
  return new User({username: faker.internet.userName()})
    .createPassHash(result.pass)
    .then(user => {
      result.user = user
      return user.createToken()
    })
    .then(token => {
      result.token = token
      return result
    })
}

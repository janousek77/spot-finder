'use strict'

const dotenv = require('dotenv')
dotenv.config({path: `${__dirname}/../.test.env`})

const expect = require('expect')
const superagent = require('superagent')

const server = require('../lib/server.js')
const mockUser = require('./lib/mock-user.js')

const ROOT_URL = `http://localhost:${process.env.PORT}`

describe('Testing user routes', () => {
  before(server.start)
  after(server.stop)

  describe('testing Post route', () => {
    it('Should create a user and authenticate', () => {
      return superagent.post(`${ROOT_URL}/api/signup`)
        .send({username: 'awesome', pass: '12345'})
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.text).toExist()
        })
    })
    it('should return 401 error', () => {
      return superagent.post(`${ROOT_URL}/api/signup`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })
  })
  describe('Testing GET request', () => {
    it('Should return a status of 200', () => {
      let testUser
      return mockUser.createOne()
        .then(userData => {
          testUser = userData
          console.log(testUser)
          let encoded = new Buffer(`${testUser.username}:${userData.pass}`).toString('base64')
          return superagent.get(`${ROOT_URL}/api/signin`)
            .set('Authorization', `Basic ${encoded}`)
        })
        .then(res => {
          expect(res.status).toEqual(200)
          expect(res.text).toExist()
        })
    })
    it('Should return a status of 401', () => {
      return superagent.get(`${ROOT_URL}/api/signin`)
        .catch(res => {
          expect(res.status).toEqual(401)
        })
    })
  })
})

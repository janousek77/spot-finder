const faker = require('faker')
const moment = require('moment')
const Event = require('../../model/event.js')
const mockUser = require('./mock-user.js')

const mockEvent = {}



mockEvent.createOneTestCase = (owner = null) => {
  const startTime = moment(Date.now()).add(Math.floor(Math.random() * 100)+ 1)
  return {
    start: startTime,
    end: startTime.add(Math.floor(Math.random() * 6 + 1), 'hours'),
    numberOfPeople: Math.floor(Math.random() * 200 + 1),
    venue: null,
    owner: owner ? owner._id : null,
  }
}

mockEvent.createOne = (owner = null) => {
  return new Event(mockEvent.createOneTestCase(owner)).save()
}

mockEvent.createMany = (number) => {
  return Promise.all(
    new Array(number)
      .fill(0)
      .map(() => mockUser.createOne()
        .then(user => mockEvent.createOne(user))))
}


module.exports = mockEvent
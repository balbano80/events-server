import 'babel-polyfill'
import request from 'supertest'
import { expect } from 'chai'
import app from '../../../server/server'
import {yellow, blue, green, red, greenf, redf} from '../../../logger/'
import {
  dropCollection,
  insertMany,
  find,
} from '../../../db'
import { sevenEvents } from './fixture'
// import { eventToPost, eventAfter, postalCodes } from './fixture'
// import { omit } from 'ramda'

require('dotenv').config()

const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)

after(async () => {
  if (!process.env.WATCH) {
    setTimeoutPromise(1900).then((value) => {
      process.exit(0)
    })
  }
})

describe('READ /events', async () => {
  before(async () => {
      await dropCollection('events')
  })
  it('read all events', async () => {
    const r1 = await insertMany('events', sevenEvents)
    // yellow('r1', r1)
    expect(r1.data.length).to.equal(7)
    // const r2 = await find('events', {})
    const r2 = await request(app).get('/events')
    yellow('r2', r2.body.data)

    // expect()
    // const insertedData = await insertMany('postalCodes', postalCodes)

  })

})




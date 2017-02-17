/**
 * Test case for authorize.
 * Runs with mocha.
 */
'use strict'

const authorize = require('../lib/authorize.js')
const assert = require('assert')
const asleep = require('asleep')
const aport = require('aport')
const co = require('co')
const sgSocket = require('sg-socket')
const sgSocketClient = require('sg-socket-client')
const socketIOAuth = require('socketio-auth')

describe('authorize', function () {
  this.timeout(16000)

  let port, io

  before(() => co(function * () {
    port = yield aport()
    io = sgSocket(port)
    socketIOAuth(io, {
      timeout: 'none',
      authenticate (socket, data, callback) {
        let valid = data.token === 'mytoken'
        callback(null, valid)
      }
    })
  }))

  after(() => co(function * () {
    yield asleep(200)
    io.close()
    yield asleep(100)
  }))

  it('Authorize', () => co(function * () {
    let socket = sgSocketClient(`http://localhost:${port}`)
    yield socket.waitToConnect()
    yield authorize(socket, {
      token: 'mytoken'
    })
    socket.disconnect()
    yield socket.waitToDisconnect()
  }))
})

/* global describe, before, after, it */

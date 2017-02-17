'use strict'

const co = require('co')
const { authorize } = require('sugo-client-auth')
const sgSocketClient = require('sg-socket-client')

co(function * () {
  let socket = sgSocketClient('http://localhost:3000')
  yield socket.waitToConnect()
  yield authorize(socket, {
    token: 'mytoken'
  })
  /* ... */
  socket.disconnect()
  yield socket.waitToDisconnect()
}).catch((err) => console.error(err))

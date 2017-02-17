/**
 * Authorize sugo-client
 * @module sugo-client-auth
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get authorize () { return d(require('./authorize')) }
}

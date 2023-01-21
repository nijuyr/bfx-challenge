'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const { submitOrder } = require('./order')
const Orderbook = require('./orderbook')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

// peer.request('rpc_test', { msg: 'hello' }, { timeout: 10000 }, (err, data) => {
//   if (err) {
//     console.error(err)
//     process.exit(-1)
//   }
//   console.log(data) // { msg: 'world' }
// })

/////////////////////////////

// orderbook
const orderbook = new Orderbook()

// order

submitOrder(peer, orderbook, {
    type: 'buy',
    price: 1000,
    quantity: 1,
})

submitOrder(peer, orderbook, {
    type: 'sell',
    price: 900,
    quantity: 1,
})
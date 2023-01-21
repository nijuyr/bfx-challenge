'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const { v4: uuidv4 } = require('uuid')
const { REQUEST_TYPE } = require('../constants')
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
function submitOrder(orderData) {
    console.log('submitOrder')
    // some validation here
    
    const order = {
        id: uuidv4(),
        type: orderData.type,
        price: orderData.price,
        quantity: orderData.quantity,
    }

    // add to orderbook
    orderbook.addOrder(order)

    // will need to send out the order info
    peer.request('order_service', {
        type: REQUEST_TYPE.ADD_ORDER,
        order,
    }, {
        timeout: 10000,
    }, (err, data) => {
        if (err) {
            console.error('order error', err)
            return
        }
        console.log('order added', data)
    })
}

submitOrder({
    type: 'buy',
    price: 1000,
    quantity: 1,
})

submitOrder({
    type: 'sell',
    price: 900,
    quantity: 1,
})
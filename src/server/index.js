'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')


const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)


setInterval(function () {
    link.announce('order_service', service.port, {})
  }, 1000)
  
/////////////////////////////

// orderbook
class Orderbook {
    constructor() {
       
    }

    //** takes an order with buy/sell order type, and store in Map */
    addOrder(order) {

    }

    //** matches orders stored in Map based on the order price. if matches then process the order and reduce */
    matchOrders() {

    }
}

const orderbook = new Orderbook()

//! extract
// RPC service part
service.on('request', (rid, key, payload, handler) => {
    switch (payload.type) {
        case 'addOrder':
            orderbook.addOrder(payload.order)
            handler.reply(null, {
                response: 'ok'
            })
            break
    }
})
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
        this.orders = new Map();
    }

    getBuyOrders() {
        return Array.from(this.orders.values()).filter(order => order.type === 'buy');
    }
    
    getSellOrders() {
        return Array.from(this.orders.values()).filter(order => order.type === 'sell');
    }

    //** takes an order with buy/sell order type, and store in Map */
    addOrder(order) {
        this.orders.set(order.id, order);
        console.log(`Order added: ${order.id}`);
        this.matchOrders();
    }

    //** matches orders stored in Map based on the order price. if matches then process the order and reduce */
    matchOrders() {
        const buyOrders = this.getBuyOrders()
        const sellOrders = this.getSellOrders()
        const matchedOrders = buyOrders.reduce((matched, buyOrder) => {
            const sellOrder = sellOrders.find(order => order.price <= buyOrder.price);
            if (sellOrder) {
                matched.push({ buyOrder, sellOrder });
                sellOrders.splice(sellOrders.indexOf(sellOrder), 1);
            }
            return matched;
        }, []);

        matchedOrders.forEach(({buyOrder, sellOrder}) => {
            //! execute trade
            this.orders.delete(buyOrder.id);
            this.orders.delete(sellOrder.id);
            console.log(`Orders matched: ${buyOrder.id}, ${sellOrder.id} `);
            console.log(`Orders left: ${this.orders.size}`)
         });
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
'use strict'

class Orderbook {
    constructor() {
        this.orders = new Map()
    }

    addOrder(order) {
        this.orders.set(order.id, order)
    }

    getOrders() {
        return this.orders
    }
}

module.exports = Orderbook
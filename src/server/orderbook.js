class Orderbook {
    constructor() {
        this.orders = new Map()
    }

    getBuyOrders() {
        return Array.from(this.orders.values()).filter(order => order.type === 'buy')
    }
    
    getSellOrders() {
        return Array.from(this.orders.values()).filter(order => order.type === 'sell')
    }

    //** takes an order with buy/sell order type, and store in Map */
    addOrder(order) {
        this.orders.set(order.id, order)
        console.log(`Order added: ${order.id}`)
        this.matchOrders()
    }

    //** matches orders stored in Map based on the order price. if matches then process the order and reduce */
    matchOrders() {
        const buyOrders = this.getBuyOrders()
        const sellOrders = this.getSellOrders()
        const matchedOrders = buyOrders.reduce((matched, buyOrder) => {
            const sellOrder = sellOrders.find(order => order.price <= buyOrder.price)
            if (sellOrder) {
                matched.push({ buyOrder, sellOrder })
                sellOrders.splice(sellOrders.indexOf(sellOrder), 1)
            }
            return matched
        }, [])

        matchedOrders.forEach(({buyOrder, sellOrder}) => {
            //! execute trade
            this.orders.delete(buyOrder.id)
            this.orders.delete(sellOrder.id)
            console.log(`Orders matched: ${buyOrder.id}, ${sellOrder.id} `)
            console.log(`Orders left: ${this.orders.size}`)
        })
    }
}

module.exports = Orderbook
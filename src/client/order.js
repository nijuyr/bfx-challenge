const { v4: uuidv4 } = require('uuid')
const { REQUEST_TYPE } = require('../constants')

function submitOrder(peer, orderbook, orderData) {
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

module.exports = {
    submitOrder,
}
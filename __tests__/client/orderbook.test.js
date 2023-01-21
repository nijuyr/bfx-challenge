const { submitOrder } = require('../../src/client/order')
const Orderbook = require('../../src/client/orderbook')
const PeerMock = require('./mocks/peer')

describe('Orderbook:Client', () => {
  let orderbook
  let peerMock

  beforeEach(() => {
    orderbook = new Orderbook()
    peerMock = new PeerMock()
  })


  beforeEach(() => {
    orderbook = new Orderbook()
  })

  test('addOrder() should add an order to the orderbook', () => {
    const order = { id: 1, type: 'buy', price: 100 }
    orderbook.addOrder(order)
    expect(orderbook.orders.get(1)).toEqual(order)
  })

  test('submitOrder() should keep its own orderbook after submitting an order', () => {
    const order = { id: 1, type: 'buy', price: 100 }
    submitOrder(peerMock, orderbook, order)
    expect(orderbook.orders.size).toBe(1)
  })

})
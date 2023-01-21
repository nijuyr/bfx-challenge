const Orderbook = require('../../src/server/orderbook')

describe('Orderbook:Server', () => {
  let orderbook

  beforeEach(() => {
    orderbook = new Orderbook()
  })

  test('addOrder() should add an order to the orderbook', () => {
    const order = { id: 1, type: 'buy', price: 100 }
    orderbook.addOrder(order)
    expect(orderbook.orders.get(1)).toEqual(order)
  })

  test('getBuyOrders() should return all buy orders', () => {
    const buyOrder1 = { id: 1, type: 'buy', price: 100 }
    const buyOrder2 = { id: 2, type: 'buy', price: 90 }
    const sellOrder = { id: 3, type: 'sell', price: 110 }
    orderbook.addOrder(buyOrder1)
    orderbook.addOrder(buyOrder2)
    orderbook.addOrder(sellOrder)
    const buyOrders = orderbook.getBuyOrders()
    expect(buyOrders).toEqual([buyOrder1, buyOrder2])
  })

  test('getSellOrders() should return all sell orders', () => {
    const buyOrder = { id: 1, type: 'buy', price: 100 }
    const sellOrder1 = { id: 2, type: 'sell', price: 110 }
    const sellOrder2 = { id: 3, type: 'sell', price: 120 }
    orderbook.addOrder(buyOrder)
    orderbook.addOrder(sellOrder1)
    orderbook.addOrder(sellOrder2)
    const sellOrders = orderbook.getSellOrders()
    expect(sellOrders).toEqual([sellOrder1, sellOrder2])
  })

  test('matchOrders() should match and execute trade on matching orders', () => {
    const buyOrder = { id: 1, type: 'buy', price: 100 }
    const sellOrder = { id: 2, type: 'sell', price: 90 }
    orderbook.addOrder(buyOrder)
    orderbook.addOrder(sellOrder)
    orderbook.matchOrders()
    expect(orderbook.orders.size).toBe(0)
  })

  test('matchOrders() should not match and execute trade on non-matching orders', () => {
    const buyOrder = { id: 1, type: 'buy', price: 100 }
    const sellOrder = { id: 2, type: 'sell', price: 110 }
    orderbook.addOrder(buyOrder)
    orderbook.addOrder(sellOrder)
    orderbook.matchOrders()
    expect(orderbook.orders.size).toBe(2)
  })

  test('matchOrders() should match orders in FIFO order', () => {
    const order1 = { id: 1, type: 'buy', price: 100, timestamp: new Date().getTime() - 10 }
    const order2 = { id: 2, type: 'buy', price: 100, timestamp: new Date().getTime() - 20 }
    const order3 = { id: 3, type: 'sell', price: 100, timestamp: new Date().getTime() - 15 }
    orderbook.addOrder(order1)
    orderbook.addOrder(order2)
    orderbook.addOrder(order3)
    orderbook.matchOrders()
    expect(orderbook.orders.get(1)).toEqual(order1)
    expect(orderbook.orders.get(3)).toBeUndefined()
  })
})
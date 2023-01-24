# Distributed Exchange
This is a simplified distributed exchange that uses a distributed hash table (DHT) to enable communication between nodes.

## Features
- Each client has its own instance of the orderbook.
- Clients submit orders to their own instance of the orderbook, which is then distributed to other instances.
- If a client's order matches with another order, the remainder is added to the orderbook as well.
Requirements
- Code written in Javascript
- Uses Grenache for communication between nodes
- Simple order matching engine
- Does not include a UI or HTTP API

## Usage
Install the necessary libraries by running `npm install --save grenache-nodejs-http grenache-nodejs-link`
Start the DHT by running `grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'` and `grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'`
Start the server and client using the provided index.js file as an example
```
node src/server/index.js
node src/client/index.js
```

## Limitations
- The implementation is time critical and uses FIFO transaction.
## Testing
Run `npm test` to run the test cases that ensure the implemented functions are working correctly.

## Additional Changes
- You can add additional validation and error handling.
- Add more advanced order matching algorithms.
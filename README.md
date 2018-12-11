# Developer guide

```js
Mosaic = require('./index');
Mosaic.ValueChainId = '0x0000000000000000000000000000000000000001';

mosaic = new Mosaic("ws://localhost:8020");

mosaic.eth.getBlockNumber().then(console.log);


mosaic.aux('0x0000000000000000000000000000000000000002').getBlockNumber().then(console.log);

mosaic.aux('0x0000000000000000000000000000000000000001').getBlockNumber().then(console.log);
```



# Using AbiBinProvider
```js
Mosaic = require('./index')
abiBinProvider = new Mosaic.utils.AbiBinProvider();
jsonInterface = abiBinProvider.getABI('EIP20TokenMock');
contractBin = abiBinProvider.getBIN('EIP20TokenMock');
```
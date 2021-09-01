# TpSeries

Library written in node.js for TOP Vending Machine tp products

**Supported devices:** TP1, TP11, TP2, TP3

## Installation

Install from npm:

```bash
npm install tp-rs232
```



```js
const TpSeries = require('tp-rs232');

let tp = new TpSeries({
  debug: true,
  timeout: 5000
});
```

## Methods
All methods use Promise
- ```tp.open('COM1')``` - Connect device
- ```tp.close()``` - Disconnect device
- ```tp.command('COMMAND_NAME')``` - Execute command and get answer
- ```tp.enabled``` - Validator status
- ```tp.openPort``` - Port status
- ```tp.powerUp``` - Power Up (Bill Acceptor Active)

## Command
```js
tp.command('ENABLE')
.then(result => {
    console.log('status:', result.status)
    return;
})

tp.command('ACCEPT_BANKNOTE')
```
See [all supported commands](#supported-commands)


## Event
```js
eSSP.on('READ_NOTE', result => {
    console.log(result)
})
```
See [all supported events](#supported-events)


## Example
```js
const TpSeries = require('tp-rs232');

let serialPortConfig = {
  baudrate: 9600,
  databits: 8,
  stopbits: 1,
  parity: 'even'
};

let tp = new TpSeries({
  debug: false,
  timeout: 5000
});

tp.on('OPEN', () => {
  console.log('Port opened!');
});

tp.on('CLOSE', () => {
  console.log('Port closed!');
});

tp.on('READ_NOTE', (result) => {
  console.log('READ_NOTE');
  console.log(result);

  if (result.channel === 2) {
    tp.command('REJECT_BANKNOTE');
  } else {
    tp.command('ACCEPT_BANKNOTE');
  }
});

tp.on('STACKING', (result) => {
  console.log(result);

  if (result.channel === 1) {
    tp.command('DISABLE').then((result) => {
      console.log(result);
      tp.close();
    });
  }

  if (result.channel === 3) {
    tp.removeAllListeners();
  }
});

tp.on('CLOSE', () => {
  console.log('CLOSE');
});
tp.on('POWER_UP', () => {
  console.log('POWER_UP');
});
tp.on('MOTOR_FAILURE', () => {
  console.log('MOTOR_FAILURE');
});
tp.on('CHECKSUM_ERROR', () => {
  console.log('CHECKSUM_ERROR');
});
tp.on('BILL_JAM', () => {
  console.log('BILL_JAM');
});
tp.on('BILL_REMOVE', () => {
  console.log('BILL_REMOVE');
});
tp.on('STACKER_OPEN', () => {
  console.log('STACKER_OPEN');
});
tp.on('SENSOR_PROBLEM', () => {
  console.log('SENSOR_PROBLEM');
});
tp.on('BILL_FISH', () => {
  console.log('BILL_FISH');
});
tp.on('STACKER_PROBLEM', () => {
  console.log('STACKER_PROBLEM');
});
tp.on('BILL_REJECT', () => {
  console.log('BILL_REJECT');
});
tp.on('INVALID_COMMAND', () => {
  console.log('INVALID_COMMAND');
});
tp.on('RESERVED', () => {
  console.log('RESERVED');
});
tp.on('RESPONSE_WHEN_ERROR', () => {
  console.log('RESPONSE_WHEN_ERROR');
});
tp.on('ENABLE', (result) => {
  console.log('ENABLE');
  console.log(result);
});
tp.on('DISABLE', (result) => {
  console.log('DISABLE');
  console.log(result);
});
tp.on('REJECT', () => {
  console.log('REJECT');
});
tp.on('COMMAND_NOT_FOUND', () => {
  console.log('COMMAND_NOT_FOUND');
});

tp.open('/dev/tty.usbserial-14330', serialPortConfig)
  .then(() => {
    console.log('GO!!!');

    tp.command('POWER_UP')
      .then(() => tp.command('ENABLE'))
      .then((result) => {
        console.log(result);
      });
  })
  .catch((error) => {
    console.log(error);
  });
```

### Supported Commands:

Command name						|	Information return	|	Need promise	|	Description
------------------------------------|-------------------|-----------------------|-------------------
[POWER_UP](#POWER_UP)				|	**yes**	|	**no**	|	Power Up (Bill Acceptor Active)
[ACCEPT_BANKNOTE](#ACCEPT_BANKNOTE)	|	**yes**	|	**no**	|	Command to accept a banknote
[REJECT_BANKNOTE](#REJECT_BANKNOTE)	|	**yes**	|	**no**	|	Command to reject a banknote
[HOLD_ESCROW](#HOLD_ESCROW)			|	**yes**	|	**no**	|	Hold in Escrow
[STATUS](#STATUS)					|	**yes**	|	**yes**	|	Returns the current status of the device
[ENABLE](#ENABLE)					|	**yes**	|	**yes**	|	Command to enable the banknote validator
[DISABLE](#DISABLE)					|	**yes**	|	**yes**	|	Command to disable the banknote validator
[RESET](#RESET)					    |	**yes**	|	**no**	|	Command to reset the device

### Example commands with options:

###### POWER_UP
```js
tp.command('POWER_UP').then((result) => console.log(result););
```
###### ACCEPT_BANKNOTE
```js
tp.command('ACCEPT_BANKNOTE').then((result) => console.log(result););
```
###### REJECT_BANKNOTE
```js
tp.command('REJECT_BANKNOTE').then((result) => console.log(result););
```
###### HOLD_ESCROW
```js
tp.command('HOLD_ESCROW').then((result) => console.log(result););
```
###### RESET
```js
tp.command('RESET').then((result) => console.log(result););
```
###### STATUS
```js
tp.command('STATUS').then((result) => console.log(result););
```
###### ENABLE
```js
tp.command('ENABLE').then((result) => console.log(result););
```
###### DISABLE
```js
tp.command('DISABLE').then((result) => console.log(result););
```

### Supported Events:

Event name							|   Description
------------------------------------|------------------
OPEN								|	Event that detects that the device was opened successfully
CLOSE								|	Event that detects that the device was closed
POWER_UP							|	Power Up (Bill Acceptor Active).
MOTOR_FAILURE						|	An motor fault was found.
CHECKSUM_ERROR						|	Checksum error.
BILL_JAM							|	The device has detected that coins are jammed in its mechanism and cannot be removed other than by manual intervention. The value paid at the jam point is given in the event data.
BILL_REMOVE							|	Reported when a note float unit has been detected as removed from its validator.
STACKER_OPEN						|	The device has detected that the stacked has been opened.
SENSOR_PROBLEM						|	The device has encountered a problem with the sensor.
BILL_FISH							|	BILL FISH
STACKER_PROBLEM						|	The device has encountered a stacker problem.
BILL_REJECT						    |	The note has been rejected from the validator and is available for the user to retrieve.
INVALID_COMMAND						|	Invalid command encountered.
RESERVED							|	Reserved
RESPONSE_WHEN_ERROR					|	Response when Error
ENABLE								|	The device is enabled.
DISABLE								|	The device is disabled.
READ_NOTE							|	A note has been detected by the device.
STACKING							|	A note has been stacked.
REJECT								|	A note has been rejected.
COMMAND_NOT_FOUND					|	The command was not found.

## Errors and contributions

For an error write the problem directly on github issues or submit it
to the mail miguel@lomeli.io. If you want to contribute to the project please send an email.

#TP1 , #TP11 , #TP2 , #TP3 , #TOP Vending Machine

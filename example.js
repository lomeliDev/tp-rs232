const TpSeries = require('./src/index');

let serialPortConfig = {
  baudrate: 9600, // default: 9600
  databits: 8, // default: 8
  stopbits: 1, // default: 1
  parity: 'even' // default: 'even'
};

let tp = new TpSeries({
  debug: true, // default: false
  timeout: 5000 // default: 3000
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
    tp.command('REJECT_BANKNOTE').then((result) => {
      console.log(result);
    });
  } else {
    tp.command('ACCEPT_BANKNOTE').then((result) => {
      console.log(result);
    });
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
        setTimeout(() => {
          tp.command('STATUS').then((result) => {
            console.log('STATUS');
            console.log(result);
          });
        }, 3000);
      });
  })
  .catch((error) => {
    console.log(error);
  });

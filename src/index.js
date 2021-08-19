const SerialPort = require('serialport');
const EventEmitter = require('events');
const chalk = require('chalk');
const commandList = require('./commands');
const status = require('./status_desc');

module.exports = class tpSeries extends EventEmitter {
  constructor(param) {
    super();
    this.eventEmitter = new EventEmitter();
    this.debug = param.debug || false;
    this.timeout = param.timeout || 3000;
    this.currentCommand = null;
    this.enabled = false;
    this.powerUp = false;
    this.openPort = false;
    this.lastChannel = null;
  }

  restore() {
    try {
      this.currentCommand = null;
      this.enabled = false;
      this.powerUp = false;
      this.openPort = false;
      this.lastChannel = null;
    } catch (error) {
      console.log(error);
    }
  }

  exec(code) {
    const buffer = Buffer.alloc(1);
    buffer[0] = code;
    return buffer;
  }

  open(port, param = {}) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort(port, {
        baudRate: param.baudRate || 9600,
        databits: param.databits || 8,
        stopbits: param.stopbits || 1,
        parity: param.parity || 'even',
        autoOpen: true
      });

      const parser = this.port.pipe(
        new SerialPort.parsers.ByteLength({ length: 1 })
      );

      parser.on('data', (byte) => {
        if (byte.toString('hex') !== '81' && byte.toString('hex') !== '80') {
          this.debug && console.log(`\n\nByte received : ${chalk.yellow(byte.toString('hex').toUpperCase())}\n`);
          if (this.currentCommand !== null) {
            try {
              this.eventEmitter.emit(
                this.currentCommand,
                status[byte.toString('hex').toUpperCase()]
              );
            } catch (error) {
              this.eventEmitter.emit(this.currentCommand, null);
            }
          }
          try {
            const command = status[byte.toString('hex').toUpperCase()];
            if (command !== null) {
              if (command.name === 'READ_NOTE') {
                this.lastChannel = command.channel;
              }
              if (
                command.name === 'REJECT' ||
                command.name === 'BILL_REJECT' ||
                command.name === 'ENABLE' ||
                command.name === 'DISABLE'
              ) {
                this.lastChannel = null;
              }
              if (command.name === 'STACKING') {
                this.emit(command.name, {
                  ...command,
                  channel: this.lastChannel
                });
                this.lastChannel = null;
              } else {
                this.emit(command.name, command);
              }
            } else {
              this.emit(status[99].name);
            }
          } catch (error) {
            this.emit(status[99].name);
          }
        }
      });

      this.port.on('error', (error) => {
        reject(error);
        this.emit('CLOSE');
        this.restore();
      });

      this.port.on('close', (error) => {
        reject(error);
        this.emit('CLOSE');
        this.restore();
      });

      this.port.on('open', () => {
        resolve();
        this.emit('OPEN');
        this.openPort = true;
      });
    });
  }

  close() {
    if (this.port !== undefined) {
      this.port.close();
    }
  }

  command(command) {
    this.currentCommand = null;
    if (
      command === 'POWER_UP' ||
      command === 'ENABLE' ||
      command === 'DISABLE' ||
      command === 'DISABLE' ||
      command === 'STATUS'
    ) {
      return new Promise((resolve) => {
        this.currentCommand = command;
        this.port.write(this.exec(commandList[command].code));
        this.port.drain(() => {
          if (command === 'POWER_UP') {
            this.powerUp = true;
          }
          if (command === 'RESET') {
            this.powerUp = false;
          }
          if (command === 'ENABLE' || command === 'DISABLE' || command === 'STATUS') {
            return resolve(this.newEvent(command));
          }
          return resolve(
            resolve({
              success: true,
              command: command,
              info: {}
            })
          );
        });
      }).then((res) => {
        return res;
      });
    }
    return new Promise((resolve) => {
      this.port.write(this.exec(commandList[command].code));
      this.port.drain(() => {
        return resolve(
          resolve({
            success: true,
            command: command,
            info: {}
          })
        );
      });
    }).then((res) => {
      return res;
    });
  }

  newEvent(command) {
    return new Promise((resolve) => {
      this.eventEmitter.once(command, (buffer) => {
        if (buffer !== null) {
          try {
            if (command === 'ENABLE' && buffer.name === command) {
              this.enabled = true;
            }
            if (command === 'DISABLE' && buffer.name === command) {
              this.enabled = false;
            }
            resolve({
              success: buffer.name === command ? true : false,
              command: command,
              info: buffer
            });
          } catch (error) {
            resolve({
              success: false,
              command: command,
              info: {}
            });
          }
        } else {
          resolve({
            success: false,
            command: command,
            info: {}
          });
        }
      });
    }).then(
      (res) =>
        new Promise((resolve) => {
          resolve(res);
        })
    );
  }
};

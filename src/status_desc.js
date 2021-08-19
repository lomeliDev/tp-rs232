module.exports = {
  '8F': {
    name: 'POWER_UP',
    description: 'Power Up (Bill Acceptor Active).'
  },
  '20': {
    name: 'MOTOR_FAILURE',
    description: 'An motor fault was found.'
  },
  '21': {
    name: 'CHECKSUM_ERROR',
    description: 'Checksum error.'
  },
  '22': {
    name: 'BILL_JAM',
    description:
      'The device has detected that coins are jammed in its mechanism and cannot be removed other than by manual intervention. The value paid at the jam point is given in the event data.'
  },
  '23': {
    name: 'BILL_REMOVE',
    description:
      'Reported when a note float unit has been detected as removed from its validator.'
  },
  '24': {
    name: 'STACKER_OPEN',
    description: 'The device has detected that the stacked has been opened.'
  },
  '25': {
    name: 'SENSOR_PROBLEM',
    description: 'The device has encountered a problem with the sensor.'
  },
  '27': {
    name: 'BILL_FISH',
    description: 'BILL FISH'
  },
  '28': {
    name: 'STACKER_PROBLEM',
    description: 'The device has encountered a stacker problem.'
  },
  '29': {
    name: 'BILL_REJECT',
    description:
      'The note has been rejected from the validator and is available for the user to retrieve.'
  },
  '2A': {
    name: 'INVALID_COMMAND',
    description: 'Invalid command encountered.'
  },
  '2E': {
    name: 'RESERVED',
    description: 'Reserved'
  },
  '2F': {
    name: 'RESPONSE_WHEN_ERROR',
    description: 'Response when Error'
  },
  '3E': {
    name: 'ENABLE',
    description: 'The device is enabled.'
  },
  '5E': {
    name: 'DISABLE',
    description: 'The device is disabled.'
  },
  '40': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 1
  },
  '41': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 2
  },
  '42': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 3
  },
  '43': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 4
  },
  '44': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 5
  },
  '45': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 6
  },
  '46': {
    name: 'READ_NOTE',
    description: 'A note has been detected by the device.',
    channel: 7
  },
  '10': {
    name: 'STACKING',
    description: 'A note has been stacked.'
  },
  '11': {
    name: 'REJECT',
    description: 'A note has been rejected.'
  },
  '99': {
    name: 'COMMAND_NOT_FOUND',
    description: 'The command was not found.'
  }
};

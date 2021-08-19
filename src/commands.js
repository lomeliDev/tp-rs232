module.exports = {
  POWER_UP: {
    code: 0x02,
    description: 'Power Up (Bill Acceptor Active)'
  },
  ACCEPT_BANKNOTE: {
    code: 0x02,
    description: 'Command to accept a banknote'
  },
  REJECT_BANKNOTE: {
    code: 0x0f,
    description: 'Command to reject a banknote'
  },
  HOLD_ESCROW: {
    code: 0x18,
    description: 'Hold in Escrow'
  },
  STATUS: {
    code: 0x0c,
    description: 'Returns the current status of the device'
  },
  ENABLE: {
    code: 0x3e,
    description: 'Command to enable the banknote validator'
  },
  DISABLE: {
    code: 0x5e,
    description: 'Command to disable the banknote validator'
  },
  RESET: {
    code: 0x30,
    description: 'Command to reset the device'
  }
};

"use strict";

const InstanceComposer = require('../instanceComposer');

require('../contract_interacts/ERC20Gateway.js');

const Setup = function ( config, ic ) {
  const oThis = this;
  oThis.initGateway = ic.initGateway();
};


InstanceComposer.register(Setup, 'Setup', true);
module.exports = Setup;
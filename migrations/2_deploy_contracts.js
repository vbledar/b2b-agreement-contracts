const StringUtilities = artifacts.require('StringUtilities');
const Registry = artifacts.require('Registry');
const MerchantIndex = artifacts.require('MerchantIndex');
const PaymentProviderIndex = artifacts.require('PaymentProviderIndex');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(StringUtilities)
    .then(function (stringUtilitiesLibrary) {
        deployer.link(StringUtilities, PaymentProviderIndex);
        return deployer.deploy(PaymentProviderIndex);
    })
    .then(function (paymentProviderIndexContract) {
        console.log('Payment provider index contract address:', paymentProviderIndexContract.address);
    });

  // deploy the register contract
  deployer.deploy(Registry).then(function (registryContract) {
      console.log('Registry contract address:', registryContract.address);
  });

  // deploy the register contract
  deployer.deploy(MerchantIndex).then(function (merchantIndexContract) {
    console.log('Merchant index contract address:', merchantIndexContract.address);
  });
};

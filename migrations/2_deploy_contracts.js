const StringUtilities = artifacts.require('StringUtilities');
const Registry = artifacts.require('Registry');
const WTIndex = artifacts.require('WTIndex');
const MerchantIndex = artifacts.require('MerchantIndex');
const PaymentProviderIndex = artifacts.require('PaymentProviderIndex');
const MerchantAgreementIndex = artifacts.require('MerchantAgreementIndex');

module.exports = function (deployer, network, accounts) {
    // deploy the registry contract
    deployer.deploy(Registry).then(function (registryContract) {
        console.log('Registry contract address:', registryContract.address);
    });

    deployer.deploy(WTIndex).then(function (wtIndexContract) {
        console.log('WT index contract address:', wtIndexContract.address);
    });

    // deploy the merchant index contract
    deployer.deploy(MerchantIndex).then(function (merchantIndexContract) {
        console.log('Merchant index contract address:', merchantIndexContract.address);
    });

    deployer.deploy(StringUtilities)
        .then(function (stringUtilitiesLibrary) {
            deployer.link(StringUtilities, PaymentProviderIndex);
            return deployer.deploy(PaymentProviderIndex);
        })
        .then(function (paymentProviderIndexContract) {
            console.log('Payment provider index contract address:', paymentProviderIndexContract.address);
        });

    // deploy the merchant agreement contract
    deployer.deploy(MerchantAgreementIndex).then(function (merchantAgreementIndexContract) {
        console.log('Merchant agreement index contract address:', merchantAgreementIndexContract.address);
    });
};

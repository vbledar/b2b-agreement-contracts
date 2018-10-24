const web3 = require('web3');

const assert = require('chai').assert;
const help = require('./helpers/index.js');

const PaymentProviderIndex = artifacts.require('PaymentProviderIndex');
const PaymentProvider = artifacts.require('PaymentProvider');

const _name = "Test Payment Provider";
const _registrationNumber = "12345678";

const _legalInformation = [
    web3.utils.utf8ToHex(_name),
    web3.utils.utf8ToHex(_registrationNumber)
];

contract('Registry', (accounts) => {
    const owner = accounts[1];
    const provider = accounts[2];
    const other = accounts[9];

    let paymentProviderIndexContract;
    let paymentProviderContract;

    beforeEach(async () => {
        paymentProviderIndexContract = await PaymentProviderIndex.new({ from: owner });
    });

    describe('Payment provider index contract is setup correctly.', () => {
        it('Payment provider index contract contains only one entry.', async () => {
            let contained = await paymentProviderIndexContract.getPaymentProviderListLength({ from: owner });
            assert.equal(1, contained);
        });

        it('Payment provider contract is created successfully.', async () => {
            await paymentProviderIndexContract.registerPaymentProvider(_legalInformation, { from: provider });
            let contained = await paymentProviderIndexContract.getPaymentProviderListLength({ from: owner });
            assert.equal(2, contained);
        });

        it('Payment provider contract contains the correct information.', async () => {
            await paymentProviderIndexContract.registerPaymentProvider(_legalInformation, { from: provider });
            let paymentProviderList = await paymentProviderIndexContract.getPaymentProviderListByOwner({ from: provider });
            assert.equal(1, paymentProviderList.length);
            paymentProviderContract = PaymentProvider.at(paymentProviderList[0]);
            assert.isNotNull(paymentProviderContract);
            let paymentProviderLegalInformation = await paymentProviderContract.legalInformation();
            let paymentProviderName = paymentProviderLegalInformation[0];
            let paymentProviderRegistrationNumber = paymentProviderLegalInformation[1];
            assert.equal(_name, paymentProviderName);
            assert.equal(_registrationNumber, paymentProviderRegistrationNumber);
        })
    });
});

const web3 = require('web3');

const assert = require('chai').assert;
const help = require('./helpers/index.js');

const MerchantIndex = artifacts.require('MerchantIndex');
const Merchant = artifacts.require('Merchant');

const _name = "Test Merchant";
const _registrationNumber = "12345678";

contract('Registry', (accounts) => {
    const owner = accounts[1];
    const merchant = accounts[2];
    const other = accounts[9];

    let merchantIndexContract;
    let merchantContract;

    beforeEach(async () => {
        merchantIndexContract = await MerchantIndex.new({ from: owner });
    });

    describe('Merchant index contract is setup correctly.', () => {
        it('Merchant index contract contains only one entry.', async () => {
            let contained = await merchantIndexContract.getMerchantListLength({ from: owner });
            assert.equal(1, contained);
        });

        it('Merchant contract is created successfully.', async () => {
            merchantContract = await merchantIndexContract.registerMerchant(_name, _registrationNumber, { from: merchant });
            let contained = await merchantIndexContract.getMerchantListLength({ from: owner });
            assert.equal(2, contained);
        });

        it('Merchant contract contains the correct information.', async () => {
            await merchantIndexContract.registerMerchant(_name, _registrationNumber, { from: merchant });
            let merchantList = await merchantIndexContract.getMerchantListByOwner({ from: merchant });
            assert.equal(1, merchantList.length);
            merchantContract = Merchant.at(merchantList[0]);
            assert.isNotNull(merchantContract);
            let merchantName = await merchantContract.name();
            let merchantRegistrationNumber = await merchantContract.registrationNumber();
            assert.equal(_name, merchantName);
            assert.equal(_registrationNumber, merchantRegistrationNumber);
        })
    });
});

const web3 = require('web3');

const assert = require('chai').assert;
const help = require('./helpers/index.js');

const MerchantAgreementIndex = artifacts.require('MerchantAgreementIndex');
const MerchantAgreement = artifacts.require('MerchantAgreement');

const _fee = 5;

contract('MerchantAgreement', (accounts) => {
    const owner = accounts[1];
    const merchant = accounts[2];
    const provider = accounts[3];
    const other = accounts[9];

    let merchantAgreementIndexContract;
    let merchantAgreementContract;

    beforeEach(async () => {
        merchantAgreementIndexContract = await MerchantAgreementIndex.new({ from: owner });
    });

    describe('Merchant agreement index contract is setup correctly.', () => {
        it('Merchant agreement index contract contains only one entry.', async () => {
            let contained = await merchantAgreementIndexContract.getMerchantAgreementListLength({ from: owner });
            assert.equal(1, contained);
        });

        it('Merchant agreement contract is created successfully.', async () => {
            await merchantAgreementIndexContract.registerMerchantAgreement({ from: merchant });
            let contained = await merchantAgreementIndexContract.getMerchantAgreementListLength({ from: owner });
            assert.equal(2, contained);

            let merchantAgreementList = await merchantAgreementIndexContract.getMerchantAgreementListOfMerchant(merchant, { from: merchant });
            assert.equal(1, merchantAgreementList.length);

            merchantAgreementContract = MerchantAgreement.at(merchantAgreementList[0]);
            let state = await merchantAgreementContract.state.call();
            assert.equal(state.c[0], 0);
        });

        it('Merchant agreement contract state change by provider successfully.', async  () => {
            await merchantAgreementIndexContract.registerMerchantAgreement({ from: merchant });
            let contained = await merchantAgreementIndexContract.getMerchantAgreementListLength({ from: owner });
            assert.equal(2, contained);
            
            let merchantAgreementList = await merchantAgreementIndexContract.getMerchantAgreementListOfMerchant(merchant, { from: merchant });
            assert.equal(1, merchantAgreementList.length);

            merchantAgreementContract = MerchantAgreement.at(merchantAgreementList[0]);
            let state = await merchantAgreementContract.state.call();
            assert.equal(state.c[0], 0);

            await merchantAgreementIndexContract.providerProposal(provider, _fee, merchantAgreementList[0]);
            state = await merchantAgreementContract.state.call();
            assert.equal(state.c[0], 1);

            merchantAgreementList = await merchantAgreementIndexContract.getMerchantAgreementsByProvider(merchant, provider, { from: provider });
            assert.equal(1, merchantAgreementList.length);

            merchantAgreementList = await merchantAgreementIndexContract.getMerchantAgreementsByMerchant(provider, merchant, { from: merchant });
            assert.equal(1, merchantAgreementList.length);
        })

        // it('Payment provider contract contains the correct information.', async () => {
        //     await paymentProviderIndexContract.registerPaymentProvider(_legalInformation, { from: provider });
        //     let paymentProviderList = await paymentProviderIndexContract.getPaymentProviderListByOwner({ from: provider });
        //     assert.equal(1, paymentProviderList.length);
        //     paymentProviderContract = PaymentProvider.at(paymentProviderList[0]);
        //     assert.isNotNull(paymentProviderContract);
        //     let paymentProviderLegalInformation = await paymentProviderContract.legalInformation();
        //     let paymentProviderName = paymentProviderLegalInformation[0];
        //     let paymentProviderRegistrationNumber = paymentProviderLegalInformation[1];
        //     assert.equal(_name, paymentProviderName);
        //     assert.equal(_registrationNumber, paymentProviderRegistrationNumber);
        // })
    });
});

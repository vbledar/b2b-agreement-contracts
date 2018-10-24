

const web3 = require('web3');

const assert = require('chai').assert;
const help = require('./helpers/index.js');

const StringUtilities = artifacts.require('StringUtilities');
const Registry = artifacts.require('Registry');

const windingTreeIndex = '0xad84405aef5d241e1bb264f0a58e238e221d70de';
const merchantIndex = '0xad84405aef5d241e1bb264f0a58e238e221d70de';
const merchantAgreementIndex = '0xad84405aef5d241e1bb264f0a58e238e221d70de';
const financialInstitutionIndex = '0xad84405aef5d241e1bb264f0a58e238e221d70de';

contract('Registry', (accounts) => {
    const owner = accounts[1];
    const other = accounts[9];

    let registry;

    beforeEach(async () => {
        registry = await Registry.new({ from: owner });
    });

    describe('Registry contract index is setup correctly.', () => {
        it('Winding tree index is set correctly by owner', async () => {
            await registry.setWindingTreeIndex(windingTreeIndex, { from: owner });
            let _value = await registry.getWindingTreeIndex();
            assert.equal(windingTreeIndex, _value);
        });

        it('Merchant index is set correctly by owner', async () => {
            await registry.setMerchantIndex(merchantIndex, { from: owner });
            let _value = await registry.getMerchantIndex();
            assert.equal(merchantIndex, _value);
        });

        it('Merchant agreement index is set correctly by owner', async () => {
            await registry.setMerchantAgreementIndex(merchantAgreementIndex, { from: owner });
            let _value = await registry.getMerchantAgreementIndex();
            assert.equal(merchantAgreementIndex, _value);
        });

        it('Merchant index is set correctly by owner', async () => {
            await registry.setFinancialInstitutionIndex(financialInstitutionIndex, { from: owner });
            let _value = await registry.getFinancialInstitutionIndex();
            assert.equal(financialInstitutionIndex, _value);
        });

        it('Winding tree index is not set by non owner', async () => {
            try {
                await registry.setWindingTreeIndex(windingTreeIndex, { from: other });
            } catch (error) {
                assert(help.isInvalidOpcodeEx(error));
            }
        });

        it('Merchant index is not set by non owner', async () => {
            try {
                await registry.setMerchantIndex(merchantIndex, {from: other});
            } catch (error) {
                assert(help.isInvalidOpcodeEx(error));
            }
        });

        it('Merchant agreement index is not set by non owner', async () => {
            try {
                await registry.setMerchantAgreementIndex(merchantAgreementIndex, { from: other });
            } catch (error) {
                assert(help.isInvalidOpcodeEx(error));
            }
        });

        it('Merchant index is not set by non owner', async () => {
            try {
                await registry.setFinancialInstitutionIndex(financialInstitutionIndex, {from: other});
            } catch (error) {
                assert(help.isInvalidOpcodeEx(error));
            }
        });
    });
});

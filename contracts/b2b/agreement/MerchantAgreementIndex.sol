pragma solidity ^0.4.0;

import "./MerchantAgreement.sol";

/**
 * Create by vbledar on 24.10.18
 *
 * This contract is essentially holding a list of all MerchantAgreement contracts.
 */
contract MerchantAgreementIndex {

    // storage for all PaymentProvider contracts
    address[] public merchantAgreementList;

    // this structure provides easy access to MerchantAgreement contract addresses based on the related Merchant
    mapping (address => address[]) merchantAgreementListOfMerchant;

    // this structure provides easy access to MerchantAgreement contract addresses based on the related PaymentProvider
    mapping (address => address[]) merchantAgreementListOfProvider;

    // this structure provides easy access to MerchantAgreement contract addresses based on the related Merchant and
    // PaymentProvider or vice versa
    mapping (address => mapping (address => address[])) merchantAgreementByProvider;
    mapping (address => mapping (address => address[])) merchantAgreementByMerchant;

    event MerchantAgreementRequested(address _merchant, address _merchantAgreementAddress);

    constructor () public {
        merchantAgreementList.length ++;
    }

    function registerMerchantAgreement() external {
        MerchantAgreement merchantAgreement = new MerchantAgreement(msg.sender);
        merchantAgreementList.push(merchantAgreement);
        merchantAgreementListOfMerchant[msg.sender].push(merchantAgreement);
        emit MerchantAgreementRequested(msg.sender, merchantAgreement);
    }

    function providerProposal(address _provider, uint256 _fee, address _merchantAgreementContractAddress) external {
        MerchantAgreement merchantAgreement = MerchantAgreement(_merchantAgreementContractAddress);
        merchantAgreement.providerProposed(_provider, _fee);
        merchantAgreementListOfProvider[_provider].push(merchantAgreement);
        merchantAgreementByProvider[_provider][merchantAgreement.merchant()].push(merchantAgreement);
        merchantAgreementByMerchant[merchantAgreement.merchant()][_provider].push(merchantAgreement);
    }

    function getMerchantAgreementList () external view returns (address[]) {
        return merchantAgreementList;
    }

    function getMerchantAgreementListLength() public view returns (uint256) {
        return merchantAgreementList.length;
    }

    function getMerchantAgreementsOfMerchant(address _merchant) external view returns (address[]) {
        return merchantAgreementListOfMerchant[_merchant];
    }

    function getMerchantAgreementsOfProvider(address _provider) external view returns (address[]) {
        return merchantAgreementListOfProvider[_provider];
    }

    function getMerchantAgreementsByProvider(address _merchant, address _provider) external view returns (address[]) {
        return merchantAgreementByProvider[_provider][_merchant];
    }

    function getMerchantAgreementsByMerchant(address _provider, address _merchant) external view returns (address[]) {
        return merchantAgreementByMerchant[_merchant][_provider];
    }
}

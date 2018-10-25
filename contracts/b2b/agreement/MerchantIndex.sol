pragma solidity ^0.4.0;

import "./Merchant.sol";

/**
 * Create by vbledar on 24.10.18
 *
 * Index contract which indices all Merchant contracts.
 */
contract MerchantIndex {

    // storage for all Merchant contracts
    address[] public merchantList;

    // this structure provides easy access to Merchant contract addresses based on their owner
    mapping (address => address[]) merchantListByOwner;

    constructor () public {
        merchantList.length ++;
    }

    /**
     * Register a new Merchant on the chain.
     * @param _merchantName the merchant name.
     * @param _registrationNumber the merchant registration number which can be used to verify merchant with external
     *                            authority.
     * Should return the newly created contract address. Not sure if possible right now.
     */
    function registerMerchant(string _merchantName, string _registrationNumber) external returns (address) {
        Merchant merchant = new Merchant(msg.sender, _merchantName, _registrationNumber);
        merchantList.push(merchant);
        merchantListByOwner[msg.sender].push(merchant);

        // TODO Can't find a reason why an event should be fired here, but perhaps it is useful.

        return merchant;
    }

    function getMerchantListByOwner() external view returns (address[]) {
        return merchantListByOwner[msg.sender];
    }

    function getMerchantContractListForMerchant (address _merchantAddress) external view returns (address[]) {
        return merchantListByOwner[_merchantAddress];
    }

    function getMerchantListLength() public view returns (uint) {
        return merchantList.length;
    }
}

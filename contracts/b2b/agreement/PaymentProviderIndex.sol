pragma solidity ^0.4.0;

import "./PaymentProvider.sol";

/**
 * Create by vbledar on 24.10.18
 *
 * This contract is essentially holding a list of all PaymentProvider contracts which take part
 * in the scheme.
 */
contract PaymentProviderIndex {

    // storage for all PaymentProvider contracts
    address[] public paymentProviderList;

    // this structure provides easy access to PaymentProvider contract addresses based on their owner
    mapping (address => address[]) paymentProviderListByOwner;

    constructor () public {
        paymentProviderList.length ++;
    }

    /**
     * Register a new PaymentProvider on the chain.
     *
     * @param _legalInformation contains bytes32 records of the related legal information of the payment provider.
     *
     * Should return the newly created contract address. Not sure if possible right now.
     */
    function registerPaymentProvider(bytes32[] _legalInformation) external returns (address) {
        PaymentProvider paymentProvider = new PaymentProvider(msg.sender, _legalInformation);
        paymentProviderList.push(paymentProvider);
        paymentProviderListByOwner[msg.sender].push(paymentProvider);

        // TODO Can't find a reason why an event should be fired here, but perhaps it is useful.

        return paymentProvider;
    }

    function getPaymentProviderListByOwner() external view returns (address[]) {
        return paymentProviderListByOwner[msg.sender];
    }

    function getPaymentProviderContractListForProvider (address _providerAddress) external view returns (address[]) {
        return paymentProviderListByOwner[_providerAddress];
    }

    function getPaymentProviderListLength() public view returns (uint) {
        return paymentProviderList.length;
    }
}

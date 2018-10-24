pragma solidity ^0.4.0;

import "../../libraries/StringUtilities.sol";

/**
 * Create by vbledar on 24.10.18
 *
 * This contract represents a PaymentProvider.
 */
contract PaymentProvider {

    // This struct will contain the legal information required to identify a PaymentProvider.
    struct LegalInformation {
        string name;
        string registrationNumber;
    }

    // This contains the legal information which may be used to identify that this PaymentProvider
    // can be trusted. One should be able to identify that the PaymentProvider is who he says he is.
    LegalInformation public legalInformation;

    // This address enforces ownership of this contract instance.
    address owner;

    // This is to restrict execution access only by the owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner may execute action.");
        _;
    }

    constructor (address _owner, bytes32[] _legalInformation) public {
        owner = _owner;
        legalInformation = LegalInformation(
            StringUtilities.bytes32ToString(_legalInformation[0]),
            StringUtilities.bytes32ToString(_legalInformation[1]));
    }

}

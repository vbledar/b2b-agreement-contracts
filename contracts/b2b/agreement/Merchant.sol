pragma solidity ^0.4.0;

/**
 * Create by vbledar on 24.10.18
 *
 * This contract represents essentially a Merchant on the chain.
 */
contract Merchant {

    address public owner;

    string public name;
    string public registrationNumber;

    constructor (address _owner, string _name, string _registrationNumber) public {
        owner = _owner;
        name = _name;
        registrationNumber = _registrationNumber;
    }

}

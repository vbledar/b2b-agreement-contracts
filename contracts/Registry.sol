pragma solidity ^0.4.0;

/**
 * Create by vbledar on 24.10.18
 *
 * This contract implements a registry in order to provide a central point for
 * accessing all other index contracts of different entities.
 */
contract Registry {

    address owner;

    address public windingTreeIndex;           // winding tree platform index
    address public merchantIndex;              // merchant index
    address public merchantAgreementIndex;     // merchant agreement index
    address public financialInstitutionIndex;  // financial institution index

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can change the information here.");
        _;
    }

    /**
     * Constructor takes care that the owner address is stored in order to establish security.
     */
    constructor () public {
        owner = msg.sender;
    }

    /**
     * =================================================================================================================
     * Getter functions for different index addresses.
     * =================================================================================================================
     */
    function getWindingTreeIndex () external view returns (address) {
        return windingTreeIndex;
    }

    function getMerchantIndex () external view returns (address) {
        return merchantIndex;
    }

    function getMerchantAgreementIndex () external view returns (address) {
        return merchantAgreementIndex;
    }

    function getFinancialInstitutionIndex() external view returns (address) {
        return financialInstitutionIndex;
    }
    /**
     * =================================================================================================================
     * =================================================================================================================
     */

    /**
     * =================================================================================================================
     * Setter functions for different index addresses.
     * =================================================================================================================
     */
    function setWindingTreeIndex (address _value) external onlyOwner {
        windingTreeIndex = _value;
    }

    function setMerchantIndex (address _value) external onlyOwner {
        merchantIndex = _value;
    }

    function setMerchantAgreementIndex (address _value) external onlyOwner {
        merchantAgreementIndex = _value;
    }

    function setFinancialInstitutionIndex(address _value) external onlyOwner {
        financialInstitutionIndex = _value;
    }
    /**
     * =================================================================================================================
     * =================================================================================================================
     */
}

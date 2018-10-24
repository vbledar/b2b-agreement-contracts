pragma solidity ^0.4.0;

/**
 * Create by vbledar on 24.10.18
 *
 * This contract represents a MerchantAgreement which is signed between a Merchant and a PaymentProvider.
 */
contract MerchantAgreement {

    enum MerchantAgreementState {
        REQUESTED, PROPOSED, ACCEPTED
    }

    address public merchant;
    address public provider;

    MerchantAgreementState public state;

    uint256 public fee;

    event MerchantAgreementProposal(address _merchant, address _provider, uint256 _fee);
    event MerchantAgreementAcceptance(address _merchant, address _provider);

    modifier onlyMerchant() {
        require(msg.sender == merchant, "Only merchant may execute action.");
        _;
    }

    modifier onlyProvider() {
        require(msg.sender == provider, "Only provider may execute action.");
        _;
    }

    modifier onlyDuringRequested() {
        require(state == MerchantAgreementState.REQUESTED, "Can be executed only during REQUESTED state.");
        _;
    }

    modifier onlyDuringProposed() {
        require(state == MerchantAgreementState.PROPOSED, "Can be executed only during PROPOSED state.");
        _;
    }

    constructor (address _merchant) public {
        state = MerchantAgreementState.REQUESTED;
        merchant = _merchant;
    }

    function providerProposed (address _provider, uint256 _fee) external onlyDuringRequested {
        state = MerchantAgreementState.PROPOSED;
        fee = _fee;
        provider = _provider;
        emit MerchantAgreementProposal(merchant, provider, fee);
    }

    function merchantAccepted () external onlyMerchant onlyDuringProposed {
        state = MerchantAgreementState.ACCEPTED;
        emit MerchantAgreementAcceptance(merchant, provider);
    }
}

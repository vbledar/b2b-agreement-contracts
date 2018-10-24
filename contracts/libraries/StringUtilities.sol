pragma solidity ^0.4.0;

library StringUtilities {
    function compare(string _a, string _b) public pure returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i])
                return -1;
            else if (a[i] > b[i])
                return 1;
        if (a.length < b.length)
            return -1;
        else if (a.length > b.length)
            return 1;
        else
            return 0;
    }
    /// @dev Compares two strings and returns true iff they are equal.
    function equal(string _a, string _b) public pure returns (bool) {
        return compare(_a, _b) == 0;
    }

    /**
     * Convert bytes32 to a string.
     * @param value the bytes32 value to be converted.
     */
    function bytes32ToString(bytes32 value) public pure returns(string) {
        bytes memory _toBytes = bytes32ToBytes(value);
        string memory converted = string(_toBytes);
        return converted;
    }

    function bytes32ToBytes(bytes32 _bytes32) public pure returns (bytes){
        // string memory str = string(_bytes32);
        // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return bytesArray;
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        // require(bytes(source).length <= 32); // causes error
        // but string have to be max 32 chars
        // https://ethereum.stackexchange.com/questions/9603/understanding-mload-assembly-function
        // http://solidity.readthedocs.io/en/latest/assembly.html
        assembly {
            result := mload(add(source, 32))
        }
    }//
}

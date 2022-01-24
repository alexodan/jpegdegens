// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Counter {
    // in JS this will return a BigNumber (object w/ 'value' prop),
    // if it were uint32 it would return just a primitive number.
    // This is because etherjs library is being smart for us.
    uint256 counter = 0;

    event CounterIncrement(uint256 counter);

    constructor() {}

    function getCount() public view returns (uint256) {
        return counter;
    }

    function increment() public {
        counter++;
        emit CounterIncrement(counter);
    }
}

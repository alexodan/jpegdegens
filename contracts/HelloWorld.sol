// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// a state container with functions to mutate it, so it's a class baiscally
contract HelloWorld {
    // constructor runs when you deploy the contract

    // pure = , memory =
    function hello() public pure returns (string memory) {
        return 'Hello, world!';
    }
}

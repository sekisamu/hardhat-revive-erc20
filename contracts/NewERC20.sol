//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract NewERC20 {
    address public token;
    event NewERC20Created(address indexed created, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    // constructor(uint256 initialSupply) {
    //     ERC20 token = new ERC20(initialSupply);
    //     emit NewERC20Created(address(token), initialSupply);
    // }

    function createERC20(uint256 initialSupply) public {
        ERC20 erc20 = new ERC20(initialSupply);
        token = address(erc20);
        emit NewERC20Created(token, initialSupply);
    }

    function transferZero() public {
        ERC20(token).transfer(address(1), 0);
        emit Transfer(msg.sender, address(1), 0);
    }
}

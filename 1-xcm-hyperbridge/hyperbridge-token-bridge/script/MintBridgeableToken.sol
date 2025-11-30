// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/BridgeableToken.sol";
import "../src/interfaces/TokenFaucet.sol";

contract MintToPKRecipient is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");             
        address tokenAddress = 0x9B711eA6a0d45304afEB01f8a81883E29E89fB47;
        address tokenFaucet = 0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3;

        address recipient = vm.addr(pk);

        vm.startBroadcast(pk);
        
        ITokenFaucet(tokenFaucet).drip(tokenAddress);

        vm.stopBroadcast();

        console.log("Minted 1000 tokens to recipient:", recipient);
        console.log("Token address:", tokenAddress);
    }
}

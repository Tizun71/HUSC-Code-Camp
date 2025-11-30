// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Script, console2} from "forge-std/Script.sol";
import {BridgeableToken} from "../src/BridgeableToken.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract Deploy is Script {
    function run() external {
        string memory tokenName = "Tizun Bridgeable Token";
        string memory tokenSymbol = "T3T";
        address tokenFaucet = 0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3;
        address tokenGatewayAddress = 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6;

        vm.fee(5 gwei);

        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        BridgeableToken token = new BridgeableToken(tokenName, tokenSymbol, tokenFaucet);
        console2.log("BridgeableToken deployed at:", address(token));

        TokenBridge bridge = new TokenBridge(tokenGatewayAddress);
        console2.log("TokenBridge deployed at:", address(bridge));

        vm.stopBroadcast();

        console2.log("Deployment finished successfully!");
    }
}

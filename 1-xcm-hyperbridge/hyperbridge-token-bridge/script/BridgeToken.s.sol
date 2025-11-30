// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TokenBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {StateMachine} from "@hyperbridge/core/libraries/StateMachine.sol";

contract BridgeToken is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address tokenBridge = address(
            0x94B6f130A401B8EB2deEC2e594D5e47B598a0e77
        );
        address token = address(0xbedad6DFBC5e8CC3Bc1EA0221b2A10118507b114);
        string memory symbol = "DOT";
        address recipient = vm.addr(pk);
        uint256 amount = 10000000000000000000;
        uint256 chainId = 11155111;

        vm.startBroadcast(pk);

        IERC20(token).approve(tokenBridge, amount);

        TokenBridge(tokenBridge).bridgeTokens(
            token,
            symbol,
            amount,
            recipient,
            StateMachine.evm(chainId)
        );
        vm.stopBroadcast();
    }
}

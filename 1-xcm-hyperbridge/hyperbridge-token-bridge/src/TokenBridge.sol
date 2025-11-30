// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {StateMachine} from "@hyperbridge/core/libraries/StateMachine.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridge {
    address private feeToken = 0xA801da100bF16D07F668F4A49E1f71fc54D05177;
    ITokenGateway public immutable tokenGateway;

    constructor(address _tokenGateway) {
        tokenGateway = ITokenGateway(_tokenGateway);
    }

    /// @notice Bridge tokens to another chain
    /// @param token The token address to bridge
    /// @param symbol The token symbol to bridge
    /// @param amount The amount to bridge
    /// @param recipient The recipient address on the destination chain
    /// @param destChain The destination chain identifier
    function bridgeTokens(
        address token,
        string memory symbol,
        uint256 amount,
        address recipient,
        bytes memory destChain
    ) external payable {
        // Approve the gateway to spend tokens
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(address(tokenGateway), amount);
        IERC20(feeToken).approve(address(tokenGateway), type(uint256).max);

        // Initiate the cross-chain transfer
        // Implementation depends on TokenGateway interface
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: 0,
            assetId: keccak256(abi.encodePacked(symbol)),
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: destChain,
            timeout: 0,
            nativeCost: msg.value,
            data: ""
        });

        tokenGateway.teleport{value: msg.value}(params);
    }
}

# Challenge 1: Cross-chain Solidity Smart Contract with XCM + Hyperbridge

## 🎯 Challenge Overview

Build a cross-chain token bridge using **Hyperbridge SDK** that enables ERC20 token transfers between different chains in the Polkadot ecosystem.

In this challenge, you will:
- Learn how Hyperbridge enables secure cross-chain communication
- Create a bridgeable ERC20 token using `HyperFungibleToken`
- Interact with the `TokenGateway` for cross-chain transfers
- Deploy and test your bridge on Polkadot testnets

## 📚 Background

### What is Hyperbridge?

[Hyperbridge](https://github.com/polytope-labs/hyperbridge-sdk) is a cross-chain interoperability protocol that enables secure message passing between different blockchain networks. It provides:

- **Post Requests**: Send data across chains
- **Get Requests**: Pull data from other chains  
- **Token Transfers**: Bridge tokens using `TokenGateway` and `IntentGateway`

### Hyperbridge SDK Core Components

The [@hyperbridge/core](https://github.com/polytope-labs/hyperbridge-sdk/tree/main/packages/core) package provides:

| Component | Description |
| --------- | ----------- |
| `IHost` | Protocol host interface |
| `IDispatcher` | Protocol dispatcher interface |
| `IHandler` | Protocol message handler interface |
| `HyperApp` | Abstract base contract for cross-chain apps |
| `HyperFungibleToken` | ERC20 with gateway-restricted minting/burning |
| `ITokenGateway` | Interface for cross-chain token transfers |
| `IIntentGateway` | Interface for intent-based cross-chain orders |

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 22
- Foundry (for Solidity development)
- pnpm

### Setup

1. **Initialize your project**

```bash
mkdir hyperbridge-token-bridge
cd hyperbridge-token-bridge
forge init
```

2. **Install Hyperbridge SDK**

```bash
npm install @hyperbridge/core
# or
forge install polytope-labs/hyperbridge-sdk
```

3. **Configure remappings** (add to `remappings.txt`)

```
@hyperbridge/core/=node_modules/@hyperbridge/core/
@openzeppelin/contracts/=node_modules/@openzeppelin/contracts/
```

## 📝 Challenge Tasks

### Task 1: Create a Bridgeable Token

Create an ERC20 token that extends `HyperFungibleToken` for cross-chain bridging:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {HyperFungibleToken} from "@hyperbridge/core/contracts/apps/HyperFungibleToken.sol";

contract BridgeableToken is HyperFungibleToken {
    address private immutable _gateway;

    constructor(
        string memory name,
        string memory symbol,
        address gatewayAddress
    ) HyperFungibleToken(name, symbol) {
        _gateway = gatewayAddress;
    }

    function gateway() public view override returns (address) {
        return _gateway;
    }
}
```

**Key Points:**
- Only the gateway can mint/burn tokens (enforced by `onlyGateway` modifier)
- The gateway address should be immutable for security
- Extends OpenZeppelin's ERC20 implementation

### Task 2: Implement Cross-Chain Transfer Logic

Create a contract that interacts with the TokenGateway for bridging:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ITokenGateway} from "@hyperbridge/core/contracts/apps/TokenGateway.sol";
import {StateMachine} from "@hyperbridge/core/contracts/libraries/StateMachine.sol";

contract TokenBridge {
    ITokenGateway public immutable tokenGateway;
    
    constructor(address _tokenGateway) {
        tokenGateway = ITokenGateway(_tokenGateway);
    }
    
    /// @notice Bridge tokens to another chain
    /// @param token The token address to bridge
    /// @param amount The amount to bridge
    /// @param recipient The recipient address on the destination chain
    /// @param destChain The destination chain identifier
    function bridgeTokens(
        address token,
        uint256 amount,
        address recipient,
        bytes memory destChain
    ) external payable {
        // Approve the gateway to spend tokens
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(address(tokenGateway), amount);
        
        // Initiate the cross-chain transfer
        // Implementation depends on TokenGateway interface
    }
}
```

### Task 3: Build a Simple Frontend

Create a basic UI to interact with your bridge:
- Connect wallet (MetaMask, etc.)
- Select source and destination chains
- Input token amount and recipient
- Execute bridge transaction
- Display transaction status

**Minimum supported network pairs (pick at least one):**

| Source Network     | Destination Network |
| ------------------ | ------------------- |
| Paseo              | Base Sepolia        |
| Hydration Paseo    | Base Sepolia        |
| Bifrost Paseo      | Base Sepolia        |
| BSC Testnet        | Base Sepolia        |

### Task 4: Deploy and Test

- Deploy your contracts to testnets
- Test cross-chain transfers between supported networks
- Document deployment addresses and test results


## 📋 Submission Requirements

Your submission should include:

1. **Smart Contracts**
   - [ ] `BridgeableToken.sol` - Your cross-chain token implementation
   - [ ] `TokenBridge.sol` - Bridge logic contract
   - [ ] Deployment scripts

2. **Documentation**
   - [ ] README explaining your implementation
   - [ ] Deployment addresses

3. **Testing**
   - [ ] Unit tests for all contracts
   - [ ] Integration tests for cross-chain scenarios

4. **Frontend**
   - [ ] Basic UI for bridging tokens
   - [ ] Screenshots of your UI in action
   - [ ] Accessible Recording Link 
   - [ ] Minimum supported network pairs (pick at least one)

## 🔗 Resources

### Hyperbridge Documentation
- [Hyperbridge SDK GitHub](https://github.com/polytope-labs/hyperbridge-sdk)
- [@hyperbridge/core Package](https://github.com/polytope-labs/hyperbridge-sdk/tree/main/packages/core)
- [HyperFungibleToken Contract](https://github.com/polytope-labs/hyperbridge-sdk/blob/main/packages/core/contracts/apps/HyperFungibleToken.sol)

### Hyperbridge Resources
- [HyperBridge Docs](https://docs.hyperbridge.network/)
- [Deployed Contract](https://docs.hyperbridge.network/developers/explore/configurations/testnet)

- [XCM](https://wiki.polkadot.com/learn/learn-xcm/)

### Solidity & Foundry
- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)



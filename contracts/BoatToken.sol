// contracts/BoatToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";
// import "@openzeppelin/contracts@5.0.0/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20Capped.sol";
// import "@openzeppelin/contracts@5.0.0/token/ERC20/extensions/ERC20Permit.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @custom:security-contact mkarn@flair-solution.com
contract BoatToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public tokenExpiry;
    uint256 public subscriptionDuration = 45 days;
    uint256 public lastMinting;

    constructor()
        ERC20("BoatToken3", "BOAT3")
        Ownable(0x87324B60340B987832a200349Df24F50888a0a3e)
        ERC20Permit("BoatToken2")
    {
        _mint(msg.sender, 150000 * 10 ** decimals());
        lastMinting = block.timestamp;
    }

    function mint() public onlyOwner returns (bool) {
        require(
            lastMinting < block.timestamp - 1 minutes,
            "Minting can be done only once in a day."
        );

        _mint(
            0x87324B60340B987832a200349Df24F50888a0a3e, // Account address to credit mint tokens
            150000 * 10 ** decimals() // Token amount to be created with 18 decimals
        );

        lastMinting = block.timestamp;
        return true;
    }

    function sellToken(
        address to,
        uint256 amount
    ) public onlyOwner returns (uint256) {
        transfer(to, amount);
        tokenExpiry = block.timestamp + subscriptionDuration;
        return tokenExpiry;
    }

    function transfer(
        address to,
        uint256 value
    ) public override returns (bool) {
        if (block.timestamp > tokenExpiry) {
            return false;
        } else {
            return transfer(to, value);
        }
    }

    function burnAfter45Days(
        address from,
        uint256 amount
    ) public onlyOwner returns (bool) {
        require(
            block.timestamp > tokenExpiry,
            "Token can't be burned before 45 days."
        );
        _burn(from, amount);
        return true;
    }

    function getCurrentTime() public view returns (uint256) {
        return block.getCurrentTime();
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

error HasToBeInFuture();
error FundsLocked(uint256 timeUntilUnlocked);
error Unauthorized(address caller);
error FailedToWithdraw();

contract Lock {
    uint256 public immutable unlockTime;
    address payable public immutable owner;

    event Withdrawal(uint256 amount);

    constructor(uint256 _unlockTime) payable {
        if (block.timestamp >= _unlockTime) {
            revert HasToBeInFuture();
        }
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        if (msg.sender != owner) {
            revert Unauthorized(msg.sender);
        }
        if (block.timestamp < unlockTime) {
            revert FundsLocked(unlockTime - block.timestamp);
        }

        emit Withdrawal(address(this).balance);

        (bool sent, ) = owner.call{value: address(this).balance}("");
        if (!sent) {
            revert FailedToWithdraw();
        }
    }
}

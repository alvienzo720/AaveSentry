//SPDX-License-Identifier:MIT

pragma solidity ^0.8.10;

import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";


contract MarketInteraction {

    address payable owner;

    IPoolAddressesProvider public immutable ADDRESS_PROVIDER;
    IPool public immutable POOL;


    address private immutable linkAddress = 0x8a0E31de20651fe58A369fD6f76c21A8FF7f8d42;
    address private immutable alinkAddress = 0xD21A6990E47a07574dD6a876f6B5557c990d5867;
    IERC20 private link;
    IERC20 private alink;

    struct Investment {
        uint256 amount;
    }

    mapping(address => Investment) public investments;

    constructor(address _addressProvider){
        ADDRESS_PROVIDER = IPoolAddressesProvider(_addressProvider);
        POOL = IPool(ADDRESS_PROVIDER.getPool());
        owner = payable(msg.sender);
        link = IERC20(linkAddress);
        alink = IERC20(alinkAddress);
    }

    function supplyLiquidity(address _tokenAddress, uint256 _amount) external {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address onBehalfOf = address(this);
        uint16 referralCode = 0;

        investments[msg.sender] = Investment(
            {
                amount: amount
            }
        );

        POOL.supply(asset, amount, onBehalfOf, referralCode);
    }

    function withdrawlLiquidity(address _tokenAddress, uint256 _amount) external  returns(uint256) {
        address asset = _tokenAddress;
        uint256 amount = _amount;
        address to = address(this);
        return POOL.withdraw(asset, amount, to);
    }

    function getUserAccountData(address _userAddress) external view returns(
      uint256 totalCollateralBase,
      uint256 totalDebtBase,
      uint256 availableBorrowsBase,
      uint256 currentLiquidationThreshold,
      uint256 ltv,
      uint256 healthFactor
    ){
        return POOL.getUserAccountData(_userAddress);
    }

    function approveLINK(uint256 _amount, address _poolContractAddress) external returns (bool) {
        return link.approve(_poolContractAddress, _amount);
    }

    function allowanceLINK(address _poolContractAddress) external view returns (uint256) {
        return link.allowance(address(this), _poolContractAddress);
    }

    function getBalance(address _tokenAddress) external view returns(uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function calculateProfilt(address userAddress) external view returns (uint256){
        uint256 currentATokenBalance = alink.balanceOf(userAddress);
        uint256 tokenSupplied = investments[userAddress].amount;

        require(currentATokenBalance >= tokenSupplied, "Insufficient balance");

        uint256 profit = currentATokenBalance - tokenSupplied;

        return profit;
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"Only owner can call this method");
        _;
    }

    receive() external payable {}
}

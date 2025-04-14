const {chai, expect } = require("chai");
// const { hre, ethers } = require("hardhat");
const { 
  BigInt,
  getBigInt,
  getAddress,
  keccak256,
  AbiCoder,
  toUtf8Bytes,
  solidityPack
} = require('ethers')


const TOTAL_SUPPLY = ethers.parseEther('10000')
const TEST_AMOUNT = ethers.parseEther('10')

describe('NewERC20', function () {

  let token;
  let wallet;
  let other;
  
  beforeEach(async function () {
    [wallet, other] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");
    let erc20 = await ERC20.deploy(TOTAL_SUPPLY);
    await erc20.waitForDeployment();

    const NewERC20 = await ethers.getContractFactory("NewERC20");
    const newERC20 = await NewERC20.deploy();
    await newERC20.waitForDeployment();


    await newERC20.createERC20(TOTAL_SUPPLY);
    token = await ethers.getContractAt("ERC20", await newERC20.token());
    console.log("token deployed at", await token.getAddress());
    
//     await expect(newERC20.transferZero())
//       .to.emit(token, 'Transfer')
//       .withArgs(wallet.address, address(1), 0);
//     console.log("newERC20 deployed at", await newERC20.getAddress());
  });

  it('blank', async () => {

  })

})
const {chai, expect } = require("chai");
const { hre, ethers } = require("hardhat");
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

describe('ERC20', function () {

  let token;
  let wallet;
  let other;
  
  beforeEach(async function () {
    [wallet, other] = await ethers.getSigners();

    const oldBalance = await ethers.provider.getBalance(other.address);
        // send balance to other
    await wallet.sendTransaction({
        from: wallet.address,
        to: other.address,
        value: ethers.parseEther('1')
    });
    
    const newBalance = await ethers.provider.getBalance(other.address);
    expect(newBalance).to.eq(oldBalance + ethers.parseEther('1'));

    console.log("balance before deploy", newBalance);

    const ERC20 = await ethers.getContractFactory("ERC20", other);

    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();

    console.log("balance after deploy", await ethers.provider.getBalance(other.address));

    const deployCost = ethers.formatEther(newBalance - await ethers.provider.getBalance(other.address));
    console.log(`erc20 eployment costs: ${deployCost} ETH`);
  });

  it('transferFrom', async () => {
    await expect(token.transferFrom(other.address, wallet.address, 0)).to.emit(token, 'Transfer').withArgs(other.address, wallet.address, 0);
    const before = await ethers.provider.getBalance(other.address);
    console.log("balance before transferFrom", before);
    await expect(token.connect(other).transferFrom(wallet.address, other.address, 0)).to.emit(token, 'Transfer').withArgs(wallet.address, other.address, 0);
    const after = await ethers.provider.getBalance(other.address);
    console.log("balance after transferFrom", after);
    console.log(`transferFrom costs: ${ethers.formatEther(before - after)} ETH`);
  })

})
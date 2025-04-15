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

describe('ERC20', function () {

  let token;
  let wallet;
  let other;
  
  beforeEach(async function () {
    [wallet, other] = await ethers.getSigners();

    const oldBalance = await ethers.provider.getBalance(other.address);

    let value;
    let chainName = hre.network.name;
    if (chainName === 'local') {
      value = ethers.parseEther('1000000')
    } else {
      value = ethers.parseEther('1')
    }

    // send balance to other
    await wallet.sendTransaction({
        from: wallet.address,
        to: other.address,
        value: value
    });
    
    const newBalance = await ethers.provider.getBalance(other.address);
    console.log("balance before deploy", newBalance);

    const ERC20 = await ethers.getContractFactory("ERC20", other);

    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();

    console.log("balance after deploy", await ethers.provider.getBalance(other.address));

    const deployCost = ethers.formatEther(newBalance - await ethers.provider.getBalance(other.address));
    console.log(`erc20 eployment costs: ${deployCost} ETH`);
  });

  it('gas used diffrently every time', async () => {
    let tx1 = await token.approve(other.address,0);
    let receipt1 = await tx1.wait();
    console.log("gas used in tx1", receipt1.gasUsed);

    let tx2 = await token.transfer(other.address,0);
    let receipt2 = await tx2.wait();
    console.log("gas used in tx2", receipt2.gasUsed);

    let tx3 = await token.transfer(other.address,0);
    let receipt3 = await tx3.wait();
    console.log("gas used in tx3", receipt3.gasUsed);

    let tx4 = await token.transfer(other.address,0);
    let receipt4 = await tx4.wait();
    console.log("gas used in tx4", receipt4.gasUsed);

    let tx5 = await token.transfer(other.address,0);
    let receipt5 = await tx5.wait();
    console.log("gas used in tx5", receipt5.gasUsed);

    let tx6 = await token.transfer(other.address,0);
    let receipt6 = await tx6.wait();
    console.log("gas used in tx6", receipt6.gasUsed);
  })

})
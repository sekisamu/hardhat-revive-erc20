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
} = require('ethers');
const { ethers } = require("hardhat");

const TOTAL_SUPPLY = ethers.parseEther('10000')
const TEST_AMOUNT = ethers.parseEther('10')

describe('ERC20', function () {

  let token;
  let wallet;
  let other;
  
  beforeEach(async function () {
    [wallet, other] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");

    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();
  });

  it('gas used diffrently every time', async () => {
    let tx1 = await token.transfer(other.address,0);
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
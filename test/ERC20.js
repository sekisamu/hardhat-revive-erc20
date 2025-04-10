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
    const ERC20 = await ethers.getContractFactory("ERC20");

    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();
    [wallet, other] = await ethers.getSigners();

    // send balance to other
    await wallet.sendTransaction({
      to: other.address,
      value: ethers.parseEther('1')
    });

  });

  // it('name, symbol, decimals, totalSupply, balanceOf', async () => {
  //   const [deployer] = await ethers.getSigners();
  //   const abiCoder = new AbiCoder();
  //   const name = await token.name();
  //   expect(name).to.eq('Uniswap V2');
  //   expect(await token.symbol()).to.eq('UNI-V2')
  //   expect(await token.decimals()).to.eq(18)
  //   expect(await token.totalSupply()).to.eq(TOTAL_SUPPLY)
  //   expect(await token.balanceOf(deployer.address)).to.eq(TOTAL_SUPPLY)
  // })

  // it('approve', async () => {
  //   let walletAddress = await wallet.getAddress();
  //   await expect(token.approve(other.address, TEST_AMOUNT))
  //     .to.emit(token, 'Approval')
  //     .withArgs(walletAddress, other.getAddress(), TEST_AMOUNT)
  //   expect(await token.allowance(walletAddress, other.address)).to.eq(TEST_AMOUNT)
  // })

  // it('transfer', async () => {
  //   await expect(token.transfer(other.address, TEST_AMOUNT))
  //     .to.emit(token, 'Transfer')
  //     .withArgs(wallet.address, other.address, TEST_AMOUNT)
  //   expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY - TEST_AMOUNT)
  //   expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
  // })

  // it('transfer:fail', async () => {
  //   await expect(token.transfer(other.address, TOTAL_SUPPLY + 1n)).to.be.reverted // ds-math-sub-underflow
  //   await expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow
  // })

  it('transferFrom', async () => {
    console.log("wallet balance before transfer", await ethers.provider.getBalance(wallet.address))
    await expect(token.transferFrom(other.address, wallet.address, 0)).to.emit(token, 'Transfer').withArgs(other.address, wallet.address, 0);
    console.log("wallet balance after transfer", await ethers.provider.getBalance(wallet.address))

    console.log("other balance before transfer", await ethers.provider.getBalance(other.address))
    await expect(token.connect(other).transferFrom(wallet.address, other.address, 0)).to.emit(token, 'Transfer').withArgs(wallet.address, other.address, 0);
    console.log("other balance after transfer", await ethers.provider.getBalance(other.address))
  })

})
import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('hello world', () => {
  it('should say hi', async () => {
    // 1. setup
    // 2. deploy contract
    // 3. call our function to test

    // Hardhat has compiled our contract and has a json file
    // /artifacts/contracts/HelloWorld.json (abi)
    const HelloWorld = await ethers.getContractFactory('HelloWorld')
    const hello = await HelloWorld.deploy()

    await hello.deployed()

    expect(await hello.hello()).to.equal('Hello, world!')
  })
})

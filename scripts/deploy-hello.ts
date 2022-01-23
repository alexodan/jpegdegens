import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function deploy() {
  const HelloWorld = await ethers.getContractFactory('HelloWorld')
  const helloWorld = await HelloWorld.deploy()

  await helloWorld.deployed()

  return helloWorld
}

// @ts-ignore
async function sayHello(hello) {
  console.log('Say hello: ', await hello.hello())
}

deploy().then(sayHello)

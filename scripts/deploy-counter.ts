import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function deploy() {
  const Counter = await ethers.getContractFactory('Counter')
  const counter = await Counter.deploy()
  await counter.deployed()
  return counter
}

async function runIncrement(counter) {
  await counter.increment()
  const count = await counter.getCount()
  console.log('Count is now:', count)
  return count
}

deploy().then(runIncrement)

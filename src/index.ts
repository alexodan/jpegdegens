import { ethers } from 'ethers'
import Counter from '../artifacts/contracts/Counter.sol/Counter.json'

const countDisplay = document.querySelector('#counter-display')

async function hasSigners(): Promise<boolean> {
  //@ts-ignore
  const metamask = window.ethereum
  const signers = await (metamask.request({
    method: 'eth_accounts',
  }) as Promise<string[]>)
  return signers.length > 0
}

async function requestAccess(): Promise<boolean> {
  //@ts-ignore
  const result = (await window.ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[]
  return result && result.length > 0
}

async function run() {
  const address = process.env.CONTRACT_ADDRESS
  if (!(await hasSigners()) && !(await requestAccess())) {
    console.log('You are in trouble, no one wants to play')
  }

  // @ts-ignore
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner()
  const contract = new ethers.Contract(
    address,
    Counter.abi, // abi
    signer
  )
  console.log(contract.filters)
  contract.on(contract.filters.CounterIncrement(), function (count) {
    writeCount(count)
  })

  const count = await contract.getCount()
  writeCount(count)

  const incrementBtn = document.querySelector('#increment')
  incrementBtn.addEventListener('click', async function () {
    // NOTE: without events:
    // const tx = await increment()
    // await tx.wait()
    // writeCount()
    await contract.increment()
  })

  return contract
}

async function writeCount(count) {
  // const contract = await getContract()
  // const count = await contract.getCount()

  console.log('Count:', count)
  countDisplay.innerHTML = count
}

run()

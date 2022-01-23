import { ethers } from 'ethers';

async function hasSigners(): Promise<boolean> {
  //@ts-ignore
  const metamask = window.ethereum;
  const signers = await (metamask.request({
    method: 'eth_accounts',
  }) as Promise<string[]>);
  return signers.length > 0;
}

async function requestAccess(): Promise<boolean> {
  //@ts-ignore
  const result = (await window.ethereum.request({
    method: 'eth_requestAccounts',
  })) as string[];
  return result && result.length > 0;
}

async function getContract() {
  const address = process.env.CONTRACT_ADDRESS;

  if (!(await hasSigners()) && !(await requestAccess())) {
    console.log('You are in trouble, no one wants to play');
  }

  // @ts-ignore
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(
    address,
    [
      'function increment() public',
      'function getCount() public view returns (uint256)',
    ], // abi
    signer
  );

  console.log('Counter:', await contract.getCount());

  return contract;
}

async function increment() {
  const contract = await getContract();
  await contract.increment();
}

async function writeCount() {
  const contract = await getContract();
  const countDisplay = document.querySelector('#counter-display');
  const count = await contract.getCount();
  console.log('Count:', count);
  countDisplay.innerHTML = count;
}

const incrementBtn = document.querySelector('#increment');

incrementBtn.addEventListener('click', async function () {
  await increment();
  writeCount();
});

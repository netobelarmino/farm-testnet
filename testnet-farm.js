const fs = require('fs');
const { ethers } = require('ethers');

const keys = process.env.PRIVATE_KEYS.split(',');
const rpc = process.env.RPC_LINEA;
const contract = '0x0B1a870EBaD728352d974D0Dca3DbeD6b43a7EA4'; // Linea Voyage NFT
const abi = ['function mint(uint256 amount) payable'];

async function run() {
  const provider = new ethers.JsonRpcProvider(rpc);
  const log = [];

  for (const k of keys) {
    try {
      const wallet = new ethers.Wallet(k.trim(), provider);
      const nft = new ethers.Contract(contract, abi, wallet);
      const tx = await nft.mint(1, { gasLimit: 200000 });
      console.log(`${wallet.address} mintou: ${tx.hash}`);
      log.push(`${wallet.address},${tx.hash}`);
      await tx.wait();
    } catch (e) {
      console.log(`Erro: ${e.message}`);
      log.push(`${wallet.address},erro`);
    }
  }
  fs.writeFileSync('hashes.csv', log.join('\n'));
}

run();

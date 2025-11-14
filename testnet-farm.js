const fs = require('fs');
const ethers = require('ethers');
const axios = require('axios');

const keys = process.env.PRIVATE_KEYS.split(',');
const rpcs = {
  linea:   process.env.RPC_LINEA,
  scroll:  process.env.RPC_SCROLL,
  taiko:   process.env.RPC_TAIKO,
  fuel:    process.env.RPC_FUEL,
  zksync:  process.env.RPC_ZKSYNC
};

async function farm() {
  const scores = [];
  for (const key of keys) {
    const wallet = new ethers.Wallet(key.trim());
    // Exemplo: mint NFT na Linea
    const provider = new ethers.JsonRpcProvider(rpcs.linea);
    const signer = wallet.connect(provider);
    // ... lógica real aqui ...
    scores.push({ addr: wallet.address, points: Math.floor(Math.random()*1000) });
  }
  fs.writeFileSync('scores.csv', scores.map(s => `${s.addr},${s.points}`).join('\n'));
}
farm().catch(console.error);

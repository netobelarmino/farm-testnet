const fs = require('fs');
const { ethers } = require('ethers');
const axios = require('axios');

const keysEnv = process.env.PRIVATE_KEYS;

if (!keysEnv) {
  console.error("ERRO: env PRIVATE_KEYS não definido. Configure em Settings > Secrets > Actions.");
  process.exit(1);
}

const keys = keysEnv
  .split(',')
  .map(k => k.trim())
  .filter(Boolean);

if (keys.length === 0) {
  console.error("ERRO: nenhum private key encontrado em PRIVATE_KEYS.");
  process.exit(1);
}

const rpcs = {
  linea:   process.env.RPC_LINEA,
  scroll:  process.env.RPC_SCROLL,
  taiko:   process.env.RPC_TAIKO,
  fuel:    process.env.RPC_FUEL,
  zksync:  process.env.RPC_ZKSYNC,
};

async function farmWalletOnChain(chainName, rpcUrl, wallet) {
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = wallet.connect(provider);

  // Exemplo simples: pegar o número do bloco atual
  const blockNumber = await provider.getBlockNumber();
  console.log(`[${chainName}] ${wallet.address} - block ${blockNumber}`);

  // 🔥 Aqui depois vamos plugando a lógica REAL de farm:
  // - faucet
  // - mint NFT
  // - swaps em testnet
  // etc.
}

async function farm() {
  console.log(`Iniciando farming em ${keys.length} carteiras...`);

  const scores = [];

  for (const key of keys) {
    const wallet = new ethers.Wallet(key);
    console.log(`\n=== Carteira: ${wallet.address} ===`);

    for (const [chain, rpcUrl] of Object.entries(rpcs)) {
      if (!rpcUrl) {
        console.log(`[${chain}] RPC não configurado, pulando...`);
        continue;
      }

      try {
        await farmWalletOnChain(chain, rpcUrl, wallet);
        const points = Math.floor(Math.random() * 1000); // placeholder
        scores.push({ addr: wallet.address, chain, points });
      } catch (err) {
        console.error(`[${chain}] erro para ${wallet.address}:`, err.message || err);
      }
    }
  }

  const csv = scores.map(s => `${s.addr},${s.chain},${s.points}`).join('\n');
  fs.writeFileSync('scores.csv', csv);

  console.log(`\nFarming finalizado. ${scores.length} entradas salvas em scores.csv`);
}

farm().catch(err => {
  console.error("ERRO GERAL NO SCRIPT:", err);
  process.exit(1);
});

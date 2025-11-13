import Wallet from 'ethereumjs-wallet';
import fs from 'fs';

const cnt = Number(process.argv[2] || 100);
const wallets = [];

for (let i = 0; i < cnt; i++) {
  const w = Wallet.default.generate();
  wallets.push({
    addr: w.getAddressString(),
    key:  w.getPrivateKeyString()
  });
}

fs.writeFileSync('wallets.json', JSON.stringify(wallets, null, 2));
fs.writeFileSync('private-keys.txt', wallets.map(w => w.key).join(','));
console.log(`Geradas ${cnt} carteiras`);

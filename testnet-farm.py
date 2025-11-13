import os, json, time, csv
from web3 import Web3

keys = os.getenv("PRIVATE_KEYS").split(",")
nets = {n: Web3(Web3.HTTPProvider(os.getenv(f"RPC_{n.upper()}")))
        for n in ("linea","scroll","taiko","fuel","zksync")}

with open("scores.csv","a",newline="") as f:
    w=csv.writer(f)
    for k in keys:
        for name, w3 in nets.items():
            if not w3.is_connected(): continue
            # place-holder lógica
            w.writerow([int(time.time()), name, k[:8], "1"])
print("rodada concluída")

# BTC Keygen + Balance Check Example (Python)

This Python sample generates a BTC wallet address and performs a live balance check using Blockstream API.

## Setup

```bash
pip install -r requirements.txt
```

## Run

Testnet:

```bash
python main.py --network testnet
```

Mainnet:

```bash
python main.py --network mainnet
```

Generate only (no API call):

```bash
python main.py --network testnet --generate-only
```

Optional (show private key for local demo only):

```bash
python main.py --network testnet --show-private-key
```

## Notes

- Do not use generated keys for production funds.
- For extension usage, keep the safe flow: public addresses only.

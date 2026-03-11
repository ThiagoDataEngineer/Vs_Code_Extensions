# BTC Keygen + Balance Check Example

This example generates a BTC SegWit (P2WPKH) wallet and runs a live balance check via Blockstream API.

## Run

```bash
npm install
npm run check:testnet
```

Mainnet:

```bash
npm run check:mainnet
```

Generate only (no API call):

```bash
npm run generate:testnet
```

## Notes

- This sample creates random keys for demonstration.
- Never use generated private keys for production funds.
- The extension itself should continue using public addresses only.

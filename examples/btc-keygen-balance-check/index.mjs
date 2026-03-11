#!/usr/bin/env node
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import * as tinysecp from "tiny-secp256k1";

const ECPair = ECPairFactory(tinysecp);

function parseArgs(argv) {
  const args = { network: "testnet", generateOnly: false };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--network") {
      args.network = (argv[i + 1] || "testnet").toLowerCase();
      i += 1;
      continue;
    }
    if (token === "--generate-only") {
      args.generateOnly = true;
    }
  }

  return args;
}

function resolveNetwork(network) {
  if (network === "mainnet") {
    return bitcoin.networks.bitcoin;
  }
  if (network === "testnet") {
    return bitcoin.networks.testnet;
  }
  throw new Error("Invalid network. Use mainnet or testnet.");
}

function generateWallet(network) {
  const keyPair = ECPair.makeRandom({ network });
  const pubkey = Buffer.from(keyPair.publicKey);
  const payment = bitcoin.payments.p2wpkh({ pubkey, network });

  if (!payment.address) {
    throw new Error("Could not derive P2WPKH address.");
  }

  const privateKeyHex = keyPair.privateKey ? Buffer.from(keyPair.privateKey).toString("hex") : "";
  return {
    address: payment.address,
    privateKeyHex,
    publicKeyHex: pubkey.toString("hex"),
  };
}

async function fetchBtcBalance(apiBase, address) {
  const endpoint = `${apiBase.replace(/\/$/, "")}/address/${address}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} at ${endpoint}`);
  }

  const data = await response.json();
  const confirmedFunded = data.chain_stats?.funded_txo_sum ?? 0;
  const confirmedSpent = data.chain_stats?.spent_txo_sum ?? 0;
  const mempoolFunded = data.mempool_stats?.funded_txo_sum ?? 0;
  const mempoolSpent = data.mempool_stats?.spent_txo_sum ?? 0;
  const sats = (confirmedFunded - confirmedSpent) + (mempoolFunded - mempoolSpent);

  return {
    sats,
    btc: (sats / 1e8).toFixed(8),
  };
}

async function main() {
  const args = parseArgs(process.argv);
  const network = resolveNetwork(args.network);
  const wallet = generateWallet(network);

  console.log("BTC wallet generated");
  console.log(`Network: ${args.network}`);
  console.log(`Address: ${wallet.address}`);
  console.log(`Public Key: ${wallet.publicKeyHex}`);
  console.log("Private Key (hex): [hidden by default in logs]");

  if (args.generateOnly) {
    return;
  }

  const apiBase = args.network === "mainnet"
    ? "https://blockstream.info/api"
    : "https://blockstream.info/testnet/api";

  const balance = await fetchBtcBalance(apiBase, wallet.address);
  console.log(`Balance API: ${apiBase}`);
  console.log(`Balance (sats): ${balance.sats}`);
  console.log(`Balance (BTC): ${balance.btc}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Example failed: ${message}`);
  process.exit(1);
});

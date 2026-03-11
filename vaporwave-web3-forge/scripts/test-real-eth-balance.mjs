#!/usr/bin/env node

const DEFAULT_RPC = "https://eth.llamarpc.com";
const DEFAULT_ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

function isValidEvmAddress(value) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function hexToBigInt(value) {
  if (!/^0x[0-9a-fA-F]+$/.test(value)) {
    throw new Error(`Invalid hex value: ${value}`);
  }
  return BigInt(value);
}

function formatEthFromWei(wei) {
  const base = 10n ** 18n;
  const integer = wei / base;
  const fraction = wei % base;
  const fractionPadded = fraction.toString().padStart(18, "0");
  const fractionTrimmed = fractionPadded.replace(/0+$/, "");
  return fractionTrimmed.length > 0 ? `${integer}.${fractionTrimmed}` : `${integer}`;
}

async function postJsonRpc(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} at ${url}`);
  }

  const json = await response.json();
  if (json.error) {
    throw new Error(json.error.message || "Unknown JSON-RPC error");
  }

  if (json.result === undefined) {
    throw new Error("JSON-RPC response missing result");
  }

  return json.result;
}

async function main() {
  const rpcUrl = process.env.ETH_RPC_URL || process.argv[2] || DEFAULT_RPC;
  const address = (process.env.WALLET_ADDRESS || process.argv[3] || DEFAULT_ADDRESS).trim();

  if (!isValidEvmAddress(address)) {
    throw new Error("Invalid wallet address. Expected 0x + 40 hex chars.");
  }

  const chainIdHex = await postJsonRpc(rpcUrl, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_chainId",
    params: [],
  });

  const balanceHex = await postJsonRpc(rpcUrl, {
    jsonrpc: "2.0",
    id: 2,
    method: "eth_getBalance",
    params: [address, "latest"],
  });

  const chainId = Number.parseInt(chainIdHex, 16);
  const balanceWei = hexToBigInt(balanceHex);
  const balanceEth = formatEthFromWei(balanceWei);

  console.log("Ethereum real balance check");
  console.log(`RPC: ${rpcUrl}`);
  console.log(`Address: ${address}`);
  console.log(`Chain ID: ${chainId} (${chainIdHex})`);
  console.log(`Balance (wei): ${balanceWei.toString()}`);
  console.log(`Balance (ETH): ${balanceEth}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Test failed: ${message}`);
  process.exit(1);
});

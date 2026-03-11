#!/usr/bin/env python3
import argparse
import sys
from dataclasses import dataclass

import requests
from bit import Key, PrivateKeyTestnet


@dataclass
class WalletInfo:
    address: str
    public_key_hex: str
    wif: str


def generate_wallet(network: str) -> WalletInfo:
    if network == "mainnet":
        key = Key()
    elif network == "testnet":
        key = PrivateKeyTestnet()
    else:
        raise ValueError("Invalid network. Use mainnet or testnet.")

    address = key.segwit_address or key.address
    if not address:
        raise RuntimeError("Failed to derive BTC address")

    public_key_hex = key.public_key.hex()
    wif = key.to_wif()

    return WalletInfo(address=address, public_key_hex=public_key_hex, wif=wif)


def fetch_btc_balance(api_base: str, address: str) -> tuple[int, str]:
    endpoint = f"{api_base.rstrip('/')}/address/{address}"
    response = requests.get(endpoint, headers={"accept": "application/json"}, timeout=20)
    response.raise_for_status()

    data = response.json()
    confirmed_funded = data.get("chain_stats", {}).get("funded_txo_sum", 0)
    confirmed_spent = data.get("chain_stats", {}).get("spent_txo_sum", 0)
    mempool_funded = data.get("mempool_stats", {}).get("funded_txo_sum", 0)
    mempool_spent = data.get("mempool_stats", {}).get("spent_txo_sum", 0)

    sats = (confirmed_funded - confirmed_spent) + (mempool_funded - mempool_spent)
    btc = f"{sats / 1e8:.8f}"
    return sats, btc


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate BTC key/address and check live balance via Blockstream API"
    )
    parser.add_argument(
        "--network",
        choices=["mainnet", "testnet"],
        default="testnet",
        help="Target BTC network",
    )
    parser.add_argument(
        "--generate-only",
        action="store_true",
        help="Only generate wallet, skip API balance check",
    )
    parser.add_argument(
        "--show-private-key",
        action="store_true",
        help="Print WIF private key (do not use in production)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    wallet = generate_wallet(args.network)

    print("BTC wallet generated (Python example)")
    print(f"Network: {args.network}")
    print(f"Address: {wallet.address}")
    print(f"Public Key: {wallet.public_key_hex}")
    if args.show_private_key:
        print(f"Private Key (WIF): {wallet.wif}")
    else:
        print("Private Key (WIF): [hidden by default]")

    if args.generate_only:
        return 0

    api_base = "https://blockstream.info/api" if args.network == "mainnet" else "https://blockstream.info/testnet/api"

    sats, btc = fetch_btc_balance(api_base, wallet.address)
    print(f"Balance API: {api_base}")
    print(f"Balance (sats): {sats}")
    print(f"Balance (BTC): {btc}")

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except requests.RequestException as exc:
        print(f"Example failed: {exc}", file=sys.stderr)
        raise SystemExit(1)
    except Exception as exc:  # noqa: BLE001
        print(f"Example failed: {exc}", file=sys.stderr)
        raise SystemExit(1)

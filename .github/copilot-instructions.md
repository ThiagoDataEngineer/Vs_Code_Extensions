# Dapp Agent Forge - Workspace Instructions

You are working in a dApp starter workspace designed for rapid prototyping and AI-assisted delivery.

## Mission
- Build production-minded dApp features quickly.
- Prefer safe wallet flows and explicit network handling.
- Keep code reusable across future dApp projects.

## Default Stack Preferences
- Frontend: TypeScript-first.
- Wallets: EVM-first (MetaMask, Rabby, Coinbase Wallet, WalletConnect) and optional Solana support.
- Network config: centralize chain metadata and avoid hardcoding in multiple places.

## Engineering Rules
- Keep modules small and composable.
- Add input validation for wallet addresses and chain selection.
- Never request or store seed phrases, private keys, or secrets in code.
- Use environment variables for API keys and RPC endpoints.
- Document setup and test steps in README updates when behavior changes.

## Reuse Contract for New Projects
When asked to bootstrap a new dApp from this workspace:
1. Preserve folder conventions and naming clarity.
2. Create a clear "config" layer for chains, providers, and feature flags.
3. Add starter scripts for build, lint, and test.
4. Include a short "How to extend" section for future contributors.

## Agent Behavior
- If a request is ambiguous, propose a safe default and proceed.
- Prefer concrete edits over abstract advice.
- After major changes, run compile/build checks when possible.

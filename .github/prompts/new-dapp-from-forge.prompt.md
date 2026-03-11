---
mode: ask
model: GPT-5.3-Codex
description: Create a new dApp project using this repository as the reference forge.
---

Create a new dApp starter project based on the Dapp Agent Forge pattern in this workspace.

Requirements:
1. Use TypeScript and keep architecture modular.
2. Create a dedicated config module for chains/providers.
3. Add wallet connect flow for EVM (MetaMask, WalletConnect) and leave extension points for other wallets.
4. Include scripts for build, lint, and test.
5. Add a README with setup, run, and extension guidance.
6. Add guardrails: never store private keys or seed phrases.

Output:
- Show created folder structure.
- Explain key design choices briefly.
- Provide the first commands to run.

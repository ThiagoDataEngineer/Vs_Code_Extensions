# Web3 Wallet Lab Forge

### Live Preview

![Web3 Wallet Lab running inside VS Code](https://raw.githubusercontent.com/thiag/vaporwave-web3-forge/main/media/how-to-use.gif)

### Quick Donate

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

Language:
- [English](#english)
- [Portugues (Brasil)](#portugues-brasil)
- [Francais](#francais)
- [Русский](#русский)
- [Espanol](#espanol)
- [中文](#中文)
- [日本語](#日本語)
- [Deutsch](#deutsch)
- [Arabic (العربية)](#العربية)

---

## English

### Overview

Web3 Wallet Lab Forge is a practical VS Code extension for wallet testing, contract verification, and real-balance intelligence across Bitcoin, EVM chains, and Solana. It is built for both humans and AI agents, with useful day-to-day tools like safe public-address validation, Contract Check, batch balance checks, provider shortcuts, report exports (TXT/CSV), and in-panel market context.

### Highlights

- 🌐 Bitcoin-first network selection (Mainnet and Testnet).
- 🔗 Provider shortcuts for major wallets.
- 🔐 Real wallet mode with public address validation.
- 🧪 Test wallet generation mode for local workflows.
- 🧾 Contract check for EVM and Solana chains.
- 🛡️ Professional contract verification policy: optional bytecode prefix + minimum runtime size.
- 💰 Real balance lookup via RPC/indexer APIs.
- 🗂️ Batch real-balance check from Wallet Registry.
- 📦 Registry export for operational records (TXT/CSV).
- 📑 Contract verification report export (TXT/CSV) for QA evidence.
- 🎨 Built-in theme system (dark + light) for different working styles.
- 📈 In-panel mini market chart with coin selection.

### Built For

- dApp builders shipping MVPs quickly.
- Teams validating wallet UX before production.
- AI-assisted workflows that need realistic wallet test loops.
- QA flows requiring reproducible address and balance records.

### Supported Providers

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Why This Extension

- Public-address-only workflow (no seed phrase/private key handling).
- Bitcoin, EVM, and Solana in one unified panel.
- Real/test wallet modes with contract check, balance check, and market context.

### Built For Every Profile

For beginners (new to Web3):
- Guided wallet flow: connect, choose network/provider, paste address, run checks.
- Safe by design: only public addresses are accepted.
- Clear output and exportable reports for learning and debugging.

For professional developers:
- Faster iteration for dApp wallet UX and contract deployment validation.
- Batch real-balance checks via Wallet Registry.
- TXT/CSV exports for QA evidence and operational handoff.
- Multi-network coverage: Bitcoin Mainnet/Testnet, major EVM chains, Solana.

For AI agents and autonomous workflows:
- Predictable test-wallet generation for repeatable simulations.
- Deterministic verification loop: address -> contract check -> balance check -> export.
- Good fit for agentic QA and CI-style validation routines.

### Core Capabilities

- Connect real wallet addresses safely (public address only).
- Generate instant test wallets for local development and QA.
- Validate EVM/Solana deployments with Contract Check.
- Query live balances (BTC/EVM/SOL) with resilient provider logic.
- Monitor market bubbles and a selectable mini price chart.
- Maintain a wallet registry (real/test), run batch checks, and export TXT/CSV.

### Discoverability Keywords (Human + AI)

- VS Code web3 wallet testing, crypto wallet QA, wallet connect testing.
- Bitcoin/EVM/Solana balance checker, onchain address validation.
- Smart contract verification, RPC balance lookup, agentic testing.
- MetaMask, Uniswap Wallet, Coinbase Wallet, Trust Wallet, Rabby, Phantom, WalletConnect, Ledger, Trezor.

### Start Using (Everyone)

- Install the extension in VS Code.
- Open Wallet Lab from the Activity Bar.
- Click Connect Wallet and begin testing with real or test addresses.

### Quick Start (Developers and AI Agents)

```bash
npm install
npm run compile
```

Press F5 in VS Code to launch the Extension Development Host.

### Usage

1. 🔌 Click Connect Wallet and choose REAL mode or TEST mode.
2. 🌐 Select network and provider.
3. 📬 Paste a public wallet address (BTC, EVM, or Solana).
4. 🧾 Run Contract Check to validate deployment/code presence.
5. 💰 In REAL mode, use Check Balance for live lookup.
6. 📈 In Crypto Market Snapshot, add extra coins by symbol/id (example: DOGE, XRP, cardano).
7. 📊 Use the chart selector to view BTC or another selected asset trend.
8. 🗂️ In Wallet Registry, run Check Real Balances and export reports.

> Note: The visual guide currently shows a legacy product name. The workflow is still valid and an updated guide is coming soon.

### Reuse as dApp Starter

1. Clone this repository.
2. Keep agent conventions under .github.
3. Run the prompt at .github/prompts/new-dapp-from-forge.prompt.md in Copilot Chat.
4. Request your target stack (example: Next.js + wagmi + viem).
5. Keep wallet safety rules: public addresses only, never seed/private keys.

### Donate

If this extension helps your workflow, you can support ongoing development here:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Intellectual Property

- The extension icon files (media/icon.png and media/activity-icon.svg) and visual identity are reserved for this project unless explicitly authorized by the author.
- The name, brand, and visual assets are all rights reserved.
- This repository does not grant commercial usage rights for the product identity without prior permission.

---

## Portugues (Brasil)

### Visao Geral

Web3 Wallet Lab Forge e uma extensao para VS Code focada em prototipagem rapida de dApps com fluxos de carteira seguros, validacao de contratos e inteligencia de saldo para Bitcoin, redes EVM e Solana.

### Destaques

- 🌐 Selecao de rede com Bitcoin primeiro (Mainnet e Testnet).
- 🔗 Atalhos para sites de provedores de carteira.
- 🔐 Modo carteira real com validacao de endereco publico.
- 🧪 Modo carteira de teste para fluxo local.
- 🧾 Contract Check para cadeias EVM e Solana.
- 🛡️ Politica profissional de verificacao de contrato: prefixo opcional de bytecode + tamanho minimo de runtime.
- 💰 Consulta de saldo real por RPC/indexer.
- 🗂️ Checagem em lote de saldos reais via Wallet Registry.
- 📦 Exportacao de registros e relatorios (TXT/CSV).
- 📑 Exportacao de relatorio de verificacao de contrato (TXT/CSV) para evidencias de QA.
- 🎨 Sistema de temas da ferramenta com opcoes escuras e claras.
- 📈 Mini grafico de mercado com selecao de ativo.

### Provedores Suportados

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Como Usar

Fluxo rapido:
1. 🔌 Clique em Connect Wallet e escolha modo REAL ou TESTE.
2. 🌐 Selecione rede e provedor.
3. 📬 Cole um endereco publico (BTC, EVM, Solana e outros).
4. 🧾 Rode Contract Check para validar deploy/presenca de bytecode.
5. 💰 No modo REAL, use Check Balance para consulta ao vivo.
6. 📈 No Crypto Market Snapshot, adicione outras moedas por simbolo/id (ex.: DOGE, XRP, cardano).
7. 📊 Use o seletor de grafico para acompanhar BTC ou outro ativo.
8. 🗂️ No Wallet Registry, rode Check Real Balances e exporte relatorios.

Recursos que agilizam seu fluxo:
- 🤖 Para apps com IA: gere enderecos de teste rapidamente para simular cenarios sem usar chaves reais.
- 👩‍💻 Para dev humano: valide contrato e saldo no mesmo painel sem trocar de ferramenta.
- 🔒 Seguranca por padrao: apenas endereco publico, nunca seed phrase ou chave privada.

> Nota: O guia visual atual ainda mostra um nome antigo do produto. O fluxo continua valido e uma versao atualizada sera publicada em breve.

### Reuso Como Base de dApp

1. Clone este repositorio.
2. Mantenha os arquivos de agente na pasta .github.
3. Execute o prompt em .github/prompts/new-dapp-from-forge.prompt.md no Copilot Chat.
4. Peca o stack alvo (exemplo: Next.js + wagmi + viem).
5. Mantenha as regras de seguranca: apenas endereco publico, nunca seed phrase ou chave privada.

### Apoie o Projeto

Se esta extensao ajuda seu fluxo, voce pode apoiar o desenvolvimento continuo aqui:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Propriedade Intelectual

- O icone da extensao (media/icon.png e media/activity-icon.svg) e a identidade visual do projeto sao de uso exclusivo, salvo autorizacao expressa do autor.
- Nome, marca e elementos visuais da aplicacao possuem todos os direitos reservados.
- Este repositorio nao concede licenca para uso comercial da identidade da aplicacao sem permissao previa.

---

## Francais

### Vue d'ensemble

Web3 Wallet Lab Forge est une extension VS Code pour tester des portefeuilles et verifier contrats/soldes sur Bitcoin, les chaines EVM et Solana.

### Points Forts

- 🌐 Selection de reseau orientee Bitcoin (Mainnet et Testnet).
- 🔗 Raccourcis vers les principaux fournisseurs de portefeuilles.
- 🔐 Mode portefeuille reel avec validation d'adresse publique.
- 🧪 Mode portefeuille de test pour les workflows locaux.
- 🧾 Verification de contrat pour les chaines EVM et Solana.
- 🛡️ Politique de verification de contrat professionnelle: prefixe de bytecode optionnel + taille minimale runtime.
- 💰 Consultation de solde reel via API RPC/indexer.
- 📑 Export de rapport de verification de contrat (TXT/CSV) pour preuves QA.
- 🎨 Trois themes sombres integres, dont une option sobre orientee Bitcoin.

### Fournisseurs Pris en Charge

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Developpement Local

```bash
npm install
npm run compile
```

Appuyez sur F5 dans VS Code pour ouvrir un Extension Development Host.

### Utilisation

1. Cliquez sur Connect Wallet et choisissez le mode reel ou test.
2. Selectionnez le reseau et le fournisseur.
3. Collez une adresse publique (BTC, EVM ou Solana).
4. Lancez Contract Check pour valider le deploiement/la presence de code.
5. En mode reel, utilisez Check Balance pour une consultation en direct.

> Remarque: Le guide visuel affiche encore un ancien nom du produit. Le flux reste valide et une version mise a jour sera publiee bientot.

### Packaging

```bash
npm run package
```

Cette commande genere un fichier .vsix pour installation/publication.

### Reutilisation comme Base dApp

1. Clonez ce depot.
2. Conservez les conventions d'agent dans .github.
3. Executez le prompt .github/prompts/new-dapp-from-forge.prompt.md dans Copilot Chat.
4. Demandez votre stack cible (exemple: Next.js + wagmi + viem).
5. Respectez les regles de securite wallet: adresses publiques uniquement, jamais de seed phrase/cles privees.

### Soutenir le Projet

Si cette extension aide votre flux, vous pouvez soutenir son developpement ici:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Propriete Intellectuelle

- Les icones de l'extension (media/icon.png et media/activity-icon.svg) et l'identite visuelle sont reserves a ce projet sauf autorisation explicite de l'auteur.
- Le nom, la marque et les elements visuels sont proteges par tous droits reserves.
- Ce depot n'accorde aucun droit d'utilisation commerciale de l'identite du produit sans autorisation prealable.

---

## Espanol

### Vision General

Web3 Wallet Lab Forge es una extension de VS Code para pruebas de billeteras y verificaciones de contrato/saldo en Bitcoin, cadenas EVM y Solana.

### Puntos Destacados

- 🌐 Seleccion de red con enfoque Bitcoin (Mainnet y Testnet).
- 🔗 Atajos a proveedores principales de billetera.
- 🔐 Modo billetera real con validacion de direccion publica.
- 🧪 Modo billetera de prueba para flujos locales.
- 🧾 Verificacion de contrato para cadenas EVM y Solana.
- 🛡️ Politica profesional de verificacion de contrato: prefijo opcional de bytecode + tamano minimo runtime.
- 💰 Consulta de saldo real via APIs RPC/indexer.
- 📑 Exportacion de reporte de verificacion de contrato (TXT/CSV) para evidencia QA.
- 🎨 Tres temas oscuros incluidos, con una opcion sobria enfocada en Bitcoin.

### Proveedores Soportados

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Desarrollo Local

```bash
npm install
npm run compile
```

Presiona F5 en VS Code para abrir un Extension Development Host.

### Uso

1. Haz clic en Connect Wallet y elige modo real o modo de prueba.
2. Selecciona red y proveedor.
3. Pega una direccion publica (BTC, EVM o Solana).
4. Ejecuta Contract Check para validar despliegue/presencia de codigo.
5. En modo real, usa Check Balance para consulta en vivo.

> Nota: La guia visual actual todavia muestra un nombre antiguo del producto. El flujo sigue siendo valido y se publicara una version actualizada pronto.

### Empaquetado

```bash
npm run package
```

Este comando genera un archivo .vsix para instalacion/publicacion.

### Reuso como Base de dApp

1. Clona este repositorio.
2. Mantem las convenciones de agente en .github.
3. Ejecuta el prompt .github/prompts/new-dapp-from-forge.prompt.md en Copilot Chat.
4. Pide tu stack objetivo (ejemplo: Next.js + wagmi + viem).
5. Mantem reglas de seguridad de wallet: solo direcciones publicas, nunca seed phrase/llaves privadas.

### Apoya el Proyecto

Si esta extension ayuda tu flujo, puedes apoyar el desarrollo continuo aqui:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Propiedad Intelectual

- Los iconos de la extension (media/icon.png y media/activity-icon.svg) y la identidad visual estan reservados para este proyecto salvo autorizacion explicita del autor.
- El nombre, la marca y los recursos visuales estan protegidos con todos los derechos reservados.
- Este repositorio no concede licencia de uso comercial de la identidad del producto sin permiso previo.

---

## 中文

### 概述

Web3 Wallet Lab Forge 是一个 VS Code 扩展，用于在 Bitcoin、EVM 链和 Solana 上进行钱包测试与合约/余额检查。

### 核心特性

- 🌐 以 Bitcoin 为优先的网络选择（Mainnet 和 Testnet）。
- 🔗 提供主流钱包服务商快捷入口。
- 🔐 真实钱包模式，支持公开地址校验。
- 🧪 测试钱包生成模式，适合本地工作流。
- 🧾 支持 EVM 与 Solana 的合约检查。
- 🛡️ 专业级合约验证策略：可选字节码前缀 + 运行时代码最小大小。
- 💰 通过 RPC/indexer API 进行真实余额查询。
- 📑 支持导出合约验证报告（TXT/CSV），用于 QA 证据留存。
- 🎨 内置三个深色主题，其中一个是偏 Bitcoin 的稳重风格。

### 支持的钱包提供商

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### 本地开发

```bash
npm install
npm run compile
```

在 VS Code 中按 F5 启动 Extension Development Host。

### 使用方式

1. 点击 Connect Wallet，选择真实模式或测试模式。
2. 选择网络和钱包提供商。
3. 粘贴公开钱包地址（BTC、EVM 或 Solana）。
4. 运行 Contract Check，验证部署/代码是否存在。
5. 在真实模式下，使用 Check Balance 进行实时查询。

> 说明：当前可视化指南仍显示旧产品名称。流程依然有效，我们会尽快发布更新版本。

### 打包

```bash
npm run package
```

该命令会生成用于安装/发布的 .vsix 文件。

### 作为 dApp 模板复用

1. 克隆本仓库。
2. 保留 .github 下的 agent 约定文件。
3. 在 Copilot Chat 运行 .github/prompts/new-dapp-from-forge.prompt.md。
4. 指定你的目标技术栈（例如：Next.js + wagmi + viem）。
5. 保持钱包安全规则：仅使用公开地址，绝不使用助记词/私钥。

### 支持项目

如果这个扩展对你的工作流有帮助，可以在这里支持持续开发：

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### 知识产权

- 扩展图标文件（media/icon.png 与 media/activity-icon.svg）及视觉标识仅供本项目使用，除非作者明确授权。
- 名称、品牌与视觉资产均保留所有权利。
- 未经事先许可，本仓库不授予该产品标识的商业使用权。

---

## 日本語

### 概要

Web3 Wallet Lab Forge は、Bitcoin、EVM チェーン、Solana でウォレット検証とコントラクト/残高チェックを行うための VS Code 拡張です。

### 主な特長

- 🌐 Bitcoin 優先のネットワーク選択（Mainnet / Testnet）。
- 🔗 主要ウォレットプロバイダーへのショートカット。
- 🔐 公開アドレス検証付きの実ウォレットモード。
- 🧪 ローカル作業向けのテストウォレット生成モード。
- 🧾 EVM と Solana のコントラクトチェックに対応。
- 🛡️ プロ向けコントラクト検証ポリシー: 任意のバイトコード接頭辞 + 最小ランタイムサイズ。
- 💰 RPC/indexer API による実残高の照会。
- 📑 QA 証跡向けにコントラクト検証レポート（TXT/CSV）をエクスポート可能。
- 🎨 Bitcoin 寄りの落ち着いたテーマを含む 3 つのダークテーマを内蔵。

### 対応プロバイダー

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### ローカル開発

```bash
npm install
npm run compile
```

VS Code で F5 を押して Extension Development Host を起動します。

### 使い方

1. Connect Wallet をクリックし、実モードまたはテストモードを選択します。
2. ネットワークとプロバイダーを選択します。
3. 公開ウォレットアドレス（BTC、EVM、Solana）を貼り付けます。
4. Contract Check を実行し、デプロイ/コード存在を確認します。
5. 実モードでは Check Balance でリアルタイム照会を行います。

> 注記: 現在のビジュアルガイドには旧製品名が表示されています。ワークフロー自体は有効で、更新版を近日公開予定です。

### パッケージ化

```bash
npm run package
```

このコマンドでインストール/公開用の .vsix ファイルを生成します。

### dApp スターターとして再利用

1. このリポジトリをクローンします。
2. .github 配下の agent 規約を維持します。
3. Copilot Chat で .github/prompts/new-dapp-from-forge.prompt.md を実行します。
4. 目標スタックを指定します（例: Next.js + wagmi + viem）。
5. ウォレット安全ルールを守ります: 公開アドレスのみ使用し、seed phrase/秘密鍵は絶対に扱わないでください。

### プロジェクト支援

この拡張が役立った場合は、継続開発の支援をお願いします：

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### 知的財産

- 拡張アイコン（media/icon.png と media/activity-icon.svg）およびビジュアルアイデンティティは、作者の明示的な許可がない限り本プロジェクト専用です。
- 名称、ブランド、ビジュアル資産はすべての権利を留保します。
- 事前許可なしに、本製品アイデンティティの商用利用権は付与されません。

---

## Deutsch

### Ubersicht

Web3 Wallet Lab Forge ist eine VS Code-Erweiterung fur Wallet-Tests sowie Vertrags-/Saldo-Prufungen auf Bitcoin, EVM-Chains und Solana.

### Highlights

- 🌐 Bitcoin-zentrierte Netzwerkauswahl (Mainnet und Testnet).
- 🔗 Schnellzugriffe auf wichtige Wallet-Anbieter.
- 🔐 Echter Wallet-Modus mit Validierung offentlich sichtbarer Adressen.
- 🧪 Test-Wallet-Generierungsmodus fur lokale Workflows.
- 🧾 Contract Check fur EVM- und Solana-Chains.
- 🛡️ Professionelle Contract-Verification-Policy: optionales Bytecode-Prafix + minimale Runtime-Grose.
- 💰 Reale Saldoabfrage uber RPC-/Indexer-APIs.
- 📑 Export von Contract-Verification-Reports (TXT/CSV) fur QA-Nachweise.
- 🎨 Drei integrierte Dark-Themes, darunter eine nuchterne Bitcoin-orientierte Option.

### Unterstutzte Anbieter

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Lokale Entwicklung

```bash
npm install
npm run compile
```

Drucken Sie F5 in VS Code, um einen Extension Development Host zu starten.

### Verwendung

1. Klicken Sie auf Connect Wallet und wahlen Sie Real- oder Testmodus.
2. Wahlen Sie Netzwerk und Anbieter.
3. Fugen Sie eine offentliche Wallet-Adresse ein (BTC, EVM oder Solana).
4. Fuhren Sie Contract Check aus, um Deployment/Code-Prasenz zu validieren.
5. Im Realmodus nutzen Sie Check Balance fur die Live-Abfrage.

> Hinweis: Der visuelle Leitfaden zeigt derzeit noch einen alten Produktnamen. Der Ablauf ist weiterhin korrekt, und eine aktualisierte Version folgt in Kurze.

### Packaging

```bash
npm run package
```

Dieser Befehl erzeugt eine .vsix-Datei fur Installation/Veroffentlichung.

### Wiederverwendung als dApp-Starter

1. Klonen Sie dieses Repository.
2. Behalten Sie die Agent-Konventionen unter .github bei.
3. Fuhren Sie den Prompt .github/prompts/new-dapp-from-forge.prompt.md in Copilot Chat aus.
4. Fordern Sie Ihren Ziel-Stack an (Beispiel: Next.js + wagmi + viem).
5. Halten Sie Wallet-Sicherheitsregeln ein: nur offentliche Adressen, niemals Seed-Phrase/private Schlussel.

### Projekt Unterstuetzen

Wenn diese Erweiterung Ihrem Workflow hilft, konnen Sie die Weiterentwicklung hier unterstutzen:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Geistiges Eigentum

- Die Erweiterungs-Icons (media/icon.png und media/activity-icon.svg) sowie die visuelle Identitat sind fur dieses Projekt reserviert, sofern keine ausdruckliche Genehmigung des Autors vorliegt.
- Name, Marke und visuelle Assets sind vollumfanglich urheberrechtlich geschutzt.
- Dieses Repository gewahrt keine kommerziellen Nutzungsrechte an der Produktidentitat ohne vorherige Erlaubnis.

---

## العربية

### نظرة عامة

Web3 Wallet Lab Forge هي اضافة لـ VS Code لاختبار المحافظ والتحقق من العقود والارصدة على Bitcoin وسلاسل EVM وSolana.

### المميزات

- 🌐 اختيار الشبكة يبدأ ب Bitcoin (Mainnet وTestnet).
- 🔗 اختصارات لمزودي المحافظ الرئيسيين.
- 🔐 وضع المحفظة الحقيقية مع التحقق من العنوان العام.
- 🧪 وضع توليد محفظة اختبار لسير العمل المحلي.
- 🧾 فحص العقود لسلاسل EVM وSolana.
- 🛡️ سياسة احترافية للتحقق من العقود: بادئة bytecode اختيارية + حد ادنى لحجم runtime.
- 💰 الاستعلام عن الرصيد الحقيقي عبر واجهات RPC/indexer.
- 📑 تصدير تقرير التحقق من العقد (TXT/CSV) كدليل لفرق QA.
- 🎨 ثلاث سمات داكنة مدمجة، بينها خيار هادئ يركز على Bitcoin.

### المزودون المدعومون

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### التطوير المحلي

```bash
npm install
npm run compile
```

اضغط F5 في VS Code لفتح Extension Development Host.

### طريقة الاستخدام

1. انقر Connect Wallet واختر الوضع الحقيقي او وضع الاختبار.
2. اختر الشبكة والمزود.
3. الصق عنوان محفظة عام (BTC او EVM او Solana).
4. شغل Contract Check للتحقق من النشر/وجود الكود.
5. في الوضع الحقيقي استخدم Check Balance للاستعلام المباشر.

> ملاحظة: الدليل المرئي الحالي ما زال يعرض اسما قديما للمنتج. سير العمل ما زال صحيحا وسيتم نشر نسخة محدثة قريبا.

### الحزم

```bash
npm run package
```

ينتج هذا الامر ملف .vsix للتثبيت/النشر.

### اعادة الاستخدام كبداية dApp

1. انسخ هذا المستودع.
2. حافظ على قواعد الوكيل داخل .github.
3. شغل الموجه .github/prompts/new-dapp-from-forge.prompt.md في Copilot Chat.
4. اطلب الحزمة التقنية المستهدفة (مثال: Next.js + wagmi + viem).
5. التزم بقواعد امان المحافظ: عناوين عامة فقط، ولا تستخدم ابدا seed phrase او المفاتيح الخاصة.

### دعم المشروع

اذا كانت هذه الاضافة مفيدة لك، يمكنك دعم التطوير المستمر هنا:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### الملكية الفكرية

- ايقونات الاضافة (media/icon.png وmedia/activity-icon.svg) والهوية البصرية مخصصة لهذا المشروع ما لم يصرح المؤلف بخلاف ذلك.
- الاسم والعلامة والاصول البصرية محفوظة الحقوق بالكامل.
- هذا المستودع لا يمنح حقوق استخدام تجاري لهوية المنتج بدون اذن مسبق.

---

## Русский

### Обзор

Web3 Wallet Lab Forge - это расширение VS Code для тестирования кошельков и проверки контрактов/балансов в Bitcoin, EVM-сетях и Solana.

### Ключевые возможности

- 🌐 Выбор сети с приоритетом Bitcoin (Mainnet и Testnet).
- 🔗 Быстрые переходы к популярным провайдерам кошельков.
- 🔐 Режим реального кошелька с валидацией публичного адреса.
- 🧪 Режим генерации тестового кошелька для локальных сценариев.
- 🧾 Проверка контрактов для EVM и Solana.
- 🛡️ Профессиональная политика проверки контракта: опциональный префикс байткода + минимальный размер runtime-кода.
- 💰 Проверка реальных балансов через RPC/indexer API.
- 📑 Экспорт отчета по проверке контрактов (TXT/CSV) для QA-артефактов.
- 🎨 Встроенные темы и рыночный блок с мини-графиком.

### Поддерживаемые провайдеры

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Локальная разработка

```bash
npm install
npm run compile
```

Нажмите F5 в VS Code, чтобы открыть Extension Development Host.

### Использование

1. Нажмите Connect Wallet и выберите режим REAL или TEST.
2. Выберите сеть и провайдера.
3. Вставьте публичный адрес кошелька (BTC, EVM или Solana).
4. Запустите Contract Check для проверки деплоя/наличия кода.
5. В режиме REAL используйте Check Balance для онлайн-проверки.

> Примечание: визуальный гайд пока показывает старое название продукта. Текущий поток работы остается актуальным, обновление будет опубликовано позже.

### Упаковка

```bash
npm run package
```

Эта команда создает файл .vsix для установки/публикации.

### Повторное использование как dApp-стартера

1. Клонируйте этот репозиторий.
2. Сохраните агентские соглашения в .github.
3. Запустите prompt .github/prompts/new-dapp-from-forge.prompt.md в Copilot Chat.
4. Запросите целевой стек (пример: Next.js + wagmi + viem).
5. Соблюдайте правила безопасности: только публичные адреса, никогда не используйте seed phrase/приватные ключи.

### Поддержать проект

Если это расширение помогает вашему рабочему процессу, вы можете поддержать развитие здесь:

- [GitHub Sponsors](https://github.com/sponsors/thiag)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Интеллектуальная собственность

- Иконки расширения (media/icon.png и media/activity-icon.svg) и визуальная айдентика зарезервированы для этого проекта, если автор явно не разрешил иное.
- Название, бренд и визуальные материалы защищены с сохранением всех прав.
- Репозиторий не предоставляет прав на коммерческое использование айдентики продукта без предварительного разрешения.


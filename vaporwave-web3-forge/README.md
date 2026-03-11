# Web3 Wallet Lab Forge

Created by thiagoyoshiaki@gmail.com

### Quick Donate

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

Language:
- [English](#english)
- [Portugues (Brasil)](#portugues-brasil)
- [Francais](#francais)
- [Ð ÑƒÑÑÐºÐ¸Ð¹](#Ñ€ÑƒÑÑÐºÐ¸Ð¹)
- [Espanol](#espanol)
- [ä¸­æ–‡](#ä¸­æ–‡)
- [æ—¥æœ¬èªž](#æ—¥æœ¬èªž)
- [Deutsch](#deutsch)
- [Arabic (Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©)](#Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©)

---

## English

### Overview

Web3 Wallet Lab Forge is a practical VS Code extension for wallet testing, contract verification, and real-balance intelligence across Bitcoin, EVM chains, and Solana. It is built for both humans and AI agents, with useful day-to-day tools like safe public-address validation, Contract Check, batch balance checks, provider shortcuts, report exports (TXT/CSV), and in-panel market context.

### Highlights

- ðŸŒ Bitcoin-first network selection (Mainnet and Testnet).
- ðŸ”— Provider shortcuts for major wallets.
- ðŸ” Real wallet mode with public address validation.
- ðŸ§ª Test wallet generation mode for local workflows.
- ðŸ§¾ Contract check for EVM and Solana chains.
- ðŸ›¡ï¸ Professional contract verification policy: optional bytecode prefix + minimum runtime size.
- ðŸ’° Real balance lookup via RPC/indexer APIs.
- ðŸ—‚ï¸ Batch real-balance check from Wallet Registry.
- ðŸ“¦ Registry export for operational records (TXT/CSV).
- ðŸ“‘ Contract verification report export (TXT/CSV) for QA evidence.
- ðŸŽ¨ Built-in theme system (dark + light) for different working styles.
- ðŸ“ˆ In-panel mini market chart with coin selection.

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

1. ðŸ”Œ Click Connect Wallet and choose REAL mode or TEST mode.
2. ðŸŒ Select network and provider.
3. ðŸ“¬ Paste a public wallet address (BTC, EVM, or Solana).
4. ðŸ§¾ Run Contract Check to validate deployment/code presence.
5. ðŸ’° In REAL mode, use Check Balance for live lookup.
6. ðŸ“ˆ In Crypto Market Snapshot, add extra coins by symbol/id (example: DOGE, XRP, cardano).
7. ðŸ“Š Use the chart selector to view BTC or another selected asset trend.
8. ðŸ—‚ï¸ In Wallet Registry, run Check Real Balances and export reports.

> Note: The visual guide currently shows a legacy product name. The workflow is still valid and an updated guide is coming soon.

### Reuse as dApp Starter

1. Clone this repository.
2. Keep agent conventions under .github.
3. Run the prompt at .github/prompts/new-dapp-from-forge.prompt.md in Copilot Chat.
4. Request your target stack (example: Next.js + wagmi + viem).
5. Keep wallet safety rules: public addresses only, never seed/private keys.

### Donate

If this extension helps your workflow, you can support ongoing development here:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
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

- ðŸŒ Selecao de rede com Bitcoin primeiro (Mainnet e Testnet).
- ðŸ”— Atalhos para sites de provedores de carteira.
- ðŸ” Modo carteira real com validacao de endereco publico.
- ðŸ§ª Modo carteira de teste para fluxo local.
- ðŸ§¾ Contract Check para cadeias EVM e Solana.
- ðŸ›¡ï¸ Politica profissional de verificacao de contrato: prefixo opcional de bytecode + tamanho minimo de runtime.
- ðŸ’° Consulta de saldo real por RPC/indexer.
- ðŸ—‚ï¸ Checagem em lote de saldos reais via Wallet Registry.
- ðŸ“¦ Exportacao de registros e relatorios (TXT/CSV).
- ðŸ“‘ Exportacao de relatorio de verificacao de contrato (TXT/CSV) para evidencias de QA.
- ðŸŽ¨ Sistema de temas da ferramenta com opcoes escuras e claras.
- ðŸ“ˆ Mini grafico de mercado com selecao de ativo.

### Provedores Suportados

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Como Usar

Fluxo rapido:
1. ðŸ”Œ Clique em Connect Wallet e escolha modo REAL ou TESTE.
2. ðŸŒ Selecione rede e provedor.
3. ðŸ“¬ Cole um endereco publico (BTC, EVM, Solana e outros).
4. ðŸ§¾ Rode Contract Check para validar deploy/presenca de bytecode.
5. ðŸ’° No modo REAL, use Check Balance para consulta ao vivo.
6. ðŸ“ˆ No Crypto Market Snapshot, adicione outras moedas por simbolo/id (ex.: DOGE, XRP, cardano).
7. ðŸ“Š Use o seletor de grafico para acompanhar BTC ou outro ativo.
8. ðŸ—‚ï¸ No Wallet Registry, rode Check Real Balances e exporte relatorios.

Recursos que agilizam seu fluxo:
- ðŸ¤– Para apps com IA: gere enderecos de teste rapidamente para simular cenarios sem usar chaves reais.
- ðŸ‘©â€ðŸ’» Para dev humano: valide contrato e saldo no mesmo painel sem trocar de ferramenta.
- ðŸ”’ Seguranca por padrao: apenas endereco publico, nunca seed phrase ou chave privada.

> Nota: O guia visual atual ainda mostra um nome antigo do produto. O fluxo continua valido e uma versao atualizada sera publicada em breve.

### Reuso Como Base de dApp

1. Clone este repositorio.
2. Mantenha os arquivos de agente na pasta .github.
3. Execute o prompt em .github/prompts/new-dapp-from-forge.prompt.md no Copilot Chat.
4. Peca o stack alvo (exemplo: Next.js + wagmi + viem).
5. Mantenha as regras de seguranca: apenas endereco publico, nunca seed phrase ou chave privada.

### Apoie o Projeto

Se esta extensao ajuda seu fluxo, voce pode apoiar o desenvolvimento continuo aqui:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
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

- ðŸŒ Selection de reseau orientee Bitcoin (Mainnet et Testnet).
- ðŸ”— Raccourcis vers les principaux fournisseurs de portefeuilles.
- ðŸ” Mode portefeuille reel avec validation d'adresse publique.
- ðŸ§ª Mode portefeuille de test pour les workflows locaux.
- ðŸ§¾ Verification de contrat pour les chaines EVM et Solana.
- ðŸ›¡ï¸ Politique de verification de contrat professionnelle: prefixe de bytecode optionnel + taille minimale runtime.
- ðŸ’° Consultation de solde reel via API RPC/indexer.
- ðŸ“‘ Export de rapport de verification de contrat (TXT/CSV) pour preuves QA.
- ðŸŽ¨ Trois themes sombres integres, dont une option sobre orientee Bitcoin.

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

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
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

- ðŸŒ Seleccion de red con enfoque Bitcoin (Mainnet y Testnet).
- ðŸ”— Atajos a proveedores principales de billetera.
- ðŸ” Modo billetera real con validacion de direccion publica.
- ðŸ§ª Modo billetera de prueba para flujos locales.
- ðŸ§¾ Verificacion de contrato para cadenas EVM y Solana.
- ðŸ›¡ï¸ Politica profesional de verificacion de contrato: prefijo opcional de bytecode + tamano minimo runtime.
- ðŸ’° Consulta de saldo real via APIs RPC/indexer.
- ðŸ“‘ Exportacion de reporte de verificacion de contrato (TXT/CSV) para evidencia QA.
- ðŸŽ¨ Tres temas oscuros incluidos, con una opcion sobria enfocada en Bitcoin.

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

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
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

## ä¸­æ–‡

### æ¦‚è¿°

Web3 Wallet Lab Forge æ˜¯ä¸€ä¸ª VS Code æ‰©å±•ï¼Œç”¨äºŽåœ¨ Bitcoinã€EVM é“¾å’Œ Solana ä¸Šè¿›è¡Œé’±åŒ…æµ‹è¯•ä¸Žåˆçº¦/ä½™é¢æ£€æŸ¥ã€‚

### æ ¸å¿ƒç‰¹æ€§

- ðŸŒ ä»¥ Bitcoin ä¸ºä¼˜å…ˆçš„ç½‘ç»œé€‰æ‹©ï¼ˆMainnet å’Œ Testnetï¼‰ã€‚
- ðŸ”— æä¾›ä¸»æµé’±åŒ…æœåŠ¡å•†å¿«æ·å…¥å£ã€‚
- ðŸ” çœŸå®žé’±åŒ…æ¨¡å¼ï¼Œæ”¯æŒå…¬å¼€åœ°å€æ ¡éªŒã€‚
- ðŸ§ª æµ‹è¯•é’±åŒ…ç”Ÿæˆæ¨¡å¼ï¼Œé€‚åˆæœ¬åœ°å·¥ä½œæµã€‚
- ðŸ§¾ æ”¯æŒ EVM ä¸Ž Solana çš„åˆçº¦æ£€æŸ¥ã€‚
- ðŸ›¡ï¸ ä¸“ä¸šçº§åˆçº¦éªŒè¯ç­–ç•¥ï¼šå¯é€‰å­—èŠ‚ç å‰ç¼€ + è¿è¡Œæ—¶ä»£ç æœ€å°å¤§å°ã€‚
- ðŸ’° é€šè¿‡ RPC/indexer API è¿›è¡ŒçœŸå®žä½™é¢æŸ¥è¯¢ã€‚
- ðŸ“‘ æ”¯æŒå¯¼å‡ºåˆçº¦éªŒè¯æŠ¥å‘Šï¼ˆTXT/CSVï¼‰ï¼Œç”¨äºŽ QA è¯æ®ç•™å­˜ã€‚
- ðŸŽ¨ å†…ç½®ä¸‰ä¸ªæ·±è‰²ä¸»é¢˜ï¼Œå…¶ä¸­ä¸€ä¸ªæ˜¯å Bitcoin çš„ç¨³é‡é£Žæ ¼ã€‚

### æ”¯æŒçš„é’±åŒ…æä¾›å•†

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### æœ¬åœ°å¼€å‘

```bash
npm install
npm run compile
```

åœ¨ VS Code ä¸­æŒ‰ F5 å¯åŠ¨ Extension Development Hostã€‚

### ä½¿ç”¨æ–¹å¼

1. ç‚¹å‡» Connect Walletï¼Œé€‰æ‹©çœŸå®žæ¨¡å¼æˆ–æµ‹è¯•æ¨¡å¼ã€‚
2. é€‰æ‹©ç½‘ç»œå’Œé’±åŒ…æä¾›å•†ã€‚
3. ç²˜è´´å…¬å¼€é’±åŒ…åœ°å€ï¼ˆBTCã€EVM æˆ– Solanaï¼‰ã€‚
4. è¿è¡Œ Contract Checkï¼ŒéªŒè¯éƒ¨ç½²/ä»£ç æ˜¯å¦å­˜åœ¨ã€‚
5. åœ¨çœŸå®žæ¨¡å¼ä¸‹ï¼Œä½¿ç”¨ Check Balance è¿›è¡Œå®žæ—¶æŸ¥è¯¢ã€‚

> è¯´æ˜Žï¼šå½“å‰å¯è§†åŒ–æŒ‡å—ä»æ˜¾ç¤ºæ—§äº§å“åç§°ã€‚æµç¨‹ä¾ç„¶æœ‰æ•ˆï¼Œæˆ‘ä»¬ä¼šå°½å¿«å‘å¸ƒæ›´æ–°ç‰ˆæœ¬ã€‚

### æ‰“åŒ…

```bash
npm run package
```

è¯¥å‘½ä»¤ä¼šç”Ÿæˆç”¨äºŽå®‰è£…/å‘å¸ƒçš„ .vsix æ–‡ä»¶ã€‚

### ä½œä¸º dApp æ¨¡æ¿å¤ç”¨

1. å…‹éš†æœ¬ä»“åº“ã€‚
2. ä¿ç•™ .github ä¸‹çš„ agent çº¦å®šæ–‡ä»¶ã€‚
3. åœ¨ Copilot Chat è¿è¡Œ .github/prompts/new-dapp-from-forge.prompt.mdã€‚
4. æŒ‡å®šä½ çš„ç›®æ ‡æŠ€æœ¯æ ˆï¼ˆä¾‹å¦‚ï¼šNext.js + wagmi + viemï¼‰ã€‚
5. ä¿æŒé’±åŒ…å®‰å…¨è§„åˆ™ï¼šä»…ä½¿ç”¨å…¬å¼€åœ°å€ï¼Œç»ä¸ä½¿ç”¨åŠ©è®°è¯/ç§é’¥ã€‚

### æ”¯æŒé¡¹ç›®

å¦‚æžœè¿™ä¸ªæ‰©å±•å¯¹ä½ çš„å·¥ä½œæµæœ‰å¸®åŠ©ï¼Œå¯ä»¥åœ¨è¿™é‡Œæ”¯æŒæŒç»­å¼€å‘ï¼š

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### çŸ¥è¯†äº§æƒ

- æ‰©å±•å›¾æ ‡æ–‡ä»¶ï¼ˆmedia/icon.png ä¸Ž media/activity-icon.svgï¼‰åŠè§†è§‰æ ‡è¯†ä»…ä¾›æœ¬é¡¹ç›®ä½¿ç”¨ï¼Œé™¤éžä½œè€…æ˜Žç¡®æŽˆæƒã€‚
- åç§°ã€å“ç‰Œä¸Žè§†è§‰èµ„äº§å‡ä¿ç•™æ‰€æœ‰æƒåˆ©ã€‚
- æœªç»äº‹å…ˆè®¸å¯ï¼Œæœ¬ä»“åº“ä¸æŽˆäºˆè¯¥äº§å“æ ‡è¯†çš„å•†ä¸šä½¿ç”¨æƒã€‚

---

## æ—¥æœ¬èªž

### æ¦‚è¦

Web3 Wallet Lab Forge ã¯ã€Bitcoinã€EVM ãƒã‚§ãƒ¼ãƒ³ã€Solana ã§ã‚¦ã‚©ãƒ¬ãƒƒãƒˆæ¤œè¨¼ã¨ã‚³ãƒ³ãƒˆãƒ©ã‚¯ãƒˆ/æ®‹é«˜ãƒã‚§ãƒƒã‚¯ã‚’è¡Œã†ãŸã‚ã® VS Code æ‹¡å¼µã§ã™ã€‚

### ä¸»ãªç‰¹é•·

- ðŸŒ Bitcoin å„ªå…ˆã®ãƒãƒƒãƒˆãƒ¯ãƒ¼ã‚¯é¸æŠžï¼ˆMainnet / Testnetï¼‰ã€‚
- ðŸ”— ä¸»è¦ã‚¦ã‚©ãƒ¬ãƒƒãƒˆãƒ—ãƒ­ãƒã‚¤ãƒ€ãƒ¼ã¸ã®ã‚·ãƒ§ãƒ¼ãƒˆã‚«ãƒƒãƒˆã€‚
- ðŸ” å…¬é–‹ã‚¢ãƒ‰ãƒ¬ã‚¹æ¤œè¨¼ä»˜ãã®å®Ÿã‚¦ã‚©ãƒ¬ãƒƒãƒˆãƒ¢ãƒ¼ãƒ‰ã€‚
- ðŸ§ª ãƒ­ãƒ¼ã‚«ãƒ«ä½œæ¥­å‘ã‘ã®ãƒ†ã‚¹ãƒˆã‚¦ã‚©ãƒ¬ãƒƒãƒˆç”Ÿæˆãƒ¢ãƒ¼ãƒ‰ã€‚
- ðŸ§¾ EVM ã¨ Solana ã®ã‚³ãƒ³ãƒˆãƒ©ã‚¯ãƒˆãƒã‚§ãƒƒã‚¯ã«å¯¾å¿œã€‚
- ðŸ›¡ï¸ ãƒ—ãƒ­å‘ã‘ã‚³ãƒ³ãƒˆãƒ©ã‚¯ãƒˆæ¤œè¨¼ãƒãƒªã‚·ãƒ¼: ä»»æ„ã®ãƒã‚¤ãƒˆã‚³ãƒ¼ãƒ‰æŽ¥é ­è¾ž + æœ€å°ãƒ©ãƒ³ã‚¿ã‚¤ãƒ ã‚µã‚¤ã‚ºã€‚
- ðŸ’° RPC/indexer API ã«ã‚ˆã‚‹å®Ÿæ®‹é«˜ã®ç…§ä¼šã€‚
- ðŸ“‘ QA è¨¼è·¡å‘ã‘ã«ã‚³ãƒ³ãƒˆãƒ©ã‚¯ãƒˆæ¤œè¨¼ãƒ¬ãƒãƒ¼ãƒˆï¼ˆTXT/CSVï¼‰ã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆå¯èƒ½ã€‚
- ðŸŽ¨ Bitcoin å¯„ã‚Šã®è½ã¡ç€ã„ãŸãƒ†ãƒ¼ãƒžã‚’å«ã‚€ 3 ã¤ã®ãƒ€ãƒ¼ã‚¯ãƒ†ãƒ¼ãƒžã‚’å†…è”µã€‚

### å¯¾å¿œãƒ—ãƒ­ãƒã‚¤ãƒ€ãƒ¼

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### ãƒ­ãƒ¼ã‚«ãƒ«é–‹ç™º

```bash
npm install
npm run compile
```

VS Code ã§ F5 ã‚’æŠ¼ã—ã¦ Extension Development Host ã‚’èµ·å‹•ã—ã¾ã™ã€‚

### ä½¿ã„æ–¹

1. Connect Wallet ã‚’ã‚¯ãƒªãƒƒã‚¯ã—ã€å®Ÿãƒ¢ãƒ¼ãƒ‰ã¾ãŸã¯ãƒ†ã‚¹ãƒˆãƒ¢ãƒ¼ãƒ‰ã‚’é¸æŠžã—ã¾ã™ã€‚
2. ãƒãƒƒãƒˆãƒ¯ãƒ¼ã‚¯ã¨ãƒ—ãƒ­ãƒã‚¤ãƒ€ãƒ¼ã‚’é¸æŠžã—ã¾ã™ã€‚
3. å…¬é–‹ã‚¦ã‚©ãƒ¬ãƒƒãƒˆã‚¢ãƒ‰ãƒ¬ã‚¹ï¼ˆBTCã€EVMã€Solanaï¼‰ã‚’è²¼ã‚Šä»˜ã‘ã¾ã™ã€‚
4. Contract Check ã‚’å®Ÿè¡Œã—ã€ãƒ‡ãƒ—ãƒ­ã‚¤/ã‚³ãƒ¼ãƒ‰å­˜åœ¨ã‚’ç¢ºèªã—ã¾ã™ã€‚
5. å®Ÿãƒ¢ãƒ¼ãƒ‰ã§ã¯ Check Balance ã§ãƒªã‚¢ãƒ«ã‚¿ã‚¤ãƒ ç…§ä¼šã‚’è¡Œã„ã¾ã™ã€‚

> æ³¨è¨˜: ç¾åœ¨ã®ãƒ“ã‚¸ãƒ¥ã‚¢ãƒ«ã‚¬ã‚¤ãƒ‰ã«ã¯æ—§è£½å“åãŒè¡¨ç¤ºã•ã‚Œã¦ã„ã¾ã™ã€‚ãƒ¯ãƒ¼ã‚¯ãƒ•ãƒ­ãƒ¼è‡ªä½“ã¯æœ‰åŠ¹ã§ã€æ›´æ–°ç‰ˆã‚’è¿‘æ—¥å…¬é–‹äºˆå®šã§ã™ã€‚

### ãƒ‘ãƒƒã‚±ãƒ¼ã‚¸åŒ–

```bash
npm run package
```

ã“ã®ã‚³ãƒžãƒ³ãƒ‰ã§ã‚¤ãƒ³ã‚¹ãƒˆãƒ¼ãƒ«/å…¬é–‹ç”¨ã® .vsix ãƒ•ã‚¡ã‚¤ãƒ«ã‚’ç”Ÿæˆã—ã¾ã™ã€‚

### dApp ã‚¹ã‚¿ãƒ¼ã‚¿ãƒ¼ã¨ã—ã¦å†åˆ©ç”¨

1. ã“ã®ãƒªãƒã‚¸ãƒˆãƒªã‚’ã‚¯ãƒ­ãƒ¼ãƒ³ã—ã¾ã™ã€‚
2. .github é…ä¸‹ã® agent è¦ç´„ã‚’ç¶­æŒã—ã¾ã™ã€‚
3. Copilot Chat ã§ .github/prompts/new-dapp-from-forge.prompt.md ã‚’å®Ÿè¡Œã—ã¾ã™ã€‚
4. ç›®æ¨™ã‚¹ã‚¿ãƒƒã‚¯ã‚’æŒ‡å®šã—ã¾ã™ï¼ˆä¾‹: Next.js + wagmi + viemï¼‰ã€‚
5. ã‚¦ã‚©ãƒ¬ãƒƒãƒˆå®‰å…¨ãƒ«ãƒ¼ãƒ«ã‚’å®ˆã‚Šã¾ã™: å…¬é–‹ã‚¢ãƒ‰ãƒ¬ã‚¹ã®ã¿ä½¿ç”¨ã—ã€seed phrase/ç§˜å¯†éµã¯çµ¶å¯¾ã«æ‰±ã‚ãªã„ã§ãã ã•ã„ã€‚

### ãƒ—ãƒ­ã‚¸ã‚§ã‚¯ãƒˆæ”¯æ´

ã“ã®æ‹¡å¼µãŒå½¹ç«‹ã£ãŸå ´åˆã¯ã€ç¶™ç¶šé–‹ç™ºã®æ”¯æ´ã‚’ãŠé¡˜ã„ã—ã¾ã™ï¼š

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### çŸ¥çš„è²¡ç”£

- æ‹¡å¼µã‚¢ã‚¤ã‚³ãƒ³ï¼ˆmedia/icon.png ã¨ media/activity-icon.svgï¼‰ãŠã‚ˆã³ãƒ“ã‚¸ãƒ¥ã‚¢ãƒ«ã‚¢ã‚¤ãƒ‡ãƒ³ãƒ†ã‚£ãƒ†ã‚£ã¯ã€ä½œè€…ã®æ˜Žç¤ºçš„ãªè¨±å¯ãŒãªã„é™ã‚Šæœ¬ãƒ—ãƒ­ã‚¸ã‚§ã‚¯ãƒˆå°‚ç”¨ã§ã™ã€‚
- åç§°ã€ãƒ–ãƒ©ãƒ³ãƒ‰ã€ãƒ“ã‚¸ãƒ¥ã‚¢ãƒ«è³‡ç”£ã¯ã™ã¹ã¦ã®æ¨©åˆ©ã‚’ç•™ä¿ã—ã¾ã™ã€‚
- äº‹å‰è¨±å¯ãªã—ã«ã€æœ¬è£½å“ã‚¢ã‚¤ãƒ‡ãƒ³ãƒ†ã‚£ãƒ†ã‚£ã®å•†ç”¨åˆ©ç”¨æ¨©ã¯ä»˜ä¸Žã•ã‚Œã¾ã›ã‚“ã€‚

---

## Deutsch

### Ubersicht

Web3 Wallet Lab Forge ist eine VS Code-Erweiterung fur Wallet-Tests sowie Vertrags-/Saldo-Prufungen auf Bitcoin, EVM-Chains und Solana.

### Highlights

- ðŸŒ Bitcoin-zentrierte Netzwerkauswahl (Mainnet und Testnet).
- ðŸ”— Schnellzugriffe auf wichtige Wallet-Anbieter.
- ðŸ” Echter Wallet-Modus mit Validierung offentlich sichtbarer Adressen.
- ðŸ§ª Test-Wallet-Generierungsmodus fur lokale Workflows.
- ðŸ§¾ Contract Check fur EVM- und Solana-Chains.
- ðŸ›¡ï¸ Professionelle Contract-Verification-Policy: optionales Bytecode-Prafix + minimale Runtime-Grose.
- ðŸ’° Reale Saldoabfrage uber RPC-/Indexer-APIs.
- ðŸ“‘ Export von Contract-Verification-Reports (TXT/CSV) fur QA-Nachweise.
- ðŸŽ¨ Drei integrierte Dark-Themes, darunter eine nuchterne Bitcoin-orientierte Option.

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

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
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

## Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©

### Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©

Web3 Wallet Lab Forge Ù‡ÙŠ Ø§Ø¶Ø§ÙØ© Ù„Ù€ VS Code Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù…Ø­Ø§ÙØ¸ ÙˆØ§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ù‚ÙˆØ¯ ÙˆØ§Ù„Ø§Ø±ØµØ¯Ø© Ø¹Ù„Ù‰ Bitcoin ÙˆØ³Ù„Ø§Ø³Ù„ EVM ÙˆSolana.

### Ø§Ù„Ù…Ù…ÙŠØ²Ø§Øª

- ðŸŒ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø´Ø¨ÙƒØ© ÙŠØ¨Ø¯Ø£ Ø¨ Bitcoin (Mainnet ÙˆTestnet).
- ðŸ”— Ø§Ø®ØªØµØ§Ø±Ø§Øª Ù„Ù…Ø²ÙˆØ¯ÙŠ Ø§Ù„Ù…Ø­Ø§ÙØ¸ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠÙŠÙ†.
- ðŸ” ÙˆØ¶Ø¹ Ø§Ù„Ù…Ø­ÙØ¸Ø© Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ© Ù…Ø¹ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ø¹Ø§Ù….
- ðŸ§ª ÙˆØ¶Ø¹ ØªÙˆÙ„ÙŠØ¯ Ù…Ø­ÙØ¸Ø© Ø§Ø®ØªØ¨Ø§Ø± Ù„Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø­Ù„ÙŠ.
- ðŸ§¾ ÙØ­Øµ Ø§Ù„Ø¹Ù‚ÙˆØ¯ Ù„Ø³Ù„Ø§Ø³Ù„ EVM ÙˆSolana.
- ðŸ›¡ï¸ Ø³ÙŠØ§Ø³Ø© Ø§Ø­ØªØ±Ø§ÙÙŠØ© Ù„Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ù‚ÙˆØ¯: Ø¨Ø§Ø¯Ø¦Ø© bytecode Ø§Ø®ØªÙŠØ§Ø±ÙŠØ© + Ø­Ø¯ Ø§Ø¯Ù†Ù‰ Ù„Ø­Ø¬Ù… runtime.
- ðŸ’° Ø§Ù„Ø§Ø³ØªØ¹Ù„Ø§Ù… Ø¹Ù† Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ø¹Ø¨Ø± ÙˆØ§Ø¬Ù‡Ø§Øª RPC/indexer.
- ðŸ“‘ ØªØµØ¯ÙŠØ± ØªÙ‚Ø±ÙŠØ± Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ù‚Ø¯ (TXT/CSV) ÙƒØ¯Ù„ÙŠÙ„ Ù„ÙØ±Ù‚ QA.
- ðŸŽ¨ Ø«Ù„Ø§Ø« Ø³Ù…Ø§Øª Ø¯Ø§ÙƒÙ†Ø© Ù…Ø¯Ù…Ø¬Ø©ØŒ Ø¨ÙŠÙ†Ù‡Ø§ Ø®ÙŠØ§Ø± Ù‡Ø§Ø¯Ø¦ ÙŠØ±ÙƒØ² Ø¹Ù„Ù‰ Bitcoin.

### Ø§Ù„Ù…Ø²ÙˆØ¯ÙˆÙ† Ø§Ù„Ù…Ø¯Ø¹ÙˆÙ…ÙˆÙ†

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ø­Ù„ÙŠ

```bash
npm install
npm run compile
```

Ø§Ø¶ØºØ· F5 ÙÙŠ VS Code Ù„ÙØªØ­ Extension Development Host.

### Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…

1. Ø§Ù†Ù‚Ø± Connect Wallet ÙˆØ§Ø®ØªØ± Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ø§Ùˆ ÙˆØ¶Ø¹ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±.
2. Ø§Ø®ØªØ± Ø§Ù„Ø´Ø¨ÙƒØ© ÙˆØ§Ù„Ù…Ø²ÙˆØ¯.
3. Ø§Ù„ØµÙ‚ Ø¹Ù†ÙˆØ§Ù† Ù…Ø­ÙØ¸Ø© Ø¹Ø§Ù… (BTC Ø§Ùˆ EVM Ø§Ùˆ Solana).
4. Ø´ØºÙ„ Contract Check Ù„Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù†Ø´Ø±/ÙˆØ¬ÙˆØ¯ Ø§Ù„ÙƒÙˆØ¯.
5. ÙÙŠ Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ø§Ø³ØªØ®Ø¯Ù… Check Balance Ù„Ù„Ø§Ø³ØªØ¹Ù„Ø§Ù… Ø§Ù„Ù…Ø¨Ø§Ø´Ø±.

> Ù…Ù„Ø§Ø­Ø¸Ø©: Ø§Ù„Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…Ø±Ø¦ÙŠ Ø§Ù„Ø­Ø§Ù„ÙŠ Ù…Ø§ Ø²Ø§Ù„ ÙŠØ¹Ø±Ø¶ Ø§Ø³Ù…Ø§ Ù‚Ø¯ÙŠÙ…Ø§ Ù„Ù„Ù…Ù†ØªØ¬. Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ù…Ø§ Ø²Ø§Ù„ ØµØ­ÙŠØ­Ø§ ÙˆØ³ÙŠØªÙ… Ù†Ø´Ø± Ù†Ø³Ø®Ø© Ù…Ø­Ø¯Ø«Ø© Ù‚Ø±ÙŠØ¨Ø§.

### Ø§Ù„Ø­Ø²Ù…

```bash
npm run package
```

ÙŠÙ†ØªØ¬ Ù‡Ø°Ø§ Ø§Ù„Ø§Ù…Ø± Ù…Ù„Ù .vsix Ù„Ù„ØªØ«Ø¨ÙŠØª/Ø§Ù„Ù†Ø´Ø±.

### Ø§Ø¹Ø§Ø¯Ø© Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙƒØ¨Ø¯Ø§ÙŠØ© dApp

1. Ø§Ù†Ø³Ø® Ù‡Ø°Ø§ Ø§Ù„Ù…Ø³ØªÙˆØ¯Ø¹.
2. Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„ÙˆÙƒÙŠÙ„ Ø¯Ø§Ø®Ù„ .github.
3. Ø´ØºÙ„ Ø§Ù„Ù…ÙˆØ¬Ù‡ .github/prompts/new-dapp-from-forge.prompt.md ÙÙŠ Copilot Chat.
4. Ø§Ø·Ù„Ø¨ Ø§Ù„Ø­Ø²Ù…Ø© Ø§Ù„ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…Ø³ØªÙ‡Ø¯ÙØ© (Ù…Ø«Ø§Ù„: Next.js + wagmi + viem).
5. Ø§Ù„ØªØ²Ù… Ø¨Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù…Ø§Ù† Ø§Ù„Ù…Ø­Ø§ÙØ¸: Ø¹Ù†Ø§ÙˆÙŠÙ† Ø¹Ø§Ù…Ø© ÙÙ‚Ø·ØŒ ÙˆÙ„Ø§ ØªØ³ØªØ®Ø¯Ù… Ø§Ø¨Ø¯Ø§ seed phrase Ø§Ùˆ Ø§Ù„Ù…ÙØ§ØªÙŠØ­ Ø§Ù„Ø®Ø§ØµØ©.

### Ø¯Ø¹Ù… Ø§Ù„Ù…Ø´Ø±ÙˆØ¹

Ø§Ø°Ø§ ÙƒØ§Ù†Øª Ù‡Ø°Ù‡ Ø§Ù„Ø§Ø¶Ø§ÙØ© Ù…ÙÙŠØ¯Ø© Ù„ÙƒØŒ ÙŠÙ…ÙƒÙ†Ùƒ Ø¯Ø¹Ù… Ø§Ù„ØªØ·ÙˆÙŠØ± Ø§Ù„Ù…Ø³ØªÙ…Ø± Ù‡Ù†Ø§:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙÙƒØ±ÙŠØ©

- Ø§ÙŠÙ‚ÙˆÙ†Ø§Øª Ø§Ù„Ø§Ø¶Ø§ÙØ© (media/icon.png Ùˆmedia/activity-icon.svg) ÙˆØ§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ø¨ØµØ±ÙŠØ© Ù…Ø®ØµØµØ© Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ù…Ø§ Ù„Ù… ÙŠØµØ±Ø­ Ø§Ù„Ù…Ø¤Ù„Ù Ø¨Ø®Ù„Ø§Ù Ø°Ù„Ùƒ.
- Ø§Ù„Ø§Ø³Ù… ÙˆØ§Ù„Ø¹Ù„Ø§Ù…Ø© ÙˆØ§Ù„Ø§ØµÙˆÙ„ Ø§Ù„Ø¨ØµØ±ÙŠØ© Ù…Ø­ÙÙˆØ¸Ø© Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„.
- Ù‡Ø°Ø§ Ø§Ù„Ù…Ø³ØªÙˆØ¯Ø¹ Ù„Ø§ ÙŠÙ…Ù†Ø­ Ø­Ù‚ÙˆÙ‚ Ø§Ø³ØªØ®Ø¯Ø§Ù… ØªØ¬Ø§Ø±ÙŠ Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ù†ØªØ¬ Ø¨Ø¯ÙˆÙ† Ø§Ø°Ù† Ù…Ø³Ø¨Ù‚.

---

## Ð ÑƒÑÑÐºÐ¸Ð¹

### ÐžÐ±Ð·Ð¾Ñ€

Web3 Wallet Lab Forge - ÑÑ‚Ð¾ Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸Ðµ VS Code Ð´Ð»Ñ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ¾Ð² Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð¾Ð²/Ð±Ð°Ð»Ð°Ð½ÑÐ¾Ð² Ð² Bitcoin, EVM-ÑÐµÑ‚ÑÑ… Ð¸ Solana.

### ÐšÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ðµ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸

- ðŸŒ Ð’Ñ‹Ð±Ð¾Ñ€ ÑÐµÑ‚Ð¸ Ñ Ð¿Ñ€Ð¸Ð¾Ñ€Ð¸Ñ‚ÐµÑ‚Ð¾Ð¼ Bitcoin (Mainnet Ð¸ Testnet).
- ðŸ”— Ð‘Ñ‹ÑÑ‚Ñ€Ñ‹Ðµ Ð¿ÐµÑ€ÐµÑ…Ð¾Ð´Ñ‹ Ðº Ð¿Ð¾Ð¿ÑƒÐ»ÑÑ€Ð½Ñ‹Ð¼ Ð¿Ñ€Ð¾Ð²Ð°Ð¹Ð´ÐµÑ€Ð°Ð¼ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ¾Ð².
- ðŸ” Ð ÐµÐ¶Ð¸Ð¼ Ñ€ÐµÐ°Ð»ÑŒÐ½Ð¾Ð³Ð¾ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ° Ñ Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸ÐµÐ¹ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ð¾Ð³Ð¾ Ð°Ð´Ñ€ÐµÑÐ°.
- ðŸ§ª Ð ÐµÐ¶Ð¸Ð¼ Ð³ÐµÐ½ÐµÑ€Ð°Ñ†Ð¸Ð¸ Ñ‚ÐµÑÑ‚Ð¾Ð²Ð¾Ð³Ð¾ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ° Ð´Ð»Ñ Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ñ‹Ñ… ÑÑ†ÐµÐ½Ð°Ñ€Ð¸ÐµÐ².
- ðŸ§¾ ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð¾Ð² Ð´Ð»Ñ EVM Ð¸ Solana.
- ðŸ›¡ï¸ ÐŸÑ€Ð¾Ñ„ÐµÑÑÐ¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ð°Ñ Ð¿Ð¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð°: Ð¾Ð¿Ñ†Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ð¿Ñ€ÐµÑ„Ð¸ÐºÑ Ð±Ð°Ð¹Ñ‚ÐºÐ¾Ð´Ð° + Ð¼Ð¸Ð½Ð¸Ð¼Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ñ€Ð°Ð·Ð¼ÐµÑ€ runtime-ÐºÐ¾Ð´Ð°.
- ðŸ’° ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ñ€ÐµÐ°Ð»ÑŒÐ½Ñ‹Ñ… Ð±Ð°Ð»Ð°Ð½ÑÐ¾Ð² Ñ‡ÐµÑ€ÐµÐ· RPC/indexer API.
- ðŸ“‘ Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚ Ð¾Ñ‚Ñ‡ÐµÑ‚Ð° Ð¿Ð¾ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐµ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð¾Ð² (TXT/CSV) Ð´Ð»Ñ QA-Ð°Ñ€Ñ‚ÐµÑ„Ð°ÐºÑ‚Ð¾Ð².
- ðŸŽ¨ Ð’ÑÑ‚Ñ€Ð¾ÐµÐ½Ð½Ñ‹Ðµ Ñ‚ÐµÐ¼Ñ‹ Ð¸ Ñ€Ñ‹Ð½Ð¾Ñ‡Ð½Ñ‹Ð¹ Ð±Ð»Ð¾Ðº Ñ Ð¼Ð¸Ð½Ð¸-Ð³Ñ€Ð°Ñ„Ð¸ÐºÐ¾Ð¼.

### ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÐµÐ¼Ñ‹Ðµ Ð¿Ñ€Ð¾Ð²Ð°Ð¹Ð´ÐµÑ€Ñ‹

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Ð›Ð¾ÐºÐ°Ð»ÑŒÐ½Ð°Ñ Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ°

```bash
npm install
npm run compile
```

ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ F5 Ð² VS Code, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Extension Development Host.

### Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ðµ

1. ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ Connect Wallet Ð¸ Ð²Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ñ€ÐµÐ¶Ð¸Ð¼ REAL Ð¸Ð»Ð¸ TEST.
2. Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÐµÑ‚ÑŒ Ð¸ Ð¿Ñ€Ð¾Ð²Ð°Ð¹Ð´ÐµÑ€Ð°.
3. Ð’ÑÑ‚Ð°Ð²ÑŒÑ‚Ðµ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ Ð°Ð´Ñ€ÐµÑ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ° (BTC, EVM Ð¸Ð»Ð¸ Solana).
4. Ð—Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚Ðµ Contract Check Ð´Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð´ÐµÐ¿Ð»Ð¾Ñ/Ð½Ð°Ð»Ð¸Ñ‡Ð¸Ñ ÐºÐ¾Ð´Ð°.
5. Ð’ Ñ€ÐµÐ¶Ð¸Ð¼Ðµ REAL Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ Check Balance Ð´Ð»Ñ Ð¾Ð½Ð»Ð°Ð¹Ð½-Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸.

> ÐŸÑ€Ð¸Ð¼ÐµÑ‡Ð°Ð½Ð¸Ðµ: Ð²Ð¸Ð·ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ð¹ Ð³Ð°Ð¹Ð´ Ð¿Ð¾ÐºÐ° Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÑ‚ ÑÑ‚Ð°Ñ€Ð¾Ðµ Ð½Ð°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð°. Ð¢ÐµÐºÑƒÑ‰Ð¸Ð¹ Ð¿Ð¾Ñ‚Ð¾Ðº Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ð¾ÑÑ‚Ð°ÐµÑ‚ÑÑ Ð°ÐºÑ‚ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ð¼, Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð±ÑƒÐ´ÐµÑ‚ Ð¾Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ¾Ð²Ð°Ð½Ð¾ Ð¿Ð¾Ð·Ð¶Ðµ.

### Ð£Ð¿Ð°ÐºÐ¾Ð²ÐºÐ°

```bash
npm run package
```

Ð­Ñ‚Ð° ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° ÑÐ¾Ð·Ð´Ð°ÐµÑ‚ Ñ„Ð°Ð¹Ð» .vsix Ð´Ð»Ñ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸/Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸.

### ÐŸÐ¾Ð²Ñ‚Ð¾Ñ€Ð½Ð¾Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ðµ ÐºÐ°Ðº dApp-ÑÑ‚Ð°Ñ€Ñ‚ÐµÑ€Ð°

1. ÐšÐ»Ð¾Ð½Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ ÑÑ‚Ð¾Ñ‚ Ñ€ÐµÐ¿Ð¾Ð·Ð¸Ñ‚Ð¾Ñ€Ð¸Ð¹.
2. Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚Ðµ Ð°Ð³ÐµÐ½Ñ‚ÑÐºÐ¸Ðµ ÑÐ¾Ð³Ð»Ð°ÑˆÐµÐ½Ð¸Ñ Ð² .github.
3. Ð—Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚Ðµ prompt .github/prompts/new-dapp-from-forge.prompt.md Ð² Copilot Chat.
4. Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚Ðµ Ñ†ÐµÐ»ÐµÐ²Ð¾Ð¹ ÑÑ‚ÐµÐº (Ð¿Ñ€Ð¸Ð¼ÐµÑ€: Next.js + wagmi + viem).
5. Ð¡Ð¾Ð±Ð»ÑŽÐ´Ð°Ð¹Ñ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð° Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸: Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ðµ Ð°Ð´Ñ€ÐµÑÐ°, Ð½Ð¸ÐºÐ¾Ð³Ð´Ð° Ð½Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ seed phrase/Ð¿Ñ€Ð¸Ð²Ð°Ñ‚Ð½Ñ‹Ðµ ÐºÐ»ÑŽÑ‡Ð¸.

### ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð°Ñ‚ÑŒ Ð¿Ñ€Ð¾ÐµÐºÑ‚

Ð•ÑÐ»Ð¸ ÑÑ‚Ð¾ Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸Ðµ Ð¿Ð¾Ð¼Ð¾Ð³Ð°ÐµÑ‚ Ð²Ð°ÑˆÐµÐ¼Ñƒ Ñ€Ð°Ð±Ð¾Ñ‡ÐµÐ¼Ñƒ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÑƒ, Ð²Ñ‹ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð°Ñ‚ÑŒ Ñ€Ð°Ð·Ð²Ð¸Ñ‚Ð¸Ðµ Ð·Ð´ÐµÑÑŒ:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### Ð˜Ð½Ñ‚ÐµÐ»Ð»ÐµÐºÑ‚ÑƒÐ°Ð»ÑŒÐ½Ð°Ñ ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ

- Ð˜ÐºÐ¾Ð½ÐºÐ¸ Ñ€Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð¸Ñ (media/icon.png Ð¸ media/activity-icon.svg) Ð¸ Ð²Ð¸Ð·ÑƒÐ°Ð»ÑŒÐ½Ð°Ñ Ð°Ð¹Ð´ÐµÐ½Ñ‚Ð¸ÐºÐ° Ð·Ð°Ñ€ÐµÐ·ÐµÑ€Ð²Ð¸Ñ€Ð¾Ð²Ð°Ð½Ñ‹ Ð´Ð»Ñ ÑÑ‚Ð¾Ð³Ð¾ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°, ÐµÑÐ»Ð¸ Ð°Ð²Ñ‚Ð¾Ñ€ ÑÐ²Ð½Ð¾ Ð½Ðµ Ñ€Ð°Ð·Ñ€ÐµÑˆÐ¸Ð» Ð¸Ð½Ð¾Ðµ.
- ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ, Ð±Ñ€ÐµÐ½Ð´ Ð¸ Ð²Ð¸Ð·ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ð¼Ð°Ñ‚ÐµÑ€Ð¸Ð°Ð»Ñ‹ Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ñ‹ Ñ ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸ÐµÐ¼ Ð²ÑÐµÑ… Ð¿Ñ€Ð°Ð².
- Ð ÐµÐ¿Ð¾Ð·Ð¸Ñ‚Ð¾Ñ€Ð¸Ð¹ Ð½Ðµ Ð¿Ñ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÑÐµÑ‚ Ð¿Ñ€Ð°Ð² Ð½Ð° ÐºÐ¾Ð¼Ð¼ÐµÑ€Ñ‡ÐµÑÐºÐ¾Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð°Ð¹Ð´ÐµÐ½Ñ‚Ð¸ÐºÐ¸ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð° Ð±ÐµÐ· Ð¿Ñ€ÐµÐ´Ð²Ð°Ñ€Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ð³Ð¾ Ñ€Ð°Ð·Ñ€ÐµÑˆÐµÐ½Ð¸Ñ.



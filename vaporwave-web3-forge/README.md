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
- [Р�fсский](#�?�fсский)
- [Espanol](#espanol)
- [中�-?](#中�-?)
- [�-��o��z](#�-��o��z)
- [Deutsch](#deutsch)
- [Arabic (ا�"عرب�Sة)](#ا�"عرب�Sة)

---

## English

### Overview

Web3 Wallet Lab Forge is a practical VS Code extension for wallet testing, contract verification, and real-balance intelligence across Bitcoin, EVM chains, and Solana. It is built for both humans and AI agents, with useful day-to-day tools like safe public-address validation, Contract Check, batch balance checks, provider shortcuts, report exports (TXT/CSV), and in-panel market context.

### Highlights

- :globe_with_meridians: Bitcoin-first network selection (Mainnet and Testnet).
- :link: Provider shortcuts for major wallets.
- :lock: Real wallet mode with public address validation.
- :test_tube: Test wallet generation mode for local workflows.
- :receipt: Contract check for EVM and Solana chains.
- :shield: Professional contract verification policy: optional bytecode prefix + minimum runtime size.
- :moneybag: Real balance lookup via RPC/indexer APIs.
- :card_file_box: Batch real-balance check from Wallet Registry.
- :package: Registry export for operational records (TXT/CSV).
- :page_facing_up: Contract verification report export (TXT/CSV) for QA evidence.
- :art: Built-in theme system (dark + light) for different working styles.
- :chart_with_upwards_trend: In-panel mini market chart with coin selection.

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

1. �Y"O Click Connect Wallet and choose REAL mode or TEST mode.
2. �YO� Select network and provider.
3. �Y"� Paste a public wallet address (BTC, EVM, or Solana).
4. �Y�� Run Contract Check to validate deployment/code presence.
5. �Y'� In REAL mode, use Check Balance for live lookup.
6. �Y"^ In Crypto Market Snapshot, add extra coins by symbol/id (example: DOGE, XRP, cardano).
7. �Y"S Use the chart selector to view BTC or another selected asset trend.
8. �Y-,️ In Wallet Registry, run Check Real Balances and export reports.

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

- �YO� Selecao de rede com Bitcoin primeiro (Mainnet e Testnet).
- �Y"- Atalhos para sites de provedores de carteira.
- �Y"� Modo carteira real com validacao de endereco publico.
- �Y�� Modo carteira de teste para fluxo local.
- �Y�� Contract Check para cadeias EVM e Solana.
- �Y>�️ Politica profissional de verificacao de contrato: prefixo opcional de bytecode + tamanho minimo de runtime.
- �Y'� Consulta de saldo real por RPC/indexer.
- �Y-,️ Checagem em lote de saldos reais via Wallet Registry.
- �Y"� Exportacao de registros e relatorios (TXT/CSV).
- �Y"' Exportacao de relatorio de verificacao de contrato (TXT/CSV) para evidencias de QA.
- �YZ� Sistema de temas da ferramenta com opcoes escuras e claras.
- �Y"^ Mini grafico de mercado com selecao de ativo.

### Provedores Suportados

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### Como Usar

Fluxo rapido:
1. �Y"O Clique em Connect Wallet e escolha modo REAL ou TESTE.
2. �YO� Selecione rede e provedor.
3. �Y"� Cole um endereco publico (BTC, EVM, Solana e outros).
4. �Y�� Rode Contract Check para validar deploy/presenca de bytecode.
5. �Y'� No modo REAL, use Check Balance para consulta ao vivo.
6. �Y"^ No Crypto Market Snapshot, adicione outras moedas por simbolo/id (ex.: DOGE, XRP, cardano).
7. �Y"S Use o seletor de grafico para acompanhar BTC ou outro ativo.
8. �Y-,️ No Wallet Registry, rode Check Real Balances e exporte relatorios.

Recursos que agilizam seu fluxo:
- �Y�- Para apps com IA: gere enderecos de teste rapidamente para simular cenarios sem usar chaves reais.
- �Y'��?��Y'� Para dev humano: valide contrato e saldo no mesmo painel sem trocar de ferramenta.
- �Y"' Seguranca por padrao: apenas endereco publico, nunca seed phrase ou chave privada.

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

- �YO� Selection de reseau orientee Bitcoin (Mainnet et Testnet).
- �Y"- Raccourcis vers les principaux fournisseurs de portefeuilles.
- �Y"� Mode portefeuille reel avec validation d'adresse publique.
- �Y�� Mode portefeuille de test pour les workflows locaux.
- �Y�� Verification de contrat pour les chaines EVM et Solana.
- �Y>�️ Politique de verification de contrat professionnelle: prefixe de bytecode optionnel + taille minimale runtime.
- �Y'� Consultation de solde reel via API RPC/indexer.
- �Y"' Export de rapport de verification de contrat (TXT/CSV) pour preuves QA.
- �YZ� Trois themes sombres integres, dont une option sobre orientee Bitcoin.

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

- �YO� Seleccion de red con enfoque Bitcoin (Mainnet y Testnet).
- �Y"- Atajos a proveedores principales de billetera.
- �Y"� Modo billetera real con validacion de direccion publica.
- �Y�� Modo billetera de prueba para flujos locales.
- �Y�� Verificacion de contrato para cadenas EVM y Solana.
- �Y>�️ Politica profesional de verificacion de contrato: prefijo opcional de bytecode + tamano minimo runtime.
- �Y'� Consulta de saldo real via APIs RPC/indexer.
- �Y"' Exportacion de reporte de verificacion de contrato (TXT/CSV) para evidencia QA.
- �YZ� Tres temas oscuros incluidos, con una opcion sobria enfocada en Bitcoin.

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

## 中�-?

### �,述

Web3 Wallet Lab Forge �~��?个 VS Code �?��.�O�"��Z�o� Bitcoin�?�EVM �"��'O Solana �S�>�O�'��O.�<�.�Z�^约/�T额�?�Y��?,

### 核�f�?��?�

- �YO� 以 Bitcoin 为�~�.^�s"�'�o�??�<��^Mainnet �'O Testnet�?�?,
- �Y"- 提�>主流�'��O.�o��S��.?快捷�.�口�?,
- �Y"� �oY�z�'��O.模式�O�"��O��.��?�o��?校�O�?,
- �Y�� �<�.�'��O.�"Y�^�模式�O�?,�^�o��o�工�o流�?,
- �Y�� �"��O� EVM �Z Solana �s"�^约�?�Y��?,
- �Y>�️ �"�s级�^约�O证�-�.��s可�??�-�S,码�?��? + 运�O�-�代码�o?小大小�?,
- �Y'� �?s�? RPC/indexer API �>�O�oY�z�T额�Y�询�?,
- �Y"' �"��O�导�?��^约�O证�S��'S�^TXT/CSV�?�O�"��Z QA 证据�.T�~�?,
- �YZ� �?.置�?个深�?�主�~�O�.�中�?个�~�偏 Bitcoin �s"稳�?��Z格�?,

### �"��O��s"�'��O.提�>�.?

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### �o��o��?�'

```bash
npm install
npm run compile
```

�o� VS Code 中�O? F5 启�S� Extension Development Host�?,

### 使�"��-�式

1. �,��?� Connect Wallet�O�??�<��oY�z模式�^-�<�.模式�?,
2. �??�<��'�o�'O�'��O.提�>�.?�?,
3. �~贴�.��?�'��O.�o��?�^BTC�?�EVM �^- Solana�?�?,
4. 运�O Contract Check�O�O证�f�署/代码�~�否�~�o��?,
5. �o��oY�z模式�<�O使�"� Check Balance �>�O�z�-��Y�询�?,

> 说�~Z�s�"�?�可�?�O-�O?�-仍�~�示�-�产�"�名称�?,流�<依�"��o?�.^�O�^'们�s尽快�'�f�>��-��?^�o��?,

### �?"�O.

```bash
npm run package
```

该�'�令�s�"Y�^��"��Z�?�./�'�f�s" .vsix �-?件�?,

### �o为 dApp 模板复�"�

1. �.<�s?�o��"�"�?,
2. 保�.T .github �<�s" agent 约�s�-?件�?,
3. �o� Copilot Chat 运�O .github/prompts/new-dapp-from-forge.prompt.md�?,
4. �O?�s你�s"�>��?�S?�o��^�^�<�,�sNext.js + wagmi + viem�?�?,
5. 保�O��'��O.�?�.��"�^T�s�.使�"��.��?�o��?�O绝不使�"��S�记词/私�'��?,

### �"��O�项�>�

�,�zo�T个�?��.对你�s"工�o流�o?帮�S��O可以�o��T�?O�"��O��O�续�?�'�s

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### �Y��?产�f

- �?��.�>��?�-?件�^media/icon.png �Z media/activity-icon.svg�?�S�?�?�?�?�.�>�o�项�>�使�"��O�T��z�o�?.�~Z确�Z^�f�?,
- 名称�?��"��?O�Z�?�?�"产�?保�.T�??�o?�f�^��?,
- �o�经�<�.^许可�O�o��"�"不�Z^�^该产�"��?�?�s"�.?�s使�"��f�?,

---

## �-��o��z

### �,要

Web3 Wallet Lab Forge は�?�Bitcoin�?�EVM �f��,��f��f��?�Solana で�,��,��f��ff�f^�o証と�,��f��f^�f��,��f^/�<�~�f��,��ff�,��,'�O�?�Y�,�の VS Code �<�張で�T�?,

### 主な�?��.�

- �YO� Bitcoin �"��.^の�f��ff�f^�f��f��,�選�Sz�^Mainnet / Testnet�?�?,
- �Y"- 主要�,��,��f��ff�f^�f-�f��f��,��f?�f�への�,��f��f��f^�,��ff�f^�?,
- �Y"� �.��-<�,��f?�f��,��o証�~きの�Y�,��,��f��ff�f^�f��f��f?�?,
- �Y�� �f��f��,��f��o業�'�'の�f?�,��f^�,��,��f��ff�f^�"Y�^��f��f��f?�?,
- �Y�� EVM と Solana の�,��f��f^�f��,��f^�f��,��ff�,�に対�o�?,
- �Y>�️ �f-�f��'�'�,��f��f^�f��,��f^�o証�f��f��,��f�: 任�"�の�f��,��f^�,��f��f?�Z�頭�z + �o?小�f��f��,��,��f��,��,��,��?,
- �Y'� RPC/indexer API に�,^�,<�Y�<�~の�.��s�?,
- �Y"' QA 証跡�'�'に�,��f��f^�f��,��f^�o証�f��f��f��f^�^TXT/CSV�?�,'�,��,��,��f��f��f^可�f��?,
- �YZ� Bitcoin �"�,Sの落ち�?�"�Y�f?�f��fz�,'含�,? 3 つの�f?�f��,��f?�f��fz�,'�?.�"��?,

### 対�o�f-�f��f��,��f?�f�

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### �f��f��,��f��-<�T�

```bash
npm install
npm run compile
```

VS Code で F5 �,'�S��-て Extension Development Host �,'起�<.�-ま�T�?,

### 使�"�-�

1. Connect Wallet �,'�,��f��ff�,��-�?��Y�f��f��f?ま�Yは�f?�,��f^�f��f��f?�,'選�Sz�-ま�T�?,
2. �f��ff�f^�f��f��,�と�f-�f��f��,��f?�f��,'選�Sz�-ま�T�?,
3. �.��-<�,��,��f��ff�f^�,��f?�f��,��^BTC�?�EVM�?�Solana�?�,'貼�,S�~�'ま�T�?,
4. Contract Check �,'�Y�O�-�?��f?�f-�f��,�/�,��f��f?�~�o��,'確認�-ま�T�?,
5. �Y�f��f��f?では Check Balance で�f��,��f��,��,��f��.��s�,'�O�"ま�T�?,

> 注�~: 現�o�の�f"�,��f��,��f��,��,��f?には�-�製�"�名�O表示�.�,Oて�"ま�T�?,�f��f��,��f.�f��f��?��"は�o?�S�で�?��>��-��?^�,'�'�-��.��-<�^�sで�T�?,

### �f'�ff�,��f��,��O-

```bash
npm run package
```

�"の�,��fz�f��f?で�,��f��,��f^�f��f�/�.��-<�"�の .vsix �f.�,��,��f��,'�"Y�^��-ま�T�?,

### dApp �,��,��f��,��f�と�-て�?��^��"�

1. �"の�f��f��,��f^�f��,'�,��f��f��f��-ま�T�?,
2. .github �.��<の agent 規�"�,'維�O��-ま�T�?,
3. Copilot Chat で .github/prompts/new-dapp-from-forge.prompt.md �,'�Y�O�-ま�T�?,
4. �>��T�,��,��ff�,��,'�O?�s�-ま�T�^�<: Next.js + wagmi + viem�?�?,
5. �,��,��f��ff�f^�?�.��f��f��f��,'�^�,Sま�T: �.��-<�,��f?�f��,�のみ使�"��-�?�seed phrase/�~�?鍵は絶対に�?��,�な�"でくだ�.�"�?,

### �f-�f��,��,��,��f^�"�援

�"の�<�張�O役�<っ�Y場�^は�?��T�s�-<�T�の�"�援�,'�S�~�"�-ま�T�s

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### �Y��s"財�"�

- �<�張�,��,��,��f��^media/icon.png と media/activity-icon.svg�?�S�,^び�f"�,��f��,��f��,��,��f?�f��f?�,��f?�,�は�?��o�?.の�~Z示�s"な許可�Oな�"�T��,S�o��f-�f��,��,��,��f^�,�"�で�T�?,
- 名称�?��f-�f��f��f?�?��f"�,��f��,��f��?�"�は�Tべての権�^��,'�.T保�-ま�T�?,
- �<�?�許可な�-に�?��o�製�"��,��,��f?�f��f?�,��f?�,�の�.?�"��^��"�権は�~�Z�.�,Oま�>�,"�?,

---

## Deutsch

### Ubersicht

Web3 Wallet Lab Forge ist eine VS Code-Erweiterung fur Wallet-Tests sowie Vertrags-/Saldo-Prufungen auf Bitcoin, EVM-Chains und Solana.

### Highlights

- �YO� Bitcoin-zentrierte Netzwerkauswahl (Mainnet und Testnet).
- �Y"- Schnellzugriffe auf wichtige Wallet-Anbieter.
- �Y"� Echter Wallet-Modus mit Validierung offentlich sichtbarer Adressen.
- �Y�� Test-Wallet-Generierungsmodus fur lokale Workflows.
- �Y�� Contract Check fur EVM- und Solana-Chains.
- �Y>�️ Professionelle Contract-Verification-Policy: optionales Bytecode-Prafix + minimale Runtime-Grose.
- �Y'� Reale Saldoabfrage uber RPC-/Indexer-APIs.
- �Y"' Export von Contract-Verification-Reports (TXT/CSV) fur QA-Nachweise.
- �YZ� Drei integrierte Dark-Themes, darunter eine nuchterne Bitcoin-orientierte Option.

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

## ا�"عرب�Sة

### �?ظرة عا�.ة

Web3 Wallet Lab Forge �?�S اضافة �"�? VS Code �"اختبار ا�"�.حافظ �^ا�"تح�,�, �.�? ا�"ع�,�^د �^ا�"ارصدة ع�"�? Bitcoin �^س�"اس�" EVM �^Solana.

### ا�"�.�.�Sزات

- �YO� اخت�Sار ا�"شب�fة �Sبدأ ب Bitcoin (Mainnet �^Testnet).
- �Y"- اختصارات �"�.ز�^د�S ا�"�.حافظ ا�"رئ�Sس�S�S�?.
- �Y"� �^ضع ا�"�.حفظة ا�"ح�,�S�,�Sة �.ع ا�"تح�,�, �.�? ا�"ع�?�^ا�? ا�"عا�..
- �Y�� �^ضع ت�^�"�Sد �.حفظة اختبار �"س�Sر ا�"ع�.�" ا�"�.ح�"�S.
- �Y�� فحص ا�"ع�,�^د �"س�"اس�" EVM �^Solana.
- �Y>�️ س�Sاسة احتراف�Sة �"�"تح�,�, �.�? ا�"ع�,�^د: بادئة bytecode اخت�Sار�Sة + حد اد�?�? �"حج�. runtime.
- �Y'� ا�"استع�"ا�. ع�? ا�"رص�Sد ا�"ح�,�S�,�S عبر �^اج�?ات RPC/indexer.
- �Y"' تصد�Sر ت�,ر�Sر ا�"تح�,�, �.�? ا�"ع�,د (TXT/CSV) �fد�"�S�" �"فر�, QA.
- �YZ� ث�"اث س�.ات دا�f�?ة �.د�.جة�O ب�S�?�?ا خ�Sار �?ادئ �Sر�fز ع�"�? Bitcoin.

### ا�"�.ز�^د�^�? ا�"�.دع�^�.�^�?

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### ا�"تط�^�Sر ا�"�.ح�"�S

```bash
npm install
npm run compile
```

اضغط F5 ف�S VS Code �"فتح Extension Development Host.

### طر�S�,ة ا�"استخدا�.

1. ا�?�,ر Connect Wallet �^اختر ا�"�^ضع ا�"ح�,�S�,�S ا�^ �^ضع ا�"اختبار.
2. اختر ا�"شب�fة �^ا�"�.ز�^د.
3. ا�"ص�, ع�?�^ا�? �.حفظة عا�. (BTC ا�^ EVM ا�^ Solana).
4. شغ�" Contract Check �"�"تح�,�, �.�? ا�"�?شر/�^ج�^د ا�"�f�^د.
5. ف�S ا�"�^ضع ا�"ح�,�S�,�S استخد�. Check Balance �"�"استع�"ا�. ا�"�.باشر.

> �.�"احظة: ا�"د�"�S�" ا�"�.رئ�S ا�"حا�"�S �.ا زا�" �Sعرض اس�.ا �,د�S�.ا �"�"�.�?تج. س�Sر ا�"ع�.�" �.ا زا�" صح�Sحا �^س�Sت�. �?شر �?سخة �.حدثة �,ر�Sبا.

### ا�"حز�.

```bash
npm run package
```

�S�?تج �?ذا ا�"ا�.ر �.�"ف .vsix �"�"تثب�Sت/ا�"�?شر.

### اعادة ا�"استخدا�. �fبدا�Sة dApp

1. ا�?سخ �?ذا ا�"�.ست�^دع.
2. حافظ ع�"�? �,�^اعد ا�"�^�f�S�" داخ�" .github.
3. شغ�" ا�"�.�^ج�? .github/prompts/new-dapp-from-forge.prompt.md ف�S Copilot Chat.
4. اط�"ب ا�"حز�.ة ا�"ت�,�?�Sة ا�"�.ست�?دفة (�.ثا�": Next.js + wagmi + viem).
5. ا�"تز�. ب�,�^اعد ا�.ا�? ا�"�.حافظ: ع�?ا�^�S�? عا�.ة ف�,ط�O �^�"ا تستخد�. ابدا seed phrase ا�^ ا�"�.فات�Sح ا�"خاصة.

### دع�. ا�"�.شر�^ع

اذا �fا�?ت �?ذ�? ا�"اضافة �.ف�Sدة �"�f�O �S�.�f�?�f دع�. ا�"تط�^�Sر ا�"�.ست�.ر �?�?ا:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### ا�"�.�"�f�Sة ا�"ف�fر�Sة

- ا�S�,�^�?ات ا�"اضافة (media/icon.png �^media/activity-icon.svg) �^ا�"�?�^�Sة ا�"بصر�Sة �.خصصة �"�?ذا ا�"�.شر�^ع �.ا �"�. �Sصرح ا�"�.ؤ�"ف بخ�"اف ذ�"�f.
- ا�"اس�. �^ا�"ع�"ا�.ة �^ا�"اص�^�" ا�"بصر�Sة �.حف�^ظة ا�"ح�,�^�, با�"�fا�.�".
- �?ذا ا�"�.ست�^دع �"ا �S�.�?ح ح�,�^�, استخدا�. تجار�S �"�?�^�Sة ا�"�.�?تج بد�^�? اذ�? �.سب�,.

---

## Р�fсский

### �zбзо�?

Web3 Wallet Lab Forge - э�,о �?ас�^и�?ение VS Code для �,ес�,и�?ования ко�^ел�Oков и п�?ове�?ки кон�,�?ак�,ов/балансов в Bitcoin, EVM-се�,я�. и Solana.

### �sл�Z�?ев�<е возможнос�,и

- �YO� �'�<бо�? се�,и с п�?ио�?и�,е�,ом Bitcoin (Mainnet и Testnet).
- �Y"- �'�<с�,�?�<е пе�?е�.од�< к поп�fля�?н�<м п�?овайде�?ам ко�^ел�Oков.
- �Y"� Режим �?еал�Oного ко�^ел�Oка с валида�?ией п�fбли�?ного ад�?еса.
- �Y�� Режим гене�?а�?ии �,ес�,ового ко�^ел�Oка для локал�Oн�<�. с�?ена�?иев.
- �Y�� �Y�?ове�?ка кон�,�?ак�,ов для EVM и Solana.
- �Y>�️ �Y�?о�"ессионал�Oная поли�,ика п�?ове�?ки кон�,�?ак�,а: оп�?ионал�Oн�<й п�?е�"икс бай�,кода + минимал�Oн�<й �?азме�? runtime-кода.
- �Y'� �Y�?ове�?ка �?еал�Oн�<�. балансов �?е�?ез RPC/indexer API.
- �Y"' Экспо�?�, о�,�?е�,а по п�?ове�?ке кон�,�?ак�,ов (TXT/CSV) для QA-а�?�,е�"ак�,ов.
- �YZ� �'с�,�?оенн�<е �,ем�< и �?�<но�?н�<й блок с мини-г�?а�"иком.

### �Yодде�?живаем�<е п�?овайде�?�<

Xverse, Unisat, Leather, Electrum, MetaMask, Uniswap Wallet, Binance Wallet, Coinbase Wallet, Rainbow, Rabby, Trust Wallet, Zerion, Safe Wallet, Ledger Live, Trezor Suite, OKX Wallet, Phantom, Backpack, WalletConnect.

### �>окал�Oная �?аз�?або�,ка

```bash
npm install
npm run compile
```

Нажми�,е F5 в VS Code, �?�,об�< о�,к�?�<�,�O Extension Development Host.

### �~спол�Oзование

1. Нажми�,е Connect Wallet и в�<бе�?и�,е �?ежим REAL или TEST.
2. �'�<бе�?и�,е се�,�O и п�?овайде�?а.
3. �'с�,ав�O�,е п�fбли�?н�<й ад�?ес ко�^ел�Oка (BTC, EVM или Solana).
4. �-ап�fс�,и�,е Contract Check для п�?ове�?ки деплоя/нали�?ия кода.
5. �' �?ежиме REAL испол�Oз�fй�,е Check Balance для онлайн-п�?ове�?ки.

> �Y�?име�?ание: виз�fал�Oн�<й гайд пока показ�<вае�, с�,а�?ое название п�?од�fк�,а. Тек�f�?ий по�,ок �?або�,�< ос�,ае�,ся ак�,�fал�Oн�<м, обновление б�fде�, оп�fбликовано позже.

### Упаковка

```bash
npm run package
```

Э�,а команда создае�, �"айл .vsix для �fс�,ановки/п�fблика�?ии.

### �Yов�,о�?ное испол�Oзование как dApp-с�,а�?�,е�?а

1. �sлони�?�fй�,е э�,о�, �?епози�,о�?ий.
2. Со�.�?ани�,е аген�,ские согла�^ения в .github.
3. �-ап�fс�,и�,е prompt .github/prompts/new-dapp-from-forge.prompt.md в Copilot Chat.
4. �-ап�?оси�,е �?елевой с�,ек (п�?име�?: Next.js + wagmi + viem).
5. Собл�Zдай�,е п�?авила безопаснос�,и: �,ол�Oко п�fбли�?н�<е ад�?еса, никогда не испол�Oз�fй�,е seed phrase/п�?ива�,н�<е кл�Z�?и.

### �Yодде�?жа�,�O п�?оек�,

�.сли э�,о �?ас�^и�?ение помогае�, ва�^ем�f �?або�?ем�f п�?о�?есс�f, в�< може�,е подде�?жа�,�O �?азви�,ие здес�O:

- [GitHub Sponsors](https://github.com/ThiagoDataEngineer)
- ETH: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- BTC: <span style="color:#facc15;"><code>bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j</code></span>
- Solana: <span style="color:#facc15;"><code>9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU</code></span>
- Polygon: <span style="color:#facc15;"><code>0x7322789de14a49EBE28b6133167d25BD903A68ed</code></span>
- Tron: <span style="color:#facc15;"><code>TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G</code></span>

### �~н�,еллек�,�fал�Oная собс�,веннос�,�O

- �~конки �?ас�^и�?ения (media/icon.png и media/activity-icon.svg) и виз�fал�Oная айден�,ика за�?езе�?ви�?ован�< для э�,ого п�?оек�,а, если ав�,о�? явно не �?аз�?е�^ил иное.
- Название, б�?енд и виз�fал�Oн�<е ма�,е�?иал�< за�?и�?ен�< с со�.�?анением все�. п�?ав.
- Репози�,о�?ий не п�?едос�,авляе�, п�?ав на комме�?�?еское испол�Oзование айден�,ики п�?од�fк�,а без п�?едва�?и�,ел�Oного �?аз�?е�^ения.



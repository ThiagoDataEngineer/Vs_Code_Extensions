# VS Code Extensions Forge

Created by thiagoyoshiaki@gmail.com

Monorepo with practical VS Code extensions focused on Web3 workflows, TOTVS ecosystem tooling, and custom themes.

## Language

- [English](#english)
- [Portugues (Brasil)](#portugues-brasil)

---

## English

### Overview

This workspace centralizes multiple extension projects and examples in one place.

Current highlights:

- Web3 Wallet Lab Forge: wallet QA, contract checks, and crypto data workflows for VS Code.
- Totvs Coverage Analysis: coverage consolidation and analysis from TOTVS test suites.
- ADVPL Theme: dedicated theme for ADVPL/TOTVS development.

### Project Map

| Project | Type | Path | Notes |
|---|---|---|---|
| Web3 Wallet Lab Forge | VS Code Extension | [vaporwave-web3-forge](vaporwave-web3-forge) | Active Web3 extension with custom themes and preview assets |
| Totvs Coverage Analysis | VS Code Extension | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Coverage merge and reporting for TOTVS artifacts |
| ADVPL Theme | VS Code Theme Extension | [advpl-theme](advpl-theme) | Theme package for ADVPL language users |
| Web3 JS Example | Node Example | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | JavaScript reference flow |
| Web3 Python Example | Python Example | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Python reference flow |

### Quick Start

1. Open this folder in VS Code.
2. Pick the extension folder you want to work on.
3. Install dependencies in that folder.
4. Compile and run Extension Development Host (F5).

Example for Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### Build VSIX Packages

Use these commands in each extension folder:

```bash
npm run package
```

Primary package scripts:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Documentation and Assets

- Global docs: [docs](docs)
- Translation resources: [docs/i18n](docs/i18n)
- Shared media: [media](media)
- Root scripts: [scripts](scripts)

### Contact

- thiagoyoshiaki@gmail.com

---

## Portugues (Brasil)

### Visao Geral

Este workspace organiza multiplas extensoes VS Code e exemplos tecnicos no mesmo repositorio.

Destaques atuais:

- Web3 Wallet Lab Forge: QA de carteiras, checagem de contratos e fluxo de dados cripto.
- Totvs Coverage Analysis: consolidacao e analise de coverage para suites TOTVS.
- ADVPL Theme: tema dedicado para desenvolvimento ADVPL/TOTVS.

### Mapa de Projetos

| Projeto | Tipo | Caminho | Observacao |
|---|---|---|---|
| Web3 Wallet Lab Forge | Extensao VS Code | [vaporwave-web3-forge](vaporwave-web3-forge) | Extensao Web3 com temas customizados e previews |
| Totvs Coverage Analysis | Extensao VS Code | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Consolidacao de coverage e geracao de relatorios |
| ADVPL Theme | Extensao de Tema VS Code | [advpl-theme](advpl-theme) | Pacote de tema para usuarios ADVPL |
| Exemplo Web3 JS | Exemplo Node | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | Fluxo de referencia em JavaScript |
| Exemplo Web3 Python | Exemplo Python | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Fluxo de referencia em Python |

### Inicio Rapido

1. Abra este repositorio no VS Code.
2. Entre na pasta da extensao que deseja evoluir.
3. Instale dependencias da pasta.
4. Compile e rode com F5 no Extension Development Host.

Exemplo com Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### Empacotar VSIX

Em cada pasta de extensao, execute:

```bash
npm run package
```

Arquivos principais:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Documentacao e Assets

- Documentacao geral: [docs](docs)
- Recursos de idioma: [docs/i18n](docs/i18n)
- Midia compartilhada: [media](media)
- Scripts raiz: [scripts](scripts)

### Contato

- thiagoyoshiaki@gmail.com


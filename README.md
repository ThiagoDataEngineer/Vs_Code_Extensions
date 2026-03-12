# VS Code Extensions Forge

Created by thiagoyoshiaki@gmail.com

Monorepo with practical VS Code extensions focused on Web3 workflows, TOTVS ecosystem tooling, and custom themes.

## Language

- [English](#english)
- [Portugues (Brasil)](#portugues-brasil)
- [Francais](#francais)
- [Espanol](#espanol)
- [Deutsch](#deutsch)
- [Русский](#русский)
- [日本語](#日本語)
- [中文](#中文)
- [Arabic](#العربية)

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

---

## Francais

### Vue d'ensemble

Ce workspace regroupe plusieurs extensions VS Code et exemples techniques dans le meme depot.

Points forts actuels :

- Web3 Wallet Lab Forge : QA de portefeuilles, controles de contrats et flux de donnees crypto.
- Totvs Coverage Analysis : consolidation et analyse de coverage pour suites TOTVS.
- ADVPL Theme : theme dedie au developpement ADVPL/TOTVS.

### Carte des Projets

| Projet | Type | Chemin | Note |
|---|---|---|---|
| Web3 Wallet Lab Forge | Extension VS Code | [vaporwave-web3-forge](vaporwave-web3-forge) | Extension Web3 active avec themes et assets de preview |
| Totvs Coverage Analysis | Extension VS Code | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Fusion de coverage et rapports TOTVS |
| ADVPL Theme | Extension Theme VS Code | [advpl-theme](advpl-theme) | Pack de theme pour utilisateurs ADVPL |
| Exemple Web3 JS | Exemple Node | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | Flux de reference JavaScript |
| Exemple Web3 Python | Exemple Python | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Flux de reference Python |

### Demarrage Rapide

1. Ouvrez ce dossier dans VS Code.
2. Choisissez le dossier d'extension a modifier.
3. Installez les dependances de ce dossier.
4. Compilez et lancez l'Extension Development Host (F5).

Exemple pour Web3 Wallet Lab Forge :

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### Construire les Packages VSIX

Utilisez dans chaque dossier d'extension :

```bash
npm run package
```

Scripts principaux :

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Documentation et Assets

- Documentation globale : [docs](docs)
- Ressources de traduction : [docs/i18n](docs/i18n)
- Media partages : [media](media)
- Scripts racine : [scripts](scripts)

### Contact

- thiagoyoshiaki@gmail.com

---

## Espanol

### Vision General

Este workspace centraliza multiples extensiones VS Code y ejemplos tecnicos en un mismo repositorio.

Destacados actuales:

- Web3 Wallet Lab Forge: QA de billeteras, chequeo de contratos y flujo de datos cripto.
- Totvs Coverage Analysis: consolidacion y analisis de coverage para suites TOTVS.
- ADVPL Theme: tema dedicado para desarrollo ADVPL/TOTVS.

### Mapa de Proyectos

| Proyecto | Tipo | Ruta | Nota |
|---|---|---|---|
| Web3 Wallet Lab Forge | Extension VS Code | [vaporwave-web3-forge](vaporwave-web3-forge) | Extension Web3 activa con temas y assets de preview |
| Totvs Coverage Analysis | Extension VS Code | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Fusion de coverage y reportes TOTVS |
| ADVPL Theme | Extension de Tema VS Code | [advpl-theme](advpl-theme) | Paquete de tema para usuarios ADVPL |
| Ejemplo Web3 JS | Ejemplo Node | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | Flujo de referencia JavaScript |
| Ejemplo Web3 Python | Ejemplo Python | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Flujo de referencia Python |

### Inicio Rapido

1. Abre esta carpeta en VS Code.
2. Elige la carpeta de extension que quieres trabajar.
3. Instala las dependencias en esa carpeta.
4. Compila y ejecuta Extension Development Host (F5).

Ejemplo para Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### Construir Paquetes VSIX

Usa estos comandos en cada carpeta de extension:

```bash
npm run package
```

Scripts principales:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Documentacion y Assets

- Documentacion global: [docs](docs)
- Recursos de traduccion: [docs/i18n](docs/i18n)
- Media compartida: [media](media)
- Scripts raiz: [scripts](scripts)

### Contacto

- thiagoyoshiaki@gmail.com

---

## Deutsch

### Uebersicht

Dieses Workspace buendelt mehrere VS Code-Erweiterungen und technische Beispiele in einem Repository.

Aktuelle Highlights:

- Web3 Wallet Lab Forge: Wallet-QA, Contract-Checks und Krypto-Daten-Workflows.
- Totvs Coverage Analysis: Konsolidierung und Analyse von Coverage aus TOTVS-Tests.
- ADVPL Theme: dediziertes Theme fuer ADVPL/TOTVS-Entwicklung.

### Projektkarte

| Projekt | Typ | Pfad | Hinweis |
|---|---|---|---|
| Web3 Wallet Lab Forge | VS Code-Erweiterung | [vaporwave-web3-forge](vaporwave-web3-forge) | Aktive Web3-Erweiterung mit Themes und Preview-Assets |
| Totvs Coverage Analysis | VS Code-Erweiterung | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Coverage-Merge und Reporting fuer TOTVS-Artefakte |
| ADVPL Theme | VS Code-Theme-Erweiterung | [advpl-theme](advpl-theme) | Theme-Paket fuer ADVPL-Nutzer |
| Web3 JS Beispiel | Node-Beispiel | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | JavaScript-Referenzfluss |
| Web3 Python Beispiel | Python-Beispiel | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Python-Referenzfluss |

### Schnellstart

1. Oeffnen Sie diesen Ordner in VS Code.
2. Waehlen Sie den Erweiterungsordner, an dem Sie arbeiten wollen.
3. Installieren Sie die Abhaengigkeiten in diesem Ordner.
4. Kompilieren und starten Sie den Extension Development Host (F5).

Beispiel fuer Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### VSIX-Pakete Bauen

Nutzen Sie diese Befehle in jedem Erweiterungsordner:

```bash
npm run package
```

Wichtige Skripte:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Dokumentation und Assets

- Globale Doku: [docs](docs)
- Uebersetzungsressourcen: [docs/i18n](docs/i18n)
- Gemeinsame Medien: [media](media)
- Root-Skripte: [scripts](scripts)

### Kontakt

- thiagoyoshiaki@gmail.com

---

## Русский

### Обзор

Этот workspace объединяет несколько расширений VS Code и технических примеров в одном репозитории.

Текущие акценты:

- Web3 Wallet Lab Forge: QA кошельков, проверки контрактов и потоки крипто-данных.
- Totvs Coverage Analysis: консолидация и анализ coverage из TOTVS тестов.
- ADVPL Theme: отдельная тема для разработки ADVPL/TOTVS.

### Карта Проектов

| Проект | Тип | Путь | Примечание |
|---|---|---|---|
| Web3 Wallet Lab Forge | Расширение VS Code | [vaporwave-web3-forge](vaporwave-web3-forge) | Активное Web3-расширение с темами и preview-asset |
| Totvs Coverage Analysis | Расширение VS Code | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | Объединение coverage и отчеты для TOTVS-артефактов |
| ADVPL Theme | Расширение темы VS Code | [advpl-theme](advpl-theme) | Тема для пользователей ADVPL |
| Пример Web3 JS | Node-пример | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | Эталонный поток на JavaScript |
| Пример Web3 Python | Python-пример | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Эталонный поток на Python |

### Быстрый Старт

1. Откройте эту папку в VS Code.
2. Выберите папку расширения, с которой хотите работать.
3. Установите зависимости в этой папке.
4. Скомпилируйте и запустите Extension Development Host (F5).

Пример для Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### Сборка VSIX Пакетов

Используйте команду в каждой папке расширения:

```bash
npm run package
```

Основные скрипты:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### Документация и Assets

- Общая документация: [docs](docs)
- Ресурсы переводов: [docs/i18n](docs/i18n)
- Общие media: [media](media)
- Корневые скрипты: [scripts](scripts)

### Контакт

- thiagoyoshiaki@gmail.com

---

## 日本語

### 概要

この workspace は、複数の VS Code 拡張と技術サンプルを 1 つのリポジトリに集約しています。

現在の主なポイント:

- Web3 Wallet Lab Forge: ウォレット QA、コントラクトチェック、暗号データワークフロー。
- Totvs Coverage Analysis: TOTVS テストスイートの coverage 統合と分析。
- ADVPL Theme: ADVPL/TOTVS 開発向け専用テーマ。

### プロジェクトマップ

| プロジェクト | 種別 | パス | メモ |
|---|---|---|---|
| Web3 Wallet Lab Forge | VS Code 拡張 | [vaporwave-web3-forge](vaporwave-web3-forge) | カスタムテーマと preview assets を含む Web3 拡張 |
| Totvs Coverage Analysis | VS Code 拡張 | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | TOTVS 成果物向け coverage 統合とレポート |
| ADVPL Theme | VS Code テーマ拡張 | [advpl-theme](advpl-theme) | ADVPL 利用者向けテーマパッケージ |
| Web3 JS サンプル | Node サンプル | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | JavaScript リファレンスフロー |
| Web3 Python サンプル | Python サンプル | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Python リファレンスフロー |

### クイックスタート

1. このフォルダを VS Code で開きます。
2. 作業したい拡張フォルダを選びます。
3. そのフォルダで依存関係をインストールします。
4. コンパイルして Extension Development Host (F5) を実行します。

Web3 Wallet Lab Forge の例:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### VSIX パッケージ作成

各拡張フォルダで次を実行:

```bash
npm run package
```

主要スクリプト:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### ドキュメントと Assets

- 全体ドキュメント: [docs](docs)
- 翻訳リソース: [docs/i18n](docs/i18n)
- 共有メディア: [media](media)
- ルートスクリプト: [scripts](scripts)

### 連絡先

- thiagoyoshiaki@gmail.com

---

## 中文

### 概述

该 workspace 将多个 VS Code 扩展项目和技术示例集中在同一仓库中。

当前重点:

- Web3 Wallet Lab Forge: 钱包 QA、合约检查与加密数据工作流。
- Totvs Coverage Analysis: TOTVS 测试套件 coverage 的合并与分析。
- ADVPL Theme: 面向 ADVPL/TOTVS 开发的专用主题。

### 项目地图

| 项目 | 类型 | 路径 | 说明 |
|---|---|---|---|
| Web3 Wallet Lab Forge | VS Code 扩展 | [vaporwave-web3-forge](vaporwave-web3-forge) | 活跃 Web3 扩展，含自定义主题与预览资源 |
| Totvs Coverage Analysis | VS Code 扩展 | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | 面向 TOTVS 产物的 coverage 合并与报告 |
| ADVPL Theme | VS Code 主题扩展 | [advpl-theme](advpl-theme) | ADVPL 用户主题包 |
| Web3 JS 示例 | Node 示例 | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | JavaScript 参考流程 |
| Web3 Python 示例 | Python 示例 | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | Python 参考流程 |

### 快速开始

1. 在 VS Code 中打开此文件夹。
2. 选择你要开发的扩展目录。
3. 在该目录中安装依赖。
4. 编译并运行 Extension Development Host (F5)。

Web3 Wallet Lab Forge 示例:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### 构建 VSIX 包

在每个扩展目录执行:

```bash
npm run package
```

主要脚本:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### 文档与资源

- 全局文档: [docs](docs)
- 翻译资源: [docs/i18n](docs/i18n)
- 共享媒体: [media](media)
- 根目录脚本: [scripts](scripts)

### 联系方式

- thiagoyoshiaki@gmail.com

---

## العربية

### نظرة عامة

هذا workspace يجمع عدة مشاريع اضافات VS Code وامثلة تقنية في مستودع واحد.

اهم النقاط الحالية:

- Web3 Wallet Lab Forge: QA للمحافظ وفحص العقود وتدفقات بيانات كريبتو.
- Totvs Coverage Analysis: دمج وتحليل coverage من مجموعات اختبار TOTVS.
- ADVPL Theme: ثيم مخصص لتطوير ADVPL/TOTVS.

### خريطة المشاريع

| المشروع | النوع | المسار | ملاحظة |
|---|---|---|---|
| Web3 Wallet Lab Forge | اضافة VS Code | [vaporwave-web3-forge](vaporwave-web3-forge) | اضافة Web3 نشطة مع ثيمات ومواد معاينة |
| Totvs Coverage Analysis | اضافة VS Code | [TotvsCoverageAnalysis](TotvsCoverageAnalysis) | دمج coverage وتقارير لملفات TOTVS |
| ADVPL Theme | اضافة ثيم VS Code | [advpl-theme](advpl-theme) | حزمة ثيم لمستخدمي ADVPL |
| مثال Web3 JS | مثال Node | [examples/btc-keygen-balance-check](examples/btc-keygen-balance-check) | تدفق مرجعي JavaScript |
| مثال Web3 Python | مثال Python | [examples/btc-keygen-balance-check-python](examples/btc-keygen-balance-check-python) | تدفق مرجعي Python |

### بداية سريعة

1. افتح هذا المجلد في VS Code.
2. اختر مجلد الاضافة الذي تريد العمل عليه.
3. ثبت الاعتماديات في ذلك المجلد.
4. نفذ compile ثم شغل Extension Development Host (F5).

مثال Web3 Wallet Lab Forge:

```bash
cd vaporwave-web3-forge
npm install
npm run compile
```

### بناء حزم VSIX

استخدم هذا الامر داخل كل مجلد اضافة:

```bash
npm run package
```

الملفات الرئيسية:

- [vaporwave-web3-forge/package.json](vaporwave-web3-forge/package.json)
- [TotvsCoverageAnalysis/package.json](TotvsCoverageAnalysis/package.json)
- [advpl-theme/package.json](advpl-theme/package.json)

### التوثيق والاصول

- التوثيق العام: [docs](docs)
- موارد الترجمة: [docs/i18n](docs/i18n)
- وسائط مشتركة: [media](media)
- سكربتات الجذر: [scripts](scripts)

### التواصل

- thiagoyoshiaki@gmail.com


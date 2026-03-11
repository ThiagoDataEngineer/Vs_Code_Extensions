"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const crypto_1 = require("crypto");
const DEFAULT_STATE = {
    connected: false,
    address: "",
    chain: "Bitcoin Mainnet",
    provider: "-",
    mode: "test",
};
const STATE_KEY = "vaporwaveWeb3.walletState";
const REGISTRY_KEY = "vaporwaveWeb3.walletRegistry";
const BALANCE_REPORT_KEY = "vaporwaveWeb3.walletBalanceReport";
const CONTRACT_REPORT_KEY = "vaporwaveWeb3.contractVerificationReport";
const UI_THEME_KEY = "vaporwaveWeb3.uiTheme";
const REGISTRY_LIMIT = 200;
const DONATE_URL = "https://github.com/sponsors/thiag";
const DONATE_ADDRESSES = {
    eth: "0x7322789de14a49EBE28b6133167d25BD903A68ed",
    btc: "bc1qt7r96jx06zr5fk8vwhxxcasjjgacs623m6t26j",
    evm: "0x7322789de14a49EBE28b6133167d25BD903A68ed",
    sol: "9VmhYgzF3SVMfHJaPZfkjwQ22svxMf64fCcDoKyBFaSU",
    polygon: "0x7322789de14a49EBE28b6133167d25BD903A68ed",
    tron: "TD23HKqyLdfms2GqySDu85ZyZTMEj3R37G",
};
const NETWORKS = [
    "Bitcoin Mainnet",
    "Bitcoin Testnet",
    "Ethereum Mainnet",
    "BNB Smart Chain",
    "Polygon",
    "Arbitrum",
    "Optimism",
    "Base",
    "Avalanche",
    "Ethereum Sepolia",
    "Base Sepolia",
    "Polygon Amoy",
    "Solana",
];
const PROVIDERS = [
    "Xverse",
    "Unisat",
    "Leather",
    "Electrum",
    "MetaMask",
    "Uniswap Wallet",
    "Binance Wallet",
    "Coinbase Wallet",
    "Rainbow",
    "Rabby",
    "Trust Wallet",
    "Zerion",
    "Safe Wallet",
    "Ledger Live",
    "Trezor Suite",
    "OKX Wallet",
    "Phantom",
    "Backpack",
    "WalletConnect",
    "Other",
];
const PROVIDER_URLS = {
    "Xverse": "https://www.xverse.app/",
    "Unisat": "https://unisat.io/",
    "Leather": "https://leather.io/",
    "Electrum": "https://electrum.org/",
    "MetaMask": "https://metamask.io/",
    "Uniswap Wallet": "https://wallet.uniswap.org/",
    "Binance Wallet": "https://www.bnbchain.org/en/binance-wallet",
    "Coinbase Wallet": "https://www.coinbase.com/wallet",
    "Rainbow": "https://rainbow.me/",
    "Rabby": "https://rabby.io/",
    "Trust Wallet": "https://trustwallet.com/",
    "Zerion": "https://zerion.io/",
    "Safe Wallet": "https://safe.global/wallet",
    "Ledger Live": "https://www.ledger.com/ledger-live",
    "Trezor Suite": "https://suite.trezor.io/",
    "OKX Wallet": "https://www.okx.com/web3",
    "Phantom": "https://phantom.app/",
    "Backpack": "https://backpack.app/",
    "WalletConnect": "https://walletconnect.com/",
};
const EVM_RPC_DEFAULTS = {
    "Ethereum Mainnet": "https://eth.llamarpc.com",
    "BNB Smart Chain": "https://bsc-dataseed.binance.org",
    "Polygon": "https://polygon-rpc.com",
    "Arbitrum": "https://arb1.arbitrum.io/rpc",
    "Optimism": "https://mainnet.optimism.io",
    "Base": "https://mainnet.base.org",
    "Avalanche": "https://api.avax.network/ext/bc/C/rpc",
    "Ethereum Sepolia": "https://rpc.sepolia.org",
    "Base Sepolia": "https://sepolia.base.org",
    "Polygon Amoy": "https://rpc-amoy.polygon.technology",
};
const SOLANA_RPC_DEFAULT = "https://api.mainnet-beta.solana.com";
const BITCOIN_API_DEFAULTS = {
    "Bitcoin Mainnet": "https://blockstream.info/api",
    "Bitcoin Testnet": "https://blockstream.info/testnet/api",
};
const PROVIDER_BRANDS = {
    "Xverse": { label: "Xverse", mark: "XV", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
    "Unisat": { label: "Unisat", mark: "US", bg: "#eab3081f", border: "#eab308aa", fg: "#fde047" },
    "Leather": { label: "Leather", mark: "LT", bg: "#fb923c1f", border: "#fb923caa", fg: "#fed7aa" },
    "Electrum": { label: "Electrum", mark: "EL", bg: "#60a5fa1f", border: "#60a5faaa", fg: "#bfdbfe" },
    "MetaMask": { label: "MetaMask", mark: "MM", bg: "#f973161f", border: "#f97316aa", fg: "#fdba74" },
    "Uniswap Wallet": { label: "Uniswap", mark: "UNI", bg: "#ec48991f", border: "#ec4899aa", fg: "#f9a8d4" },
    "Binance Wallet": { label: "Binance", mark: "BN", bg: "#facc151f", border: "#facc15aa", fg: "#fde047" },
    "Coinbase Wallet": { label: "Coinbase", mark: "CB", bg: "#3b82f61f", border: "#3b82f6aa", fg: "#93c5fd" },
    "Rainbow": { label: "Rainbow", mark: "RBW", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
    "Rabby": { label: "Rabby", mark: "RB", bg: "#ef44441f", border: "#ef4444aa", fg: "#fca5a5" },
    "Trust Wallet": { label: "Trust", mark: "TW", bg: "#0ea5e91f", border: "#0ea5e9aa", fg: "#7dd3fc" },
    "Zerion": { label: "Zerion", mark: "ZR", bg: "#8b5cf61f", border: "#8b5cf6aa", fg: "#ddd6fe" },
    "Safe Wallet": { label: "Safe", mark: "SF", bg: "#22c55e1f", border: "#22c55eaa", fg: "#86efac" },
    "Ledger Live": { label: "Ledger", mark: "LD", bg: "#e2e8f01f", border: "#e2e8f088", fg: "#e2e8f0" },
    "Trezor Suite": { label: "Trezor", mark: "TZ", bg: "#94a3b81f", border: "#94a3b888", fg: "#e2e8f0" },
    "OKX Wallet": { label: "OKX", mark: "OK", bg: "#e2e8f01f", border: "#e2e8f088", fg: "#e2e8f0" },
    "Phantom": { label: "Phantom", mark: "PH", bg: "#a855f71f", border: "#a855f7aa", fg: "#d8b4fe" },
    "Backpack": { label: "Backpack", mark: "BP", bg: "#f973161f", border: "#f97316aa", fg: "#fdba74" },
    "WalletConnect": { label: "WConnect", mark: "WC", bg: "#6366f11f", border: "#6366f1aa", fg: "#c7d2fe" },
    "Local Test Wallet": { label: "Test Wallet", mark: "TS", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
    "Other": { label: "Other", mark: "OT", bg: "#94a3b81f", border: "#94a3b888", fg: "#cbd5e1" },
    "-": { label: "No Provider", mark: "--", bg: "#94a3b81f", border: "#94a3b866", fg: "#cbd5e1" },
};
const NETWORK_BRANDS = {
    "Bitcoin Mainnet": { label: "Bitcoin", mark: "BTC", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
    "Bitcoin Testnet": { label: "Bitcoin Test", mark: "TBTC", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
    "Ethereum Mainnet": { label: "Ethereum", mark: "ETH", bg: "#6366f11f", border: "#6366f1aa", fg: "#c7d2fe" },
    "Ethereum Sepolia": { label: "Sepolia", mark: "SEP", bg: "#8b5cf61f", border: "#8b5cf6aa", fg: "#ddd6fe" },
    "BNB Smart Chain": { label: "BSC", mark: "BNB", bg: "#facc151f", border: "#facc15aa", fg: "#fde047" },
    "Polygon": { label: "Polygon", mark: "POL", bg: "#a855f71f", border: "#a855f7aa", fg: "#d8b4fe" },
    "Polygon Amoy": { label: "Amoy", mark: "AMY", bg: "#a855f71f", border: "#a855f7aa", fg: "#d8b4fe" },
    "Arbitrum": { label: "Arbitrum", mark: "ARB", bg: "#38bdf81f", border: "#38bdf8aa", fg: "#bae6fd" },
    "Optimism": { label: "Optimism", mark: "OP", bg: "#ef44441f", border: "#ef4444aa", fg: "#fca5a5" },
    "Base": { label: "Base", mark: "BSE", bg: "#3b82f61f", border: "#3b82f6aa", fg: "#93c5fd" },
    "Base Sepolia": { label: "Base Sepolia", mark: "BSP", bg: "#3b82f61f", border: "#3b82f6aa", fg: "#93c5fd" },
    "Avalanche": { label: "Avalanche", mark: "AVX", bg: "#dc26261f", border: "#dc2626aa", fg: "#fca5a5" },
    "Solana": { label: "Solana", mark: "SOL", bg: "#22c55e1f", border: "#22c55eaa", fg: "#86efac" },
};
const FALLBACK_BRAND = {
    label: "Unknown",
    mark: "??",
    bg: "#94a3b81f",
    border: "#94a3b866",
    fg: "#cbd5e1",
};
const PROVIDER_LOGO_FILES = {
    "Xverse": "xverse.png",
    "Leather": "leather.png",
    "Electrum": "electrum.png",
    "MetaMask": "metamask.png",
    "Uniswap Wallet": "uniswap.png",
    "Binance Wallet": "binance.svg",
    "Coinbase Wallet": "coinbase.svg",
    "Rainbow": "rainbow.png",
    "Rabby": "rabby.png",
    "Trust Wallet": "trustwallet.png",
    "Zerion": "zerion.png",
    "Safe Wallet": "safe.png",
    "Ledger Live": "ledger.png",
    "Trezor Suite": "trezor.png",
    "OKX Wallet": "okx.svg",
    "Backpack": "backpack.svg",
    "WalletConnect": "walletconnect.svg",
};
const NETWORK_LOGO_FILES = {
    "Bitcoin Mainnet": "bitcoin.svg",
    "Bitcoin Testnet": "bitcoin.svg",
    "Ethereum Mainnet": "ethereum.svg",
    "Ethereum Sepolia": "ethereum.svg",
    "BNB Smart Chain": "bnbchain.svg",
    "Polygon": "polygon.svg",
    "Polygon Amoy": "polygon.svg",
    "Optimism": "optimism.svg",
    "Solana": "solana.svg",
};
const NETWORK_URLS = {
    "Bitcoin Mainnet": "https://bitcoin.org",
    "Bitcoin Testnet": "https://bitcoin.org",
    "Ethereum Mainnet": "https://ethereum.org",
    "Ethereum Sepolia": "https://ethereum.org",
    "BNB Smart Chain": "https://bnbchain.org",
    "Polygon": "https://polygon.technology",
    "Polygon Amoy": "https://polygon.technology",
    "Arbitrum": "https://arbitrum.io",
    "Optimism": "https://optimism.io",
    "Base": "https://base.org",
    "Base Sepolia": "https://base.org",
    "Avalanche": "https://avax.network",
    "Solana": "https://solana.com",
};
function activate(context) {
    const walletPanel = new WalletLabViewProvider(context);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("vaporwaveWeb3.walletView", walletPanel));
    context.subscriptions.push(vscode.commands.registerCommand("vaporwaveWeb3.connectTestWallet", async () => {
        await walletPanel.connectWallet();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("vaporwaveWeb3.disconnectWallet", async () => {
        await walletPanel.disconnectWallet();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("vaporwaveWeb3.copyWallet", async () => {
        await walletPanel.copyWallet();
    }));
    context.subscriptions.push(vscode.commands.registerCommand("vaporwaveWeb3.runContractCheck", async () => {
        await walletPanel.runContractCheck();
    }));
}
function deactivate() {
    // No-op
}
class WalletLabViewProvider {
    constructor(context) {
        this.context = context;
    }
    resolveWebviewView(webviewView) {
        this.view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = this.getHtml(webviewView.webview, this.getState(), this.getRegistry(), this.getUiTheme());
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case "connect":
                    await this.connectWallet();
                    break;
                case "disconnect":
                    await this.disconnectWallet();
                    break;
                case "copy":
                    await this.copyWallet();
                    break;
                case "openProvider":
                    await this.openProviderSite();
                    break;
                case "donate":
                    await this.openDonatePage();
                    break;
                case "copyDonateAddress":
                    await this.copyDonateAddress(message.address);
                    break;
                case "contractCheck":
                    await this.runContractCheck();
                    break;
                case "balanceCheck":
                    await this.runBalanceCheck();
                    break;
                case "exportRegistryTxt":
                    await this.exportRegistry("txt");
                    break;
                case "exportRegistryCsv":
                    await this.exportRegistry("csv");
                    break;
                case "clearRegistry":
                    await this.clearRegistry();
                    break;
                case "checkRegistryRealBalances":
                    await this.checkRegistryRealBalances();
                    break;
                case "exportRegistryBalancesTxt":
                    await this.exportBalanceReport("txt");
                    break;
                case "exportRegistryBalancesCsv":
                    await this.exportBalanceReport("csv");
                    break;
                case "exportContractReportTxt":
                    await this.exportContractReport("txt");
                    break;
                case "exportContractReportCsv":
                    await this.exportContractReport("csv");
                    break;
                case "setUiTheme":
                    await this.saveUiTheme(this.sanitizeUiTheme(message.themeId));
                    this.refreshView(this.getState());
                    break;
                default:
                    break;
            }
        });
    }
    async connectWallet() {
        const mode = await vscode.window.showQuickPick([
            {
                label: "Connect real wallet (my address)",
                value: "real",
                description: "Bitcoin wallets + MetaMask, Rabby, Trust, Phantom, etc.",
            },
            {
                label: "Generate test wallet",
                value: "test",
                description: "Fake address for local tests",
            },
        ], {
            title: "Connection mode",
            placeHolder: "Choose real wallet or generated test wallet",
        });
        if (!mode) {
            return;
        }
        const chain = await vscode.window.showQuickPick([...NETWORKS], {
            title: "Select network",
            placeHolder: "Choose the network for this wallet",
        });
        if (!chain) {
            return;
        }
        if (mode.value === "test") {
            const state = {
                connected: true,
                address: this.generateTestAddress(chain),
                chain,
                provider: "Local Test Wallet",
                mode: "test",
            };
            await this.saveState(state);
            await this.addRegistryEntry(state, "generated");
            this.refreshView(state);
            vscode.window.showInformationMessage(`Test wallet connected on ${chain}.`);
            return;
        }
        const provider = await vscode.window.showQuickPick([...PROVIDERS], {
            title: "Select wallet provider",
            placeHolder: "Pick your wallet app/provider",
        });
        if (!provider) {
            return;
        }
        if (provider !== "Other") {
            void vscode.window.showInformationMessage(`Open ${provider}, copy your public address and paste it in the next step. Never share seed phrase or private key.`);
        }
        const manualAddress = await vscode.window.showInputBox({
            title: "Paste your public wallet address",
            placeHolder: this.isBitcoinChain(chain)
                ? "Example: bc1q... or 1..."
                : chain === "Solana"
                    ? "Example: 9xQeWvG816bUx9EPf8..."
                    : "Example: 0x1234...",
            validateInput: (value) => {
                const trimmed = value.trim();
                if (trimmed.length === 0) {
                    return "Wallet address is required";
                }
                if (this.isBitcoinChain(chain)) {
                    return this.isValidBitcoinAddress(trimmed)
                        ? null
                        : "Invalid Bitcoin address format";
                }
                if (chain === "Solana") {
                    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)
                        ? null
                        : "Invalid Solana address format";
                }
                return /^0x[a-fA-F0-9]{40}$/.test(trimmed)
                    ? null
                    : "Invalid EVM address format (expected 0x + 40 hex chars)";
            },
        });
        if (manualAddress === undefined) {
            return;
        }
        const state = {
            connected: true,
            address: manualAddress.trim(),
            chain,
            provider,
            mode: "real",
        };
        await this.saveState(state);
        await this.addRegistryEntry(state, "manual");
        this.refreshView(state);
        vscode.window.showInformationMessage(`${provider} wallet connected on ${chain}.`);
    }
    async disconnectWallet() {
        await this.saveState(DEFAULT_STATE);
        this.refreshView(DEFAULT_STATE);
        vscode.window.showInformationMessage("Wallet disconnected.");
    }
    async copyWallet() {
        const state = this.getState();
        if (!state.connected || !state.address) {
            vscode.window.showWarningMessage("No connected wallet to copy.");
            return;
        }
        await vscode.env.clipboard.writeText(state.address);
        vscode.window.showInformationMessage("Wallet address copied.");
    }
    async openProviderSite() {
        const state = this.getState();
        const connectedProvider = state.provider;
        if (connectedProvider in PROVIDER_URLS) {
            await vscode.env.openExternal(vscode.Uri.parse(PROVIDER_URLS[connectedProvider]));
            return;
        }
        const provider = await vscode.window.showQuickPick([...PROVIDERS].filter((item) => item !== "Other"), {
            title: "Open wallet provider website",
            placeHolder: "Choose a provider",
        });
        if (!provider) {
            return;
        }
        await vscode.env.openExternal(vscode.Uri.parse(PROVIDER_URLS[provider]));
    }
    async openDonatePage() {
        await vscode.env.openExternal(vscode.Uri.parse(DONATE_URL));
    }
    async copyDonateAddress(address) {
        const trimmed = (address ?? "").trim();
        if (!trimmed) {
            vscode.window.showWarningMessage("Donation address is unavailable.");
            return;
        }
        await vscode.env.clipboard.writeText(trimmed);
        vscode.window.showInformationMessage("Donation address copied.");
    }
    getFaviconUrl(targetUrl) {
        if (!targetUrl) {
            return "";
        }
        try {
            const host = new URL(targetUrl).hostname.replace(/^www\./, "");
            return `https://icons.duckduckgo.com/ip3/${host}.ico`;
        }
        catch {
            return "";
        }
    }
    getProviderLogoSrc(webview, provider) {
        const localLogo = PROVIDER_LOGO_FILES[provider];
        if (localLogo) {
            return webview
                .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "logos", localLogo))
                .toString();
        }
        return this.getFaviconUrl(PROVIDER_URLS[provider]);
    }
    getNetworkLogoSrc(webview, chain) {
        const localLogo = NETWORK_LOGO_FILES[chain];
        if (localLogo) {
            return webview
                .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "logos", localLogo))
                .toString();
        }
        return this.getFaviconUrl(NETWORK_URLS[chain]);
    }
    async runContractCheck() {
        const state = this.getState();
        if (!state.connected) {
            vscode.window.showWarningMessage("Connect a wallet before running a contract check.");
            return;
        }
        if (this.isBitcoinChain(state.chain)) {
            vscode.window.showWarningMessage("Contract check is not available for Bitcoin UTXO networks in this lab yet. Use Check Balance for BTC addresses.");
            return;
        }
        const isSolana = state.chain === "Solana";
        const contractAddress = await vscode.window.showInputBox({
            title: "Contract address to test",
            placeHolder: isSolana ? "Program address (base58)" : "0x...",
            validateInput: (value) => {
                const trimmed = value.trim();
                if (!trimmed) {
                    return "Contract address is required";
                }
                if (isSolana) {
                    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)
                        ? null
                        : "Invalid Solana program address format";
                }
                return /^0x[a-fA-F0-9]{40}$/.test(trimmed)
                    ? null
                    : "Invalid EVM contract address format (expected 0x + 40 hex chars)";
            },
        });
        if (contractAddress === undefined) {
            return;
        }
        const normalizedContract = contractAddress.trim();
        if (state.mode === "test") {
            const fakeTxHash = `0x${(0, crypto_1.randomBytes)(32).toString("hex")}`;
            await this.addContractReportRow({
                checkedAt: new Date().toISOString(),
                mode: "test",
                chain: state.chain,
                walletAddress: state.address,
                contractAddress: normalizedContract,
                status: "ok",
                endpoint: "simulation",
                chainId: "simulated",
                codeBytes: 0,
                expectedPrefix: "",
                prefixMatched: "na",
                minCodeBytes: 0,
                minCodeBytesPassed: "na",
                note: `Simulated tx ${fakeTxHash}`,
            });
            this.refreshView(state);
            vscode.window.showInformationMessage(`Test check passed for ${normalizedContract} on ${state.chain}. Simulated tx: ${fakeTxHash.slice(0, 12)}...`);
            return;
        }
        if (isSolana) {
            await this.runRealSolanaContractCheck(state.chain, state.address, normalizedContract);
            return;
        }
        const expectedPrefixInput = await vscode.window.showInputBox({
            title: "Optional EVM runtime bytecode prefix",
            placeHolder: "Leave empty to skip (example: 0x60806040)",
            validateInput: (value) => {
                const trimmed = value.trim();
                if (!trimmed) {
                    return null;
                }
                if (!/^0x[a-fA-F0-9]+$/.test(trimmed)) {
                    return "Expected a hex prefix starting with 0x";
                }
                const hexLength = trimmed.length - 2;
                return hexLength % 2 === 0 ? null : "Hex length must be even";
            },
        });
        if (expectedPrefixInput === undefined) {
            return;
        }
        const minCodeBytesInput = await vscode.window.showInputBox({
            title: "Optional minimum runtime bytecode size (bytes)",
            value: "",
            placeHolder: "Leave empty to skip (example: 1000)",
            validateInput: (value) => {
                const trimmed = value.trim();
                if (!trimmed) {
                    return null;
                }
                if (!/^\d+$/.test(trimmed)) {
                    return "Use only digits";
                }
                return Number(trimmed) <= 200000 ? null : "Value is too high";
            },
        });
        if (minCodeBytesInput === undefined) {
            return;
        }
        const expectedPrefix = expectedPrefixInput.trim().toLowerCase();
        const minCodeBytes = minCodeBytesInput.trim() ? Number(minCodeBytesInput.trim()) : 0;
        await this.runRealEvmContractCheck(state.chain, state.address, normalizedContract, expectedPrefix, minCodeBytes);
    }
    async runBalanceCheck() {
        const state = this.getState();
        if (!state.connected) {
            vscode.window.showWarningMessage("Connect a wallet before checking balance.");
            return;
        }
        if (state.mode !== "real") {
            vscode.window.showWarningMessage("Balance check is available only in real wallet mode.");
            return;
        }
        if (state.chain === "Solana") {
            await this.runRealSolanaBalanceCheck(state.chain, state.address);
            return;
        }
        if (this.isBitcoinChain(state.chain)) {
            await this.runRealBitcoinBalanceCheck(state.chain, state.address);
            return;
        }
        await this.runRealEvmBalanceCheck(state.chain, state.address);
    }
    async runRealBitcoinBalanceCheck(chain, walletAddress) {
        const apiBase = await this.promptForHttpEndpoint(`Indexer API base for ${chain}`, BITCOIN_API_DEFAULTS[chain] ?? "https://blockstream.info/api", "API base URL is required", "API base must use http or https");
        if (apiBase === undefined) {
            return;
        }
        const normalizedBase = apiBase.trim().replace(/\/$/, "");
        const endpoint = `${normalizedBase}/address/${walletAddress}`;
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = (await response.json());
            const confirmedFunded = data.chain_stats?.funded_txo_sum ?? 0;
            const confirmedSpent = data.chain_stats?.spent_txo_sum ?? 0;
            const mempoolFunded = data.mempool_stats?.funded_txo_sum ?? 0;
            const mempoolSpent = data.mempool_stats?.spent_txo_sum ?? 0;
            const totalSats = (confirmedFunded - confirmedSpent) + (mempoolFunded - mempoolSpent);
            const totalBtc = this.formatBtcFromSats(totalSats);
            vscode.window.showInformationMessage(`Real balance on ${chain}: ${totalBtc} BTC for ${walletAddress}.`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown API error";
            vscode.window.showErrorMessage(`Balance check failed: ${message}`);
        }
    }
    async runRealEvmBalanceCheck(chain, walletAddress) {
        const rpcEndpoint = await this.promptForHttpEndpoint(`RPC endpoint for ${chain}`, EVM_RPC_DEFAULTS[chain] ?? "", "RPC endpoint is required", "RPC endpoint must use http or https");
        if (rpcEndpoint === undefined) {
            return;
        }
        const url = rpcEndpoint.trim();
        try {
            const chainId = await this.postJsonRpc(url, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_chainId",
                params: [],
            });
            const balanceHex = await this.postJsonRpc(url, {
                jsonrpc: "2.0",
                id: 2,
                method: "eth_getBalance",
                params: [walletAddress, "latest"],
            });
            const balanceWei = BigInt(balanceHex);
            const balanceEth = this.formatEthFromWei(balanceWei);
            vscode.window.showInformationMessage(`Real balance on ${chain} (${chainId}): ${balanceEth} ETH for ${walletAddress}.`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown RPC error";
            vscode.window.showErrorMessage(`Balance check failed: ${message}`);
        }
    }
    async runRealSolanaBalanceCheck(chain, walletAddress) {
        const rpcEndpoint = await this.promptForHttpEndpoint(`RPC endpoint for ${chain}`, SOLANA_RPC_DEFAULT, "RPC endpoint is required", "RPC endpoint must use http or https");
        if (rpcEndpoint === undefined) {
            return;
        }
        try {
            const balanceResponse = await this.postJsonRpc(rpcEndpoint.trim(), {
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [walletAddress],
            });
            const balanceSol = balanceResponse.value / 1e9;
            vscode.window.showInformationMessage(`Real balance on ${chain}: ${balanceSol.toFixed(6)} SOL for ${walletAddress}.`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown RPC error";
            vscode.window.showErrorMessage(`Balance check failed: ${message}`);
        }
    }
    async runRealEvmContractCheck(chain, walletAddress, contractAddress, expectedPrefix, minCodeBytes) {
        const rpcEndpoint = await this.promptForHttpEndpoint(`RPC endpoint for ${chain}`, EVM_RPC_DEFAULTS[chain] ?? "", "RPC endpoint is required", "RPC endpoint must use http or https");
        if (rpcEndpoint === undefined) {
            return;
        }
        const url = rpcEndpoint.trim();
        try {
            const chainId = await this.postJsonRpc(url, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_chainId",
                params: [],
            });
            const code = await this.postJsonRpc(url, {
                jsonrpc: "2.0",
                id: 2,
                method: "eth_getCode",
                params: [contractAddress, "latest"],
            });
            const balanceHex = await this.postJsonRpc(url, {
                jsonrpc: "2.0",
                id: 3,
                method: "eth_getBalance",
                params: [walletAddress, "latest"],
            });
            const hasCode = code !== "0x";
            const codeLower = code.toLowerCase();
            const codeBody = codeLower.startsWith("0x") ? codeLower.slice(2) : codeLower;
            const codeBytes = codeBody.length / 2;
            const hasPolicyPrefix = expectedPrefix.length > 0;
            const hasPolicyMinSize = minCodeBytes > 0;
            const prefixMatched = hasPolicyPrefix ? hasCode && codeLower.startsWith(expectedPrefix) : true;
            const minCodeBytesPassed = hasPolicyMinSize ? codeBytes >= minCodeBytes : true;
            const balanceWei = BigInt(balanceHex);
            const balanceEth = this.formatEthFromWei(balanceWei);
            const codeStatus = hasCode ? "bytecode found" : "no bytecode found";
            const walletStatus = `${balanceEth} ETH`;
            const chainStatus = `chainId ${chainId}`;
            const prefixStatus = hasPolicyPrefix
                ? prefixMatched
                    ? `prefix match (${expectedPrefix.slice(0, 18)}...)`
                    : `prefix mismatch (${expectedPrefix.slice(0, 18)}...)`
                : "prefix not requested";
            const minSizeStatus = hasPolicyMinSize
                ? minCodeBytesPassed
                    ? `code size ${codeBytes} bytes >= ${minCodeBytes}`
                    : `code size ${codeBytes} bytes < ${minCodeBytes}`
                : "min size not requested";
            const status = !hasCode
                ? "warn"
                : prefixMatched && minCodeBytesPassed
                    ? "ok"
                    : "warn";
            await this.addContractReportRow({
                checkedAt: new Date().toISOString(),
                mode: "real",
                chain,
                walletAddress,
                contractAddress,
                status,
                endpoint: url,
                chainId,
                codeBytes,
                expectedPrefix,
                prefixMatched: hasPolicyPrefix ? (prefixMatched ? "yes" : "no") : "na",
                minCodeBytes,
                minCodeBytesPassed: hasPolicyMinSize ? (minCodeBytesPassed ? "yes" : "no") : "na",
                note: `${codeStatus}; ${prefixStatus}; ${minSizeStatus}; wallet ${walletStatus}`,
            });
            this.refreshView(this.getState());
            if (!hasCode) {
                vscode.window.showWarningMessage(`Real check done on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). Wallet balance: ${walletStatus}.`);
                return;
            }
            if (status === "warn") {
                vscode.window.showWarningMessage(`Real check completed on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). ${prefixStatus}; ${minSizeStatus}. Wallet balance: ${walletStatus}.`);
                return;
            }
            vscode.window.showInformationMessage(`Real check passed on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). ${prefixStatus}; ${minSizeStatus}. Wallet balance: ${walletStatus}.`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown RPC error";
            await this.addContractReportRow({
                checkedAt: new Date().toISOString(),
                mode: "real",
                chain,
                walletAddress,
                contractAddress,
                status: "error",
                endpoint: url,
                chainId: "",
                codeBytes: 0,
                expectedPrefix,
                prefixMatched: expectedPrefix ? "no" : "na",
                minCodeBytes,
                minCodeBytesPassed: minCodeBytes > 0 ? "no" : "na",
                note: message,
            });
            this.refreshView(this.getState());
            vscode.window.showErrorMessage(`Contract check failed: ${message}`);
        }
    }
    async runRealSolanaContractCheck(chain, walletAddress, contractAddress) {
        const rpcEndpoint = await this.promptForHttpEndpoint(`RPC endpoint for ${chain}`, SOLANA_RPC_DEFAULT, "RPC endpoint is required", "RPC endpoint must use http or https");
        if (rpcEndpoint === undefined) {
            return;
        }
        try {
            const result = await this.postJsonRpc(rpcEndpoint.trim(), {
                jsonrpc: "2.0",
                id: 1,
                method: "getAccountInfo",
                params: [contractAddress, { encoding: "base64" }],
            });
            if (!result.value) {
                await this.addContractReportRow({
                    checkedAt: new Date().toISOString(),
                    mode: "real",
                    chain,
                    walletAddress,
                    contractAddress,
                    status: "warn",
                    endpoint: rpcEndpoint.trim(),
                    chainId: "solana",
                    codeBytes: 0,
                    expectedPrefix: "",
                    prefixMatched: "na",
                    minCodeBytes: 0,
                    minCodeBytesPassed: "na",
                    note: "Account not found",
                });
                this.refreshView(this.getState());
                vscode.window.showWarningMessage(`Real check done on ${chain}: account not found for ${contractAddress}.`);
                return;
            }
            const executable = result.value.executable
                ? "executable program"
                : "account exists but is not executable";
            await this.addContractReportRow({
                checkedAt: new Date().toISOString(),
                mode: "real",
                chain,
                walletAddress,
                contractAddress,
                status: result.value.executable ? "ok" : "warn",
                endpoint: rpcEndpoint.trim(),
                chainId: "solana",
                codeBytes: 0,
                expectedPrefix: "",
                prefixMatched: "na",
                minCodeBytes: 0,
                minCodeBytesPassed: "na",
                note: executable,
            });
            this.refreshView(this.getState());
            vscode.window.showInformationMessage(`Real check done on ${chain}: ${executable} at ${contractAddress}.`);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Unknown RPC error";
            await this.addContractReportRow({
                checkedAt: new Date().toISOString(),
                mode: "real",
                chain,
                walletAddress,
                contractAddress,
                status: "error",
                endpoint: rpcEndpoint.trim(),
                chainId: "solana",
                codeBytes: 0,
                expectedPrefix: "",
                prefixMatched: "na",
                minCodeBytes: 0,
                minCodeBytesPassed: "na",
                note: message,
            });
            this.refreshView(this.getState());
            vscode.window.showErrorMessage(`Contract check failed: ${message}`);
        }
    }
    async postJsonRpc(endpoint, payload, timeoutMs = 0) {
        const controller = timeoutMs > 0 ? new AbortController() : undefined;
        const timeoutHandle = controller
            ? setTimeout(() => controller.abort(), timeoutMs)
            : undefined;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
            signal: controller?.signal,
        }).finally(() => {
            if (timeoutHandle) {
                clearTimeout(timeoutHandle);
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json());
        if (data.error) {
            throw new Error(data.error.message ?? "JSON-RPC returned an error");
        }
        if (data.result === undefined) {
            throw new Error("JSON-RPC response has no result field");
        }
        return data.result;
    }
    generateTestAddress(chain) {
        if (chain === "Solana") {
            return this.generateBase58String(44);
        }
        if (this.isBitcoinChain(chain)) {
            const hrp = chain === "Bitcoin Testnet" ? "tb1q" : "bc1q";
            return `${hrp}${this.generateBech32Body(38)}`;
        }
        return `0x${(0, crypto_1.randomBytes)(20).toString("hex")}`;
    }
    isBitcoinChain(chain) {
        return chain === "Bitcoin Mainnet" || chain === "Bitcoin Testnet";
    }
    isValidBitcoinAddress(address) {
        const base58 = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
        const bech32Main = /^bc1[ac-hj-np-z02-9]{11,71}$/i;
        const bech32Test = /^tb1[ac-hj-np-z02-9]{11,71}$/i;
        return base58.test(address) || bech32Main.test(address) || bech32Test.test(address);
    }
    generateBase58String(length) {
        const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        let out = "";
        for (let i = 0; i < length; i += 1) {
            const index = (0, crypto_1.randomBytes)(1)[0] % alphabet.length;
            out += alphabet[index];
        }
        return out;
    }
    generateBech32Body(length) {
        const alphabet = "023456789acdefghjklmnpqrstuvwxyz";
        let out = "";
        for (let i = 0; i < length; i += 1) {
            const index = (0, crypto_1.randomBytes)(1)[0] % alphabet.length;
            out += alphabet[index];
        }
        return out;
    }
    formatEthFromWei(wei) {
        const base = 10n ** 18n;
        const integer = wei / base;
        const fraction = wei % base;
        const fractionPadded = fraction.toString().padStart(18, "0");
        const fractionTrimmed = fractionPadded.replace(/0+$/, "");
        return fractionTrimmed.length > 0 ? `${integer}.${fractionTrimmed}` : `${integer}`;
    }
    formatBtcFromSats(sats) {
        return (sats / 1e8).toFixed(8);
    }
    async promptForHttpEndpoint(title, value, requiredMessage, protocolMessage) {
        return vscode.window.showInputBox({
            title,
            value,
            placeHolder: "https://...",
            validateInput: (inputValue) => {
                const trimmed = inputValue.trim();
                if (!trimmed) {
                    return requiredMessage;
                }
                try {
                    const parsed = new URL(trimmed);
                    return parsed.protocol === "http:" || parsed.protocol === "https:"
                        ? null
                        : protocolMessage;
                }
                catch {
                    return "Invalid URL";
                }
            },
        });
    }
    isValidChain(chain) {
        return NETWORKS.includes(chain);
    }
    isValidProvider(provider) {
        return provider === "Local Test Wallet" || provider in PROVIDER_BRANDS || PROVIDERS.includes(provider);
    }
    sanitizeState(state) {
        if (!state.connected) {
            return DEFAULT_STATE;
        }
        const chain = this.isValidChain(state.chain) ? state.chain : DEFAULT_STATE.chain;
        const provider = this.isValidProvider(state.provider) ? state.provider : "-";
        const mode = state.mode === "real" || state.mode === "test" ? state.mode : DEFAULT_STATE.mode;
        const address = typeof state.address === "string" ? state.address.trim() : "";
        if (!address) {
            return DEFAULT_STATE;
        }
        return {
            connected: true,
            address,
            chain,
            provider,
            mode,
        };
    }
    getState() {
        const persisted = this.context.globalState.get(STATE_KEY);
        if (!persisted) {
            return DEFAULT_STATE;
        }
        return this.sanitizeState(persisted);
    }
    async saveState(state) {
        await this.context.globalState.update(STATE_KEY, state);
    }
    refreshView(state) {
        if (!this.view) {
            return;
        }
        this.view.webview.html = this.getHtml(this.view.webview, state, this.getRegistry(), this.getUiTheme());
    }
    sanitizeUiTheme(value) {
        if (value === "calm-light" || value === "btc-dawn-light" || value === "neon" || value === "pro") {
            return value;
        }
        return "pro";
    }
    getUiTheme() {
        const persisted = this.context.globalState.get(UI_THEME_KEY);
        return this.sanitizeUiTheme(persisted);
    }
    async saveUiTheme(theme) {
        await this.context.globalState.update(UI_THEME_KEY, theme);
    }
    getRegistry() {
        const persisted = this.context.globalState.get(REGISTRY_KEY);
        if (!Array.isArray(persisted)) {
            return [];
        }
        const clean = persisted
            .filter((entry) => entry && typeof entry === "object")
            .map((entry) => {
            const mode = entry.mode === "real" ? "real" : "test";
            const source = entry.source === "manual" ? "manual" : "generated";
            const createdAt = typeof entry.createdAt === "string" && entry.createdAt
                ? entry.createdAt
                : new Date().toISOString();
            return {
                address: String(entry.address ?? "").trim(),
                chain: this.isValidChain(String(entry.chain ?? ""))
                    ? String(entry.chain)
                    : DEFAULT_STATE.chain,
                provider: this.isValidProvider(String(entry.provider ?? ""))
                    ? String(entry.provider)
                    : "-",
                mode,
                source,
                createdAt,
            };
        })
            .filter((entry) => entry.address.length > 0)
            .slice(0, REGISTRY_LIMIT);
        return clean;
    }
    async addRegistryEntry(state, source) {
        const registry = this.getRegistry();
        const alreadyExists = registry.some((entry) => entry.address.toLowerCase() === state.address.toLowerCase() &&
            entry.chain === state.chain &&
            entry.provider === state.provider &&
            entry.mode === state.mode);
        if (alreadyExists) {
            return;
        }
        const next = {
            address: state.address,
            chain: state.chain,
            provider: state.provider,
            mode: state.mode,
            source,
            createdAt: new Date().toISOString(),
        };
        await this.context.globalState.update(REGISTRY_KEY, [next, ...registry].slice(0, REGISTRY_LIMIT));
    }
    formatRegistryTxt(entries) {
        const real = entries.filter((entry) => entry.mode === "real");
        const test = entries.filter((entry) => entry.mode === "test");
        const lines = [];
        lines.push("Wallet Lab Registry");
        lines.push(`Exported at: ${new Date().toISOString()}`);
        lines.push("");
        lines.push("REAL WALLETS");
        lines.push("------------");
        if (real.length === 0) {
            lines.push("(none)");
        }
        else {
            for (const entry of real) {
                lines.push(`${entry.createdAt} | ${entry.chain} | ${entry.provider} | ${entry.address} | source=${entry.source}`);
            }
        }
        lines.push("");
        lines.push("TEST WALLETS");
        lines.push("------------");
        if (test.length === 0) {
            lines.push("(none)");
        }
        else {
            for (const entry of test) {
                lines.push(`${entry.createdAt} | ${entry.chain} | ${entry.provider} | ${entry.address} | source=${entry.source}`);
            }
        }
        return lines.join("\n");
    }
    escapeCsv(value) {
        const needsQuotes = value.includes(",") || value.includes("\n") || value.includes('"');
        const escaped = value.replace(/"/g, '""');
        return needsQuotes ? `"${escaped}"` : escaped;
    }
    formatRegistryCsv(entries) {
        const header = ["mode", "source", "createdAt", "chain", "provider", "address"];
        const rows = entries.map((entry) => [
            entry.mode,
            entry.source,
            entry.createdAt,
            entry.chain,
            entry.provider,
            entry.address,
        ]);
        const content = [header, ...rows]
            .map((row) => row.map((cell) => this.escapeCsv(String(cell))).join(","))
            .join("\n");
        return content;
    }
    async exportRegistry(format) {
        const entries = this.getRegistry();
        if (entries.length === 0) {
            vscode.window.showWarningMessage("No wallet records to export yet.");
            return;
        }
        const now = new Date().toISOString().replace(/[:.]/g, "-");
        const suggestedName = `wallet-registry-${now}.${format}`;
        const saveUri = await vscode.window.showSaveDialog({
            saveLabel: format === "txt" ? "Export TXT" : "Export CSV",
            defaultUri: vscode.Uri.file(suggestedName),
            filters: format === "txt"
                ? { "Text Files": ["txt"] }
                : { "CSV Files": ["csv"] },
        });
        if (!saveUri) {
            return;
        }
        const content = format === "txt"
            ? this.formatRegistryTxt(entries)
            : this.formatRegistryCsv(entries);
        await vscode.workspace.fs.writeFile(saveUri, Buffer.from(content, "utf8"));
        vscode.window.showInformationMessage(`Registry exported: ${saveUri.fsPath}`);
    }
    async clearRegistry() {
        await this.context.globalState.update(REGISTRY_KEY, []);
        await this.context.globalState.update(BALANCE_REPORT_KEY, []);
        await this.context.globalState.update(CONTRACT_REPORT_KEY, []);
        this.refreshView(this.getState());
        vscode.window.showInformationMessage("Wallet registry cleared.");
    }
    getBalanceReport() {
        const persisted = this.context.globalState.get(BALANCE_REPORT_KEY);
        if (!Array.isArray(persisted)) {
            return [];
        }
        return persisted
            .filter((row) => row && typeof row === "object")
            .map((row) => {
            const status = row.status === "ok" ? "ok" : "error";
            return {
                address: String(row.address ?? "").trim(),
                chain: String(row.chain ?? ""),
                provider: String(row.provider ?? ""),
                status,
                balance: String(row.balance ?? ""),
                unit: String(row.unit ?? ""),
                endpoint: String(row.endpoint ?? ""),
                error: String(row.error ?? ""),
                checkedAt: typeof row.checkedAt === "string" && row.checkedAt
                    ? row.checkedAt
                    : new Date().toISOString(),
            };
        })
            .filter((row) => row.address.length > 0)
            .slice(0, REGISTRY_LIMIT);
    }
    getContractReport() {
        const persisted = this.context.globalState.get(CONTRACT_REPORT_KEY);
        if (!Array.isArray(persisted)) {
            return [];
        }
        return persisted
            .filter((row) => row && typeof row === "object")
            .map((row) => {
            const status = row.status === "error" ? "error" : row.status === "warn" ? "warn" : "ok";
            const mode = row.mode === "real" ? "real" : "test";
            const normalizeFlag = (value, fallback) => {
                return value === "yes" || value === "no" || value === "na" ? value : fallback;
            };
            return {
                checkedAt: typeof row.checkedAt === "string" && row.checkedAt
                    ? row.checkedAt
                    : new Date().toISOString(),
                mode,
                chain: String(row.chain ?? ""),
                walletAddress: String(row.walletAddress ?? ""),
                contractAddress: String(row.contractAddress ?? ""),
                status,
                endpoint: String(row.endpoint ?? ""),
                chainId: String(row.chainId ?? ""),
                codeBytes: Number.isFinite(Number(row.codeBytes)) ? Number(row.codeBytes) : 0,
                expectedPrefix: String(row.expectedPrefix ?? ""),
                prefixMatched: normalizeFlag(row.prefixMatched, "na"),
                minCodeBytes: Number.isFinite(Number(row.minCodeBytes)) ? Number(row.minCodeBytes) : 0,
                minCodeBytesPassed: normalizeFlag(row.minCodeBytesPassed, "na"),
                note: String(row.note ?? ""),
            };
        })
            .filter((row) => row.contractAddress.length > 0)
            .slice(0, REGISTRY_LIMIT);
    }
    async addContractReportRow(row) {
        const report = this.getContractReport();
        await this.context.globalState.update(CONTRACT_REPORT_KEY, [row, ...report].slice(0, REGISTRY_LIMIT));
    }
    async fetchBitcoinBalanceWithoutPrompt(chain, walletAddress, endpointBase) {
        const endpoint = `${endpointBase.trim().replace(/\/$/, "")}/address/${walletAddress}`;
        const controller = new AbortController();
        const timeoutHandle = setTimeout(() => controller.abort(), 15000);
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { accept: "application/json" },
            signal: controller.signal,
        }).finally(() => clearTimeout(timeoutHandle));
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json());
        const confirmedFunded = data.chain_stats?.funded_txo_sum ?? 0;
        const confirmedSpent = data.chain_stats?.spent_txo_sum ?? 0;
        const mempoolFunded = data.mempool_stats?.funded_txo_sum ?? 0;
        const mempoolSpent = data.mempool_stats?.spent_txo_sum ?? 0;
        const totalSats = (confirmedFunded - confirmedSpent) + (mempoolFunded - mempoolSpent);
        return this.formatBtcFromSats(totalSats);
    }
    async fetchEvmBalanceWithoutPrompt(chain, walletAddress, endpoint) {
        const balanceHex = await this.postJsonRpc(endpoint, {
            jsonrpc: "2.0",
            id: 2,
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
        }, 15000);
        const balanceWei = BigInt(balanceHex);
        return this.formatEthFromWei(balanceWei);
    }
    async fetchSolanaBalanceWithoutPrompt(chain, walletAddress, endpoint) {
        const balanceResponse = await this.postJsonRpc(endpoint, {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [walletAddress],
        }, 15000);
        return (balanceResponse.value / 1e9).toFixed(6);
    }
    async checkRegistryRealBalances() {
        const realEntries = this.getRegistry().filter((entry) => entry.mode === "real");
        if (realEntries.length === 0) {
            vscode.window.showWarningMessage("No real wallet records to check.");
            return;
        }
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Checking real wallet balances...",
            cancellable: false,
        }, async (progress) => {
            const report = [];
            const checkedAt = new Date().toISOString();
            for (let i = 0; i < realEntries.length; i += 1) {
                const entry = realEntries[i];
                const increment = Math.max(1, Math.floor(100 / realEntries.length));
                progress.report({ increment, message: `${i + 1}/${realEntries.length} ${entry.chain}` });
                const baseRow = {
                    address: entry.address,
                    chain: entry.chain,
                    provider: entry.provider,
                    endpoint: "",
                    checkedAt,
                };
                try {
                    if (this.isBitcoinChain(entry.chain)) {
                        const endpoint = BITCOIN_API_DEFAULTS[entry.chain] ?? "";
                        if (!endpoint) {
                            throw new Error("No default BTC API endpoint configured");
                        }
                        const balance = await this.fetchBitcoinBalanceWithoutPrompt(entry.chain, entry.address, endpoint);
                        report.push({
                            ...baseRow,
                            endpoint,
                            status: "ok",
                            balance,
                            unit: "BTC",
                            error: "",
                        });
                        continue;
                    }
                    if (entry.chain === "Solana") {
                        const endpoint = SOLANA_RPC_DEFAULT;
                        const balance = await this.fetchSolanaBalanceWithoutPrompt(entry.chain, entry.address, endpoint);
                        report.push({
                            ...baseRow,
                            endpoint,
                            status: "ok",
                            balance,
                            unit: "SOL",
                            error: "",
                        });
                        continue;
                    }
                    const endpoint = EVM_RPC_DEFAULTS[entry.chain] ?? "";
                    if (!endpoint) {
                        throw new Error("No default EVM RPC endpoint configured");
                    }
                    const balance = await this.fetchEvmBalanceWithoutPrompt(entry.chain, entry.address, endpoint);
                    report.push({
                        ...baseRow,
                        endpoint,
                        status: "ok",
                        balance,
                        unit: "ETH",
                        error: "",
                    });
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    report.push({
                        ...baseRow,
                        status: "error",
                        balance: "",
                        unit: "",
                        error: message,
                    });
                }
            }
            await this.context.globalState.update(BALANCE_REPORT_KEY, report.slice(0, REGISTRY_LIMIT));
            const successCount = report.filter((row) => row.status === "ok").length;
            const errorCount = report.length - successCount;
            this.refreshView(this.getState());
            vscode.window.showInformationMessage(`Batch balance check finished: ${successCount} success, ${errorCount} error(s).`);
        });
    }
    formatBalanceReportTxt(rows) {
        const lines = [];
        lines.push("Wallet Registry Balance Report");
        lines.push(`Generated at: ${new Date().toISOString()}`);
        lines.push("");
        for (const row of rows) {
            if (row.status === "ok") {
                lines.push(`${row.checkedAt} | OK | ${row.chain} | ${row.provider} | ${row.address} | ${row.balance} ${row.unit} | ${row.endpoint}`);
            }
            else {
                lines.push(`${row.checkedAt} | ERROR | ${row.chain} | ${row.provider} | ${row.address} | ${row.error}`);
            }
        }
        return lines.join("\n");
    }
    formatBalanceReportCsv(rows) {
        const header = [
            "checkedAt",
            "status",
            "chain",
            "provider",
            "address",
            "balance",
            "unit",
            "endpoint",
            "error",
        ];
        const body = rows.map((row) => [
            row.checkedAt,
            row.status,
            row.chain,
            row.provider,
            row.address,
            row.balance,
            row.unit,
            row.endpoint,
            row.error,
        ]);
        return [header, ...body]
            .map((line) => line.map((cell) => this.escapeCsv(String(cell))).join(","))
            .join("\n");
    }
    async exportBalanceReport(format) {
        const rows = this.getBalanceReport();
        if (rows.length === 0) {
            vscode.window.showWarningMessage("No balance report found. Run Check Real Balances first.");
            return;
        }
        const now = new Date().toISOString().replace(/[:.]/g, "-");
        const suggestedName = `wallet-balance-report-${now}.${format}`;
        const saveUri = await vscode.window.showSaveDialog({
            saveLabel: format === "txt" ? "Export Balance TXT" : "Export Balance CSV",
            defaultUri: vscode.Uri.file(suggestedName),
            filters: format === "txt"
                ? { "Text Files": ["txt"] }
                : { "CSV Files": ["csv"] },
        });
        if (!saveUri) {
            return;
        }
        const content = format === "txt"
            ? this.formatBalanceReportTxt(rows)
            : this.formatBalanceReportCsv(rows);
        await vscode.workspace.fs.writeFile(saveUri, Buffer.from(content, "utf8"));
        vscode.window.showInformationMessage(`Balance report exported: ${saveUri.fsPath}`);
    }
    formatContractReportTxt(rows) {
        const lines = [];
        lines.push("Contract Verification Report");
        lines.push(`Generated at: ${new Date().toISOString()}`);
        lines.push("");
        for (const row of rows) {
            lines.push(`${row.checkedAt} | ${row.status.toUpperCase()} | ${row.mode.toUpperCase()} | ${row.chain} | contract=${row.contractAddress} | wallet=${row.walletAddress} | chainId=${row.chainId} | codeBytes=${row.codeBytes} | prefix=${row.prefixMatched} | minSize=${row.minCodeBytesPassed} | endpoint=${row.endpoint} | ${row.note}`);
        }
        return lines.join("\n");
    }
    formatContractReportCsv(rows) {
        const header = [
            "checkedAt",
            "status",
            "mode",
            "chain",
            "walletAddress",
            "contractAddress",
            "chainId",
            "codeBytes",
            "expectedPrefix",
            "prefixMatched",
            "minCodeBytes",
            "minCodeBytesPassed",
            "endpoint",
            "note",
        ];
        const body = rows.map((row) => [
            row.checkedAt,
            row.status,
            row.mode,
            row.chain,
            row.walletAddress,
            row.contractAddress,
            row.chainId,
            String(row.codeBytes),
            row.expectedPrefix,
            row.prefixMatched,
            String(row.minCodeBytes),
            row.minCodeBytesPassed,
            row.endpoint,
            row.note,
        ]);
        return [header, ...body]
            .map((line) => line.map((cell) => this.escapeCsv(String(cell))).join(","))
            .join("\n");
    }
    async exportContractReport(format) {
        const rows = this.getContractReport();
        if (rows.length === 0) {
            vscode.window.showWarningMessage("No contract verification report found. Run Contract Check first.");
            return;
        }
        const now = new Date().toISOString().replace(/[:.]/g, "-");
        const suggestedName = `wallet-contract-report-${now}.${format}`;
        const saveUri = await vscode.window.showSaveDialog({
            saveLabel: format === "txt" ? "Export Contract TXT" : "Export Contract CSV",
            defaultUri: vscode.Uri.file(suggestedName),
            filters: format === "txt"
                ? { "Text Files": ["txt"] }
                : { "CSV Files": ["csv"] },
        });
        if (!saveUri) {
            return;
        }
        const content = format === "txt"
            ? this.formatContractReportTxt(rows)
            : this.formatContractReportCsv(rows);
        await vscode.workspace.fs.writeFile(saveUri, Buffer.from(content, "utf8"));
        vscode.window.showInformationMessage(`Contract report exported: ${saveUri.fsPath}`);
    }
    escapeHtml(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
    renderRegistryItems(entries) {
        if (entries.length === 0) {
            return '<div class="registry-empty">No records yet.</div>';
        }
        return entries
            .map((entry) => {
            const createdLabel = new Date(entry.createdAt).toLocaleString();
            const sourceLabel = entry.source === "manual" ? "Manual" : "Generated";
            return `<div class="registry-item">
          <div class="registry-item-main">${this.escapeHtml(entry.address)}</div>
          <div class="registry-item-meta">${this.escapeHtml(entry.chain)} | ${this.escapeHtml(entry.provider)} | ${this.escapeHtml(sourceLabel)} | ${this.escapeHtml(createdLabel)}</div>
        </div>`;
        })
            .join("");
    }
    renderDonateAddresses() {
        const donateRows = [
            { label: "ETH", address: DONATE_ADDRESSES.eth },
            { label: "BTC", address: DONATE_ADDRESSES.btc },
            { label: "SOL", address: DONATE_ADDRESSES.sol },
            { label: "POL", address: DONATE_ADDRESSES.polygon },
            { label: "TRX", address: DONATE_ADDRESSES.tron },
        ];
        return donateRows
            .map((row) => {
            const safeLabel = this.escapeHtml(row.label);
            const safeAddress = this.escapeHtml(row.address);
            const qrData = encodeURIComponent(row.address);
            const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=168x168&margin=0&data=${qrData}`;
            return `<button class="donate-address-chip" type="button" data-donate-address="${safeAddress}" title="Click to copy ${safeLabel} address">
          <span class="donate-chip-label">${safeLabel}</span>
          <span class="donate-chip-value">${safeAddress}</span>
          <span class="donate-qr-tooltip" role="tooltip">
            <img class="donate-qr-img" src="${qrSrc}" alt="${safeLabel} QR code" />
            <span class="donate-qr-caption">${safeLabel} QR</span>
          </span>
        </button>`;
        })
            .join("");
    }
    getHtml(webview, state, registry, uiTheme) {
        const nonce = Date.now().toString();
        const isDisconnected = !state.connected;
        const modeColor = isDisconnected
            ? "#94a3b8"
            : state.mode === "real"
                ? "#ef4444"
                : "#a855f7";
        const modeColorAlt = isDisconnected
            ? "#64748b"
            : state.mode === "real"
                ? "#f97316"
                : "#7c3aed";
        const modeSurface = isDisconnected
            ? "#94a3b822"
            : state.mode === "real"
                ? "#ef444422"
                : "#a855f722";
        const modeBorder = isDisconnected
            ? "#94a3b866"
            : state.mode === "real"
                ? "#ef444488"
                : "#a855f788";
        const statusColor = state.connected ? modeColor : "#64748b";
        const statusLabel = state.connected ? "Connected" : "Disconnected";
        const modeLabel = state.mode === "real" ? "PRD / REAL" : "DEV / TEST";
        const providerBrand = PROVIDER_BRANDS[state.provider] ?? FALLBACK_BRAND;
        const networkBrand = NETWORK_BRANDS[state.chain] ?? FALLBACK_BRAND;
        const providerLogoUri = this.getProviderLogoSrc(webview, state.provider);
        const networkLogoUri = this.getNetworkLogoSrc(webview, state.chain);
        const donateIconUri = webview
            .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "icon.svg"))
            .toString();
        const balanceButtonHtml = state.mode === "real"
            ? '<button class="btn btn-secondary" id="balanceBtn">Check Balance</button>'
            : "";
        const realRegistry = registry.filter((entry) => entry.mode === "real");
        const testRegistry = registry.filter((entry) => entry.mode === "test");
        const realRegistryHtml = this.renderRegistryItems(realRegistry);
        const testRegistryHtml = this.renderRegistryItems(testRegistry);
        const donateAddressesHtml = this.renderDonateAddresses();
        const balanceReportCount = this.getBalanceReport().length;
        const contractReportCount = this.getContractReport().length;
        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src https:;" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vaporwave Wallet Lab</title>
    <style>
      :root {
        --panel-bg: rgba(9, 16, 32, 0.74);
        --panel-border: rgba(74, 101, 150, 0.45);
        --panel-shadow: 0 10px 24px rgba(2, 6, 23, 0.45);
        --text-primary: #eaf0ff;
        --text-secondary: #9aa8c7;
        --address-color: #facc15;
        --accent-primary: #ff8a1f;
        --accent-primary-hover: #ff9e45;
        --accent-info: #31b8ff;
        --accent-success: #21c77a;
        --accent-danger: #ff5d6e;
      }
      body.ui-theme-calm-light {
        --panel-bg: rgba(233, 237, 246, 0.78);
        --panel-border: rgba(189, 200, 221, 0.75);
        --panel-shadow: 0 8px 22px rgba(131, 146, 176, 0.25);
        --text-primary: #253044;
        --text-secondary: #5f6f8e;
        --address-color: #b7791f;
        --accent-primary: #d89a2b;
        --accent-primary-hover: #e5ad43;
        --accent-info: #3f8ac9;
        --accent-success: #2f9a72;
        --accent-danger: #d0646f;
      }
      body.ui-theme-neon {
        --panel-bg: rgba(18, 10, 40, 0.78);
        --panel-border: rgba(143, 87, 255, 0.56);
        --panel-shadow: 0 10px 26px rgba(71, 27, 143, 0.45);
        --text-primary: #f2e9ff;
        --text-secondary: #b9a7de;
        --address-color: #fbbf24;
        --accent-primary: #ff8a1f;
        --accent-primary-hover: #ffb13e;
        --accent-info: #3fe8ff;
        --accent-success: #27e49f;
        --accent-danger: #ff6ea6;
      }
      body.ui-theme-btc-dawn-light {
        --panel-bg: rgba(248, 244, 235, 0.88);
        --panel-border: rgba(211, 187, 147, 0.85);
        --panel-shadow: 0 8px 22px rgba(152, 128, 85, 0.2);
        --text-primary: #2f281d;
        --text-secondary: #7c6a4d;
        --address-color: #a16207;
        --accent-primary: #d1942f;
        --accent-primary-hover: #dfaa4f;
        --accent-info: #4a8ea5;
        --accent-success: #3b9d6c;
        --accent-danger: #c16666;
      }
      body {
        font-family: var(--vscode-font-family);
        margin: 0;
        padding: 10px;
        background: radial-gradient(circle at top, #1b2340 0%, #0d1428 50%, #0a1020 100%);
        color: var(--text-primary);
        line-height: 1.35;
      }
      .card {
        border: 1px solid var(--panel-border);
        border-radius: 12px;
        padding: 10px;
        background: linear-gradient(180deg, ${modeSurface} 0%, var(--panel-bg) 100%);
        margin-bottom: 10px;
        box-shadow: 0 14px 30px rgba(2, 6, 23, 0.55), inset 0 0 0 1px rgba(94, 129, 193, 0.24);
      }
      .wallet-card {
        padding: 8px;
        margin-bottom: 8px;
      }
      .label {
        font-size: 10px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #f8bf54;
        font-weight: 700;
      }
      .wallet-card .label {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 3px 8px;
        letter-spacing: 0.1em;
        background: rgba(248, 191, 84, 0.16);
        border: 1px solid rgba(248, 191, 84, 0.36);
        box-shadow: 0 0 0 1px rgba(248, 191, 84, 0.1) inset;
      }
      .value {
        margin-top: 5px;
        font-size: 12px;
        word-break: break-all;
        color: #f8fafc;
      }
      .wallet-address {
        color: var(--address-color);
      }
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        margin-top: 10px;
      }
      .meta-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .meta-title {
        font-size: 10px;
        color: var(--text-secondary);
        letter-spacing: 0.06em;
      }
      .meta-brand {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 8px 3px 4px;
        border-radius: 999px;
        border: 1px solid transparent;
        font-size: 10px;
        font-weight: 700;
      }
      .meta-logo {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        font-weight: 800;
        letter-spacing: 0.04em;
        border: 1px solid transparent;
      }
      .meta-logo-img {
        width: 12px;
        height: 12px;
        object-fit: contain;
        display: block;
      }
      .meta-logo-fallback-hidden {
        display: none;
      }
      .btn-icon {
        width: 13px;
        height: 13px;
        object-fit: contain;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
      .status {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        font-size: 11px;
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${statusColor};
      }
      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 7px;
        overflow: visible;
      }
      .btn {
        border: none;
        border-radius: 9px;
        padding: 8px 9px;
        margin-top: 0;
        font-size: 11px;
        cursor: pointer;
        font-weight: 600;
        transition: transform 0.12s ease, filter 0.12s ease, background 0.12s ease;
      }
      .btn:hover {
        filter: brightness(1.08);
      }
      .btn:active {
        transform: translateY(1px);
      }
      .btn-wide {
        grid-column: 1 / -1;
      }
      .btn-primary {
        background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-primary-hover) 100%);
        color: #ffffff;
        box-shadow: 0 0 0 1px rgba(255, 183, 86, 0.25) inset;
      }
      .btn-secondary {
        background: rgba(120, 141, 180, 0.18);
        color: #f1f5ff;
      }
      .donate-menu {
        position: relative;
      }
      .donate-menu .btn {
        width: 100%;
      }
      .donate-flyout {
        position: absolute;
        right: 0;
        top: calc(100% + 8px);
        width: 290px;
        border: 1px solid rgba(250, 204, 21, 0.45);
        border-radius: 10px;
        padding: 8px;
        background: rgba(8, 13, 28, 0.97);
        box-shadow: 0 14px 26px rgba(2, 6, 23, 0.62);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-4px) scale(0.98);
        transition: opacity 0.12s ease, transform 0.12s ease;
        z-index: 70;
      }
      .donate-menu:hover .donate-flyout,
      .donate-menu:focus-within .donate-flyout {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0) scale(1);
      }
      .donate-flyout-title {
        font-size: 9px;
        letter-spacing: 0.08em;
        color: #fde68a;
        text-transform: uppercase;
        margin-bottom: 6px;
      }
      .hint {
        margin-top: 8px;
        font-size: 10px;
        color: #94a3b8;
      }
      .donate-address-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 6px;
      }
      .donate-address-chip {
        position: relative;
        border: 1px solid rgba(250, 204, 21, 0.4);
        border-radius: 8px;
        background: rgba(250, 204, 21, 0.08);
        color: #f8fafc;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 6px 8px;
        width: 100%;
        cursor: pointer;
        text-align: left;
      }
      .donate-chip-label {
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: #f8bf54;
        min-width: 28px;
      }
      .donate-chip-value {
        font-size: 10px;
        color: var(--address-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .donate-qr-tooltip {
        position: absolute;
        right: 0;
        bottom: calc(100% + 8px);
        opacity: 0;
        pointer-events: none;
        transform: translateY(6px) scale(0.96);
        transition: opacity 0.12s ease, transform 0.12s ease;
        border: 1px solid rgba(250, 204, 21, 0.5);
        border-radius: 10px;
        padding: 7px;
        background: rgba(8, 13, 28, 0.96);
        box-shadow: 0 14px 26px rgba(2, 6, 23, 0.62);
        z-index: 50;
      }
      .donate-address-chip:hover .donate-qr-tooltip,
      .donate-address-chip:focus-visible .donate-qr-tooltip {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .donate-qr-img {
        width: 120px;
        height: 120px;
        display: block;
        border-radius: 6px;
        background: #ffffff;
      }
      .donate-qr-caption {
        margin-top: 5px;
        display: block;
        font-size: 9px;
        color: #fde68a;
        text-align: center;
      }
      .market-wrap {
        margin-top: 10px;
        border: 1px solid var(--panel-border);
        border-radius: 12px;
        padding: 10px;
        background: linear-gradient(180deg, rgba(2, 6, 23, 0.62) 0%, rgba(15, 23, 42, 0.3) 100%);
        box-shadow: var(--panel-shadow);
      }
      .market-title {
        font-size: 10px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #f8bf54;
        font-weight: 700;
      }
      .market-subtitle {
        margin-top: 4px;
        font-size: 10px;
        color: var(--text-secondary);
      }
      .market-tools {
        margin-top: 9px;
        display: flex;
        gap: 6px;
      }
      .market-input {
        flex: 1;
        border-radius: 9px;
        border: 1px solid rgba(98, 129, 188, 0.45);
        background: rgba(10, 18, 36, 0.78);
        color: var(--text-primary);
        padding: 6px 8px;
        font-size: 10px;
      }
      .market-input::placeholder {
        color: var(--text-secondary);
      }
      .market-hint {
        margin-top: 6px;
        font-size: 10px;
        color: var(--text-secondary);
      }
      .bubble-grid {
        margin-top: 9px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .bubble {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        padding: 6px 10px;
        font-size: 10px;
        font-weight: 700;
        border: 1px solid rgba(148, 163, 184, 0.35);
        background: rgba(15, 23, 42, 0.7);
        color: #e2e8f0;
      }
      .bubble-remove {
        width: 16px;
        height: 16px;
        border: 0;
        border-radius: 999px;
        padding: 0;
        cursor: pointer;
        font-size: 11px;
        line-height: 1;
        font-weight: 700;
        background: rgba(2, 6, 23, 0.5);
        color: currentColor;
      }
      .bubble-remove:hover {
        background: rgba(2, 6, 23, 0.75);
      }
      .bubble-up {
        border-color: #21c77a99;
        background: #21c77a22;
        color: #94f4c5;
      }
      .bubble-down {
        border-color: #ff5d6e99;
        background: #ff5d6e1f;
        color: #ffb6bf;
      }
      .market-error {
        margin-top: 6px;
        font-size: 10px;
        color: #ffb6bf;
      }
      .chart-wrap {
        margin-top: 10px;
        border: 1px solid rgba(98, 129, 188, 0.35);
        border-radius: 10px;
        padding: 8px;
        background: rgba(10, 18, 36, 0.72);
      }
      .chart-tools {
        display: flex;
        gap: 6px;
        align-items: center;
      }
      .chart-select {
        flex: 1;
        border-radius: 8px;
        border: 1px solid rgba(98, 129, 188, 0.45);
        background: rgba(12, 21, 42, 0.85);
        color: var(--text-primary);
        padding: 5px 8px;
        font-size: 10px;
      }
      .chart-surface {
        margin-top: 8px;
        height: 90px;
        border-radius: 8px;
        border: 1px solid rgba(98, 129, 188, 0.25);
        background: linear-gradient(180deg, rgba(20, 37, 70, 0.5) 0%, rgba(8, 16, 30, 0.75) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .chart-empty {
        font-size: 10px;
        color: var(--text-secondary);
      }
      .chart-svg {
        width: 100%;
        height: 100%;
      }
      .chart-path {
        fill: none;
        stroke: var(--accent-info);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .chart-path-down {
        stroke: var(--accent-danger);
      }
      .registry-wrap {
        margin-top: 10px;
        border: 1px solid var(--panel-border);
        border-radius: 12px;
        padding: 10px;
        background: linear-gradient(180deg, rgba(2, 6, 23, 0.62) 0%, rgba(15, 23, 42, 0.3) 100%);
        box-shadow: var(--panel-shadow);
      }
      .registry-toolbar {
        margin-top: 9px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
      }
      .registry-format-select {
        border-radius: 8px;
        border: 1px solid rgba(98, 129, 188, 0.45);
        background: rgba(10, 18, 36, 0.78);
        color: var(--text-primary);
        padding: 6px 8px;
        font-size: 10px;
      }
      .registry-tabs {
        margin-top: 10px;
        display: inline-flex;
        gap: 6px;
        padding: 3px;
        border-radius: 999px;
        background: rgba(66, 87, 125, 0.25);
      }
      .registry-tab {
        border: 0;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 10px;
        font-weight: 700;
        color: #d7e2fb;
        background: transparent;
        cursor: pointer;
      }
      .registry-tab.active {
        background: rgba(49, 184, 255, 0.22);
        color: #dff4ff;
        box-shadow: 0 0 0 1px rgba(49, 184, 255, 0.35) inset;
      }
      .registry-grid {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
      }
      .registry-column.hidden {
        display: none;
      }
      .registry-column {
        border: 1px solid rgba(148, 163, 184, 0.3);
        border-radius: 8px;
        padding: 6px;
        background: rgba(2, 6, 23, 0.45);
      }
      .registry-title {
        font-size: 10px;
        letter-spacing: 0.06em;
        color: #d9e3f8;
        text-transform: uppercase;
      }
      .registry-list {
        margin-top: 6px;
        max-height: 140px;
        overflow-y: auto;
        display: grid;
        gap: 6px;
      }
      .registry-item {
        border-radius: 6px;
        padding: 6px 7px;
        border: 1px solid rgba(148, 163, 184, 0.25);
        background: rgba(15, 23, 42, 0.65);
      }
      .registry-item-main {
        font-size: 10px;
        font-weight: 700;
        color: var(--address-color);
        word-break: break-all;
      }
      .registry-item-meta {
        margin-top: 3px;
        font-size: 9px;
        color: var(--text-secondary);
      }
      .registry-empty {
        font-size: 10px;
        color: var(--text-secondary);
        padding: 2px 0;
      }
      .env-banner {
        margin-bottom: 10px;
        border-radius: 10px;
        padding: 6px 9px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        color: #f8bf54;
        border: 1px solid rgba(248, 191, 84, 0.45);
        background: rgba(248, 191, 84, 0.1);
        box-shadow: var(--panel-shadow);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .theme-picker {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .theme-picker-label {
        font-size: 10px;
        color: var(--text-secondary);
        letter-spacing: 0.04em;
      }
      .theme-picker-select {
        border-radius: 7px;
        border: 1px solid rgba(248, 191, 84, 0.45);
        padding: 4px 6px;
        font-size: 10px;
        background: rgba(12, 18, 36, 0.75);
        color: var(--text-primary);
      }
      .mode-badge {
        display: inline-flex;
        align-items: center;
        margin-top: 9px;
        border-radius: 999px;
        padding: 3px 8px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.06em;
        color: #ffd48b;
        border: 1px solid rgba(255, 212, 139, 0.65);
        background: rgba(255, 212, 139, 0.15);
      }
      .ui-theme-calm-light {
        background: radial-gradient(circle at top, #eef2fa 0%, #e8edf7 54%, #e1e8f3 100%);
      }
      .ui-theme-calm-light .card,
      .ui-theme-calm-light .market-wrap,
      .ui-theme-calm-light .registry-wrap {
        background: linear-gradient(180deg, rgba(246, 249, 255, 0.95) 0%, rgba(239, 244, 252, 0.92) 100%);
        border-color: rgba(171, 186, 214, 0.9);
      }
      .ui-theme-calm-light .label,
      .ui-theme-calm-light .market-title {
        color: #b7791f;
      }
      .ui-theme-calm-light .value {
        color: #1f2937;
      }
      .ui-theme-calm-light .hint {
        color: #5f6f8e;
      }
      .ui-theme-calm-light .donate-address-chip {
        background: rgba(206, 159, 72, 0.12);
        border-color: rgba(190, 142, 54, 0.5);
        color: #253044;
      }
      .ui-theme-calm-light .donate-flyout {
        background: rgba(245, 248, 255, 0.98);
        border-color: rgba(190, 142, 54, 0.55);
      }
      .ui-theme-calm-light .donate-flyout-title {
        color: #8a5a10;
      }
      .ui-theme-calm-light .donate-chip-label {
        color: #8a5a10;
      }
      .ui-theme-calm-light .donate-qr-tooltip {
        background: rgba(245, 248, 255, 0.98);
        border-color: rgba(190, 142, 54, 0.55);
      }
      .ui-theme-calm-light .donate-qr-caption {
        color: #8a5a10;
      }
      .ui-theme-calm-light .btn-secondary {
        background: rgba(111, 132, 171, 0.2);
        color: #273550;
      }
      .ui-theme-calm-light .market-input,
      .ui-theme-calm-light .chart-select,
      .ui-theme-calm-light .registry-format-select,
      .ui-theme-calm-light .theme-picker-select {
        background: rgba(245, 248, 255, 0.95);
        border-color: rgba(169, 184, 212, 0.9);
        color: #253044;
      }
      .ui-theme-calm-light .bubble {
        background: rgba(236, 242, 250, 0.96);
        color: #2a364e;
        border-color: rgba(159, 177, 208, 0.65);
      }
      .ui-theme-calm-light .bubble-remove {
        background: rgba(187, 201, 226, 0.45);
      }
      .ui-theme-calm-light .chart-wrap,
      .ui-theme-calm-light .registry-column,
      .ui-theme-calm-light .registry-item,
      .ui-theme-calm-light .chart-surface {
        background: rgba(240, 245, 253, 0.94);
        border-color: rgba(169, 184, 212, 0.8);
      }
      .ui-theme-calm-light .env-banner {
        color: #8a5a10;
        border-color: rgba(205, 159, 72, 0.65);
        background: rgba(247, 233, 199, 0.72);
      }
      .ui-theme-calm-light .mode-badge {
        color: #865518;
        border-color: rgba(190, 142, 54, 0.72);
        background: rgba(241, 210, 146, 0.42);
      }
      .ui-theme-btc-dawn-light {
        background: radial-gradient(circle at top, #f6efe2 0%, #f3eadb 54%, #ece1cf 100%);
      }
      .ui-theme-btc-dawn-light .card,
      .ui-theme-btc-dawn-light .market-wrap,
      .ui-theme-btc-dawn-light .registry-wrap {
        background: linear-gradient(180deg, rgba(252, 248, 240, 0.96) 0%, rgba(247, 241, 229, 0.93) 100%);
        border-color: rgba(206, 180, 141, 0.92);
      }
      .ui-theme-btc-dawn-light .label,
      .ui-theme-btc-dawn-light .market-title {
        color: #b1741a;
      }
      .ui-theme-btc-dawn-light .value {
        color: #2b241a;
      }
      .ui-theme-btc-dawn-light .hint {
        color: #7b6a4f;
      }
      .ui-theme-btc-dawn-light .donate-address-chip {
        background: rgba(195, 147, 61, 0.12);
        border-color: rgba(185, 137, 57, 0.5);
        color: #2f281d;
      }
      .ui-theme-btc-dawn-light .donate-flyout {
        background: rgba(251, 246, 237, 0.98);
        border-color: rgba(185, 137, 57, 0.58);
      }
      .ui-theme-btc-dawn-light .donate-flyout-title {
        color: #7b4f14;
      }
      .ui-theme-btc-dawn-light .donate-chip-label {
        color: #8a5a10;
      }
      .ui-theme-btc-dawn-light .donate-qr-tooltip {
        background: rgba(251, 246, 237, 0.98);
        border-color: rgba(185, 137, 57, 0.58);
      }
      .ui-theme-btc-dawn-light .donate-qr-caption {
        color: #7b4f14;
      }
      .ui-theme-btc-dawn-light .btn-secondary {
        background: rgba(170, 143, 103, 0.24);
        color: #3a2e1f;
      }
      .ui-theme-btc-dawn-light .market-input,
      .ui-theme-btc-dawn-light .chart-select,
      .ui-theme-btc-dawn-light .registry-format-select,
      .ui-theme-btc-dawn-light .theme-picker-select {
        background: rgba(251, 246, 237, 0.97);
        border-color: rgba(198, 171, 130, 0.92);
        color: #2f281d;
      }
      .ui-theme-btc-dawn-light .bubble {
        background: rgba(244, 236, 224, 0.95);
        color: #463a2b;
        border-color: rgba(186, 162, 124, 0.72);
      }
      .ui-theme-btc-dawn-light .bubble-remove {
        background: rgba(213, 190, 153, 0.45);
      }
      .ui-theme-btc-dawn-light .chart-wrap,
      .ui-theme-btc-dawn-light .registry-column,
      .ui-theme-btc-dawn-light .registry-item,
      .ui-theme-btc-dawn-light .chart-surface {
        background: rgba(246, 239, 227, 0.93);
        border-color: rgba(195, 170, 131, 0.84);
      }
      .ui-theme-btc-dawn-light .env-banner {
        color: #8a5a10;
        border-color: rgba(195, 147, 61, 0.66);
        background: rgba(247, 227, 188, 0.7);
      }
      .ui-theme-btc-dawn-light .mode-badge {
        color: #84541a;
        border-color: rgba(185, 137, 57, 0.72);
        background: rgba(239, 208, 144, 0.44);
      }
      .ui-theme-btc-dawn-light .meta-brand {
        color: #3a3023 !important;
        border-color: rgba(188, 162, 123, 0.9) !important;
        background: rgba(243, 234, 218, 0.95) !important;
      }
      .ui-theme-btc-dawn-light .meta-logo {
        color: #3a3023 !important;
        border-color: rgba(188, 162, 123, 0.9) !important;
        background: rgba(224, 206, 176, 0.95) !important;
      }
      .ui-theme-calm-light .meta-brand {
        color: #2a3853 !important;
        border-color: rgba(149, 170, 206, 0.9) !important;
        background: rgba(228, 236, 250, 0.95) !important;
      }
      .ui-theme-calm-light .meta-logo {
        color: #2a3853 !important;
        border-color: rgba(149, 170, 206, 0.9) !important;
        background: rgba(205, 219, 243, 0.95) !important;
      }
    </style>
  </head>
  <body class="ui-theme-${uiTheme}">
    <div class="env-banner">
      <span>ENVIRONMENT: ${modeLabel}</span>
      <span class="theme-picker">
        <span class="theme-picker-label">Theme</span>
        <select class="theme-picker-select" id="uiThemeSelect">
          <option value="pro">Pro Studio</option>
          <option value="calm-light">Calm Light BTC</option>
          <option value="btc-dawn-light">BTC Dawn Light</option>
          <option value="neon">Neon Focus</option>
        </select>
      </span>
    </div>
    <div class="card wallet-card">
      <div class="label">Wallet Lab</div>
      <div class="status">
        <span class="dot"></span>
        <span>${statusLabel}</span>
      </div>
      <div class="value ${state.connected ? "wallet-address" : ""}">${state.connected ? state.address : "No wallet connected"}</div>
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-title">NETWORK</span>
          <span class="meta-brand" style="background:${networkBrand.bg}; border-color:${networkBrand.border}; color:${networkBrand.fg};">
            <span class="meta-logo" style="background:${networkBrand.border}; border-color:${networkBrand.fg}; color:${networkBrand.fg};">${networkLogoUri ? `<img class="meta-logo-img" src="${networkLogoUri}" alt="${this.escapeHtml(networkBrand.label)} logo" />` : ""}<span class="${networkLogoUri ? "meta-logo-fallback-hidden" : ""}">${networkBrand.mark}</span></span>
            ${networkBrand.label}
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-title">WALLET</span>
          <span class="meta-brand" style="background:${providerBrand.bg}; border-color:${providerBrand.border}; color:${providerBrand.fg};">
            <span class="meta-logo" style="background:${providerBrand.border}; border-color:${providerBrand.fg}; color:${providerBrand.fg};">${providerLogoUri ? `<img class="meta-logo-img" src="${providerLogoUri}" alt="${this.escapeHtml(providerBrand.label)} logo" />` : ""}<span class="${providerLogoUri ? "meta-logo-fallback-hidden" : ""}">${providerBrand.mark}</span></span>
            ${providerBrand.label}
          </span>
        </div>
      </div>
      <div class="mode-badge">Mode: ${modeLabel}</div>
    </div>

    <div class="actions">
      <button class="btn btn-primary btn-wide" id="connectBtn">Connect Wallet</button>
      <button class="btn btn-secondary" id="contractCheckBtn">Contract Check</button>
      ${balanceButtonHtml}
      <button class="btn btn-secondary" id="openProviderBtn">Wallet Site</button>
      <div class="donate-menu">
        <button class="btn btn-secondary" id="donateBtn"><img class="btn-icon" src="${donateIconUri}" alt="Donate" />Donate</button>
        <div class="donate-flyout" aria-label="Donate addresses and QR codes">
          <div class="donate-flyout-title">Hover address for QR | Click to copy</div>
          <div class="donate-address-grid">${donateAddressesHtml}</div>
        </div>
      </div>
      <button class="btn btn-secondary" id="copyBtn">Copy Address</button>
      <button class="btn btn-secondary" id="disconnectBtn">Disconnect</button>
    </div>

    <p class="hint">
      Built for Web3 devs, AI agents, and human testers. Use real wallets safely or generate test addresses in seconds.
    </p>

    <div class="market-wrap">
      <div class="market-title">Crypto Market Snapshot</div>
      <div class="market-subtitle" id="marketTimestamp">Loading live prices...</div>
      <div class="market-tools">
        <input class="market-input" id="marketSearchInput" placeholder="Search coin (BTC, ETH, DOGE, xrp, cardano...)" />
        <button class="btn btn-secondary" id="marketSearchBtn">Add</button>
      </div>
      <div class="market-hint">Tip: you can type symbol or CoinGecko id.</div>
      <div class="bubble-grid" id="marketBubbles"></div>
      <div class="market-error" id="marketError" style="display:none;"></div>
      <div class="chart-wrap">
        <div class="chart-tools">
          <select class="chart-select" id="chartCoinSelect"></select>
          <button class="btn btn-secondary" id="chartRefreshBtn">Chart</button>
        </div>
        <div class="chart-surface" id="priceChartSurface">
          <div class="chart-empty">Loading chart...</div>
        </div>
      </div>
    </div>

    <div class="registry-wrap">
      <div class="market-title">Wallet Registry</div>
      <div class="market-subtitle">Real and test addresses used in this tool.</div>
      <div class="registry-toolbar">
        <button class="btn btn-secondary" id="checkRegistryBalancesBtn">Check Real Balances</button>
        <select class="registry-format-select" id="registryExportFormatSelect" aria-label="Registry export format">
          <option value="txt">TXT</option>
          <option value="csv">CSV</option>
        </select>
        <button class="btn btn-secondary" id="exportRegistryBtn">Export Registry</button>
        <button class="btn btn-secondary" id="exportBalanceBtn">Export Balance</button>
        <button class="btn btn-secondary" id="exportContractBtn">Export Contract</button>
        <button class="btn btn-secondary" id="clearRegistryBtn">Clear List</button>
      </div>
      <div class="market-hint">Last balance report rows: ${balanceReportCount} | Last contract report rows: ${contractReportCount}</div>
      <div class="registry-tabs">
        <button class="registry-tab active" id="registryTabReal">Real</button>
        <button class="registry-tab" id="registryTabTest">Test</button>
      </div>
      <div class="registry-grid">
        <div class="registry-column" id="registryPanelReal">
          <div class="registry-title">Real Wallets (${realRegistry.length})</div>
          <div class="registry-list">${realRegistryHtml}</div>
        </div>
        <div class="registry-column hidden" id="registryPanelTest">
          <div class="registry-title">Test Wallets (${testRegistry.length})</div>
          <div class="registry-list">${testRegistryHtml}</div>
        </div>
      </div>
    </div>

    <script nonce="${nonce}">
      const vscode = acquireVsCodeApi();
      const currentUiTheme = '${uiTheme}';
      document.getElementById('connectBtn').addEventListener('click', () => vscode.postMessage({ command: 'connect' }));
      document.getElementById('contractCheckBtn').addEventListener('click', () => vscode.postMessage({ command: 'contractCheck' }));
      const balanceBtn = document.getElementById('balanceBtn');
      if (balanceBtn) {
        balanceBtn.addEventListener('click', () => vscode.postMessage({ command: 'balanceCheck' }));
      }
      document.getElementById('openProviderBtn').addEventListener('click', () => vscode.postMessage({ command: 'openProvider' }));
      document.getElementById('donateBtn').addEventListener('click', () => vscode.postMessage({ command: 'donate' }));
      document.querySelectorAll('[data-donate-address]').forEach((el) => {
        el.addEventListener('click', () => {
          const address = el.getAttribute('data-donate-address') || '';
          vscode.postMessage({ command: 'copyDonateAddress', address });
        });
      });
      document.getElementById('copyBtn').addEventListener('click', () => vscode.postMessage({ command: 'copy' }));
      document.getElementById('disconnectBtn').addEventListener('click', () => vscode.postMessage({ command: 'disconnect' }));
      document.getElementById('checkRegistryBalancesBtn').addEventListener('click', () => vscode.postMessage({ command: 'checkRegistryRealBalances' }));
      const registryExportFormatSelectEl = document.getElementById('registryExportFormatSelect');
      document.getElementById('exportRegistryBtn').addEventListener('click', () => {
        const isCsv = registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportRegistryCsv' : 'exportRegistryTxt' });
      });
      document.getElementById('exportBalanceBtn').addEventListener('click', () => {
        const isCsv = registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportRegistryBalancesCsv' : 'exportRegistryBalancesTxt' });
      });
      document.getElementById('exportContractBtn').addEventListener('click', () => {
        const isCsv = registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportContractReportCsv' : 'exportContractReportTxt' });
      });
      document.getElementById('clearRegistryBtn').addEventListener('click', () => vscode.postMessage({ command: 'clearRegistry' }));
      const uiThemeSelectEl = document.getElementById('uiThemeSelect');

      document.querySelectorAll('.meta-logo-img').forEach((img) => {
        const fallback = img.nextElementSibling;
        img.addEventListener('error', () => {
          img.style.display = 'none';
          if (fallback) {
            fallback.classList.remove('meta-logo-fallback-hidden');
          }
        });
      });

      uiThemeSelectEl.value = currentUiTheme;
      uiThemeSelectEl.addEventListener('change', () => {
        vscode.postMessage({ command: 'setUiTheme', themeId: uiThemeSelectEl.value });
      });

      const registryTabRealEl = document.getElementById('registryTabReal');
      const registryTabTestEl = document.getElementById('registryTabTest');
      const registryPanelRealEl = document.getElementById('registryPanelReal');
      const registryPanelTestEl = document.getElementById('registryPanelTest');

      function setRegistryTab(active) {
        const showReal = active === 'real';
        registryTabRealEl.classList.toggle('active', showReal);
        registryTabTestEl.classList.toggle('active', !showReal);
        registryPanelRealEl.classList.toggle('hidden', !showReal);
        registryPanelTestEl.classList.toggle('hidden', showReal);
      }

      registryTabRealEl.addEventListener('click', () => setRegistryTab('real'));
      registryTabTestEl.addEventListener('click', () => setRegistryTab('test'));

      const defaultMarketConfig = [
        { id: 'bitcoin', symbol: 'BTC' },
        { id: 'ethereum', symbol: 'ETH' },
        { id: 'solana', symbol: 'SOL' },
        { id: 'binancecoin', symbol: 'BNB' },
        { id: 'matic-network', symbol: 'POL' },
        { id: 'tron', symbol: 'TRX' }
      ];

      const marketConfig = [...defaultMarketConfig];

      const coinAliases = {
        btc: 'bitcoin',
        eth: 'ethereum',
        sol: 'solana',
        bnb: 'binancecoin',
        doge: 'dogecoin',
        xrp: 'ripple',
        ada: 'cardano',
        trx: 'tron',
        tron: 'tron',
        avax: 'avalanche-2',
        matic: 'matic-network',
        polygon: 'matic-network',
        pol: 'matic-network',
        link: 'chainlink',
        dot: 'polkadot'
      };

      const symbolById = {
        bitcoin: 'BTC',
        ethereum: 'ETH',
        solana: 'SOL',
        binancecoin: 'BNB',
        dogecoin: 'DOGE',
        ripple: 'XRP',
        cardano: 'ADA',
        tron: 'TRX',
        'avalanche-2': 'AVAX',
        'matic-network': 'POL',
        chainlink: 'LINK',
        polkadot: 'DOT'
      };

      const coinCapIdByCoinGeckoId = {
        bitcoin: 'bitcoin',
        ethereum: 'ethereum',
        solana: 'solana',
        binancecoin: 'binance-coin',
        dogecoin: 'dogecoin',
        ripple: 'xrp',
        cardano: 'cardano',
        tron: 'tron',
        'avalanche-2': 'avalanche',
        'matic-network': 'polygon',
        chainlink: 'chainlink',
        polkadot: 'polkadot'
      };

      const binancePairByCoinId = {
        bitcoin: 'BTCUSDT',
        ethereum: 'ETHUSDT',
        solana: 'SOLUSDT',
        binancecoin: 'BNBUSDT',
        dogecoin: 'DOGEUSDT',
        ripple: 'XRPUSDT',
        cardano: 'ADAUSDT',
        tron: 'TRXUSDT',
        'avalanche-2': 'AVAXUSDT',
        'matic-network': 'POLUSDT',
        chainlink: 'LINKUSDT',
        polkadot: 'DOTUSDT'
      };

      const marketBubblesEl = document.getElementById('marketBubbles');
      const marketTimestampEl = document.getElementById('marketTimestamp');
      const marketErrorEl = document.getElementById('marketError');
      const marketSearchInputEl = document.getElementById('marketSearchInput');
      const marketSearchBtnEl = document.getElementById('marketSearchBtn');
      const chartCoinSelectEl = document.getElementById('chartCoinSelect');
      const chartRefreshBtnEl = document.getElementById('chartRefreshBtn');
      const priceChartSurfaceEl = document.getElementById('priceChartSurface');

      function formatUsd(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: value < 1 ? 6 : 2
        }).format(value);
      }

      function renderBubbles(payload) {
        marketBubblesEl.innerHTML = '';

        marketConfig.forEach((asset) => {
          const data = payload[asset.id];
          if (!data || typeof data.usd !== 'number') {
            return;
          }

          const change = typeof data.usd_24h_change === 'number' ? data.usd_24h_change : 0;
          const bubble = document.createElement('div');
          bubble.className = 'bubble ' + (change >= 0 ? 'bubble-up' : 'bubble-down');

          const changePrefix = change >= 0 ? '+' : '';
          const content = document.createElement('span');
          content.textContent = asset.symbol + ' ' + formatUsd(data.usd) + ' (' + changePrefix + change.toFixed(2) + '%)';

          const removeBtn = document.createElement('button');
          removeBtn.className = 'bubble-remove';
          removeBtn.type = 'button';
          removeBtn.title = 'Remove coin bubble';
          removeBtn.textContent = '×';
          removeBtn.addEventListener('click', () => {
            const index = marketConfig.findIndex((entry) => entry.id === asset.id);
            if (index >= 0) {
              marketConfig.splice(index, 1);
              void refreshMarketBubbles();
            }
          });

          bubble.appendChild(content);
          bubble.appendChild(removeBtn);
          marketBubblesEl.appendChild(bubble);
        });

        syncChartOptions();
      }

      function syncChartOptions() {
        const current = chartCoinSelectEl.value;
        chartCoinSelectEl.innerHTML = '';

        marketConfig.forEach((asset) => {
          const option = document.createElement('option');
          option.value = asset.id;
          option.textContent = asset.symbol + ' (' + asset.id + ')';
          chartCoinSelectEl.appendChild(option);
        });

        if (marketConfig.length === 0) {
          return;
        }

        if (marketConfig.some((asset) => asset.id === current)) {
          chartCoinSelectEl.value = current;
          return;
        }

        const btcAsset = marketConfig.find((asset) => asset.id === 'bitcoin');
        chartCoinSelectEl.value = btcAsset ? btcAsset.id : marketConfig[0].id;
      }

      function getChartPairFromAsset(asset) {
        if (!asset) {
          return '';
        }

        const rawId = String(asset.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;

        if (binancePairByCoinId[normalizedId]) {
          return binancePairByCoinId[normalizedId];
        }

        const symbol = String(asset.symbol || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (symbol) {
          return symbol + 'USDT';
        }

        return '';
      }

      function renderChartPlaceholder(message) {
        priceChartSurfaceEl.innerHTML = '<div class="chart-empty">' + message + '</div>';
      }

      function renderSparkline(points) {
        if (!Array.isArray(points) || points.length < 2) {
          renderChartPlaceholder('Not enough chart data');
          return;
        }

        const width = 320;
        const height = 90;
        const min = Math.min(...points);
        const max = Math.max(...points);
        const range = max - min || 1;

        const path = points
          .map((value, index) => {
            const x = (index / (points.length - 1)) * width;
            const y = height - (((value - min) / range) * (height - 10) + 5);
            return (index === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2);
          })
          .join(' ');

        const trendDown = points[points.length - 1] < points[0];
        const pathClass = trendDown ? 'chart-path chart-path-down' : 'chart-path';

        priceChartSurfaceEl.innerHTML =
          '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" aria-label="price chart">'
          + '<path class="' + pathClass + '" d="' + path + '"></path>'
          + '</svg>';
      }

      async function refreshSelectedChart() {
        const selectedId = chartCoinSelectEl.value;
        const selectedAsset = marketConfig.find((asset) => asset.id === selectedId);
        const pair = getChartPairFromAsset(selectedAsset);

        if (!pair) {
          renderChartPlaceholder('Chart unavailable for this asset');
          return;
        }

        try {
          renderChartPlaceholder('Loading chart...');
          const endpoint = 'https://api.binance.com/api/v3/klines?symbol=' + encodeURIComponent(pair) + '&interval=1h&limit=48';
          const payload = await fetchJsonWithRetry(endpoint, 1);

          if (!Array.isArray(payload) || payload.length < 2) {
            throw new Error('No data');
          }

          const closes = payload
            .map((item) => Number(item?.[4]))
            .filter((value) => Number.isFinite(value));

          renderSparkline(closes);
        } catch {
          renderChartPlaceholder('Chart source unavailable now');
        }
      }

      function pickBestCoinMatch(coins, normalized) {
        if (!Array.isArray(coins) || coins.length === 0) {
          return null;
        }

        const ranked = coins
          .map((coin) => {
            const id = String(coin.id || '').toLowerCase();
            const symbol = String(coin.symbol || '').toLowerCase();
            const name = String(coin.name || '').toLowerCase();
            const marketCapRank = typeof coin.market_cap_rank === 'number' ? coin.market_cap_rank : Number.MAX_SAFE_INTEGER;

            let score = 0;
            if (symbol === normalized) {
              score += 100;
            }
            if (id === normalized || id === normalized.replace(/\s+/g, '-')) {
              score += 95;
            }
            if (name === normalized) {
              score += 90;
            }
            if (symbol.startsWith(normalized)) {
              score += 50;
            }
            if (id.includes(normalized)) {
              score += 40;
            }
            if (name.includes(normalized)) {
              score += 35;
            }

            return {
              coin,
              score,
              marketCapRank
            };
          })
          .sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return a.marketCapRank - b.marketCapRank;
          });

        return ranked[0]?.coin ?? null;
      }

      async function resolveCoin(rawQuery) {
        const normalized = rawQuery.trim().toLowerCase();
        if (!normalized) {
          return { id: '', symbol: '', fromAlias: false };
        }

        if (coinAliases[normalized]) {
          const aliasId = coinAliases[normalized];
          return {
            id: aliasId,
            symbol: resolveSymbol(aliasId, normalized),
            fromAlias: true
          };
        }

        try {
          const searchEndpoint = 'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(normalized);
          const searchResponse = await fetch(searchEndpoint, {
            method: 'GET',
            headers: { accept: 'application/json' }
          });

          if (searchResponse.ok) {
            const searchPayload = await searchResponse.json();
            const bestMatch = pickBestCoinMatch(searchPayload?.coins, normalized);
            if (bestMatch && bestMatch.id) {
              return {
                id: bestMatch.id,
                symbol: resolveSymbol(bestMatch.id, bestMatch.symbol || rawQuery),
                fromAlias: false
              };
            }
          }
        } catch {
          // Fallback below when search API is unavailable.
        }

        const fallbackId = normalized.replace(/\s+/g, '-');
        return {
          id: fallbackId,
          symbol: resolveSymbol(fallbackId, rawQuery),
          fromAlias: false
        };
      }

      function buildCandidateIds(rawQuery, resolvedId, fromAlias) {
        const normalized = rawQuery.trim().toLowerCase();
        const candidates = [];

        if (resolvedId) {
          candidates.push(resolvedId);
        }

        if (fromAlias && resolvedId) {
          return [resolvedId];
        }

        if (coinAliases[normalized]) {
          candidates.push(coinAliases[normalized]);
        }

        candidates.push(normalized);
        candidates.push(normalized.replace(/\s+/g, '-'));

        const unique = [];
        for (const id of candidates) {
          const cleaned = (id || '').trim().toLowerCase();
          if (!cleaned) {
            continue;
          }
          if (!unique.includes(cleaned)) {
            unique.push(cleaned);
          }
        }

        return unique;
      }

      async function fetchJsonWithRetry(url, retries) {
        let lastError = null;

        for (let attempt = 0; attempt <= retries; attempt += 1) {
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: { accept: 'application/json' }
            });

            if (!response.ok) {
              throw new Error('HTTP ' + response.status);
            }

            return await response.json();
          } catch (error) {
            lastError = error;
            if (attempt < retries) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        }

        throw lastError instanceof Error ? lastError : new Error('Unknown error');
      }

      function parseCoinCapAsset(asset) {
        const usd = Number(asset?.priceUsd);
        if (!Number.isFinite(usd)) {
          return null;
        }

        const change = Number(asset?.changePercent24Hr);
        return {
          usd,
          usd_24h_change: Number.isFinite(change) ? change : 0
        };
      }

      function parseBinanceTicker(ticker) {
        const usd = Number(ticker?.lastPrice);
        if (!Number.isFinite(usd)) {
          return null;
        }

        const change = Number(ticker?.priceChangePercent);
        return {
          usd,
          usd_24h_change: Number.isFinite(change) ? change : 0
        };
      }

      function pickBestCoinCapMatch(assets, normalized) {
        if (!Array.isArray(assets) || assets.length === 0) {
          return null;
        }

        const ranked = assets
          .map((asset) => {
            const id = String(asset.id || '').toLowerCase();
            const symbol = String(asset.symbol || '').toLowerCase();
            const name = String(asset.name || '').toLowerCase();
            const marketCapUsd = Number(asset.marketCapUsd);

            let score = 0;
            if (symbol === normalized) {
              score += 100;
            }
            if (id === normalized || id === normalized.replace(/\s+/g, '-')) {
              score += 95;
            }
            if (name === normalized) {
              score += 90;
            }
            if (symbol.startsWith(normalized)) {
              score += 55;
            }
            if (id.includes(normalized)) {
              score += 45;
            }
            if (name.includes(normalized)) {
              score += 35;
            }

            return {
              asset,
              score,
              marketCapUsd: Number.isFinite(marketCapUsd) ? marketCapUsd : 0
            };
          })
          .sort((a, b) => {
            if (b.score !== a.score) {
              return b.score - a.score;
            }
            return b.marketCapUsd - a.marketCapUsd;
          });

        return ranked[0]?.asset ?? null;
      }

      async function resolveCoinWithCoinCap(rawQuery) {
        const normalized = rawQuery.trim().toLowerCase();
        if (!normalized) {
          return null;
        }

        const endpoint = 'https://api.coincap.io/v2/assets?search=' + encodeURIComponent(normalized);
        const payload = await fetchJsonWithRetry(endpoint, 1);
        const bestMatch = pickBestCoinCapMatch(payload?.data, normalized);

        if (!bestMatch || !bestMatch.id) {
          return null;
        }

        return {
          id: String(bestMatch.id).toLowerCase(),
          symbol: resolveSymbol(String(bestMatch.id).toLowerCase(), bestMatch.symbol || rawQuery)
        };
      }

      async function fetchCoinCapPriceForAsset(asset) {
        const rawId = String(asset.id || '').toLowerCase();
        const symbolHint = String(asset.symbol || '').toLowerCase();

        const candidateIds = [];
        if (rawId.startsWith('coincap:')) {
          candidateIds.push(rawId.replace('coincap:', ''));
        }
        if (coinCapIdByCoinGeckoId[rawId]) {
          candidateIds.push(coinCapIdByCoinGeckoId[rawId]);
        }
        if (rawId) {
          candidateIds.push(rawId);
        }

        const uniqueIds = [];
        for (const id of candidateIds) {
          const cleaned = String(id || '').trim().toLowerCase();
          if (!cleaned || uniqueIds.includes(cleaned)) {
            continue;
          }
          uniqueIds.push(cleaned);
        }

        for (const candidateId of uniqueIds) {
          try {
            const endpoint = 'https://api.coincap.io/v2/assets/' + encodeURIComponent(candidateId);
            const payload = await fetchJsonWithRetry(endpoint, 1);
            const parsed = parseCoinCapAsset(payload?.data);
            if (parsed) {
              return parsed;
            }
          } catch {
            // Try next candidate id.
          }
        }

        const searchTerm = symbolHint || rawId;
        if (!searchTerm) {
          return null;
        }

        try {
          const searchEndpoint = 'https://api.coincap.io/v2/assets?search=' + encodeURIComponent(searchTerm);
          const searchPayload = await fetchJsonWithRetry(searchEndpoint, 1);
          const bestMatch = pickBestCoinCapMatch(searchPayload?.data, searchTerm.toLowerCase());
          const parsed = parseCoinCapAsset(bestMatch);
          return parsed;
        } catch {
          return null;
        }
      }

      async function fetchCoinCapDataForAssets(assets) {
        const entries = await Promise.all(
          assets.map(async (asset) => {
            const priceData = await fetchCoinCapPriceForAsset(asset);
            return priceData ? [asset.id, priceData] : null;
          })
        );

        return entries.reduce((acc, entry) => {
          if (entry) {
            acc[entry[0]] = entry[1];
          }
          return acc;
        }, {});
      }

      async function fetchBinancePriceForAsset(asset) {
        const rawId = String(asset.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;
        const hintedSymbol = String(asset.symbol || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

        const pairCandidates = [];
        if (binancePairByCoinId[normalizedId]) {
          pairCandidates.push(binancePairByCoinId[normalizedId]);
        }
        if (hintedSymbol) {
          pairCandidates.push(hintedSymbol + 'USDT');
        }

        const uniquePairs = [];
        for (const pair of pairCandidates) {
          const cleaned = String(pair || '').trim().toUpperCase();
          if (!cleaned || uniquePairs.includes(cleaned)) {
            continue;
          }
          uniquePairs.push(cleaned);
        }

        for (const pair of uniquePairs) {
          try {
            const endpoint = 'https://api.binance.com/api/v3/ticker/24hr?symbol=' + encodeURIComponent(pair);
            const payload = await fetchJsonWithRetry(endpoint, 1);
            const parsed = parseBinanceTicker(payload);
            if (parsed) {
              return parsed;
            }
          } catch {
            // Try next pair.
          }
        }

        return null;
      }

      async function fetchFallbackDataForAssets(assets) {
        const fromCoinCap = await fetchCoinCapDataForAssets(assets);
        const missingAfterCoinCap = assets.filter((asset) => {
          const current = fromCoinCap[asset.id];
          return !current || typeof current.usd !== 'number';
        });

        if (missingAfterCoinCap.length === 0) {
          return fromCoinCap;
        }

        const binanceEntries = await Promise.all(
          missingAfterCoinCap.map(async (asset) => {
            const priceData = await fetchBinancePriceForAsset(asset);
            return priceData ? [asset.id, priceData] : null;
          })
        );

        const fromBinance = binanceEntries.reduce((acc, entry) => {
          if (entry) {
            acc[entry[0]] = entry[1];
          }
          return acc;
        }, {});

        return {
          ...fromCoinCap,
          ...fromBinance
        };
      }

      async function resolveCoinWithBinance(rawQuery, resolvedCoin) {
        const candidateIds = buildCandidateIds(rawQuery, resolvedCoin?.id || '', Boolean(resolvedCoin?.fromAlias));

        for (const candidateId of candidateIds) {
          const asset = {
            id: candidateId,
            symbol: resolveSymbol(candidateId, resolvedCoin?.symbol || rawQuery)
          };

          const priceData = await fetchBinancePriceForAsset(asset);
          if (priceData) {
            return {
              id: candidateId,
              symbol: asset.symbol
            };
          }
        }

        return null;
      }

      function resolveSymbol(coinId, rawQuery) {
        if (symbolById[coinId]) {
          return symbolById[coinId];
        }

        const fromQuery = rawQuery.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
        if (fromQuery) {
          return fromQuery.slice(0, 8);
        }

        return coinId.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'COIN';
      }

      async function refreshMarketBubbles() {
        const ids = marketConfig.map((a) => encodeURIComponent(a.id)).join(',');
        const endpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true';

        try {
          marketErrorEl.style.display = 'none';
          const geckoData = await fetchJsonWithRetry(endpoint, 1);
          const mergedData = { ...geckoData };

          const missingAssets = marketConfig.filter((asset) => {
            const current = mergedData[asset.id];
            return !current || typeof current.usd !== 'number';
          });

          if (missingAssets.length > 0) {
            const fallbackData = await fetchFallbackDataForAssets(missingAssets);
            Object.assign(mergedData, fallbackData);
          }

          renderBubbles(mergedData);

          const now = new Date();
          marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString();
        } catch (error) {
          try {
            const fallbackData = await fetchFallbackDataForAssets(marketConfig);
            if (Object.keys(fallbackData).length > 0) {
              renderBubbles(fallbackData);
              const now = new Date();
              marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString() + ' (fallback source)';
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // If fallback also fails, show error below.
          }

          const message = error instanceof Error ? error.message : 'Unknown error';
          marketTimestampEl.textContent = 'Live price unavailable';
          marketErrorEl.style.display = 'block';
          marketErrorEl.textContent = 'Could not load prices now: ' + message;
        }
      }

      async function addAssetFromSearch() {
        const rawQuery = (marketSearchInputEl.value || '').trim();
        if (!rawQuery) {
          return;
        }

        marketSearchBtnEl.disabled = true;

        const resolvedCoin = await resolveCoin(rawQuery);
        const coinId = resolvedCoin.id;
        if (!coinId) {
          marketSearchBtnEl.disabled = false;
          return;
        }

        try {
          marketErrorEl.style.display = 'none';

          const candidateIds = buildCandidateIds(rawQuery, coinId, Boolean(resolvedCoin.fromAlias));
          const idsParam = candidateIds.map((id) => encodeURIComponent(id)).join(',');
          const endpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=' + idsParam + '&vs_currencies=usd&include_24hr_change=true';
          const payload = await fetchJsonWithRetry(endpoint, 1);

          const selectedId = candidateIds.find((id) => payload[id] && typeof payload[id].usd === 'number') || '';
          if (!selectedId) {
            throw new Error('Asset not found (try full name or CoinGecko id)');
          }

          if (!marketConfig.some((asset) => asset.id === selectedId)) {
            marketConfig.push({
              id: selectedId,
              symbol: resolveSymbol(selectedId, resolvedCoin.symbol || rawQuery)
            });
          }

          marketSearchInputEl.value = '';
          await refreshMarketBubbles();
          await refreshSelectedChart();
        } catch (error) {
          try {
            const binanceCoin = await resolveCoinWithBinance(rawQuery, resolvedCoin);
            if (binanceCoin) {
              if (!marketConfig.some((asset) => asset.id === binanceCoin.id)) {
                marketConfig.push({
                  id: binanceCoin.id,
                  symbol: binanceCoin.symbol || resolveSymbol(binanceCoin.id, rawQuery)
                });
              }

              marketSearchInputEl.value = '';
              await refreshMarketBubbles();
              await refreshSelectedChart();
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // Continue to the next fallback.
          }

          try {
            const coinCapCoin = await resolveCoinWithCoinCap(rawQuery);
            if (coinCapCoin) {
              const coincapAssetId = 'coincap:' + coinCapCoin.id;
              if (!marketConfig.some((asset) => asset.id === coincapAssetId)) {
                marketConfig.push({
                  id: coincapAssetId,
                  symbol: coinCapCoin.symbol || resolveSymbol(coincapAssetId, rawQuery)
                });
              }

              marketSearchInputEl.value = '';
              await refreshMarketBubbles();
              await refreshSelectedChart();
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // Surface original error when CoinCap fallback also fails.
          }

          const message = error instanceof Error ? error.message : 'Unknown error';
          marketErrorEl.style.display = 'block';
          marketErrorEl.textContent = 'Could not load this asset from available free APIs: ' + message;
        } finally {
          marketSearchBtnEl.disabled = false;
        }
      }

      marketSearchBtnEl.addEventListener('click', addAssetFromSearch);
      marketSearchInputEl.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          addAssetFromSearch();
        }
      });
      chartRefreshBtnEl.addEventListener('click', refreshSelectedChart);
      chartCoinSelectEl.addEventListener('change', refreshSelectedChart);

      syncChartOptions();
      refreshMarketBubbles();
      refreshSelectedChart();
      setInterval(refreshMarketBubbles, 60000);
      setInterval(refreshSelectedChart, 120000);
    </script>
  </body>
</html>`;
    }
}
//# sourceMappingURL=extension.js.map
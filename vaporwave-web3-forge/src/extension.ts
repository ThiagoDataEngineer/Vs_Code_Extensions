import * as vscode from "vscode";
import { randomBytes } from "crypto";

type WalletState = {
  connected: boolean;
  address: string;
  chain: string;
  provider: string;
  mode: "test" | "real";
};

type UiThemeId = "neon" | "pro" | "calm-light" | "btc-dawn-light" | "bittensor" | "lamberto" | "cobol";

type EditorThemeId =
  | "vaporwave-neon-dusk"
  | "vaporwave-midnight"
  | "bitcoin-sober"
  | "bitcoin-calm-light"
  | "bittensor-signal"
  | "lamberto-shoreline"
  | "cobol-terminal";

type LocaleId = "en" | "pt-BR" | "fr" | "es" | "de" | "ru" | "ja" | "zh" | "ar";

type WalletRegistryEntry = {
  address: string;
  chain: string;
  provider: string;
  mode: "test" | "real";
  source: "manual" | "generated";
  createdAt: string;
};

type RegistryBalanceRow = {
  address: string;
  chain: string;
  provider: string;
  status: "ok" | "error";
  balance: string;
  unit: string;
  endpoint: string;
  error: string;
  checkedAt: string;
};

type ContractVerificationRow = {
  checkedAt: string;
  mode: "test" | "real";
  chain: string;
  walletAddress: string;
  contractAddress: string;
  status: "ok" | "warn" | "error";
  endpoint: string;
  chainId: string;
  codeBytes: number;
  expectedPrefix: string;
  prefixMatched: "yes" | "no" | "na";
  minCodeBytes: number;
  minCodeBytesPassed: "yes" | "no" | "na";
  note: string;
};

type WebviewCommand =
  | "connect"
  | "disconnect"
  | "copy"
  | "openProvider"
  | "donate"
  | "copyDonateAddress"
  | "contractCheck"
  | "balanceCheck"
  | "exportRegistryTxt"
  | "exportRegistryCsv"
  | "clearRegistry"
  | "checkRegistryRealBalances"
  | "exportRegistryBalancesTxt"
  | "exportRegistryBalancesCsv"
  | "exportContractReportTxt"
  | "exportContractReportCsv"
  | "setUiTheme"
  | "setWorkbenchTheme"
  | "setLocale";

type WebviewMessage = {
  command?: WebviewCommand;
  themeId?: string;
  workbenchThemeId?: string;
  localeId?: string;
  address?: string;
};

const DEFAULT_STATE: WalletState = {
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
const LOCALE_KEY = "vaporwaveWeb3.locale";
const WORKBENCH_THEME_KEY = "colorTheme";
const THEME_BOOTSTRAP_DONE_KEY = "vaporwaveWeb3.themeBootstrapDone";
const REGISTRY_LIMIT = 200;
const DONATE_URL = "https://github.com/ThiagoDataEngineer";
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
  "Fantom",
  "Gnosis",
  "Linea",
  "zkSync Era",
  "Ethereum Sepolia",
  "Base Sepolia",
  "Polygon Amoy",
  "Solana",
] as const;

const PROVIDERS = [
  "Xverse",
  "Unisat",
  "Leather",
  "Electrum",
  "MetaMask",
  "Uniswap Wallet",
  "Binance Wallet",
  "Coinbase Wallet",
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
] as const;

const PROVIDER_URLS: Record<string, string> = {
  "Xverse": "https://www.xverse.app/",
  "Unisat": "https://unisat.io/",
  "Leather": "https://leather.io/",
  "Electrum": "https://electrum.org/",
  "MetaMask": "https://metamask.io/",
  "Uniswap Wallet": "https://wallet.uniswap.org/",
  "Binance Wallet": "https://www.bnbchain.org/en/binance-wallet",
  "Coinbase Wallet": "https://www.coinbase.com/wallet",
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

const EVM_RPC_DEFAULTS: Record<string, string> = {
  "Ethereum Mainnet": "https://eth.llamarpc.com",
  "BNB Smart Chain": "https://bsc-dataseed.binance.org",
  "Polygon": "https://polygon-rpc.com",
  "Arbitrum": "https://arb1.arbitrum.io/rpc",
  "Optimism": "https://mainnet.optimism.io",
  "Base": "https://mainnet.base.org",
  "Avalanche": "https://api.avax.network/ext/bc/C/rpc",
  "Fantom": "https://rpc.ankr.com/fantom",
  "Gnosis": "https://rpc.ankr.com/gnosis",
  "Linea": "https://rpc.linea.build",
  "zkSync Era": "https://mainnet.era.zksync.io",
  "Ethereum Sepolia": "https://rpc.sepolia.org",
  "Base Sepolia": "https://sepolia.base.org",
  "Polygon Amoy": "https://rpc-amoy.polygon.technology",
};

const SOLANA_RPC_DEFAULT = "https://api.mainnet-beta.solana.com";

const BITCOIN_API_DEFAULTS: Record<string, string> = {
  "Bitcoin Mainnet": "https://blockstream.info/api",
  "Bitcoin Testnet": "https://blockstream.info/testnet/api",
};

const EDITOR_THEME_LABELS: Record<EditorThemeId, string> = {
  "vaporwave-neon-dusk": "Web3 Blockchain Vaporwave Neon Dusk",
  "vaporwave-midnight": "Web3 Blockchain Vaporwave Midnight",
  "bitcoin-sober": "Web3 Blockchain Bitcoin Sober",
  "bitcoin-calm-light": "Web3 Blockchain Bitcoin Calm Light",
  "bittensor-signal": "Web3 Blockchain Bittensor Signal",
  "lamberto-shoreline": "Web3 Blockchain Lamberto Ubatuba Beach",
  "cobol-terminal": "Web3 Blockchain COBOL Terminal",
};

type BrandTheme = {
  label: string;
  mark: string;
  bg: string;
  border: string;
  fg: string;
};

const PROVIDER_BRANDS: Record<string, BrandTheme> = {
  "Xverse": { label: "Xverse", mark: "XV", bg: "#f59e0b1f", border: "#f59e0baa", fg: "#fde68a" },
  "Unisat": { label: "Unisat", mark: "US", bg: "#eab3081f", border: "#eab308aa", fg: "#fde047" },
  "Leather": { label: "Leather", mark: "LT", bg: "#fb923c1f", border: "#fb923caa", fg: "#fed7aa" },
  "Electrum": { label: "Electrum", mark: "EL", bg: "#60a5fa1f", border: "#60a5faaa", fg: "#bfdbfe" },
  "MetaMask": { label: "MetaMask", mark: "MM", bg: "#f973161f", border: "#f97316aa", fg: "#fdba74" },
  "Uniswap Wallet": { label: "Uniswap", mark: "UNI", bg: "#ec48991f", border: "#ec4899aa", fg: "#f9a8d4" },
  "Binance Wallet": { label: "Binance", mark: "BN", bg: "#facc151f", border: "#facc15aa", fg: "#fde047" },
  "Coinbase Wallet": { label: "Coinbase", mark: "CB", bg: "#3b82f61f", border: "#3b82f6aa", fg: "#93c5fd" },
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

const NETWORK_BRANDS: Record<string, BrandTheme> = {
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
  "Fantom": { label: "Fantom", mark: "FTM", bg: "#06b6d41f", border: "#06b6d4aa", fg: "#a5f3fc" },
  "Gnosis": { label: "Gnosis", mark: "GNO", bg: "#14b8a61f", border: "#14b8a6aa", fg: "#99f6e4" },
  "Linea": { label: "Linea", mark: "LIN", bg: "#a3a3a31f", border: "#a3a3a3aa", fg: "#e5e5e5" },
  "zkSync Era": { label: "zkSync", mark: "ZK", bg: "#2563eb1f", border: "#2563ebaa", fg: "#bfdbfe" },
  "Solana": { label: "Solana", mark: "SOL", bg: "#22c55e1f", border: "#22c55eaa", fg: "#86efac" },
};

const FALLBACK_BRAND: BrandTheme = {
  label: "Unknown",
  mark: "??",
  bg: "#94a3b81f",
  border: "#94a3b866",
  fg: "#cbd5e1",
};

const PROVIDER_LOGO_FILES: Record<string, string> = {
  "Xverse": "xverse.png",
  "Leather": "leather.png",
  "Electrum": "electrum.png",
  "MetaMask": "metamask.png",
  "Uniswap Wallet": "uniswap.png",
  "Binance Wallet": "binance.svg",
  "Coinbase Wallet": "coinbase.svg",
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

const NETWORK_LOGO_FILES: Record<string, string> = {
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

const NETWORK_URLS: Record<string, string> = {
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
  "Fantom": "https://fantom.foundation",
  "Gnosis": "https://www.gnosis.io",
  "Linea": "https://linea.build",
  "zkSync Era": "https://zksync.io",
  "Solana": "https://solana.com",
};

export function activate(context: vscode.ExtensionContext): void {
  void ensureFirstInstallThemeDefaults(context);

  const walletPanel = new WalletLabViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vaporwaveWeb3.walletView",
      walletPanel
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vaporwaveWeb3.connectTestWallet",
      async () => {
        await walletPanel.connectWallet();
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vaporwaveWeb3.disconnectWallet",
      async () => {
        await walletPanel.disconnectWallet();
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vaporwaveWeb3.copyWallet", async () => {
      await walletPanel.copyWallet();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vaporwaveWeb3.runContractCheck",
      async () => {
        await walletPanel.runContractCheck();
      }
    )
  );
}

export function deactivate(): void {
  // No-op
}

async function ensureFirstInstallThemeDefaults(context: vscode.ExtensionContext): Promise<void> {
  const alreadyInitialized = context.globalState.get<boolean>(THEME_BOOTSTRAP_DONE_KEY, false);
  if (alreadyInitialized) {
    return;
  }

  try {
    await context.globalState.update(UI_THEME_KEY, "neon");
    await vscode.workspace
      .getConfiguration("workbench")
      .update(
        WORKBENCH_THEME_KEY,
        EDITOR_THEME_LABELS["vaporwave-neon-dusk"],
        vscode.ConfigurationTarget.Global
      );
    await context.globalState.update(THEME_BOOTSTRAP_DONE_KEY, true);
  } catch {
    // Best effort; user can still pick manually in the theme selector.
  }
}

class WalletLabViewProvider implements vscode.WebviewViewProvider {
  private view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView): void {
    this.view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getHtml(
      webviewView.webview,
      this.getState(),
      this.getRegistry(),
      this.getUiTheme(),
      this.getEditorTheme(),
      this.getLocale()
    );

    webviewView.webview.onDidReceiveMessage(async (message: WebviewMessage) => {
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
        case "setWorkbenchTheme":
          await this.applyWorkbenchTheme(this.sanitizeEditorTheme(message.workbenchThemeId));
          this.refreshView(this.getState());
          break;
        case "setLocale":
          await this.saveLocale(this.sanitizeLocale(message.localeId));
          this.refreshView(this.getState());
          break;
        default:
          break;
      }
    });
  }

  public async connectWallet(): Promise<void> {
    const mode = await vscode.window.showQuickPick(
      [
        {
          label: "Connect real wallet (my address)",
          value: "real" as const,
          description: "Bitcoin wallets + MetaMask, Rabby, Trust, Phantom, etc.",
        },
        {
          label: "Generate test wallet",
          value: "test" as const,
          description: "Fake address for local tests",
        },
      ],
      {
        title: "Connection mode",
        placeHolder: "Choose real wallet or generated test wallet",
      }
    );

    if (!mode) {
      return;
    }

    const chain = await vscode.window.showQuickPick(
      [...NETWORKS],
      {
        title: "Select network",
        placeHolder: "Choose the network for this wallet",
      }
    );

    if (!chain) {
      return;
    }

    if (mode.value === "test") {
      const state: WalletState = {
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
      void vscode.window.showInformationMessage(
        `Open ${provider}, copy your public address and paste it in the next step. Never share seed phrase or private key.`
      );
    }

    const manualAddress = await vscode.window.showInputBox({
      title: "Paste your public wallet address",
      placeHolder:
        this.isBitcoinChain(chain)
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

    const state: WalletState = {
      connected: true,
      address: manualAddress.trim(),
      chain,
      provider,
      mode: "real",
    };

    await this.saveState(state);
    await this.addRegistryEntry(state, "manual");
    this.refreshView(state);
    vscode.window.showInformationMessage(
      `${provider} wallet connected on ${chain}.`
    );
  }

  public async disconnectWallet(): Promise<void> {
    await this.saveState(DEFAULT_STATE);
    this.refreshView(DEFAULT_STATE);
    vscode.window.showInformationMessage("Wallet disconnected.");
  }

  public async copyWallet(): Promise<void> {
    const state = this.getState();
    if (!state.connected || !state.address) {
      vscode.window.showWarningMessage("No connected wallet to copy.");
      return;
    }

    await vscode.env.clipboard.writeText(state.address);
    vscode.window.showInformationMessage("Wallet address copied.");
  }

  public async openProviderSite(): Promise<void> {
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

  public async openDonatePage(): Promise<void> {
    await vscode.env.openExternal(vscode.Uri.parse(DONATE_URL));
  }

  public async copyDonateAddress(address?: string): Promise<void> {
    const trimmed = (address ?? "").trim();
    if (!trimmed) {
      vscode.window.showWarningMessage("Donation address is unavailable.");
      return;
    }

    await vscode.env.clipboard.writeText(trimmed);
    vscode.window.showInformationMessage("Donation address copied.");
  }

  private getFaviconUrl(targetUrl?: string): string {
    if (!targetUrl) {
      return "";
    }

    try {
      const host = new URL(targetUrl).hostname.replace(/^www\./, "");
      return `https://icons.duckduckgo.com/ip3/${host}.ico`;
    } catch {
      return "";
    }
  }

  private getProviderLogoSrc(webview: vscode.Webview, provider: string): string {
    const localLogo = PROVIDER_LOGO_FILES[provider];
    if (localLogo) {
      return webview
        .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "logos", localLogo))
        .toString();
    }

    return this.getFaviconUrl(PROVIDER_URLS[provider]);
  }

  private getNetworkLogoSrc(webview: vscode.Webview, chain: string): string {
    const localLogo = NETWORK_LOGO_FILES[chain];
    if (localLogo) {
      return webview
        .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "logos", localLogo))
        .toString();
    }

    return this.getFaviconUrl(NETWORK_URLS[chain]);
  }

  public async runContractCheck(): Promise<void> {
    const state = this.getState();
    if (!state.connected) {
      vscode.window.showWarningMessage("Connect a wallet before running a contract check.");
      return;
    }

    if (this.isBitcoinChain(state.chain)) {
      vscode.window.showWarningMessage(
        "Contract check is not available for Bitcoin UTXO networks in this lab yet. Use Check Balance for BTC addresses."
      );
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
      const fakeTxHash = `0x${randomBytes(32).toString("hex")}`;
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
      vscode.window.showInformationMessage(
        `Test check passed for ${normalizedContract} on ${state.chain}. Simulated tx: ${fakeTxHash.slice(0, 12)}...`
      );
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

    await this.runRealEvmContractCheck(
      state.chain,
      state.address,
      normalizedContract,
      expectedPrefix,
      minCodeBytes
    );
  }

  public async runBalanceCheck(): Promise<void> {
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

  private async runRealBitcoinBalanceCheck(
    chain: string,
    walletAddress: string
  ): Promise<void> {
    const apiBase = await this.promptForHttpEndpoint(
      `Indexer API base for ${chain}`,
      BITCOIN_API_DEFAULTS[chain] ?? "https://blockstream.info/api",
      "API base URL is required",
      "API base must use http or https"
    );

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

      const data = (await response.json()) as {
        chain_stats?: { funded_txo_sum?: number; spent_txo_sum?: number };
        mempool_stats?: { funded_txo_sum?: number; spent_txo_sum?: number };
      };

      const confirmedFunded = data.chain_stats?.funded_txo_sum ?? 0;
      const confirmedSpent = data.chain_stats?.spent_txo_sum ?? 0;
      const mempoolFunded = data.mempool_stats?.funded_txo_sum ?? 0;
      const mempoolSpent = data.mempool_stats?.spent_txo_sum ?? 0;
      const totalSats = (confirmedFunded - confirmedSpent) + (mempoolFunded - mempoolSpent);
      const totalBtc = this.formatBtcFromSats(totalSats);

      vscode.window.showInformationMessage(
        `Real balance on ${chain}: ${totalBtc} BTC for ${walletAddress}.`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown API error";
      vscode.window.showErrorMessage(`Balance check failed: ${message}`);
    }
  }

  private async runRealEvmBalanceCheck(
    chain: string,
    walletAddress: string
  ): Promise<void> {
    const rpcEndpoint = await this.promptForHttpEndpoint(
      `RPC endpoint for ${chain}`,
      EVM_RPC_DEFAULTS[chain] ?? "",
      "RPC endpoint is required",
      "RPC endpoint must use http or https"
    );

    if (rpcEndpoint === undefined) {
      return;
    }

    const url = rpcEndpoint.trim();

    try {
      const chainId = await this.postJsonRpc<string>(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_chainId",
        params: [],
      });

      const balanceHex = await this.postJsonRpc<string>(url, {
        jsonrpc: "2.0",
        id: 2,
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      });

      const balanceWei = BigInt(balanceHex);
      const balanceEth = this.formatEthFromWei(balanceWei);

      vscode.window.showInformationMessage(
        `Real balance on ${chain} (${chainId}): ${balanceEth} ETH for ${walletAddress}.`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown RPC error";
      vscode.window.showErrorMessage(`Balance check failed: ${message}`);
    }
  }

  private async runRealSolanaBalanceCheck(
    chain: string,
    walletAddress: string
  ): Promise<void> {
    const rpcEndpoint = await this.promptForHttpEndpoint(
      `RPC endpoint for ${chain}`,
      SOLANA_RPC_DEFAULT,
      "RPC endpoint is required",
      "RPC endpoint must use http or https"
    );

    if (rpcEndpoint === undefined) {
      return;
    }

    try {
      const balanceResponse = await this.postJsonRpc<{ value: number }>(rpcEndpoint.trim(), {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [walletAddress],
      });

      const balanceSol = balanceResponse.value / 1e9;

      vscode.window.showInformationMessage(
        `Real balance on ${chain}: ${balanceSol.toFixed(6)} SOL for ${walletAddress}.`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown RPC error";
      vscode.window.showErrorMessage(`Balance check failed: ${message}`);
    }
  }

  private async runRealEvmContractCheck(
    chain: string,
    walletAddress: string,
    contractAddress: string,
    expectedPrefix: string,
    minCodeBytes: number
  ): Promise<void> {
    const rpcEndpoint = await this.promptForHttpEndpoint(
      `RPC endpoint for ${chain}`,
      EVM_RPC_DEFAULTS[chain] ?? "",
      "RPC endpoint is required",
      "RPC endpoint must use http or https"
    );

    if (rpcEndpoint === undefined) {
      return;
    }

    const url = rpcEndpoint.trim();

    try {
      const chainId = await this.postJsonRpc<string>(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_chainId",
        params: [],
      });

      const code = await this.postJsonRpc<string>(url, {
        jsonrpc: "2.0",
        id: 2,
        method: "eth_getCode",
        params: [contractAddress, "latest"],
      });

      const balanceHex = await this.postJsonRpc<string>(url, {
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

      const status: ContractVerificationRow["status"] = !hasCode
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
        vscode.window.showWarningMessage(
          `Real check done on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). Wallet balance: ${walletStatus}.`
        );
        return;
      }

      if (status === "warn") {
        vscode.window.showWarningMessage(
          `Real check completed on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). ${prefixStatus}; ${minSizeStatus}. Wallet balance: ${walletStatus}.`
        );
        return;
      }

      vscode.window.showInformationMessage(
        `Real check passed on ${chain}: ${codeStatus} at ${contractAddress} (${chainStatus}). ${prefixStatus}; ${minSizeStatus}. Wallet balance: ${walletStatus}.`
      );
    } catch (error) {
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

  private async runRealSolanaContractCheck(
    chain: string,
    walletAddress: string,
    contractAddress: string
  ): Promise<void> {
    const rpcEndpoint = await this.promptForHttpEndpoint(
      `RPC endpoint for ${chain}`,
      SOLANA_RPC_DEFAULT,
      "RPC endpoint is required",
      "RPC endpoint must use http or https"
    );

    if (rpcEndpoint === undefined) {
      return;
    }

    try {
      const result = await this.postJsonRpc<{
        value: { executable: boolean } | null;
      }>(rpcEndpoint.trim(), {
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
        vscode.window.showWarningMessage(
          `Real check done on ${chain}: account not found for ${contractAddress}.`
        );
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
      vscode.window.showInformationMessage(
        `Real check done on ${chain}: ${executable} at ${contractAddress}.`
      );
    } catch (error) {
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

  private async postJsonRpc<T>(
    endpoint: string,
    payload: { jsonrpc: string; id: number; method: string; params: unknown[] },
    timeoutMs = 0
  ): Promise<T> {
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

    const data = (await response.json()) as {
      result?: T;
      error?: { message?: string };
    };

    if (data.error) {
      throw new Error(data.error.message ?? "JSON-RPC returned an error");
    }

    if (data.result === undefined) {
      throw new Error("JSON-RPC response has no result field");
    }

    return data.result;
  }

  private generateTestAddress(chain: string): string {
    if (chain === "Solana") {
      return this.generateBase58String(44);
    }

    if (this.isBitcoinChain(chain)) {
      const hrp = chain === "Bitcoin Testnet" ? "tb1q" : "bc1q";
      return `${hrp}${this.generateBech32Body(38)}`;
    }

    return `0x${randomBytes(20).toString("hex")}`;
  }

  private isBitcoinChain(chain: string): boolean {
    return chain === "Bitcoin Mainnet" || chain === "Bitcoin Testnet";
  }

  private isValidBitcoinAddress(address: string): boolean {
    const base58 = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const bech32Main = /^bc1[ac-hj-np-z02-9]{11,71}$/i;
    const bech32Test = /^tb1[ac-hj-np-z02-9]{11,71}$/i;
    return base58.test(address) || bech32Main.test(address) || bech32Test.test(address);
  }

  private generateBase58String(length: number): string {
    const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let out = "";
    for (let i = 0; i < length; i += 1) {
      const index = randomBytes(1)[0] % alphabet.length;
      out += alphabet[index];
    }
    return out;
  }

  private generateBech32Body(length: number): string {
    const alphabet = "023456789acdefghjklmnpqrstuvwxyz";
    let out = "";
    for (let i = 0; i < length; i += 1) {
      const index = randomBytes(1)[0] % alphabet.length;
      out += alphabet[index];
    }
    return out;
  }

  private formatEthFromWei(wei: bigint): string {
    const base = 10n ** 18n;
    const integer = wei / base;
    const fraction = wei % base;
    const fractionPadded = fraction.toString().padStart(18, "0");
    const fractionTrimmed = fractionPadded.replace(/0+$/, "");
    return fractionTrimmed.length > 0 ? `${integer}.${fractionTrimmed}` : `${integer}`;
  }

  private formatBtcFromSats(sats: number): string {
    return (sats / 1e8).toFixed(8);
  }

  private async promptForHttpEndpoint(
    title: string,
    value: string,
    requiredMessage: string,
    protocolMessage: string
  ): Promise<string | undefined> {
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
        } catch {
          return "Invalid URL";
        }
      },
    });
  }

  private isValidChain(chain: string): boolean {
    return NETWORKS.includes(chain as (typeof NETWORKS)[number]);
  }

  private isValidProvider(provider: string): boolean {
    return provider === "Local Test Wallet" || provider in PROVIDER_BRANDS || PROVIDERS.includes(provider as (typeof PROVIDERS)[number]);
  }

  private sanitizeState(state: WalletState): WalletState {
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

  private getState(): WalletState {
    const persisted = this.context.globalState.get<WalletState>(STATE_KEY);
    if (!persisted) {
      return DEFAULT_STATE;
    }
    return this.sanitizeState(persisted);
  }

  private async saveState(state: WalletState): Promise<void> {
    await this.context.globalState.update(STATE_KEY, state);
  }

  private refreshView(state: WalletState): void {
    if (!this.view) {
      return;
    }
    this.view.webview.html = this.getHtml(
      this.view.webview,
      state,
      this.getRegistry(),
      this.getUiTheme(),
      this.getEditorTheme(),
      this.getLocale()
    );
  }

  private sanitizeUiTheme(value: string | undefined): UiThemeId {
    if (
      value === "neon"
      || value === "pro"
      || value === "calm-light"
      || value === "btc-dawn-light"
      || value === "bittensor"
      || value === "lamberto"
      || value === "cobol"
    ) {
      return value;
    }
    return "neon";
  }

  private sanitizeEditorTheme(value: string | undefined): EditorThemeId {
    if (
      value === "vaporwave-neon-dusk"
      || value === "vaporwave-midnight"
      || value === "bitcoin-sober"
      || value === "bitcoin-calm-light"
      || value === "bittensor-signal"
      || value === "lamberto-shoreline"
      || value === "cobol-terminal"
    ) {
      return value;
    }

    return "vaporwave-neon-dusk";
  }

  private sanitizeLocale(value: string | undefined): LocaleId {
    if (
      value === "en"
      || value === "pt-BR"
      || value === "fr"
      || value === "es"
      || value === "de"
      || value === "ru"
      || value === "ja"
      || value === "zh"
      || value === "ar"
    ) {
      return value;
    }

    return "en";
  }

  private getUiTheme(): UiThemeId {
    const persisted = this.context.globalState.get<string>(UI_THEME_KEY);
    return this.sanitizeUiTheme(persisted);
  }

  private getEditorTheme(): EditorThemeId {
    const workbenchTheme = vscode.workspace
      .getConfiguration("workbench")
      .get<string>("colorTheme");

    const entry = (Object.entries(EDITOR_THEME_LABELS) as Array<[EditorThemeId, string]>)
      .find(([, label]) => label === workbenchTheme);

    return this.sanitizeEditorTheme(entry?.[0]);
  }

  private getLocale(): LocaleId {
    const persisted = this.context.globalState.get<string>(LOCALE_KEY);
    return this.sanitizeLocale(persisted);
  }

  private async saveUiTheme(theme: UiThemeId): Promise<void> {
    await this.context.globalState.update(UI_THEME_KEY, theme);
  }

  private async applyWorkbenchTheme(themeId: EditorThemeId): Promise<void> {
    await vscode.workspace
      .getConfiguration("workbench")
      .update(WORKBENCH_THEME_KEY, EDITOR_THEME_LABELS[themeId], vscode.ConfigurationTarget.Global);
  }

  private async saveLocale(locale: LocaleId): Promise<void> {
    await this.context.globalState.update(LOCALE_KEY, locale);
  }

  private getRegistry(): WalletRegistryEntry[] {
    const persisted = this.context.globalState.get<WalletRegistryEntry[]>(REGISTRY_KEY);
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
        } satisfies WalletRegistryEntry;
      })
      .filter((entry) => entry.address.length > 0)
      .slice(0, REGISTRY_LIMIT);

    return clean;
  }

  private async addRegistryEntry(
    state: WalletState,
    source: WalletRegistryEntry["source"]
  ): Promise<void> {
    const registry = this.getRegistry();
    const alreadyExists = registry.some(
      (entry) =>
        entry.address.toLowerCase() === state.address.toLowerCase() &&
        entry.chain === state.chain &&
        entry.provider === state.provider &&
        entry.mode === state.mode
    );

    if (alreadyExists) {
      return;
    }

    const next: WalletRegistryEntry = {
      address: state.address,
      chain: state.chain,
      provider: state.provider,
      mode: state.mode,
      source,
      createdAt: new Date().toISOString(),
    };

    await this.context.globalState.update(REGISTRY_KEY, [next, ...registry].slice(0, REGISTRY_LIMIT));
  }

  private formatRegistryTxt(entries: WalletRegistryEntry[]): string {
    const real = entries.filter((entry) => entry.mode === "real");
    const test = entries.filter((entry) => entry.mode === "test");

    const lines: string[] = [];
    lines.push("Wallet Lab Registry");
    lines.push(`Exported at: ${new Date().toISOString()}`);
    lines.push("");
    lines.push("REAL WALLETS");
    lines.push("------------");
    if (real.length === 0) {
      lines.push("(none)");
    } else {
      for (const entry of real) {
        lines.push(
          `${entry.createdAt} | ${entry.chain} | ${entry.provider} | ${entry.address} | source=${entry.source}`
        );
      }
    }

    lines.push("");
    lines.push("TEST WALLETS");
    lines.push("------------");
    if (test.length === 0) {
      lines.push("(none)");
    } else {
      for (const entry of test) {
        lines.push(
          `${entry.createdAt} | ${entry.chain} | ${entry.provider} | ${entry.address} | source=${entry.source}`
        );
      }
    }

    return lines.join("\n");
  }

  private escapeCsv(value: string): string {
    const needsQuotes = value.includes(",") || value.includes("\n") || value.includes('"');
    const escaped = value.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  }

  private formatRegistryCsv(entries: WalletRegistryEntry[]): string {
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

  private async exportRegistry(format: "txt" | "csv"): Promise<void> {
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

  private async clearRegistry(): Promise<void> {
    await this.context.globalState.update(REGISTRY_KEY, []);
    await this.context.globalState.update(BALANCE_REPORT_KEY, []);
    await this.context.globalState.update(CONTRACT_REPORT_KEY, []);
    this.refreshView(this.getState());
    vscode.window.showInformationMessage("Wallet registry cleared.");
  }

  private getBalanceReport(): RegistryBalanceRow[] {
    const persisted = this.context.globalState.get<RegistryBalanceRow[]>(BALANCE_REPORT_KEY);
    if (!Array.isArray(persisted)) {
      return [];
    }

    return persisted
      .filter((row) => row && typeof row === "object")
      .map((row) => {
        const status: RegistryBalanceRow["status"] = row.status === "ok" ? "ok" : "error";

        return {
          address: String(row.address ?? "").trim(),
          chain: String(row.chain ?? ""),
          provider: String(row.provider ?? ""),
          status,
          balance: String(row.balance ?? ""),
          unit: String(row.unit ?? ""),
          endpoint: String(row.endpoint ?? ""),
          error: String(row.error ?? ""),
          checkedAt:
            typeof row.checkedAt === "string" && row.checkedAt
              ? row.checkedAt
              : new Date().toISOString(),
        };
      })
      .filter((row) => row.address.length > 0)
      .slice(0, REGISTRY_LIMIT);
  }

  private getContractReport(): ContractVerificationRow[] {
    const persisted = this.context.globalState.get<ContractVerificationRow[]>(CONTRACT_REPORT_KEY);
    if (!Array.isArray(persisted)) {
      return [];
    }

    return persisted
      .filter((row) => row && typeof row === "object")
      .map((row) => {
        const status: ContractVerificationRow["status"] =
          row.status === "error" ? "error" : row.status === "warn" ? "warn" : "ok";
        const mode: ContractVerificationRow["mode"] = row.mode === "real" ? "real" : "test";

        const normalizeFlag = (
          value: unknown,
          fallback: ContractVerificationRow["prefixMatched"]
        ): ContractVerificationRow["prefixMatched"] => {
          return value === "yes" || value === "no" || value === "na" ? value : fallback;
        };

        return {
          checkedAt:
            typeof row.checkedAt === "string" && row.checkedAt
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

  private async addContractReportRow(row: ContractVerificationRow): Promise<void> {
    const report = this.getContractReport();
    await this.context.globalState.update(CONTRACT_REPORT_KEY, [row, ...report].slice(0, REGISTRY_LIMIT));
  }

  private async fetchBitcoinBalanceWithoutPrompt(
    chain: string,
    walletAddress: string,
    endpointBase: string
  ): Promise<string> {
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

    const data = (await response.json()) as {
      chain_stats?: { funded_txo_sum?: number; spent_txo_sum?: number };
      mempool_stats?: { funded_txo_sum?: number; spent_txo_sum?: number };
    };

    const confirmedFunded = data.chain_stats?.funded_txo_sum ?? 0;
    const confirmedSpent = data.chain_stats?.spent_txo_sum ?? 0;
    const mempoolFunded = data.mempool_stats?.funded_txo_sum ?? 0;
    const mempoolSpent = data.mempool_stats?.spent_txo_sum ?? 0;
    const totalSats = (confirmedFunded - confirmedSpent) + (mempoolFunded - mempoolSpent);

    return this.formatBtcFromSats(totalSats);
  }

  private async fetchEvmBalanceWithoutPrompt(
    chain: string,
    walletAddress: string,
    endpoint: string
  ): Promise<string> {
    const balanceHex = await this.postJsonRpc<string>(endpoint, {
      jsonrpc: "2.0",
      id: 2,
      method: "eth_getBalance",
      params: [walletAddress, "latest"],
    }, 15000);

    const balanceWei = BigInt(balanceHex);
    return this.formatEthFromWei(balanceWei);
  }

  private async fetchSolanaBalanceWithoutPrompt(
    chain: string,
    walletAddress: string,
    endpoint: string
  ): Promise<string> {
    const balanceResponse = await this.postJsonRpc<{ value: number }>(endpoint, {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [walletAddress],
    }, 15000);

    return (balanceResponse.value / 1e9).toFixed(6);
  }

  private async checkRegistryRealBalances(): Promise<void> {
    const realEntries = this.getRegistry().filter((entry) => entry.mode === "real");
    if (realEntries.length === 0) {
      vscode.window.showWarningMessage("No real wallet records to check.");
      return;
    }

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Checking real wallet balances...",
        cancellable: false,
      },
      async (progress) => {
        const report: RegistryBalanceRow[] = [];
        const checkedAt = new Date().toISOString();

        for (let i = 0; i < realEntries.length; i += 1) {
          const entry = realEntries[i];
          const increment = Math.max(1, Math.floor(100 / realEntries.length));
          progress.report({ increment, message: `${i + 1}/${realEntries.length} ${entry.chain}` });

          const baseRow: Omit<RegistryBalanceRow, "status" | "balance" | "unit" | "error"> = {
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
          } catch (error) {
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
        vscode.window.showInformationMessage(
          `Batch balance check finished: ${successCount} success, ${errorCount} error(s).`
        );
      }
    );
  }

  private formatBalanceReportTxt(rows: RegistryBalanceRow[]): string {
    const lines: string[] = [];
    lines.push("Wallet Registry Balance Report");
    lines.push(`Generated at: ${new Date().toISOString()}`);
    lines.push("");

    for (const row of rows) {
      if (row.status === "ok") {
        lines.push(
          `${row.checkedAt} | OK | ${row.chain} | ${row.provider} | ${row.address} | ${row.balance} ${row.unit} | ${row.endpoint}`
        );
      } else {
        lines.push(
          `${row.checkedAt} | ERROR | ${row.chain} | ${row.provider} | ${row.address} | ${row.error}`
        );
      }
    }

    return lines.join("\n");
  }

  private formatBalanceReportCsv(rows: RegistryBalanceRow[]): string {
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

  private async exportBalanceReport(format: "txt" | "csv"): Promise<void> {
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

  private formatContractReportTxt(rows: ContractVerificationRow[]): string {
    const lines: string[] = [];
    lines.push("Contract Verification Report");
    lines.push(`Generated at: ${new Date().toISOString()}`);
    lines.push("");

    for (const row of rows) {
      lines.push(
        `${row.checkedAt} | ${row.status.toUpperCase()} | ${row.mode.toUpperCase()} | ${row.chain} | contract=${row.contractAddress} | wallet=${row.walletAddress} | chainId=${row.chainId} | codeBytes=${row.codeBytes} | prefix=${row.prefixMatched} | minSize=${row.minCodeBytesPassed} | endpoint=${row.endpoint} | ${row.note}`
      );
    }

    return lines.join("\n");
  }

  private formatContractReportCsv(rows: ContractVerificationRow[]): string {
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

  private async exportContractReport(format: "txt" | "csv"): Promise<void> {
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

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  private renderRegistryItems(entries: WalletRegistryEntry[]): string {
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

  private renderDonateAddresses(): string {
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

  private getHtml(
    webview: vscode.Webview,
    state: WalletState,
    registry: WalletRegistryEntry[],
    uiTheme: UiThemeId,
    editorTheme: EditorThemeId,
    locale: LocaleId
  ): string {
    const nonce = Date.now().toString();
    const isDisconnected = !state.connected;
    const modeColor = isDisconnected
      ? "#94a3b8"
      : state.mode === "real"
      ? "#ef4444"
      : "#a855f7";
    const modeSurface = isDisconnected
      ? "#94a3b822"
      : state.mode === "real"
      ? "#ef444422"
      : "#a855f722";
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
    const balanceButtonHtml =
      state.mode === "real"
        ? '<button class="btn btn-secondary btn-wide" id="balanceBtn">Check Balance</button>'
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
      body.ui-theme-bittensor {
        --panel-bg: rgba(5, 15, 18, 0.78);
        --panel-border: rgba(46, 196, 182, 0.5);
        --panel-shadow: 0 10px 26px rgba(0, 77, 73, 0.35);
        --text-primary: #dbfffa;
        --text-secondary: #8fc9c3;
        --address-color: #f59e0b;
        --accent-primary: #f97316;
        --accent-primary-hover: #fb923c;
        --accent-info: #2dd4bf;
        --accent-success: #22c55e;
        --accent-danger: #ef4444;
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
        padding: 10px;
        margin-bottom: 8px;
      }
      .wallet-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .wallet-head-right {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .wallet-title {
        margin: 0;
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
        margin-top: 6px;
        font-size: 15px;
        font-weight: 600;
        word-break: break-all;
        color: #f8fafc;
      }
      .wallet-key-title {
        margin-top: 8px;
        font-size: 10px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        font-weight: 800;
        color: #8fd5ff;
      }
      .wallet-address {
        color: var(--address-color);
        text-shadow: 0 0 18px rgba(248, 191, 84, 0.2);
      }
      .wallet-brand-row {
        margin-top: 7px;
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
      }
      .wallet-brand-group {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
      }
      .wallet-brand-title {
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: var(--text-secondary);
      }
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 6px;
        margin-top: 5px;
      }
      .meta-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .meta-title {
        font-size: 11px;
        font-weight: 700;
        color: var(--text-secondary);
        letter-spacing: 0.06em;
      }
      .meta-brand {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 11px 5px 6px;
        border-radius: 999px;
        border: 1px solid transparent;
        font-size: 12px;
        font-weight: 700;
        backdrop-filter: blur(3px);
      }
      .meta-logo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.04em;
        border: 1px solid transparent;
        background: transparent;
      }
      .meta-logo-img {
        width: 18px;
        height: 18px;
        object-fit: contain;
        display: block;
        filter: drop-shadow(0 1px 2px rgba(2, 6, 23, 0.6));
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
        display: grid;
        grid-template-columns: 30px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
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
        font-size: 11px;
        font-family: var(--vscode-editor-font-family), Consolas, monospace;
        color: var(--address-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
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
      .chart-timeframe {
        margin-top: 6px;
        font-size: 9px;
        letter-spacing: 0.04em;
        color: var(--text-secondary);
      }
      .market-subtitle {
        margin-top: 4px;
        font-size: 10px;
        color: var(--text-secondary);
      }
      .market-tools {
        margin-top: 9px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 6px;
        align-items: stretch;
        position: relative;
      }
      .market-search-wrap {
        min-width: 0;
        position: relative;
      }
      .market-add-btn {
        min-width: 56px;
        margin: 0;
        padding: 0 12px;
        height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        line-height: 1;
        align-self: stretch;
      }
      .market-input {
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border-radius: 9px;
        border: 1px solid rgba(98, 129, 188, 0.45);
        background: rgba(10, 18, 36, 0.78);
        color: var(--text-primary);
        padding: 6px 8px;
        font-size: 10px;
      }
      .market-autocomplete {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        border: 1px solid rgba(98, 129, 188, 0.45);
        border-radius: 8px;
        background: rgba(8, 14, 30, 0.98);
        box-shadow: 0 12px 22px rgba(2, 6, 23, 0.5);
        z-index: 40;
        max-height: 168px;
        overflow-y: auto;
      }
      .market-autocomplete-item {
        width: 100%;
        border: 0;
        border-bottom: 1px solid rgba(98, 129, 188, 0.2);
        background: transparent;
        color: var(--text-primary);
        text-align: left;
        padding: 7px 8px;
        cursor: pointer;
        font-size: 10px;
      }
      .market-autocomplete-item:last-child {
        border-bottom: 0;
      }
      .market-autocomplete-item:hover,
      .market-autocomplete-item.active {
        background: rgba(49, 184, 255, 0.18);
      }
      .market-autocomplete-primary {
        font-weight: 700;
      }
      .market-autocomplete-secondary {
        margin-top: 2px;
        font-size: 9px;
        color: var(--text-secondary);
      }
      .market-favorites {
        margin-top: 7px;
        border: 1px solid rgba(98, 129, 188, 0.3);
        border-radius: 8px;
        padding: 7px;
        background: rgba(8, 14, 30, 0.45);
      }
      .market-favorites-title {
        font-size: 9px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #9ad7ff;
      }
      .market-favorites-grid {
        margin-top: 6px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .market-favorite-empty {
        margin-top: 4px;
        font-size: 9px;
        color: var(--text-secondary);
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
      .bubble-main {
        display: inline-flex;
        align-items: center;
      }
      .bubble-actions {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .bubble-pin {
        width: 16px;
        height: 16px;
        border: 0;
        border-radius: 999px;
        padding: 0;
        cursor: pointer;
        font-size: 9px;
        line-height: 1;
        background: rgba(2, 6, 23, 0.5);
        color: currentColor;
      }
      .bubble-pin.active {
        color: #facc15;
        background: rgba(250, 204, 21, 0.2);
      }
      .bubble-pin:hover {
        background: rgba(2, 6, 23, 0.75);
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
      .chart-range-select {
        border-radius: 8px;
        border: 1px solid rgba(98, 129, 188, 0.45);
        background: rgba(12, 21, 42, 0.85);
        color: var(--text-primary);
        padding: 5px 6px;
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
      .chart-scale-text {
        fill: rgba(215, 226, 251, 0.9);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.02em;
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
        flex-wrap: wrap;
      }
      .theme-picker {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        justify-content: flex-end;
        min-width: min(100%, 380px);
      }
      .theme-picker-group {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }
      .theme-picker-label {
        font-size: 10px;
        color: var(--text-secondary);
        letter-spacing: 0.04em;
        white-space: nowrap;
      }
      .theme-picker-select {
        border-radius: 7px;
        border: 1px solid rgba(248, 191, 84, 0.45);
        padding: 4px 6px;
        font-size: 10px;
        background: rgba(12, 18, 36, 0.75);
        color: var(--text-primary);
        min-width: 124px;
      }
      .mode-badge {
        display: inline-flex;
        align-items: center;
        margin-top: 10px;
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.06em;
        color: #ffd48b;
        border: 1px solid rgba(255, 212, 139, 0.65);
        background: rgba(255, 212, 139, 0.15);
        box-shadow: 0 0 0 1px rgba(255, 212, 139, 0.2) inset;
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
      .ui-theme-calm-light .market-autocomplete {
        background: rgba(245, 248, 255, 0.98);
        border-color: rgba(169, 184, 212, 0.9);
      }
      .ui-theme-calm-light .market-autocomplete-item {
        border-bottom-color: rgba(169, 184, 212, 0.35);
        color: #253044;
      }
      .ui-theme-calm-light .market-favorites {
        background: rgba(240, 245, 253, 0.95);
        border-color: rgba(169, 184, 212, 0.8);
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
      .ui-theme-btc-dawn-light .market-autocomplete {
        background: rgba(251, 246, 237, 0.99);
        border-color: rgba(198, 171, 130, 0.92);
      }
      .ui-theme-btc-dawn-light .market-autocomplete-item {
        border-bottom-color: rgba(198, 171, 130, 0.38);
        color: #2f281d;
      }
      .ui-theme-btc-dawn-light .market-favorites {
        background: rgba(246, 239, 227, 0.93);
        border-color: rgba(195, 170, 131, 0.84);
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
      .ui-theme-bittensor {
        background: radial-gradient(circle at top, #0d1f24 0%, #08161b 54%, #050d10 100%);
      }
      .ui-theme-bittensor .card,
      .ui-theme-bittensor .market-wrap,
      .ui-theme-bittensor .registry-wrap {
        background: linear-gradient(180deg, rgba(8, 28, 33, 0.95) 0%, rgba(5, 20, 24, 0.92) 100%);
        border-color: rgba(43, 181, 169, 0.75);
      }
      .ui-theme-bittensor .label,
      .ui-theme-bittensor .market-title {
        color: #2dd4bf;
      }
      .ui-theme-bittensor .value,
      .ui-theme-bittensor .registry-title {
        color: #d8fff9;
      }
      .ui-theme-bittensor .btn-secondary {
        background: rgba(45, 212, 191, 0.14);
        color: #d8fff9;
      }
      .ui-theme-bittensor .market-input,
      .ui-theme-bittensor .chart-select,
      .ui-theme-bittensor .registry-format-select,
      .ui-theme-bittensor .theme-picker-select {
        background: rgba(4, 22, 27, 0.9);
        border-color: rgba(43, 181, 169, 0.72);
        color: #d8fff9;
      }
      .ui-theme-bittensor .market-autocomplete,
      .ui-theme-bittensor .market-favorites,
      .ui-theme-bittensor .chart-wrap,
      .ui-theme-bittensor .registry-column,
      .ui-theme-bittensor .registry-item,
      .ui-theme-bittensor .chart-surface {
        background: rgba(5, 20, 24, 0.9);
        border-color: rgba(43, 181, 169, 0.6);
      }
      .ui-theme-bittensor .env-banner {
        color: #2dd4bf;
        border-color: rgba(45, 212, 191, 0.7);
        background: rgba(45, 212, 191, 0.12);
      }
      .ui-theme-bittensor .mode-badge {
        color: #f6ad55;
        border-color: rgba(245, 158, 11, 0.75);
        background: rgba(245, 158, 11, 0.14);
      }
      .ui-theme-bittensor .meta-brand {
        color: #d8fff9 !important;
        border-color: rgba(45, 212, 191, 0.62) !important;
        background: rgba(5, 32, 37, 0.92) !important;
      }
      .ui-theme-bittensor .meta-logo {
        color: #d8fff9 !important;
        border-color: rgba(45, 212, 191, 0.72) !important;
        background: rgba(17, 79, 74, 0.95) !important;
      }
      body.ui-theme-lamberto {
        --panel-bg: rgba(13, 35, 58, 0.78);
        --panel-border: rgba(86, 164, 196, 0.52);
        --panel-shadow: 0 12px 28px rgba(7, 22, 39, 0.36);
        --text-primary: #f2fbff;
        --text-secondary: #b9dceb;
        --address-color: #ffcf6e;
        --accent-primary: #f97316;
        --accent-primary-hover: #fb923c;
        --accent-info: #4fd1ff;
        --accent-success: #34d399;
        --accent-danger: #ef4444;
        background:
          radial-gradient(circle at 20% 16%, rgba(255, 205, 122, 0.18) 0%, rgba(255, 205, 122, 0) 42%),
          radial-gradient(circle at 84% 18%, rgba(70, 177, 215, 0.2) 0%, rgba(70, 177, 215, 0) 48%),
          linear-gradient(180deg, #0f365b 0%, #0c2a4a 46%, #0b2440 100%);
      }
      .ui-theme-lamberto::before {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(180deg, rgba(154, 216, 255, 0.2) 0%, rgba(154, 216, 255, 0.08) 26%, rgba(56, 146, 193, 0.06) 54%, rgba(17, 82, 128, 0.12) 100%),
          radial-gradient(circle at 74% 10%, rgba(255, 236, 175, 0.28) 0%, rgba(255, 236, 175, 0) 28%),
          radial-gradient(circle at 12% 74%, rgba(248, 216, 152, 0.2) 0%, rgba(248, 216, 152, 0) 34%);
        opacity: 0.24;
        z-index: -2;
      }
      .ui-theme-lamberto::after {
        content: "";
        position: fixed;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(130% 78% at 14% 98%, rgba(244, 211, 132, 0.2) 0%, rgba(244, 211, 132, 0) 48%),
          radial-gradient(120% 62% at 88% 99%, rgba(34, 135, 173, 0.2) 0%, rgba(34, 135, 173, 0) 52%),
          radial-gradient(80% 55% at 100% 12%, rgba(58, 117, 83, 0.16) 0%, rgba(58, 117, 83, 0) 58%);
        opacity: 0.26;
        z-index: -1;
      }
      .ui-theme-lamberto .card,
      .ui-theme-lamberto .market-wrap,
      .ui-theme-lamberto .registry-wrap {
        background: linear-gradient(180deg, rgba(9, 34, 58, 0.9) 0%, rgba(7, 26, 47, 0.88) 100%);
        border-color: rgba(92, 175, 206, 0.62);
      }
      .ui-theme-lamberto .label,
      .ui-theme-lamberto .market-title,
      .ui-theme-lamberto .wallet-key-title {
        color: #ffd57f;
      }
      .ui-theme-lamberto .env-banner {
        color: #ffe8b1;
        border-color: rgba(254, 215, 140, 0.64);
        background: rgba(255, 213, 127, 0.12);
      }
      .ui-theme-lamberto .mode-badge {
        color: #ffe7b5;
        border-color: rgba(255, 194, 98, 0.76);
        background: rgba(255, 194, 98, 0.16);
      }
      .ui-theme-lamberto .meta-brand {
        color: #f0fbff !important;
        border-color: rgba(108, 198, 231, 0.72) !important;
        background: rgba(11, 48, 78, 0.78) !important;
      }
      .ui-theme-lamberto .meta-logo {
        color: #f7fcff !important;
        border-color: rgba(132, 215, 244, 0.88) !important;
      }
      body.ui-theme-cobol {
        --panel-bg: rgba(5, 18, 10, 0.83);
        --panel-border: rgba(82, 255, 150, 0.42);
        --panel-shadow: 0 10px 26px rgba(0, 0, 0, 0.55);
        --text-primary: #d4ffd7;
        --text-secondary: #91d79f;
        --address-color: #ffe66d;
        --accent-primary: #39ff14;
        --accent-primary-hover: #7dff62;
        --accent-info: #65ffa8;
        --accent-success: #50fa7b;
        --accent-danger: #ff7b7b;
        background:
          repeating-linear-gradient(180deg, rgba(8, 28, 13, 0.97) 0px, rgba(8, 28, 13, 0.97) 2px, rgba(5, 19, 9, 0.95) 3px, rgba(5, 19, 9, 0.95) 4px),
          linear-gradient(180deg, #071b0d 0%, #061409 100%);
      }
      .ui-theme-cobol .card,
      .ui-theme-cobol .market-wrap,
      .ui-theme-cobol .registry-wrap {
        background: linear-gradient(180deg, rgba(8, 28, 13, 0.93) 0%, rgba(5, 18, 10, 0.9) 100%);
        border-color: rgba(97, 255, 161, 0.5);
        box-shadow: 0 0 0 1px rgba(97, 255, 161, 0.12) inset, 0 12px 28px rgba(0, 0, 0, 0.52);
      }
      .ui-theme-cobol .label,
      .ui-theme-cobol .market-title,
      .ui-theme-cobol .wallet-key-title {
        color: #9dffa0;
      }
      .ui-theme-cobol .meta-brand {
        color: #ddffe1 !important;
        border-color: rgba(121, 255, 175, 0.72) !important;
        background: rgba(10, 34, 14, 0.74) !important;
      }
      .ui-theme-cobol .meta-logo {
        color: #ddffe1 !important;
        border-color: rgba(121, 255, 175, 0.8) !important;
      }
      .ui-theme-cobol .env-banner {
        color: #b5ffbf;
        border-color: rgba(121, 255, 175, 0.64);
        background: rgba(57, 255, 20, 0.09);
      }
      .ui-theme-cobol .mode-badge {
        color: #e9ff9f;
        border-color: rgba(233, 255, 159, 0.72);
        background: rgba(233, 255, 159, 0.12);
      }
    </style>
  </head>
  <body class="ui-theme-${uiTheme}">
    <div class="env-banner">
      <span id="envLabel">ENVIRONMENT: ${modeLabel}</span>
      <span class="theme-picker">
        <span class="theme-picker-group">
          <span class="theme-picker-label" id="panelThemeLabel">Panel</span>
          <select class="theme-picker-select" id="uiThemeSelect">
            <option value="neon">Neon Focus</option>
            <option value="pro">Pro Studio</option>
            <option value="bittensor">Bittensor Signal</option>
            <option value="lamberto">Lamberto Ubatuba Beach</option>
            <option value="cobol">COBOL Terminal</option>
            <option value="calm-light">Calm Light BTC</option>
            <option value="btc-dawn-light">BTC Dawn Light</option>
          </select>
        </span>
        <span class="theme-picker-group">
          <span class="theme-picker-label" id="vscodeThemeLabel">VS Code</span>
          <select class="theme-picker-select" id="workbenchThemeSelect">
            <option value="vaporwave-neon-dusk">Vaporwave Neon Dusk</option>
            <option value="bittensor-signal">Bittensor Signal</option>
            <option value="lamberto-shoreline">Lamberto Ubatuba Beach</option>
            <option value="cobol-terminal">COBOL Terminal</option>
            <option value="vaporwave-midnight">Vaporwave Midnight</option>
            <option value="bitcoin-sober">Bitcoin Sober</option>
            <option value="bitcoin-calm-light">Bitcoin Calm Light</option>
          </select>
        </span>
        <span class="theme-picker-group">
          <span class="theme-picker-label" id="languageLabel">Language</span>
          <select class="theme-picker-select" id="localeSelect">
            <option value="en">English</option>
            <option value="pt-BR">Portugues (Brasil)</option>
            <option value="fr">Francais</option>
            <option value="es">Espanol</option>
            <option value="de">Deutsch</option>
            <option value="ru">Русский</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
            <option value="ar">العربية</option>
          </select>
        </span>
      </span>
    </div>
    <div class="card wallet-card">
      <div class="wallet-head">
        <div class="label wallet-title">Wallet Lab</div>
        <div class="wallet-head-right">
          <div class="status">
            <span class="dot"></span>
            <span>${statusLabel}</span>
          </div>
        </div>
      </div>
      <div class="wallet-brand-row">
        <span class="wallet-brand-group">
          <span class="wallet-brand-title" id="networkLabel">Network</span>
          <span class="meta-brand" style="background:${networkBrand.bg}; border-color:${networkBrand.border}; color:${networkBrand.fg};">
            <span class="meta-logo" style="border-color:${networkBrand.fg}; color:${networkBrand.fg};">${networkLogoUri ? `<img class="meta-logo-img" src="${networkLogoUri}" alt="${this.escapeHtml(networkBrand.label)} logo" />` : ""}<span class="${networkLogoUri ? "meta-logo-fallback-hidden" : ""}">${networkBrand.mark}</span></span>
            ${networkBrand.label}
          </span>
        </span>
        <span class="wallet-brand-group">
          <span class="wallet-brand-title" id="walletLabel">Wallet</span>
          <span class="meta-brand" style="background:${providerBrand.bg}; border-color:${providerBrand.border}; color:${providerBrand.fg};">
            <span class="meta-logo" style="border-color:${providerBrand.fg}; color:${providerBrand.fg};">${providerLogoUri ? `<img class="meta-logo-img" src="${providerLogoUri}" alt="${this.escapeHtml(providerBrand.label)} logo" />` : ""}<span class="${providerLogoUri ? "meta-logo-fallback-hidden" : ""}">${providerBrand.mark}</span></span>
            ${providerBrand.label}
          </span>
        </span>
      </div>
      <div class="wallet-key-title" id="publicKeyLabel">Public Key</div>
      <div class="value ${state.connected ? "wallet-address" : ""}">${state.connected ? state.address : "No wallet connected"}</div>
      <div class="mode-badge" id="modeBadge">MODE: ${modeLabel}</div>
    </div>

    <div class="actions">
      <button class="btn btn-primary btn-wide" id="connectBtn">Connect Wallet</button>
      <button class="btn btn-secondary" id="contractCheckBtn">Contract Check</button>
      <button class="btn btn-secondary" id="openProviderBtn">Wallet Site</button>
      ${balanceButtonHtml}
      <button class="btn btn-secondary" id="copyBtn">Copy Address</button>
      <div class="donate-menu">
        <button class="btn btn-secondary" id="donateBtn"><img class="btn-icon" src="${donateIconUri}" alt="Donate" /><span id="donateBtnText">Donate</span></button>
        <div class="donate-flyout" aria-label="Donate addresses and QR codes">
          <div class="donate-flyout-title">Hover address for QR | Click to copy</div>
          <div class="donate-address-grid">${donateAddressesHtml}</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-wide" id="disconnectBtn">Disconnect</button>
    </div>

    <p class="hint">
      Built for Web3 devs, AI agents, and human testers. Use real wallets safely or generate test addresses in seconds.
    </p>

    <div class="market-wrap">
      <div class="market-title" id="marketTitle">Crypto Market Snapshot</div>
      <div class="market-subtitle" id="marketTimestamp">Loading live prices...</div>
      <div class="market-favorites">
        <div class="market-favorites-title" id="pinnedFavoritesLabel">Pinned Favorites</div>
        <div class="market-favorites-grid" id="marketFavorites"></div>
        <div class="market-favorite-empty" id="marketFavoritesEmpty">Pin bubbles to keep your top coins at hand.</div>
      </div>
      <div class="market-tools">
        <div class="market-search-wrap">
          <input class="market-input" id="marketSearchInput" placeholder="Search coin (BTC, ETH, DOGE, xrp, cardano...)" autocomplete="off" />
          <div class="market-autocomplete" id="marketAutocomplete" style="display:none;"></div>
        </div>
        <button class="btn btn-secondary market-add-btn" id="marketSearchBtn">Add</button>
      </div>
      <div class="market-hint" id="marketHint">Tip: you can type symbol or CoinGecko id.</div>
      <div class="bubble-grid" id="marketBubbles"></div>
      <div class="market-error" id="marketError" style="display:none;"></div>
      <div class="chart-wrap">
        <div class="chart-tools">
          <select class="chart-select" id="chartCoinSelect"></select>
          <select class="chart-range-select" id="chartRangeSelect">
            <option value="max">Max</option>
            <option value="5y">5Y</option>
            <option value="1y">1Y</option>
            <option value="90d">90D</option>
          </select>
          <button class="btn btn-secondary" id="chartRefreshBtn">Chart</button>
        </div>
        <div class="chart-timeframe" id="chartTimeframe">Range: loading...</div>
        <div class="chart-surface" id="priceChartSurface">
          <div class="chart-empty">Loading chart...</div>
        </div>
      </div>
    </div>

    <div class="registry-wrap">
      <div class="market-title" id="walletRegistryTitle">Wallet Registry</div>
      <div class="market-subtitle" id="walletRegistrySubtitle">Real and test addresses used in this tool.</div>
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
      const currentWorkbenchTheme = '${editorTheme}';
      const currentLocale = '${locale}';
      let activeLocale = currentLocale;
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
      const workbenchThemeSelectEl = document.getElementById('workbenchThemeSelect');
      const localeSelectEl = document.getElementById('localeSelect');

      const i18n = {
        en: {
          panel: 'Panel', vscode: 'VS Code', language: 'Language', env: 'ENVIRONMENT',
          network: 'Network', wallet: 'Wallet', publicKey: 'Public Key', mode: 'MODE',
          connect: 'Connect Wallet', contract: 'Contract Check', site: 'Wallet Site', balance: 'Check Balance', copy: 'Copy Address', donate: 'Donate', disconnect: 'Disconnect',
          market: 'Crypto Market Snapshot', favorites: 'Pinned Favorites', favEmpty: 'Pin bubbles to keep your top coins at hand.',
          searchPlaceholder: 'Search coin (BTC, ETH, DOGE, xrp, cardano...)', add: 'Add', hint: 'Tip: you can type symbol or CoinGecko id.',
          chart: 'Chart', registry: 'Wallet Registry', registrySub: 'Real and test addresses used in this tool.',
          rangeLoading: 'Range: loading...', realBalances: 'Check Real Balances', exportRegistry: 'Export Registry', exportBalance: 'Export Balance', exportContract: 'Export Contract', clearList: 'Clear List'
        },
        'pt-BR': {
          panel: 'Painel', vscode: 'VS Code', language: 'Idioma', env: 'AMBIENTE',
          network: 'Rede', wallet: 'Carteira', publicKey: 'Chave Publica', mode: 'MODO',
          connect: 'Conectar Carteira', contract: 'Checar Contrato', site: 'Site da Carteira', balance: 'Checar Saldo', copy: 'Copiar Endereco', donate: 'Doar', disconnect: 'Desconectar',
          market: 'Snapshot do Mercado Cripto', favorites: 'Favoritos Fixados', favEmpty: 'Fixe bolhas para manter suas moedas principais.',
          searchPlaceholder: 'Buscar moeda (BTC, ETH, DOGE, xrp, cardano...)', add: 'Adicionar', hint: 'Dica: voce pode digitar simbolo ou id do CoinGecko.',
          chart: 'Grafico', registry: 'Registro de Carteiras', registrySub: 'Enderecos reais e de teste usados nesta ferramenta.',
          rangeLoading: 'Periodo: carregando...', realBalances: 'Checar Saldos Reais', exportRegistry: 'Exportar Registro', exportBalance: 'Exportar Saldo', exportContract: 'Exportar Contrato', clearList: 'Limpar Lista'
        },
        fr: { panel: 'Panneau', vscode: 'VS Code', language: 'Langue', env: 'ENVIRONNEMENT', network: 'Reseau', wallet: 'Portefeuille', publicKey: 'Cle Publique', mode: 'MODE', connect: 'Connecter Portefeuille', contract: 'Verifier Contrat', site: 'Site du Wallet', balance: 'Verifier Solde', copy: 'Copier Adresse', donate: 'Don', disconnect: 'Deconnecter', market: 'Apercu Marche Crypto', favorites: 'Favoris Epingles', favEmpty: 'Epinglez des bulles pour garder vos principales pieces.', searchPlaceholder: 'Rechercher coin (BTC, ETH, DOGE, xrp, cardano...)', add: 'Ajouter', hint: 'Astuce: symbole ou id CoinGecko.', chart: 'Graphique', registry: 'Registre Wallet', registrySub: 'Adresses reelles et test utilisees.', rangeLoading: 'Periode: chargement...', realBalances: 'Verifier Soldes Reels', exportRegistry: 'Exporter Registre', exportBalance: 'Exporter Solde', exportContract: 'Exporter Contrat', clearList: 'Vider Liste' },
        es: { panel: 'Panel', vscode: 'VS Code', language: 'Idioma', env: 'ENTORNO', network: 'Red', wallet: 'Billetera', publicKey: 'Clave Publica', mode: 'MODO', connect: 'Conectar Billetera', contract: 'Verificar Contrato', site: 'Sitio Wallet', balance: 'Verificar Saldo', copy: 'Copiar Direccion', donate: 'Donar', disconnect: 'Desconectar', market: 'Resumen Mercado Cripto', favorites: 'Favoritos Fijados', favEmpty: 'Fija burbujas para mantener tus monedas top.', searchPlaceholder: 'Buscar moneda (BTC, ETH, DOGE, xrp, cardano...)', add: 'Agregar', hint: 'Tip: simbolo o id de CoinGecko.', chart: 'Grafico', registry: 'Registro de Billeteras', registrySub: 'Direcciones reales y de prueba usadas en esta herramienta.', rangeLoading: 'Periodo: cargando...', realBalances: 'Verificar Saldos Reales', exportRegistry: 'Exportar Registro', exportBalance: 'Exportar Saldo', exportContract: 'Exportar Contrato', clearList: 'Limpiar Lista' },
        de: { panel: 'Panel', vscode: 'VS Code', language: 'Sprache', env: 'UMGEBUNG', network: 'Netzwerk', wallet: 'Wallet', publicKey: 'Public Key', mode: 'MODUS', connect: 'Wallet Verbinden', contract: 'Vertrag Prufen', site: 'Wallet Seite', balance: 'Saldo Prufen', copy: 'Adresse Kopieren', donate: 'Spenden', disconnect: 'Trennen', market: 'Krypto Markt Ubersicht', favorites: 'Angepinnte Favoriten', favEmpty: 'Pinne Blasen fur deine Top Coins.', searchPlaceholder: 'Coin suchen (BTC, ETH, DOGE, xrp, cardano...)', add: 'Hinzufugen', hint: 'Tipp: Symbol oder CoinGecko-ID.', chart: 'Chart', registry: 'Wallet Register', registrySub: 'Reale und Test-Adressen in diesem Tool.', rangeLoading: 'Zeitraum: wird geladen...', realBalances: 'Reale Salden Prufen', exportRegistry: 'Register Export', exportBalance: 'Saldo Export', exportContract: 'Vertrag Export', clearList: 'Liste Loschen' },
        ru: { panel: 'Панель', vscode: 'VS Code', language: 'Язык', env: 'СРЕДА', network: 'Сеть', wallet: 'Кошелек', publicKey: 'Публичный ключ', mode: 'РЕЖИМ', connect: 'Подключить кошелек', contract: 'Проверка контракта', site: 'Сайт кошелька', balance: 'Проверить баланс', copy: 'Копировать адрес', donate: 'Поддержать', disconnect: 'Отключить', market: 'Снимок крипторынка', favorites: 'Закрепленные избранные', favEmpty: 'Закрепляйте монеты для быстрого доступа.', searchPlaceholder: 'Поиск монеты (BTC, ETH, DOGE, xrp, cardano...)', add: 'Добавить', hint: 'Подсказка: символ или id CoinGecko.', chart: 'График', registry: 'Реестр кошельков', registrySub: 'Реальные и тестовые адреса в инструменте.', rangeLoading: 'Период: загрузка...', realBalances: 'Проверить реальные балансы', exportRegistry: 'Экспорт реестра', exportBalance: 'Экспорт баланса', exportContract: 'Экспорт контракта', clearList: 'Очистить список' },
        ja: { panel: 'パネル', vscode: 'VS Code', language: '言語', env: '環境', network: 'ネットワーク', wallet: 'ウォレット', publicKey: '公開鍵', mode: 'モード', connect: 'ウォレット接続', contract: 'コントラクト確認', site: 'ウォレットサイト', balance: '残高確認', copy: 'アドレスコピー', donate: '寄付', disconnect: '切断', market: '暗号市場スナップショット', favorites: '固定お気に入り', favEmpty: 'バブルを固定して主要コインを保持します。', searchPlaceholder: 'コイン検索 (BTC, ETH, DOGE, xrp, cardano...)', add: '追加', hint: 'ヒント: シンボルまたはCoinGecko id。', chart: 'チャート', registry: 'ウォレット登録', registrySub: 'このツールで使われた実/テストアドレス。', rangeLoading: '期間: 読み込み中...', realBalances: '実残高チェック', exportRegistry: '登録をエクスポート', exportBalance: '残高をエクスポート', exportContract: '契約をエクスポート', clearList: 'リストをクリア' },
        zh: { panel: '面板', vscode: 'VS Code', language: '语言', env: '环境', network: '网络', wallet: '钱包', publicKey: '公钥', mode: '模式', connect: '连接钱包', contract: '合约检查', site: '钱包网站', balance: '检查余额', copy: '复制地址', donate: '赞助', disconnect: '断开连接', market: '加密市场快照', favorites: '置顶收藏', favEmpty: '置顶气泡以保留常用币种。', searchPlaceholder: '搜索币种 (BTC, ETH, DOGE, xrp, cardano...)', add: '添加', hint: '提示: 可输入符号或CoinGecko id。', chart: '图表', registry: '钱包登记', registrySub: '此工具中使用的真实和测试地址。', rangeLoading: '区间: 加载中...', realBalances: '检查真实余额', exportRegistry: '导出登记', exportBalance: '导出余额', exportContract: '导出合约', clearList: '清空列表' },
        ar: { panel: 'اللوحة', vscode: 'VS Code', language: 'اللغة', env: 'البيئة', network: 'الشبكة', wallet: 'المحفظة', publicKey: 'المفتاح العام', mode: 'الوضع', connect: 'ربط المحفظة', contract: 'فحص العقد', site: 'موقع المحفظة', balance: 'فحص الرصيد', copy: 'نسخ العنوان', donate: 'تبرع', disconnect: 'قطع الاتصال', market: 'لقطة سوق الكريبتو', favorites: 'المفضلة المثبتة', favEmpty: 'ثبّت الفقاعات للاحتفاظ بأهم العملات.', searchPlaceholder: 'ابحث عن عملة (BTC, ETH, DOGE, xrp, cardano...)', add: 'إضافة', hint: 'نصيحة: يمكنك كتابة الرمز أو معرف CoinGecko.', chart: 'الرسم البياني', registry: 'سجل المحافظ', registrySub: 'عناوين حقيقية وتجريبية مستخدمة في الأداة.', rangeLoading: 'النطاق: جار التحميل...', realBalances: 'فحص الأرصدة الحقيقية', exportRegistry: 'تصدير السجل', exportBalance: 'تصدير الرصيد', exportContract: 'تصدير العقد', clearList: 'مسح القائمة' }
      };

      function t(key) {
        const localeMap = i18n[activeLocale] || i18n.en;
        return localeMap[key] || i18n.en[key] || key;
      }

      function applyTranslations() {
        const envText = t('env') + ': ${modeLabel}';
        const envLabelEl = document.getElementById('envLabel');
        if (envLabelEl) {
          envLabelEl.textContent = envText;
        }
        document.getElementById('panelThemeLabel').textContent = t('panel');
        document.getElementById('vscodeThemeLabel').textContent = t('vscode');
        document.getElementById('languageLabel').textContent = t('language');
        document.getElementById('networkLabel').textContent = t('network');
        document.getElementById('walletLabel').textContent = t('wallet');
        document.getElementById('publicKeyLabel').textContent = t('publicKey');
        document.getElementById('modeBadge').textContent = t('mode') + ': ${modeLabel}';
        document.getElementById('connectBtn').textContent = t('connect');
        document.getElementById('contractCheckBtn').textContent = t('contract');
        document.getElementById('openProviderBtn').textContent = t('site');
        const balanceButtonEl = document.getElementById('balanceBtn');
        if (balanceButtonEl) {
          balanceButtonEl.textContent = t('balance');
        }
        document.getElementById('copyBtn').textContent = t('copy');
        document.getElementById('donateBtnText').textContent = t('donate');
        document.getElementById('disconnectBtn').textContent = t('disconnect');
        document.getElementById('marketTitle').textContent = t('market');
        document.getElementById('pinnedFavoritesLabel').textContent = t('favorites');
        document.getElementById('marketFavoritesEmpty').textContent = t('favEmpty');
        const searchInputEl = document.getElementById('marketSearchInput');
        if (searchInputEl) {
          searchInputEl.placeholder = t('searchPlaceholder');
        }
        document.getElementById('marketSearchBtn').textContent = t('add');
        document.getElementById('marketHint').textContent = t('hint');
        document.getElementById('chartRefreshBtn').textContent = t('chart');
        document.getElementById('walletRegistryTitle').textContent = t('registry');
        document.getElementById('walletRegistrySubtitle').textContent = t('registrySub');
        document.getElementById('checkRegistryBalancesBtn').textContent = t('realBalances');
        document.getElementById('exportRegistryBtn').textContent = t('exportRegistry');
        document.getElementById('exportBalanceBtn').textContent = t('exportBalance');
        document.getElementById('exportContractBtn').textContent = t('exportContract');
        document.getElementById('clearRegistryBtn').textContent = t('clearList');
        const chartTimeframeLocalEl = document.getElementById('chartTimeframe');
        if (chartTimeframeLocalEl && chartTimeframeLocalEl.textContent === 'Range: loading...') {
          chartTimeframeLocalEl.textContent = t('rangeLoading');
        }
      }

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

      workbenchThemeSelectEl.value = currentWorkbenchTheme;
      workbenchThemeSelectEl.addEventListener('change', () => {
        vscode.postMessage({ command: 'setWorkbenchTheme', workbenchThemeId: workbenchThemeSelectEl.value });
      });

      localeSelectEl.value = activeLocale;
      localeSelectEl.addEventListener('change', () => {
        activeLocale = localeSelectEl.value;
        document.body.dir = activeLocale === 'ar' ? 'rtl' : 'ltr';
        applyTranslations();
        vscode.postMessage({ command: 'setLocale', localeId: activeLocale });
      });

      document.body.dir = activeLocale === 'ar' ? 'rtl' : 'ltr';
      applyTranslations();

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
        dot: 'polkadot',
        xaut: 'tether-gold',
        htx: 'htx-dao',
        huobi: 'huobi-token',
        ht: 'huobi-token'
      };

      const extraCandidateIdsByQuery = {
        htx: ['htx-dao', 'huobi-token'],
        huobi: ['huobi-token', 'htx-dao'],
        ht: ['huobi-token']
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
        polkadot: 'DOT',
        'tether-gold': 'XAUT',
        'htx-dao': 'HTX',
        'huobi-token': 'HT'
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
        polkadot: 'polkadot',
        'huobi-token': 'huobi-token'
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
        polkadot: 'DOTUSDT',
        'huobi-token': 'HTUSDT'
      };

      const yahooSymbolByCoinId = {
        bitcoin: 'BTC-USD',
        ethereum: 'ETH-USD',
        solana: 'SOL-USD',
        binancecoin: 'BNB-USD',
        ripple: 'XRP-USD',
        cardano: 'ADA-USD',
        tron: 'TRX-USD',
        dogecoin: 'DOGE-USD',
        chainlink: 'LINK-USD',
        polkadot: 'DOT-USD',
        'matic-network': 'MATIC-USD',
        'avalanche-2': 'AVAX-USD'
      };

      const marketBubblesEl = document.getElementById('marketBubbles');
      const marketTimestampEl = document.getElementById('marketTimestamp');
      const marketErrorEl = document.getElementById('marketError');
      const marketSearchInputEl = document.getElementById('marketSearchInput');
      const marketSearchBtnEl = document.getElementById('marketSearchBtn');
      const marketAutocompleteEl = document.getElementById('marketAutocomplete');
      const marketFavoritesEl = document.getElementById('marketFavorites');
      const marketFavoritesEmptyEl = document.getElementById('marketFavoritesEmpty');
      const chartCoinSelectEl = document.getElementById('chartCoinSelect');
      const chartRangeSelectEl = document.getElementById('chartRangeSelect');
      const chartRefreshBtnEl = document.getElementById('chartRefreshBtn');
      const chartTimeframeEl = document.getElementById('chartTimeframe');
      const priceChartSurfaceEl = document.getElementById('priceChartSurface');
      const favoriteAssetIds = new Set(['bitcoin', 'ethereum']);
      let activeSuggestions = [];
      let activeSuggestionIndex = -1;
      let autocompleteTimer = null;
      let selectedSuggestionId = '';
      let coinGeckoCoinListCache = [];
      let coinGeckoCoinListFetchedAt = 0;
      let chartRangeSetting = 'max';
      let chartProviderRotationIndex = 0;

      async function getCoinGeckoCoinList() {
        const now = Date.now();
        const ttlMs = 6 * 60 * 60 * 1000;
        if (coinGeckoCoinListCache.length > 0 && (now - coinGeckoCoinListFetchedAt) < ttlMs) {
          return coinGeckoCoinListCache;
        }

        const endpoint = 'https://api.coingecko.com/api/v3/coins/list?include_platform=false';
        const payload = await fetchJsonWithRetry(endpoint, 1, 20000);
        coinGeckoCoinListCache = Array.isArray(payload) ? payload : [];
        coinGeckoCoinListFetchedAt = Date.now();
        return coinGeckoCoinListCache;
      }

      function formatUsd(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: value < 1 ? 6 : 2
        }).format(value);
      }

      function getPreferredSymbol(asset) {
        return String(asset?.symbol || '').toUpperCase().replace(/[^A-Z0-9]/g, '') || 'COIN';
      }

      function getSyntheticSymbolFromId(assetId) {
        const rawId = String(assetId || '').toLowerCase();
        if (!rawId.startsWith('symbol:')) {
          return '';
        }

        const rawSymbol = rawId.replace('symbol:', '').toUpperCase();
        return rawSymbol.replace(/[^A-Z0-9]/g, '').slice(0, 12);
      }

      function getYahooSymbolForAsset(asset) {
        const rawId = String(asset?.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;

        const syntheticSymbol = getSyntheticSymbolFromId(rawId);
        if (syntheticSymbol) {
          return syntheticSymbol + '-USD';
        }

        if (yahooSymbolByCoinId[normalizedId]) {
          return yahooSymbolByCoinId[normalizedId];
        }

        const symbol = getPreferredSymbol(asset);
        return symbol ? symbol + '-USD' : '';
      }

      function setAutocompleteVisible(visible) {
        marketAutocompleteEl.style.display = visible ? 'block' : 'none';
      }

      function clearAutocomplete() {
        activeSuggestions = [];
        activeSuggestionIndex = -1;
        marketAutocompleteEl.innerHTML = '';
        setAutocompleteVisible(false);
      }

      function applySuggestionByIndex(index) {
        const suggestion = activeSuggestions[index];
        if (!suggestion) {
          return;
        }

        selectedSuggestionId = String(suggestion.id || '').toLowerCase();
        marketSearchInputEl.value = suggestion.symbol || suggestion.id;
        clearAutocomplete();
      }

      function renderAutocompleteSuggestions(suggestions) {
        activeSuggestions = Array.isArray(suggestions) ? suggestions : [];
        activeSuggestionIndex = -1;

        if (activeSuggestions.length === 0) {
          clearAutocomplete();
          return;
        }

        marketAutocompleteEl.innerHTML = '';
        activeSuggestions.forEach((coin, index) => {
          const row = document.createElement('button');
          row.type = 'button';
          row.className = 'market-autocomplete-item';
          row.innerHTML =
            '<div class="market-autocomplete-primary">'
            + String(coin.symbol || '').toUpperCase()
            + ' - '
            + String(coin.name || '')
            + '</div>'
            + '<div class="market-autocomplete-secondary">'
            + String(coin.id || '')
            + '</div>';
          row.addEventListener('click', () => applySuggestionByIndex(index));
          marketAutocompleteEl.appendChild(row);
        });

        setAutocompleteVisible(true);
      }

      function setActiveAutocompleteIndex(nextIndex) {
        const items = Array.from(marketAutocompleteEl.querySelectorAll('.market-autocomplete-item'));
        if (items.length === 0) {
          activeSuggestionIndex = -1;
          return;
        }

        const boundedIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
        activeSuggestionIndex = boundedIndex;
        items.forEach((item, index) => item.classList.toggle('active', index === boundedIndex));
      }

      async function refreshAutocompleteSuggestions(rawQuery) {
        const normalized = rawQuery.trim();
        if (!normalized || normalized.length < 2) {
          clearAutocomplete();
          return;
        }

        try {
          const endpoint = 'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(normalized);
          const payload = await fetchJsonWithRetry(endpoint, 1, 9000);
          const suggestions = Array.isArray(payload?.coins)
            ? payload.coins.slice(0, 8).map((coin) => ({
                id: String(coin.id || ''),
                symbol: String(coin.symbol || '').toUpperCase(),
                name: String(coin.name || ''),
              })).filter((coin) => coin.id)
            : [];

          renderAutocompleteSuggestions(suggestions);
        } catch {
          clearAutocomplete();
        }
      }

      function renderFavoriteBubbles(payload) {
        marketFavoritesEl.innerHTML = '';
        const favoriteAssets = marketConfig.filter((asset) => favoriteAssetIds.has(asset.id));

        if (favoriteAssets.length === 0) {
          marketFavoritesEmptyEl.style.display = 'block';
          return;
        }

        marketFavoritesEmptyEl.style.display = 'none';

        favoriteAssets.forEach((asset) => {
          const data = payload?.[asset.id];
          const hasPrice = data && typeof data.usd === 'number';
          const bubble = document.createElement('div');
          bubble.className = 'bubble ' + ((data?.usd_24h_change ?? 0) >= 0 ? 'bubble-up' : 'bubble-down');

          const label = document.createElement('span');
          label.className = 'bubble-main';
          label.textContent = hasPrice
            ? asset.symbol + ' ' + formatUsd(data.usd)
            : asset.symbol + ' (loading)';

          const unpinBtn = document.createElement('button');
          unpinBtn.type = 'button';
          unpinBtn.className = 'bubble-pin active';
          unpinBtn.title = 'Unpin favorite';
          unpinBtn.textContent = '★';
          unpinBtn.addEventListener('click', () => {
            favoriteAssetIds.delete(asset.id);
            renderFavoriteBubbles(payload);
            renderBubbles(payload);
          });

          bubble.appendChild(label);
          bubble.appendChild(unpinBtn);
          marketFavoritesEl.appendChild(bubble);
        });
      }

      function renderBubbles(payload) {
        marketBubblesEl.innerHTML = '';
        renderFavoriteBubbles(payload);

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
          content.className = 'bubble-main';
          content.textContent = asset.symbol + ' ' + formatUsd(data.usd) + ' (' + changePrefix + change.toFixed(2) + '%)';

          const actions = document.createElement('span');
          actions.className = 'bubble-actions';

          const pinBtn = document.createElement('button');
          pinBtn.className = 'bubble-pin' + (favoriteAssetIds.has(asset.id) ? ' active' : '');
          pinBtn.type = 'button';
          pinBtn.title = favoriteAssetIds.has(asset.id) ? 'Unpin favorite' : 'Pin favorite';
          pinBtn.textContent = favoriteAssetIds.has(asset.id) ? '★' : '☆';
          pinBtn.addEventListener('click', () => {
            if (favoriteAssetIds.has(asset.id)) {
              favoriteAssetIds.delete(asset.id);
            } else {
              favoriteAssetIds.add(asset.id);
            }
            renderFavoriteBubbles(payload);
            void refreshMarketBubbles();
          });

          const removeBtn = document.createElement('button');
          removeBtn.className = 'bubble-remove';
          removeBtn.type = 'button';
          removeBtn.title = 'Remove coin bubble';
          removeBtn.textContent = '×';
          removeBtn.addEventListener('click', () => {
            const index = marketConfig.findIndex((entry) => entry.id === asset.id);
            if (index >= 0) {
              marketConfig.splice(index, 1);
              favoriteAssetIds.delete(asset.id);
              void refreshMarketBubbles();
            }
          });

          bubble.appendChild(content);
          actions.appendChild(pinBtn);
          actions.appendChild(removeBtn);
          bubble.appendChild(actions);
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

      function renderSparkline(points, startLabel, endLabel) {
        if (!Array.isArray(points) || points.length < 2) {
          renderChartPlaceholder('Not enough chart data');
          return;
        }

        const width = 320;
        const height = 90;
        const leftPad = 8;
        const rightPad = 8;
        const topPad = 14;
        const bottomPad = 20;
        const plotWidth = width - leftPad - rightPad;
        const plotHeight = height - topPad - bottomPad;
        const min = Math.min(...points);
        const max = Math.max(...points);
        const range = max - min || 1;

        const chartPoints = points.map((value, index) => {
          const x = leftPad + ((index / (points.length - 1)) * plotWidth);
          const y = topPad + ((1 - ((value - min) / range)) * plotHeight);
          return { x, y };
        });

        const path = chartPoints
          .map((point, index) => {
            return (index === 0 ? 'M' : 'L') + point.x.toFixed(2) + ' ' + point.y.toFixed(2);
          })
          .join(' ');

        const trendDown = points[points.length - 1] < points[0];
        const pathClass = trendDown ? 'chart-path chart-path-down' : 'chart-path';
        const maxLabel = formatUsd(max);
        const minLabel = formatUsd(min);
        const currentPriceLabel = formatUsd(points[points.length - 1]);
        const lastPoint = chartPoints[chartPoints.length - 1];
        const currentTextWidth = Math.max(36, (currentPriceLabel.length * 5.4) + 8);
        const currentTextX = lastPoint.x > (width * 0.68)
          ? Math.max(6, lastPoint.x - currentTextWidth - 8)
          : Math.min(width - currentTextWidth - 6, lastPoint.x + 8);
        const currentTextY = Math.max(12, Math.min(height - 22, lastPoint.y - 6));

        priceChartSurfaceEl.innerHTML =
          '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none" aria-label="price chart">'
          + '<text class="chart-scale-text" x="6" y="11">' + maxLabel + '</text>'
          + '<text class="chart-scale-text" x="6" y="' + (height - 7) + '">' + minLabel + '</text>'
          + '<text class="chart-scale-text" x="6" y="' + (height - 18) + '">' + (startLabel || '') + '</text>'
          + '<text class="chart-scale-text" x="' + (width - 6) + '" y="' + (height - 18) + '" text-anchor="end">' + (endLabel || '') + '</text>'
          + '<path class="' + pathClass + '" d="' + path + '"></path>'
          + '<circle cx="' + lastPoint.x.toFixed(2) + '" cy="' + lastPoint.y.toFixed(2) + '" r="2.4" fill="currentColor" class="' + pathClass + '"></circle>'
          + '<rect x="' + currentTextX.toFixed(2) + '" y="' + (currentTextY - 8).toFixed(2) + '" width="' + currentTextWidth.toFixed(2) + '" height="11" rx="3" fill="rgba(2,6,23,0.62)"></rect>'
          + '<text class="chart-scale-text" x="' + (currentTextX + 4).toFixed(2) + '" y="' + currentTextY.toFixed(2) + '">' + currentPriceLabel + '</text>'
          + '</svg>';
      }

      function formatChartDate(timestampMs) {
        if (!Number.isFinite(timestampMs)) {
          return '--';
        }

        return new Date(timestampMs).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
      }

      function buildChartWindowLabel(startMs, endMs, source) {
        if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) {
          return 'Range unavailable';
        }

        return 'Range: ' + formatChartDate(startMs) + ' to ' + formatChartDate(endMs) + ' | Source: ' + source;
      }

      function getRangeDays(rangeKey) {
        if (rangeKey === '90d') {
          return 90;
        }
        if (rangeKey === '1y') {
          return 365;
        }
        if (rangeKey === '5y') {
          return 1825;
        }
        return Number.POSITIVE_INFINITY;
      }

      function applyDailyRangeSlice(data, rangeKey) {
        const days = getRangeDays(rangeKey);
        if (!Number.isFinite(days) || !Array.isArray(data?.points) || data.points.length <= days) {
          return data;
        }

        const slicedPoints = data.points.slice(-days);
        const endMs = data.endMs;
        const computedStart = Number.isFinite(endMs) ? (endMs - ((days - 1) * 24 * 60 * 60 * 1000)) : data.startMs;

        return {
          points: slicedPoints,
          startMs: Number.isFinite(data.startMs) ? Math.max(data.startMs, computedStart) : computedStart,
          endMs
        };
      }

      function rotateProviderEntries(entries, rotationIndex) {
        if (!Array.isArray(entries) || entries.length <= 1) {
          return Array.isArray(entries) ? entries : [];
        }

        const safeRotation = Number.isFinite(rotationIndex) ? Math.abs(Math.floor(rotationIndex)) : 0;
        const offset = safeRotation % entries.length;
        return entries.slice(offset).concat(entries.slice(0, offset));
      }

      function selectOldestChartCandidate(candidates) {
        if (!Array.isArray(candidates) || candidates.length === 0) {
          return null;
        }

        return candidates.slice().sort((a, b) => {
          const aStart = Number.isFinite(a?.startMs) ? a.startMs : Number.POSITIVE_INFINITY;
          const bStart = Number.isFinite(b?.startMs) ? b.startMs : Number.POSITIVE_INFINITY;
          if (aStart !== bStart) {
            return aStart - bStart;
          }

          const aCount = Array.isArray(a?.points) ? a.points.length : 0;
          const bCount = Array.isArray(b?.points) ? b.points.length : 0;
          return bCount - aCount;
        })[0] || null;
      }

      function parseCoinGeckoChartData(payload) {
        if (!Array.isArray(payload?.prices)) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const rows = payload.prices
          .map((row) => ({
            time: Number(Array.isArray(row) ? row[0] : NaN),
            price: Number(Array.isArray(row) ? row[1] : NaN)
          }))
          .filter((row) => Number.isFinite(row.time) && Number.isFinite(row.price));

        if (rows.length < 2) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        return {
          points: rows.map((row) => row.price),
          startMs: rows[0].time,
          endMs: rows[rows.length - 1].time
        };
      }

      function parseCoinCapChartData(payload) {
        if (!Array.isArray(payload?.data)) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const rows = payload.data
          .map((row) => ({
            time: Number(row?.time),
            price: Number(row?.priceUsd)
          }))
          .filter((row) => Number.isFinite(row.time) && Number.isFinite(row.price));

        if (rows.length < 2) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        return {
          points: rows.map((row) => row.price),
          startMs: rows[0].time,
          endMs: rows[rows.length - 1].time
        };
      }

      function parseYahooChartData(payload) {
        const result = Array.isArray(payload?.chart?.result) ? payload.chart.result[0] : null;
        const timestamps = Array.isArray(result?.timestamp) ? result.timestamp : [];
        const closes = Array.isArray(result?.indicators?.quote)
          ? result.indicators.quote[0]?.close
          : [];

        if (!Array.isArray(closes) || !Array.isArray(timestamps)) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const rows = closes
          .map((value, index) => ({
            time: Number(timestamps[index]) * 1000,
            price: Number(value)
          }))
          .filter((row) => Number.isFinite(row.time) && Number.isFinite(row.price));

        if (rows.length < 2) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        return {
          points: rows.map((row) => row.price),
          startMs: rows[0].time,
          endMs: rows[rows.length - 1].time
        };
      }

      async function fetchYahooChartPointsForAsset(asset) {
        const yahooSymbol = getYahooSymbolForAsset(asset);
        if (!yahooSymbol) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        try {
          const endpoint = 'https://query1.finance.yahoo.com/v8/finance/chart/' + encodeURIComponent(yahooSymbol) + '?interval=1d&range=max';
          const payload = await fetchJsonWithRetry(endpoint, 1);
          return parseYahooChartData(payload);
        } catch {
          return { points: [], startMs: NaN, endMs: NaN };
        }
      }

      async function fetchCoinGeckoChartPointsForAsset(asset) {
        if (!asset || !asset.id) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const rawId = String(asset.id || '').toLowerCase();
        if (!rawId || rawId.startsWith('coincap:')) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const syntheticSymbol = getSyntheticSymbolFromId(rawId);
        let geckoId = rawId;

        if (syntheticSymbol) {
          try {
            const searchEndpoint = 'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(syntheticSymbol);
            const searchPayload = await fetchJsonWithRetry(searchEndpoint, 1, 9000);
            const bestMatch = pickBestCoinMatch(searchPayload?.coins, syntheticSymbol.toLowerCase());
            geckoId = bestMatch?.id ? String(bestMatch.id).toLowerCase() : '';
          } catch {
            geckoId = '';
          }

          if (!geckoId) {
            return { points: [], startMs: NaN, endMs: NaN };
          }
        }

        try {
          const geckoEndpoint =
            'https://api.coingecko.com/api/v3/coins/'
            + encodeURIComponent(geckoId)
            + '/market_chart?vs_currency=usd&days=max&interval=daily';
          const geckoPayload = await fetchJsonWithRetry(geckoEndpoint, 1, 25000);
          return parseCoinGeckoChartData(geckoPayload);
        } catch {
          return { points: [], startMs: NaN, endMs: NaN };
        }
      }

      async function fetchCoinCapChartPointsForAsset(asset) {
        if (!asset || !asset.id) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const rawId = String(asset.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;
        let coinCapId = coinCapIdByCoinGeckoId[normalizedId] || normalizedId;

        const syntheticSymbol = getSyntheticSymbolFromId(rawId);
        if (syntheticSymbol) {
          try {
            const searchEndpoint = 'https://api.coincap.io/v2/assets?search=' + encodeURIComponent(syntheticSymbol.toLowerCase());
            const searchPayload = await fetchJsonWithRetry(searchEndpoint, 1, 10000);
            const bestMatch = pickBestCoinCapMatch(searchPayload?.data, syntheticSymbol.toLowerCase());
            coinCapId = bestMatch?.id ? String(bestMatch.id).toLowerCase() : '';
          } catch {
            coinCapId = '';
          }
        }

        if (!coinCapId) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        try {
          const coincapEndpoint =
            'https://api.coincap.io/v2/assets/'
            + encodeURIComponent(coinCapId)
            + '/history?interval=d1';
          const coincapPayload = await fetchJsonWithRetry(coincapEndpoint, 1, 20000);
          return parseCoinCapChartData(coincapPayload);
        } catch {
          return { points: [], startMs: NaN, endMs: NaN };
        }
      }

      async function fetchBinanceChartPointsForAsset(asset) {
        const pair = getChartPairFromAsset(asset);
        if (!pair) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const maxBatches = 8;
        const batchLimit = 1000;
        const rows = [];
        let endTimeCursor = NaN;

        for (let batchIndex = 0; batchIndex < maxBatches; batchIndex += 1) {
          const cursorParam = Number.isFinite(endTimeCursor)
            ? '&endTime=' + Math.max(0, Math.floor(endTimeCursor))
            : '';
          const endpoint =
            'https://api.binance.com/api/v3/klines?symbol='
            + encodeURIComponent(pair)
            + '&interval=1d&limit='
            + batchLimit
            + cursorParam;

          let payload;
          try {
            payload = await fetchJsonWithRetry(endpoint, 1);
          } catch {
            break;
          }

          if (!Array.isArray(payload) || payload.length === 0) {
            break;
          }

          const parsedBatch = payload
            .map((item) => ({
              openTime: Number(item?.[0]),
              closeTime: Number(item?.[6]),
              closePrice: Number(item?.[4])
            }))
            .filter((item) => Number.isFinite(item.openTime) && Number.isFinite(item.closeTime) && Number.isFinite(item.closePrice));

          if (parsedBatch.length === 0) {
            break;
          }

          rows.push(...parsedBatch);

          const oldestOpenTime = parsedBatch[0].openTime;
          if (!Number.isFinite(oldestOpenTime) || parsedBatch.length < batchLimit) {
            break;
          }

          const nextCursor = oldestOpenTime - 1;
          if (!Number.isFinite(nextCursor) || nextCursor < 0 || nextCursor === endTimeCursor) {
            break;
          }

          endTimeCursor = nextCursor;
        }

        if (rows.length < 2) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        const uniqueByOpenTime = [];
        const seenOpenTimes = new Set();
        rows
          .sort((a, b) => a.openTime - b.openTime)
          .forEach((row) => {
            if (!seenOpenTimes.has(row.openTime)) {
              seenOpenTimes.add(row.openTime);
              uniqueByOpenTime.push(row);
            }
          });

        if (uniqueByOpenTime.length < 2) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        return {
          points: uniqueByOpenTime.map((row) => row.closePrice),
          startMs: uniqueByOpenTime[0].openTime,
          endMs: uniqueByOpenTime[uniqueByOpenTime.length - 1].closeTime
        };
      }

      async function fetchDexScreenerChartPointsForAsset(asset) {
        const symbol = getPreferredSymbol(asset);
        if (!symbol) {
          return [];
        }

        try {
          const endpoint = 'https://api.dexscreener.com/latest/dex/search/?q=' + encodeURIComponent(symbol);
          const payload = await fetchJsonWithRetry(endpoint, 1);
          if (!Array.isArray(payload?.pairs) || payload.pairs.length === 0) {
            return [];
          }

          return payload.pairs
            .slice(0, 18)
            .map((pair) => Number(pair?.priceUsd))
            .filter((value) => Number.isFinite(value));
        } catch {
          return [];
        }
      }

      async function fetchChartPointsForAsset(asset, rangeKey) {
        if (!asset || !asset.id) {
          return {
            points: [],
            startMs: NaN,
            endMs: NaN,
            timeframe: 'Range unavailable'
          };
        }

        const rawId = String(asset.id || '').toLowerCase();
        const providers = rotateProviderEntries(
          [
            {
              source: 'CoinGecko',
              enabled: !rawId.startsWith('coincap:'),
              load: () => fetchCoinGeckoChartPointsForAsset(asset)
            },
            {
              source: 'CoinCap',
              enabled: true,
              load: () => fetchCoinCapChartPointsForAsset(asset)
            },
            {
              source: 'Yahoo',
              enabled: true,
              load: () => fetchYahooChartPointsForAsset(asset)
            },
            {
              source: 'Binance',
              enabled: true,
              load: () => fetchBinanceChartPointsForAsset(asset)
            }
          ].filter((provider) => provider.enabled),
          chartProviderRotationIndex
        );

        if (providers.length === 0) {
          return {
            points: [],
            startMs: NaN,
            endMs: NaN,
            timeframe: 'Range unavailable'
          };
        }

        chartProviderRotationIndex = (chartProviderRotationIndex + 1) % providers.length;

        const candidates = [];
        for (const provider of providers) {
          try {
            const fullData = await provider.load();
            if (!Array.isArray(fullData?.points) || fullData.points.length < 2) {
              continue;
            }

            const slicedData = applyDailyRangeSlice(fullData, rangeKey);
            if (!Array.isArray(slicedData?.points) || slicedData.points.length < 2) {
              continue;
            }

            candidates.push({
              source: provider.source,
              points: slicedData.points,
              startMs: slicedData.startMs,
              endMs: slicedData.endMs
            });
          } catch {
            // Keep probing other sources to maximize chances of older history.
          }
        }

        const oldestCandidate = selectOldestChartCandidate(candidates);
        if (!oldestCandidate) {
          return {
            points: [],
            startMs: NaN,
            endMs: NaN,
            timeframe: 'Range unavailable'
          };
        }

        return {
          points: oldestCandidate.points,
          startMs: oldestCandidate.startMs,
          endMs: oldestCandidate.endMs,
          timeframe: buildChartWindowLabel(oldestCandidate.startMs, oldestCandidate.endMs, oldestCandidate.source)
        };
      }

      async function refreshSelectedChart() {
        const selectedId = chartCoinSelectEl.value;
        const selectedAsset = marketConfig.find((asset) => asset.id === selectedId);

        if (!selectedAsset) {
          renderChartPlaceholder('Chart unavailable for this asset');
          return;
        }

        try {
          renderChartPlaceholder('Loading chart...');
          const chartResult = await fetchChartPointsForAsset(selectedAsset, chartRangeSetting);
          const points = Array.isArray(chartResult?.points) ? chartResult.points : [];
          if (chartTimeframeEl) {
            chartTimeframeEl.textContent = String(chartResult?.timeframe || 'Range unavailable');
          }

          if (points.length < 2) {
            throw new Error('No data');
          }

          renderSparkline(points, formatChartDate(chartResult?.startMs), formatChartDate(chartResult?.endMs));
        } catch {
          if (chartTimeframeEl) {
            chartTimeframeEl.textContent = 'Range unavailable';
          }
          renderChartPlaceholder('Chart source unavailable now');
        }
      }

      function pickBestCoinFromListMatch(coins, normalized) {
        if (!Array.isArray(coins) || coins.length === 0) {
          return null;
        }

        const ranked = coins
          .map((coin) => {
            const id = String(coin.id || '').toLowerCase();
            const symbol = String(coin.symbol || '').toLowerCase();
            const name = String(coin.name || '').toLowerCase();

            let score = 0;
            if (id === normalized || id === normalized.replace(/\\s+/g, '-')) {
              score += 110;
            }
            if (symbol === normalized) {
              score += 105;
            }
            if (name === normalized) {
              score += 100;
            }
            if (id.startsWith(normalized)) {
              score += 55;
            }
            if (symbol.startsWith(normalized)) {
              score += 50;
            }
            if (name.startsWith(normalized)) {
              score += 45;
            }
            if (id.includes(normalized)) {
              score += 40;
            }
            if (name.includes(normalized)) {
              score += 30;
            }

            return {
              coin,
              score,
            };
          })
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score);

        return ranked[0]?.coin ?? null;
      }

      async function resolveCoinFromCoinGeckoList(rawQuery) {
        const normalized = rawQuery.trim().toLowerCase();
        if (!normalized) {
          return null;
        }

        try {
          const coins = await getCoinGeckoCoinList();
          const bestMatch = pickBestCoinFromListMatch(coins, normalized);
          if (!bestMatch || !bestMatch.id) {
            return null;
          }

          return {
            id: String(bestMatch.id).toLowerCase(),
            symbol: resolveSymbol(String(bestMatch.id).toLowerCase(), bestMatch.symbol || rawQuery),
            fromAlias: false
          };
        } catch {
          return null;
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
            if (id === normalized || id === normalized.replace(/\\s+/g, '-')) {
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

        const fromCoinList = await resolveCoinFromCoinGeckoList(rawQuery);
        if (fromCoinList) {
          return fromCoinList;
        }

        const fallbackId = normalized.replace(/\\s+/g, '-');
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

        if (Array.isArray(extraCandidateIdsByQuery[normalized])) {
          candidates.push(...extraCandidateIdsByQuery[normalized]);
        }

        candidates.push(normalized);
        candidates.push(normalized.replace(/\\s+/g, '-'));

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

      function mergeUniqueCoinIds(ids) {
        const merged = [];
        for (const id of ids) {
          const cleaned = String(id || '').trim().toLowerCase();
          if (!cleaned) {
            continue;
          }
          if (!merged.includes(cleaned)) {
            merged.push(cleaned);
          }
        }
        return merged;
      }

      function scoreSearchCoinCandidate(coin, normalizedQuery) {
        const id = String(coin?.id || '').toLowerCase();
        const symbol = String(coin?.symbol || '').toLowerCase();
        const name = String(coin?.name || '').toLowerCase();
        const marketCapRank = typeof coin?.market_cap_rank === 'number' ? coin.market_cap_rank : Number.MAX_SAFE_INTEGER;

        let score = 0;
        if (symbol === normalizedQuery) {
          score += 120;
        }
        if (id === normalizedQuery || id === normalizedQuery.replace(/\s+/g, '-')) {
          score += 110;
        }
        if (name === normalizedQuery) {
          score += 95;
        }
        if (symbol.startsWith(normalizedQuery)) {
          score += 65;
        }
        if (id.startsWith(normalizedQuery)) {
          score += 60;
        }
        if (name.startsWith(normalizedQuery)) {
          score += 55;
        }
        if (id.includes(normalizedQuery)) {
          score += 45;
        }
        if (name.includes(normalizedQuery)) {
          score += 35;
        }

        return {
          id,
          score,
          marketCapRank
        };
      }

      async function buildCoinGeckoSearchCandidateIds(rawQuery) {
        const normalizedQuery = String(rawQuery || '').trim().toLowerCase();
        if (!normalizedQuery) {
          return [];
        }

        try {
          const endpoint = 'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(normalizedQuery);
          const payload = await fetchJsonWithRetry(endpoint, 1, 9000);
          if (!Array.isArray(payload?.coins) || payload.coins.length === 0) {
            return [];
          }

          const rankedIds = payload.coins
            .map((coin) => scoreSearchCoinCandidate(coin, normalizedQuery))
            .filter((entry) => entry.score > 0 && entry.id)
            .sort((a, b) => {
              if (b.score !== a.score) {
                return b.score - a.score;
              }
              return a.marketCapRank - b.marketCapRank;
            })
            .slice(0, 20)
            .map((entry) => entry.id);

          return mergeUniqueCoinIds(rankedIds);
        } catch {
          return [];
        }
      }

      async function fetchJsonWithRetry(url, retries, timeoutMs = 12000) {
        let lastError = null;

        for (let attempt = 0; attempt <= retries; attempt += 1) {
          const controller = new AbortController();
          const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: { accept: 'application/json' },
              signal: controller.signal
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
          } finally {
            clearTimeout(timeoutHandle);
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
            if (id === normalized || id === normalized.replace(/\\s+/g, '-')) {
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

      async function fetchCryptoComparePriceForAsset(asset) {
        const symbol = getPreferredSymbol(asset);
        if (!symbol) {
          return null;
        }

        try {
          const endpoint = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + encodeURIComponent(symbol) + '&tsyms=USD';
          const payload = await fetchJsonWithRetry(endpoint, 1);
          const raw = payload?.RAW?.[symbol]?.USD;
          const usd = Number(raw?.PRICE);
          const change = Number(raw?.CHANGEPCT24HOUR);

          if (!Number.isFinite(usd)) {
            return null;
          }

          return {
            usd,
            usd_24h_change: Number.isFinite(change) ? change : 0,
          };
        } catch {
          return null;
        }
      }

      async function fetchYahooPriceForAsset(asset) {
        const yahooSymbol = getYahooSymbolForAsset(asset);
        if (!yahooSymbol) {
          return null;
        }

        try {
          const endpoint = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + encodeURIComponent(yahooSymbol);
          const payload = await fetchJsonWithRetry(endpoint, 1);
          const row = Array.isArray(payload?.quoteResponse?.result)
            ? payload.quoteResponse.result[0]
            : null;

          const usd = Number(row?.regularMarketPrice);
          const change = Number(row?.regularMarketChangePercent);

          if (!Number.isFinite(usd)) {
            return null;
          }

          return {
            usd,
            usd_24h_change: Number.isFinite(change) ? change : 0,
          };
        } catch {
          return null;
        }
      }

      async function fetchDexScreenerPriceForAsset(asset) {
        const symbol = getPreferredSymbol(asset);
        if (!symbol) {
          return null;
        }

        try {
          const endpoint = 'https://api.dexscreener.com/latest/dex/search/?q=' + encodeURIComponent(symbol);
          const payload = await fetchJsonWithRetry(endpoint, 1);
          if (!Array.isArray(payload?.pairs) || payload.pairs.length === 0) {
            return null;
          }

          const pair = payload.pairs.find((item) => Number.isFinite(Number(item?.priceUsd))) || payload.pairs[0];
          const usd = Number(pair?.priceUsd);
          const change = Number(pair?.priceChange?.h24);

          if (!Number.isFinite(usd)) {
            return null;
          }

          return {
            usd,
            usd_24h_change: Number.isFinite(change) ? change : 0,
          };
        } catch {
          return null;
        }
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

        const fromCryptoCompareEntries = await Promise.all(
          missingAfterCoinCap.map(async (asset) => {
            const priceData = await fetchCryptoComparePriceForAsset(asset);
            return priceData ? [asset.id, priceData] : null;
          })
        );

        const fromCryptoCompare = fromCryptoCompareEntries.reduce((acc, entry) => {
          if (entry) {
            acc[entry[0]] = entry[1];
          }
          return acc;
        }, {});

        const missingAfterCryptoCompare = missingAfterCoinCap.filter((asset) => {
          const current = fromCryptoCompare[asset.id];
          return !current || typeof current.usd !== 'number';
        });

        const fromYahooEntries = await Promise.all(
          missingAfterCryptoCompare.map(async (asset) => {
            const priceData = await fetchYahooPriceForAsset(asset);
            return priceData ? [asset.id, priceData] : null;
          })
        );

        const fromYahoo = fromYahooEntries.reduce((acc, entry) => {
          if (entry) {
            acc[entry[0]] = entry[1];
          }
          return acc;
        }, {});

        const missingAfterYahoo = missingAfterCryptoCompare.filter((asset) => {
          const current = fromYahoo[asset.id];
          return !current || typeof current.usd !== 'number';
        });

        const fromDexEntries = await Promise.all(
          missingAfterYahoo.map(async (asset) => {
            const priceData = await fetchDexScreenerPriceForAsset(asset);
            return priceData ? [asset.id, priceData] : null;
          })
        );

        const fromDexScreener = fromDexEntries.reduce((acc, entry) => {
          if (entry) {
            acc[entry[0]] = entry[1];
          }
          return acc;
        }, {});

        const missingAfterDex = missingAfterYahoo.filter((asset) => {
          const current = fromDexScreener[asset.id];
          return !current || typeof current.usd !== 'number';
        });

        const binanceEntries = await Promise.all(
          missingAfterDex.map(async (asset) => {
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
          ...fromCryptoCompare,
          ...fromYahoo,
          ...fromDexScreener,
          ...fromBinance
        };
      }

      async function resolveAssetByUniversalSymbol(rawQuery) {
        const symbol = String(rawQuery || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
        if (symbol.length < 2) {
          return null;
        }

        const syntheticAsset = {
          id: 'symbol:' + symbol.toLowerCase(),
          symbol
        };

        const providerChecks = [
          () => fetchCoinCapPriceForAsset(syntheticAsset),
          () => fetchCryptoComparePriceForAsset(syntheticAsset),
          () => fetchYahooPriceForAsset(syntheticAsset),
          () => fetchDexScreenerPriceForAsset(syntheticAsset),
          () => fetchBinancePriceForAsset(syntheticAsset)
        ];

        for (const check of providerChecks) {
          try {
            const priceData = await check();
            if (priceData && Number.isFinite(Number(priceData.usd))) {
              return syntheticAsset;
            }
          } catch {
            // Continue trying other providers.
          }
        }

        return null;
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
        const geckoCompatibleIds = marketConfig
          .map((asset) => String(asset?.id || '').toLowerCase())
          .filter((id) => id && !id.includes(':'));
        const ids = geckoCompatibleIds.map((id) => encodeURIComponent(id)).join(',');
        const endpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true';

        try {
          marketErrorEl.style.display = 'none';
          const geckoData = ids ? await fetchJsonWithRetry(endpoint, 1) : {};
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
        const explicitSuggestionId = String(selectedSuggestionId || '').trim().toLowerCase();
        if (!rawQuery) {
          return;
        }

        marketSearchBtnEl.disabled = true;

        const resolvedCoin = explicitSuggestionId
          ? {
              id: explicitSuggestionId,
              symbol: resolveSymbol(explicitSuggestionId, rawQuery),
              fromAlias: false
            }
          : await resolveCoin(rawQuery);
        const coinId = resolvedCoin.id;
        if (!coinId) {
          marketSearchBtnEl.disabled = false;
          return;
        }

        try {
          marketErrorEl.style.display = 'none';

          const baseCandidateIds = buildCandidateIds(rawQuery, coinId, Boolean(resolvedCoin.fromAlias));
          const searchCandidateIds = await buildCoinGeckoSearchCandidateIds(rawQuery);
          const candidateIds = mergeUniqueCoinIds([
            explicitSuggestionId,
            coinId,
            ...baseCandidateIds,
            ...searchCandidateIds
          ]);
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
          selectedSuggestionId = '';
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
              selectedSuggestionId = '';
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
              selectedSuggestionId = '';
              await refreshMarketBubbles();
              await refreshSelectedChart();
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // Surface original error when CoinCap fallback also fails.
          }

          try {
            const symbolAsset = await resolveAssetByUniversalSymbol(rawQuery);
            if (symbolAsset) {
              if (!marketConfig.some((asset) => asset.id === symbolAsset.id)) {
                marketConfig.push(symbolAsset);
              }

              marketSearchInputEl.value = '';
              selectedSuggestionId = '';
              await refreshMarketBubbles();
              await refreshSelectedChart();
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // Keep original error from previous attempts.
          }

          const message = error instanceof Error ? error.message : 'Unknown error';
          marketErrorEl.style.display = 'block';
          marketErrorEl.textContent = 'Could not load this asset from available free APIs: ' + message;
        } finally {
          marketSearchBtnEl.disabled = false;
        }
      }

      marketSearchBtnEl.addEventListener('click', addAssetFromSearch);
      marketSearchInputEl.addEventListener('input', () => {
        selectedSuggestionId = '';
        const query = marketSearchInputEl.value || '';
        if (autocompleteTimer) {
          clearTimeout(autocompleteTimer);
        }
        autocompleteTimer = setTimeout(() => {
          void refreshAutocompleteSuggestions(query);
        }, 180);
      });
      marketSearchInputEl.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' && activeSuggestions.length > 0) {
          event.preventDefault();
          setActiveAutocompleteIndex(activeSuggestionIndex + 1);
          return;
        }

        if (event.key === 'ArrowUp' && activeSuggestions.length > 0) {
          event.preventDefault();
          setActiveAutocompleteIndex(activeSuggestionIndex - 1);
          return;
        }

        if (event.key === 'Enter') {
          event.preventDefault();
          if (activeSuggestions.length > 0 && activeSuggestionIndex >= 0) {
            applySuggestionByIndex(activeSuggestionIndex);
            return;
          }
          addAssetFromSearch();
        }

        if (event.key === 'Escape') {
          clearAutocomplete();
        }
      });
      document.addEventListener('click', (event) => {
        if (!marketAutocompleteEl.contains(event.target) && event.target !== marketSearchInputEl) {
          clearAutocomplete();
        }
      });
      chartRefreshBtnEl.addEventListener('click', refreshSelectedChart);
      chartCoinSelectEl.addEventListener('change', refreshSelectedChart);
      chartRangeSelectEl.addEventListener('change', () => {
        chartRangeSetting = chartRangeSelectEl.value || 'max';
        void refreshSelectedChart();
      });

      chartRangeSelectEl.value = chartRangeSetting;

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

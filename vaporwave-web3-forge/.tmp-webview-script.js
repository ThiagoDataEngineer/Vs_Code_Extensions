
      const vscode = acquireVsCodeApi();
      const byId = (id) => document.getElementById(id);
      const showBootstrapError = (message) => {
        const marketError = byId('marketError');
        const marketTimestamp = byId('marketTimestamp');
        if (marketTimestamp) {
          marketTimestamp.textContent = 'Initialization failed';
        }
        if (marketError) {
          marketError.style.display = 'block';
          marketError.textContent = 'UI bootstrap error: ' + String(message || 'unknown');
        }
      };
      window.addEventListener('error', (event) => {
        showBootstrapError(event?.message || 'runtime error');
      });
      window.addEventListener('unhandledrejection', (event) => {
        const reason = event && 'reason' in event ? event.reason : 'promise rejection';
        const text = reason instanceof Error ? reason.message : String(reason || 'promise rejection');
        showBootstrapError(text);
      });
      const bindClick = (id, handler) => {
        const el = byId(id);
        if (el) {
          el.addEventListener('click', handler);
        }
        return el;
      };
      const currentUiTheme = '${uiTheme}';
      const currentWorkbenchTheme = '${editorTheme}';
      const currentLocale = '${locale}';
      let activeLocale = currentLocale;
      bindClick('connectBtn', () => vscode.postMessage({ command: 'connect' }));
      bindClick('contractCheckBtn', () => vscode.postMessage({ command: 'contractCheck' }));
      const balanceBtn = byId('balanceBtn');
      if (balanceBtn) {
        balanceBtn.addEventListener('click', () => vscode.postMessage({ command: 'balanceCheck' }));
      }
      bindClick('openProviderBtn', () => vscode.postMessage({ command: 'openProvider' }));
      bindClick('donateBtn', () => vscode.postMessage({ command: 'donate' }));
      document.querySelectorAll('[data-donate-address]').forEach((el) => {
        el.addEventListener('click', () => {
          const address = el.getAttribute('data-donate-address') || '';
          vscode.postMessage({ command: 'copyDonateAddress', address });
        });
      });
      bindClick('copyBtn', () => vscode.postMessage({ command: 'copy' }));
      bindClick('disconnectBtn', () => vscode.postMessage({ command: 'disconnect' }));
      bindClick('checkRegistryBalancesBtn', () => vscode.postMessage({ command: 'checkRegistryRealBalances' }));
      const registryExportFormatSelectEl = byId('registryExportFormatSelect');
      bindClick('exportRegistryBtn', () => {
        const isCsv = registryExportFormatSelectEl && registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportRegistryCsv' : 'exportRegistryTxt' });
      });
      bindClick('exportBalanceBtn', () => {
        const isCsv = registryExportFormatSelectEl && registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportRegistryBalancesCsv' : 'exportRegistryBalancesTxt' });
      });
      bindClick('exportContractBtn', () => {
        const isCsv = registryExportFormatSelectEl && registryExportFormatSelectEl.value === 'csv';
        vscode.postMessage({ command: isCsv ? 'exportContractReportCsv' : 'exportContractReportTxt' });
      });
      bindClick('clearRegistryBtn', () => vscode.postMessage({ command: 'clearRegistry' }));
      const uiThemeSelectEl = byId('uiThemeSelect');
      const workbenchThemeSelectEl = byId('workbenchThemeSelect');
      const localeSelectEl = byId('localeSelect');

      const i18n = {
        en: {
          panel: 'Panel', vscode: 'VS Code', language: 'Language', env: 'ENVIRONMENT',
          network: 'Network', wallet: 'Wallet', publicKey: 'Public Key', mode: 'MODE',
          connect: 'Connect Wallet', contract: 'Contract Check', site: 'Wallet Site', balance: 'Check Balance', copy: 'Copy Address', donate: 'Donate', disconnect: 'Disconnect',
          market: 'Crypto Market Snapshot', favorites: 'Pinned Favorites', favEmpty: 'Pin bubbles to keep your top coins at hand.',
          searchPlaceholder: 'Search coin (BTC, ETH, DOGE, xrp, cardano...)', add: 'Add', hint: 'Tip: type symbol or CoinGecko id. You can add many using comma.',
          chart: 'Chart', registry: 'Wallet Registry', registrySub: 'Real and test addresses used in this tool.',
          rangeLoading: 'Range: loading...', realBalances: 'Check Real Balances', exportRegistry: 'Export Registry', exportBalance: 'Export Balance', exportContract: 'Export Contract', clearList: 'Clear List'
        },
        'pt-BR': {
          panel: 'Painel', vscode: 'VS Code', language: 'Idioma', env: 'AMBIENTE',
          network: 'Rede', wallet: 'Carteira', publicKey: 'Chave Publica', mode: 'MODO',
          connect: 'Conectar Carteira', contract: 'Checar Contrato', site: 'Site da Carteira', balance: 'Checar Saldo', copy: 'Copiar Endereco', donate: 'Doar', disconnect: 'Desconectar',
          market: 'Snapshot do Mercado Cripto', favorites: 'Favoritos Fixados', favEmpty: 'Fixe bolhas para manter suas moedas principais.',
          searchPlaceholder: 'Buscar moeda (BTC, ETH, DOGE, xrp, cardano...)', add: 'Adicionar', hint: 'Dica: digite simbolo ou id do CoinGecko. Voce pode adicionar varias separando por virgula.',
          chart: 'Grafico', registry: 'Registro de Carteiras', registrySub: 'Enderecos reais e de teste usados nesta ferramenta.',
          rangeLoading: 'Periodo: carregando...', realBalances: 'Checar Saldos Reais', exportRegistry: 'Exportar Registro', exportBalance: 'Exportar Saldo', exportContract: 'Exportar Contrato', clearList: 'Limpar Lista'
        },
        fr: { panel: 'Panneau', vscode: 'VS Code', language: 'Langue', env: 'ENVIRONNEMENT', network: 'Reseau', wallet: 'Portefeuille', publicKey: 'Cle Publique', mode: 'MODE', connect: 'Connecter Portefeuille', contract: 'Verifier Contrat', site: 'Site du Wallet', balance: 'Verifier Solde', copy: 'Copier Adresse', donate: 'Don', disconnect: 'Deconnecter', market: 'Apercu Marche Crypto', favorites: 'Favoris Epingles', favEmpty: 'Epinglez des bulles pour garder vos principales pieces.', searchPlaceholder: 'Rechercher coin (BTC, ETH, DOGE, xrp, cardano...)', add: 'Ajouter', hint: 'Astuce: symbole ou id CoinGecko.', chart: 'Graphique', registry: 'Registre Wallet', registrySub: 'Adresses reelles et test utilisees.', rangeLoading: 'Periode: chargement...', realBalances: 'Verifier Soldes Reels', exportRegistry: 'Exporter Registre', exportBalance: 'Exporter Solde', exportContract: 'Exporter Contrat', clearList: 'Vider Liste' },
        es: { panel: 'Panel', vscode: 'VS Code', language: 'Idioma', env: 'ENTORNO', network: 'Red', wallet: 'Billetera', publicKey: 'Clave Publica', mode: 'MODO', connect: 'Conectar Billetera', contract: 'Verificar Contrato', site: 'Sitio Wallet', balance: 'Verificar Saldo', copy: 'Copiar Direccion', donate: 'Donar', disconnect: 'Desconectar', market: 'Resumen Mercado Cripto', favorites: 'Favoritos Fijados', favEmpty: 'Fija burbujas para mantener tus monedas top.', searchPlaceholder: 'Buscar moneda (BTC, ETH, DOGE, xrp, cardano...)', add: 'Agregar', hint: 'Tip: simbolo o id de CoinGecko.', chart: 'Grafico', registry: 'Registro de Billeteras', registrySub: 'Direcciones reales y de prueba usadas en esta herramienta.', rangeLoading: 'Periodo: cargando...', realBalances: 'Verificar Saldos Reales', exportRegistry: 'Exportar Registro', exportBalance: 'Exportar Saldo', exportContract: 'Exportar Contrato', clearList: 'Limpiar Lista' },
        de: { panel: 'Panel', vscode: 'VS Code', language: 'Sprache', env: 'UMGEBUNG', network: 'Netzwerk', wallet: 'Wallet', publicKey: 'Public Key', mode: 'MODUS', connect: 'Wallet Verbinden', contract: 'Vertrag Prufen', site: 'Wallet Seite', balance: 'Saldo Prufen', copy: 'Adresse Kopieren', donate: 'Spenden', disconnect: 'Trennen', market: 'Krypto Markt Ubersicht', favorites: 'Angepinnte Favoriten', favEmpty: 'Pinne Blasen fur deine Top Coins.', searchPlaceholder: 'Coin suchen (BTC, ETH, DOGE, xrp, cardano...)', add: 'Hinzufugen', hint: 'Tipp: Symbol oder CoinGecko-ID.', chart: 'Chart', registry: 'Wallet Register', registrySub: 'Reale und Test-Adressen in diesem Tool.', rangeLoading: 'Zeitraum: wird geladen...', realBalances: 'Reale Salden Prufen', exportRegistry: 'Register Export', exportBalance: 'Saldo Export', exportContract: 'Vertrag Export', clearList: 'Liste Loschen' },
        ru: { panel: 'ÐŸÐ°Ð½ÐµÐ»ÑŒ', vscode: 'VS Code', language: 'Ð¯Ð·Ñ‹Ðº', env: 'Ð¡Ð Ð•Ð”Ð', network: 'Ð¡ÐµÑ‚ÑŒ', wallet: 'ÐšÐ¾ÑˆÐµÐ»ÐµÐº', publicKey: 'ÐŸÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¹ ÐºÐ»ÑŽÑ‡', mode: 'Ð Ð•Ð–Ð˜Ðœ', connect: 'ÐŸÐ¾Ð´ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ ÐºÐ¾ÑˆÐµÐ»ÐµÐº', contract: 'ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð°', site: 'Ð¡Ð°Ð¹Ñ‚ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ°', balance: 'ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð±Ð°Ð»Ð°Ð½Ñ', copy: 'ÐšÐ¾Ð¿Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð°Ð´Ñ€ÐµÑ', donate: 'ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð°Ñ‚ÑŒ', disconnect: 'ÐžÑ‚ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ', market: 'Ð¡Ð½Ð¸Ð¼Ð¾Ðº ÐºÑ€Ð¸Ð¿Ñ‚Ð¾Ñ€Ñ‹Ð½ÐºÐ°', favorites: 'Ð—Ð°ÐºÑ€ÐµÐ¿Ð»ÐµÐ½Ð½Ñ‹Ðµ Ð¸Ð·Ð±Ñ€Ð°Ð½Ð½Ñ‹Ðµ', favEmpty: 'Ð—Ð°ÐºÑ€ÐµÐ¿Ð»ÑÐ¹Ñ‚Ðµ Ð¼Ð¾Ð½ÐµÑ‚Ñ‹ Ð´Ð»Ñ Ð±Ñ‹ÑÑ‚Ñ€Ð¾Ð³Ð¾ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð°.', searchPlaceholder: 'ÐŸÐ¾Ð¸ÑÐº Ð¼Ð¾Ð½ÐµÑ‚Ñ‹ (BTC, ETH, DOGE, xrp, cardano...)', add: 'Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ', hint: 'ÐŸÐ¾Ð´ÑÐºÐ°Ð·ÐºÐ°: ÑÐ¸Ð¼Ð²Ð¾Ð» Ð¸Ð»Ð¸ id CoinGecko.', chart: 'Ð“Ñ€Ð°Ñ„Ð¸Ðº', registry: 'Ð ÐµÐµÑÑ‚Ñ€ ÐºÐ¾ÑˆÐµÐ»ÑŒÐºÐ¾Ð²', registrySub: 'Ð ÐµÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ð¸ Ñ‚ÐµÑÑ‚Ð¾Ð²Ñ‹Ðµ Ð°Ð´Ñ€ÐµÑÐ° Ð² Ð¸Ð½ÑÑ‚Ñ€ÑƒÐ¼ÐµÐ½Ñ‚Ðµ.', rangeLoading: 'ÐŸÐµÑ€Ð¸Ð¾Ð´: Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°...', realBalances: 'ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ñ€ÐµÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ð±Ð°Ð»Ð°Ð½ÑÑ‹', exportRegistry: 'Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚ Ñ€ÐµÐµÑÑ‚Ñ€Ð°', exportBalance: 'Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚ Ð±Ð°Ð»Ð°Ð½ÑÐ°', exportContract: 'Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚ ÐºÐ¾Ð½Ñ‚Ñ€Ð°ÐºÑ‚Ð°', clearList: 'ÐžÑ‡Ð¸ÑÑ‚Ð¸Ñ‚ÑŒ ÑÐ¿Ð¸ÑÐ¾Ðº' },
        ja: { panel: 'ãƒ‘ãƒãƒ«', vscode: 'VS Code', language: 'è¨€èªž', env: 'ç’°å¢ƒ', network: 'ãƒãƒƒãƒˆãƒ¯ãƒ¼ã‚¯', wallet: 'ã‚¦ã‚©ãƒ¬ãƒƒãƒˆ', publicKey: 'å…¬é–‹éµ', mode: 'ãƒ¢ãƒ¼ãƒ‰', connect: 'ã‚¦ã‚©ãƒ¬ãƒƒãƒˆæŽ¥ç¶š', contract: 'ã‚³ãƒ³ãƒˆãƒ©ã‚¯ãƒˆç¢ºèª', site: 'ã‚¦ã‚©ãƒ¬ãƒƒãƒˆã‚µã‚¤ãƒˆ', balance: 'æ®‹é«˜ç¢ºèª', copy: 'ã‚¢ãƒ‰ãƒ¬ã‚¹ã‚³ãƒ”ãƒ¼', donate: 'å¯„ä»˜', disconnect: 'åˆ‡æ–­', market: 'æš—å·å¸‚å ´ã‚¹ãƒŠãƒƒãƒ—ã‚·ãƒ§ãƒƒãƒˆ', favorites: 'å›ºå®šãŠæ°—ã«å…¥ã‚Š', favEmpty: 'ãƒãƒ–ãƒ«ã‚’å›ºå®šã—ã¦ä¸»è¦ã‚³ã‚¤ãƒ³ã‚’ä¿æŒã—ã¾ã™ã€‚', searchPlaceholder: 'ã‚³ã‚¤ãƒ³æ¤œç´¢ (BTC, ETH, DOGE, xrp, cardano...)', add: 'è¿½åŠ ', hint: 'ãƒ’ãƒ³ãƒˆ: ã‚·ãƒ³ãƒœãƒ«ã¾ãŸã¯CoinGecko idã€‚', chart: 'ãƒãƒ£ãƒ¼ãƒˆ', registry: 'ã‚¦ã‚©ãƒ¬ãƒƒãƒˆç™»éŒ²', registrySub: 'ã“ã®ãƒ„ãƒ¼ãƒ«ã§ä½¿ã‚ã‚ŒãŸå®Ÿ/ãƒ†ã‚¹ãƒˆã‚¢ãƒ‰ãƒ¬ã‚¹ã€‚', rangeLoading: 'æœŸé–“: èª­ã¿è¾¼ã¿ä¸­...', realBalances: 'å®Ÿæ®‹é«˜ãƒã‚§ãƒƒã‚¯', exportRegistry: 'ç™»éŒ²ã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆ', exportBalance: 'æ®‹é«˜ã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆ', exportContract: 'å¥‘ç´„ã‚’ã‚¨ã‚¯ã‚¹ãƒãƒ¼ãƒˆ', clearList: 'ãƒªã‚¹ãƒˆã‚’ã‚¯ãƒªã‚¢' },
        zh: { panel: 'é¢æ¿', vscode: 'VS Code', language: 'è¯­è¨€', env: 'çŽ¯å¢ƒ', network: 'ç½‘ç»œ', wallet: 'é’±åŒ…', publicKey: 'å…¬é’¥', mode: 'æ¨¡å¼', connect: 'è¿žæŽ¥é’±åŒ…', contract: 'åˆçº¦æ£€æŸ¥', site: 'é’±åŒ…ç½‘ç«™', balance: 'æ£€æŸ¥ä½™é¢', copy: 'å¤åˆ¶åœ°å€', donate: 'èµžåŠ©', disconnect: 'æ–­å¼€è¿žæŽ¥', market: 'åŠ å¯†å¸‚åœºå¿«ç…§', favorites: 'ç½®é¡¶æ”¶è—', favEmpty: 'ç½®é¡¶æ°”æ³¡ä»¥ä¿ç•™å¸¸ç”¨å¸ç§ã€‚', searchPlaceholder: 'æœç´¢å¸ç§ (BTC, ETH, DOGE, xrp, cardano...)', add: 'æ·»åŠ ', hint: 'æç¤º: å¯è¾“å…¥ç¬¦å·æˆ–CoinGecko idã€‚', chart: 'å›¾è¡¨', registry: 'é’±åŒ…ç™»è®°', registrySub: 'æ­¤å·¥å…·ä¸­ä½¿ç”¨çš„çœŸå®žå’Œæµ‹è¯•åœ°å€ã€‚', rangeLoading: 'åŒºé—´: åŠ è½½ä¸­...', realBalances: 'æ£€æŸ¥çœŸå®žä½™é¢', exportRegistry: 'å¯¼å‡ºç™»è®°', exportBalance: 'å¯¼å‡ºä½™é¢', exportContract: 'å¯¼å‡ºåˆçº¦', clearList: 'æ¸…ç©ºåˆ—è¡¨' },
        ar: { panel: 'Ø§Ù„Ù„ÙˆØ­Ø©', vscode: 'VS Code', language: 'Ø§Ù„Ù„ØºØ©', env: 'Ø§Ù„Ø¨ÙŠØ¦Ø©', network: 'Ø§Ù„Ø´Ø¨ÙƒØ©', wallet: 'Ø§Ù„Ù…Ø­ÙØ¸Ø©', publicKey: 'Ø§Ù„Ù…ÙØªØ§Ø­ Ø§Ù„Ø¹Ø§Ù…', mode: 'Ø§Ù„ÙˆØ¶Ø¹', connect: 'Ø±Ø¨Ø· Ø§Ù„Ù…Ø­ÙØ¸Ø©', contract: 'ÙØ­Øµ Ø§Ù„Ø¹Ù‚Ø¯', site: 'Ù…ÙˆÙ‚Ø¹ Ø§Ù„Ù…Ø­ÙØ¸Ø©', balance: 'ÙØ­Øµ Ø§Ù„Ø±ØµÙŠØ¯', copy: 'Ù†Ø³Ø® Ø§Ù„Ø¹Ù†ÙˆØ§Ù†', donate: 'ØªØ¨Ø±Ø¹', disconnect: 'Ù‚Ø·Ø¹ Ø§Ù„Ø§ØªØµØ§Ù„', market: 'Ù„Ù‚Ø·Ø© Ø³ÙˆÙ‚ Ø§Ù„ÙƒØ±ÙŠØ¨ØªÙˆ', favorites: 'Ø§Ù„Ù…ÙØ¶Ù„Ø© Ø§Ù„Ù…Ø«Ø¨ØªØ©', favEmpty: 'Ø«Ø¨Ù‘Øª Ø§Ù„ÙÙ‚Ø§Ø¹Ø§Øª Ù„Ù„Ø§Ø­ØªÙØ§Ø¸ Ø¨Ø£Ù‡Ù… Ø§Ù„Ø¹Ù…Ù„Ø§Øª.', searchPlaceholder: 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ø¹Ù…Ù„Ø© (BTC, ETH, DOGE, xrp, cardano...)', add: 'Ø¥Ø¶Ø§ÙØ©', hint: 'Ù†ØµÙŠØ­Ø©: ÙŠÙ…ÙƒÙ†Ùƒ ÙƒØªØ§Ø¨Ø© Ø§Ù„Ø±Ù…Ø² Ø£Ùˆ Ù…Ø¹Ø±Ù CoinGecko.', chart: 'Ø§Ù„Ø±Ø³Ù… Ø§Ù„Ø¨ÙŠØ§Ù†ÙŠ', registry: 'Ø³Ø¬Ù„ Ø§Ù„Ù…Ø­Ø§ÙØ¸', registrySub: 'Ø¹Ù†Ø§ÙˆÙŠÙ† Ø­Ù‚ÙŠÙ‚ÙŠØ© ÙˆØªØ¬Ø±ÙŠØ¨ÙŠØ© Ù…Ø³ØªØ®Ø¯Ù…Ø© ÙÙŠ Ø§Ù„Ø£Ø¯Ø§Ø©.', rangeLoading: 'Ø§Ù„Ù†Ø·Ø§Ù‚: Ø¬Ø§Ø± Ø§Ù„ØªØ­Ù…ÙŠÙ„...', realBalances: 'ÙØ­Øµ Ø§Ù„Ø£Ø±ØµØ¯Ø© Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©', exportRegistry: 'ØªØµØ¯ÙŠØ± Ø§Ù„Ø³Ø¬Ù„', exportBalance: 'ØªØµØ¯ÙŠØ± Ø§Ù„Ø±ØµÙŠØ¯', exportContract: 'ØªØµØ¯ÙŠØ± Ø§Ù„Ø¹Ù‚Ø¯', clearList: 'Ù…Ø³Ø­ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©' }
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

      if (uiThemeSelectEl) {
        uiThemeSelectEl.value = currentUiTheme;
        uiThemeSelectEl.addEventListener('change', () => {
          vscode.postMessage({ command: 'setUiTheme', themeId: uiThemeSelectEl.value });
        });
      }

      if (workbenchThemeSelectEl) {
        workbenchThemeSelectEl.value = currentWorkbenchTheme;
        workbenchThemeSelectEl.addEventListener('change', () => {
          vscode.postMessage({ command: 'setWorkbenchTheme', workbenchThemeId: workbenchThemeSelectEl.value });
        });
      }

      if (localeSelectEl) {
        localeSelectEl.value = activeLocale;
        localeSelectEl.addEventListener('change', () => {
          activeLocale = localeSelectEl.value;
          document.body.dir = activeLocale === 'ar' ? 'rtl' : 'ltr';
          applyTranslations();
          vscode.postMessage({ command: 'setLocale', localeId: activeLocale });
        });
      }

      document.body.dir = activeLocale === 'ar' ? 'rtl' : 'ltr';
      applyTranslations();

      const registryTabRealEl = byId('registryTabReal');
      const registryTabTestEl = byId('registryTabTest');
      const registryPanelRealEl = byId('registryPanelReal');
      const registryPanelTestEl = byId('registryPanelTest');

      function setRegistryTab(active) {
        const showReal = active === 'real';
        if (!registryTabRealEl || !registryTabTestEl || !registryPanelRealEl || !registryPanelTestEl) {
          return;
        }
        registryTabRealEl.classList.toggle('active', showReal);
        registryTabTestEl.classList.toggle('active', !showReal);
        registryPanelRealEl.classList.toggle('hidden', !showReal);
        registryPanelTestEl.classList.toggle('hidden', showReal);
      }

      if (registryTabRealEl) {
        registryTabRealEl.addEventListener('click', () => setRegistryTab('real'));
      }
      if (registryTabTestEl) {
        registryTabTestEl.addEventListener('click', () => setRegistryTab('test'));
      }

      const defaultMarketConfig = [
        { id: 'bitcoin', symbol: 'BTC' },
        { id: 'ethereum', symbol: 'ETH' },
        { id: 'solana', symbol: 'SOL' },
        { id: 'binancecoin', symbol: 'BNB' },
        { id: 'matic-network', symbol: 'POL' },
        { id: 'tron', symbol: 'TRX' },
        { id: 'ripple', symbol: 'XRP' },
        { id: 'cardano', symbol: 'ADA' },
        { id: 'dogecoin', symbol: 'DOGE' },
        { id: 'chainlink', symbol: 'LINK' },
        { id: 'polkadot', symbol: 'DOT' },
        { id: 'avalanche-2', symbol: 'AVAX' }
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
        'tether-gold': 'tether-gold'
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
        'tether-gold': 'XAUT'
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
        'tether-gold': 'tether-gold'
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
        'avalanche-2': 'AVAX-USD',
        'tether-gold': 'XAUT-USD'
      };

      const googleFinanceSymbolByCoinId = {
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
        'avalanche-2': 'AVAX-USD',
        'tether-gold': 'XAUT-USD'
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
      const requiredBootstrapElements = [
        marketBubblesEl,
        marketTimestampEl,
        marketErrorEl,
        marketSearchInputEl,
        marketSearchBtnEl,
        marketAutocompleteEl,
        marketFavoritesEl,
        marketFavoritesEmptyEl,
        chartCoinSelectEl,
        chartRangeSelectEl,
        chartRefreshBtnEl,
        chartTimeframeEl,
        priceChartSurfaceEl
      ];

      if (requiredBootstrapElements.some((el) => !el)) {
        showBootstrapError('missing required DOM nodes for market bootstrap');
      }
      const favoriteAssetIds = new Set(['bitcoin', 'ethereum']);
      let activeSuggestions = [];
      let activeSuggestionIndex = -1;
      let autocompleteTimer = null;
      let coinGeckoCoinListCache = [];
      let coinGeckoCoinListFetchedAt = 0;
      let chartRangeSetting = 'max';
      let chartProviderRotationIndex = 0;
      let fallbackProviderRotationIndex = 0;
      let chartRequestToken = 0;
      let isMarketRefreshInFlight = false;
      let lastMarketPayload = {};
      const MAX_CHART_PROVIDER_TIME_MS = 9000;
      const MAX_PRICE_PROVIDER_TIME_MS = 6500;
      const MAX_CHART_POINTS = 1825;

      async function withTimeout(promise, timeoutMs, label) {
        let timeoutHandle = null;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutHandle = setTimeout(() => {
            reject(new Error((label || 'operation') + ' timeout after ' + timeoutMs + 'ms'));
          }, timeoutMs);
        });

        try {
          return await Promise.race([promise, timeoutPromise]);
        } finally {
          if (timeoutHandle) {
            clearTimeout(timeoutHandle);
          }
        }
      }

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

      function getYahooSymbolForAsset(asset) {
        const rawId = String(asset?.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;

        if (yahooSymbolByCoinId[normalizedId]) {
          return yahooSymbolByCoinId[normalizedId];
        }

        const symbol = getPreferredSymbol(asset);
        return symbol ? symbol + '-USD' : '';
      }

      function getGoogleFinanceSymbolForAsset(asset) {
        const rawId = String(asset?.id || '').toLowerCase();
        const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;

        if (googleFinanceSymbolByCoinId[normalizedId]) {
          return googleFinanceSymbolByCoinId[normalizedId];
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

        marketSearchInputEl.value = suggestion.id;
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
          unpinBtn.textContent = 'â˜…';
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
          const hasPrice = data && typeof data.usd === 'number';
          const change = typeof data?.usd_24h_change === 'number' ? data.usd_24h_change : 0;
          const bubble = document.createElement('div');
          bubble.className = 'bubble ' + (change >= 0 ? 'bubble-up' : 'bubble-down');

          const content = document.createElement('span');
          content.className = 'bubble-main';
          if (hasPrice) {
            const changePrefix = change >= 0 ? '+' : '';
            content.textContent = asset.symbol + ' ' + formatUsd(data.usd) + ' (' + changePrefix + change.toFixed(2) + '%)';
          } else {
            content.textContent = asset.symbol + ' loading...';
          }

          const actions = document.createElement('span');
          actions.className = 'bubble-actions';

          const pinBtn = document.createElement('button');
          pinBtn.className = 'bubble-pin' + (favoriteAssetIds.has(asset.id) ? ' active' : '');
          pinBtn.type = 'button';
          pinBtn.title = favoriteAssetIds.has(asset.id) ? 'Unpin favorite' : 'Pin favorite';
          pinBtn.textContent = favoriteAssetIds.has(asset.id) ? 'â˜…' : 'â˜†';
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
          removeBtn.textContent = 'Ã—';
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
        if (!Array.isArray(data?.points)) {
          return data;
        }

        const days = getRangeDays(rangeKey);
        const cappedDays = Number.isFinite(days)
          ? Math.min(days, MAX_CHART_POINTS)
          : MAX_CHART_POINTS;

        if (data.points.length <= cappedDays) {
          return {
            ...data,
            points: data.points.slice(-MAX_CHART_POINTS)
          };
        }

        const slicedPoints = data.points.slice(-cappedDays);
        const endMs = data.endMs;
        const computedStart = Number.isFinite(endMs)
          ? (endMs - ((cappedDays - 1) * 24 * 60 * 60 * 1000))
          : data.startMs;

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

      function isChartCandidateBetter(candidate, baseline) {
        if (!candidate) {
          return false;
        }
        if (!baseline) {
          return true;
        }

        const candidateStart = Number.isFinite(candidate?.startMs) ? candidate.startMs : Number.POSITIVE_INFINITY;
        const baselineStart = Number.isFinite(baseline?.startMs) ? baseline.startMs : Number.POSITIVE_INFINITY;
        if (candidateStart !== baselineStart) {
          return candidateStart < baselineStart;
        }

        const candidatePoints = Array.isArray(candidate?.points) ? candidate.points.length : 0;
        const baselinePoints = Array.isArray(baseline?.points) ? baseline.points.length : 0;
        return candidatePoints > baselinePoints;
      }

      async function waitForFirstValidChartCandidate(candidatePromises) {
        if (!Array.isArray(candidatePromises) || candidatePromises.length === 0) {
          return null;
        }

        return await new Promise((resolve) => {
          let pending = candidatePromises.length;
          let resolved = false;

          for (const candidatePromise of candidatePromises) {
            candidatePromise
              .then((candidate) => {
                if (!resolved && candidate) {
                  resolved = true;
                  resolve(candidate);
                }
              })
              .catch(() => {
                // Ignore individual provider errors here.
              })
              .finally(() => {
                pending -= 1;
                if (!resolved && pending === 0) {
                  resolved = true;
                  resolve(null);
                }
              });
          }
        });
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

        try {
          const geckoEndpoint =
            'https://api.coingecko.com/api/v3/coins/'
            + encodeURIComponent(rawId)
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
        const coinCapId = coinCapIdByCoinGeckoId[normalizedId] || normalizedId;
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

      function parseGoogleFinanceQuotePriceFromHtml(html) {
        if (!html) {
          return NaN;
        }

        const attrMatch = html.match(/data-last-price="([0-9.,-]+)"/i);
        if (attrMatch && attrMatch[1]) {
          const parsedAttr = Number(String(attrMatch[1]).replace(/,/g, ''));
          if (Number.isFinite(parsedAttr)) {
            return parsedAttr;
          }
        }

        const classMatch = html.match(/class="YMlKec fxKbKc">\\s*([^<]+?)\\s*</i);
        if (!classMatch || !classMatch[1]) {
          return NaN;
        }

        const parsed = Number(String(classMatch[1]).replace(/,/g, '').trim());
        return Number.isFinite(parsed) ? parsed : NaN;
      }

      function parseGoogleFinanceChartPointsFromHtml(html) {
        if (!html) {
          return [];
        }

        const dsBlockPattern = new RegExp('<script class="ds:10"[^>]*>([\\\\s\\\\S]*?)<\\\\/script>', 'i');
        const dsBlockMatch = html.match(dsBlockPattern);
        const source = dsBlockMatch && dsBlockMatch[1] ? dsBlockMatch[1] : html;
        const regex = new RegExp('\\\\],\\\\[(-?\\\\d+(?:\\\\.\\\\d+)?),(?:-?\\\\d+(?:\\\\.\\\\d+)?(?:E[+-]?\\\\d+)?|null),', 'g');
        const points = [];

        let match;
        while ((match = regex.exec(source)) !== null) {
          const price = Number(match[1]);
          if (Number.isFinite(price) && price > 0) {
            points.push(price);
          }
        }

        if (points.length < 2) {
          return [];
        }

        return points.slice(-MAX_CHART_POINTS);
      }

      async function fetchGoogleFinanceChartPointsForAsset(asset) {
        const googleSymbol = getGoogleFinanceSymbolForAsset(asset);
        if (!googleSymbol) {
          return { points: [], startMs: NaN, endMs: NaN };
        }

        try {
          const endpoint = 'https://www.google.com/finance/quote/' + encodeURIComponent(googleSymbol);
          const html = await fetchTextWithRetry(endpoint, 1, 9000);
          const points = parseGoogleFinanceChartPointsFromHtml(html);
          if (!Array.isArray(points) || points.length < 2) {
            return { points: [], startMs: NaN, endMs: NaN };
          }

          const endMs = Date.now();
          const stepMs = 60 * 60 * 1000;
          const startMs = endMs - ((points.length - 1) * stepMs);

          return {
            points,
            startMs,
            endMs
          };
        } catch {
          return { points: [], startMs: NaN, endMs: NaN };
        }
      }

      async function fetchChartPointsForAsset(asset, rangeKey, options) {
        if (!asset || !asset.id) {
          return {
            points: [],
            startMs: NaN,
            endMs: NaN,
            source: '',
            timeframe: 'Range unavailable'
          };
        }

        const onCandidate = typeof options?.onCandidate === 'function'
          ? options.onCandidate
          : null;

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
              source: 'Google Finance',
              enabled: true,
              load: () => fetchGoogleFinanceChartPointsForAsset(asset)
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
            source: '',
            timeframe: 'Range unavailable'
          };
        }

        chartProviderRotationIndex = (chartProviderRotationIndex + 1) % providers.length;

        const candidatePromises = providers.map(async (provider) => {
          try {
            const fullData = await withTimeout(
              provider.load(),
              MAX_CHART_PROVIDER_TIME_MS,
              provider.source + ' chart'
            );
            if (!Array.isArray(fullData?.points) || fullData.points.length < 2) {
              return null;
            }

            const slicedData = applyDailyRangeSlice(fullData, rangeKey);
            if (!Array.isArray(slicedData?.points) || slicedData.points.length < 2) {
              return null;
            }

            return {
              source: provider.source,
              points: slicedData.points,
              startMs: slicedData.startMs,
              endMs: slicedData.endMs
            };
          } catch {
            // Keep probing other sources to maximize chances of older history.
            return null;
          }
        });

        const firstCandidate = await waitForFirstValidChartCandidate(candidatePromises);
        if (firstCandidate && onCandidate) {
          onCandidate(firstCandidate);
        }

        const candidates = (await Promise.all(candidatePromises)).filter((entry) => Boolean(entry));

        const oldestCandidate = selectOldestChartCandidate(candidates);
        if (!oldestCandidate) {
          return {
            points: [],
            startMs: NaN,
            endMs: NaN,
            source: '',
            timeframe: 'Range unavailable'
          };
        }

        if (onCandidate && isChartCandidateBetter(oldestCandidate, firstCandidate)) {
          onCandidate(oldestCandidate);
        }

        return {
          points: oldestCandidate.points,
          startMs: oldestCandidate.startMs,
          endMs: oldestCandidate.endMs,
          source: oldestCandidate.source,
          timeframe: buildChartWindowLabel(oldestCandidate.startMs, oldestCandidate.endMs, oldestCandidate.source)
        };
      }

      async function refreshSelectedChart() {
        const requestToken = ++chartRequestToken;
        const selectedId = chartCoinSelectEl.value;
        const selectedAsset = marketConfig.find((asset) => asset.id === selectedId);

        if (!selectedAsset) {
          renderChartPlaceholder('Chart unavailable for this asset');
          return;
        }

        try {
          renderChartPlaceholder('Loading chart...');
          let displayedCandidate = null;
          const renderCandidateIfBetter = (candidate) => {
            if (requestToken !== chartRequestToken) {
              return;
            }

            const points = Array.isArray(candidate?.points) ? candidate.points : [];
            if (points.length < 2 || !isChartCandidateBetter(candidate, displayedCandidate)) {
              return;
            }

            displayedCandidate = candidate;
            if (chartTimeframeEl) {
              chartTimeframeEl.textContent = buildChartWindowLabel(candidate.startMs, candidate.endMs, candidate.source || 'Unknown');
            }
            renderSparkline(points, formatChartDate(candidate.startMs), formatChartDate(candidate.endMs));
          };

          const chartResult = await fetchChartPointsForAsset(selectedAsset, chartRangeSetting, {
            onCandidate: renderCandidateIfBetter
          });

          if (requestToken !== chartRequestToken) {
            return;
          }

          const points = Array.isArray(chartResult?.points) ? chartResult.points : [];
          if (points.length < 2) {
            throw new Error('No data');
          }

          renderCandidateIfBetter(chartResult);
        } catch {
          if (requestToken !== chartRequestToken) {
            return;
          }
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

      async function fetchTextWithRetry(url, retries, timeoutMs = 12000) {
        let lastError = null;

        for (let attempt = 0; attempt <= retries; attempt += 1) {
          const controller = new AbortController();
          const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: { accept: 'text/html,application/xhtml+xml' },
              signal: controller.signal
            });

            if (!response.ok) {
              throw new Error('HTTP ' + response.status);
            }

            return await response.text();
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

      async function fetchGoogleFinancePriceForAsset(asset) {
        const googleSymbol = getGoogleFinanceSymbolForAsset(asset);
        if (!googleSymbol) {
          return null;
        }

        try {
          const endpoint = 'https://www.google.com/finance/quote/' + encodeURIComponent(googleSymbol);
          const html = await fetchTextWithRetry(endpoint, 1, 9000);
          const usd = parseGoogleFinanceQuotePriceFromHtml(html);
          if (!Number.isFinite(usd)) {
            return null;
          }

          return {
            usd,
            usd_24h_change: 0,
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

      async function fetchCoinCapBatchDataForAssets(assets) {
        const coinCapIdToGeckoId = {};
        const coinCapIds = [];

        for (const asset of assets) {
          const rawId = String(asset.id || '').toLowerCase();
          const normalizedId = rawId.startsWith('coincap:') ? rawId.replace('coincap:', '') : rawId;
          const coinCapId = coinCapIdByCoinGeckoId[normalizedId] || normalizedId;
          if (coinCapId && !coinCapIds.includes(coinCapId)) {
            coinCapIds.push(coinCapId);
            coinCapIdToGeckoId[coinCapId] = rawId;
          }
        }

        if (coinCapIds.length === 0) {
          return {};
        }

        const endpoint = 'https://api.coincap.io/v2/assets?ids=' + coinCapIds.map(encodeURIComponent).join(',');
        const payload = await fetchJsonWithRetry(endpoint, 0, 7000);
        const result = {};

        if (Array.isArray(payload?.data)) {
          for (const assetData of payload.data) {
            const id = String(assetData.id || '').toLowerCase();
            const geckoId = coinCapIdToGeckoId[id];
            if (geckoId) {
              const parsed = parseCoinCapAsset(assetData);
              if (parsed) {
                result[geckoId] = parsed;
              }
            }
          }
        }

        return result;
      }

      async function fetchCryptoCompareBatchDataForAssets(assets) {
        const symbolToGeckoId = {};
        const symbols = [];

        for (const asset of assets) {
          const sym = getPreferredSymbol(asset);
          if (sym && !symbolToGeckoId[sym]) {
            symbolToGeckoId[sym] = asset.id;
            symbols.push(sym);
          }
        }

        if (symbols.length === 0) {
          return {};
        }

        const endpoint = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + symbols.map(encodeURIComponent).join(',') + '&tsyms=USD';
        const payload = await fetchJsonWithRetry(endpoint, 0, 7000);
        const result = {};

        for (const sym of symbols) {
          const raw = payload?.RAW?.[sym]?.USD;
          const usd = Number(raw?.PRICE);
          const change = Number(raw?.CHANGEPCT24HOUR);
          if (Number.isFinite(usd)) {
            result[symbolToGeckoId[sym]] = {
              usd,
              usd_24h_change: Number.isFinite(change) ? change : 0
            };
          }
        }

        return result;
      }

      async function fetchYahooBatchDataForAssets(assets) {
        const yahooSymbolToGeckoId = {};
        const yahooSymbols = [];

        for (const asset of assets) {
          const sym = getYahooSymbolForAsset(asset);
          if (sym && !yahooSymbolToGeckoId[sym]) {
            yahooSymbolToGeckoId[sym] = asset.id;
            yahooSymbols.push(sym);
          }
        }

        if (yahooSymbols.length === 0) {
          return {};
        }

        const endpoint = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + yahooSymbols.map(encodeURIComponent).join(',');
        const payload = await fetchJsonWithRetry(endpoint, 0, 7000);
        const result = {};

        if (Array.isArray(payload?.quoteResponse?.result)) {
          for (const row of payload.quoteResponse.result) {
            const sym = String(row?.symbol || '');
            const geckoId = yahooSymbolToGeckoId[sym];
            if (geckoId) {
              const usd = Number(row?.regularMarketPrice);
              const change = Number(row?.regularMarketChangePercent);
              if (Number.isFinite(usd)) {
                result[geckoId] = {
                  usd,
                  usd_24h_change: Number.isFinite(change) ? change : 0
                };
              }
            }
          }
        }

        return result;
      }

      async function fetchBinanceBatchDataForAssets(assets) {
        const pairToGeckoId = {};
        const pairs = [];

        for (const asset of assets) {
          const rawId = String(asset.id || '').toLowerCase().replace(/^coincap:/, '');
          const sym = String(asset.symbol || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
          const pair = binancePairByCoinId[rawId] || (sym ? sym + 'USDT' : null);
          if (pair && !pairToGeckoId[pair]) {
            pairToGeckoId[pair] = asset.id;
            pairs.push(pair);
          }
        }

        if (pairs.length === 0) {
          return {};
        }

        const symbolsParam = encodeURIComponent(JSON.stringify(pairs));
        const endpoint = 'https://api.binance.com/api/v3/ticker/24hr?symbols=' + symbolsParam;
        const payload = await fetchJsonWithRetry(endpoint, 0, 7000);
        const result = {};

        if (Array.isArray(payload)) {
          for (const ticker of payload) {
            const pair = String(ticker?.symbol || '');
            const geckoId = pairToGeckoId[pair];
            if (geckoId) {
              const parsed = parseBinanceTicker(ticker);
              if (parsed) {
                result[geckoId] = parsed;
              }
            }
          }
        }

        return result;
      }

      async function fetchFallbackDataForAssets(assets) {
        // Fire all batch providers in parallel - no more sequential waterfall.
        const [ccResult, coincapResult, yahooResult, binanceResult] = await Promise.allSettled([
          fetchCryptoCompareBatchDataForAssets(assets),
          fetchCoinCapBatchDataForAssets(assets),
          fetchYahooBatchDataForAssets(assets),
          fetchBinanceBatchDataForAssets(assets)
        ]);

        const result = {};

        // Apply in ascending priority order so higher-priority sources overwrite lower ones.
        // Priority: CryptoCompare > CoinCap > Yahoo > Binance
        for (const settled of [binanceResult, yahooResult, coincapResult, ccResult]) {
          if (settled.status === 'fulfilled' && settled.value) {
            for (const [id, priceData] of Object.entries(settled.value)) {
              result[id] = priceData;
            }
          }
        }

        return result;
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
        if (isMarketRefreshInFlight) {
          return;
        }

        isMarketRefreshInFlight = true;
        const ids = marketConfig.map((a) => encodeURIComponent(a.id)).join(',');
        const endpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true';

        try {
          marketErrorEl.style.display = 'none';
          marketTimestampEl.textContent = 'Updating prices...';
          // Render immediate placeholders so the panel never looks frozen.
          renderBubbles(lastMarketPayload || {});

          // Fast path first: avoid waiting on multiple providers before first paint.
          const geckoData = await withTimeout(
            fetchJsonWithRetry(endpoint, 0, 1800),
            2200,
            'CoinGecko prices'
          ).catch(() => ({}));

          const mergedData = { ...geckoData };

          const missingAssets = marketConfig.filter((asset) => {
            const current = mergedData[asset.id];
            return !current || typeof current.usd !== 'number';
          });

          if (Object.keys(mergedData).length > 0) {
            renderBubbles(mergedData);
            lastMarketPayload = mergedData;
            const now = new Date();
            marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString();
          }

          // Enrichment path: fetch missing assets in background without blocking UI.
          if (missingAssets.length > 0) {
            void withTimeout(
              fetchFallbackDataForAssets(missingAssets),
              3500,
              'missing fallback prices'
            )
              .then((missingFallback) => {
                if (!missingFallback || Object.keys(missingFallback).length === 0) {
                  return;
                }

                const nextPayload = { ...(lastMarketPayload || {}), ...missingFallback };
                renderBubbles(nextPayload);
                lastMarketPayload = nextPayload;
                const now = new Date();
                marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString() + ' (mixed sources)';
              })
              .catch(() => {
                // Background enrichment is optional.
              });
          }

          if (Object.keys(mergedData).length === 0) {
            const fallbackData = await withTimeout(
              fetchFallbackDataForAssets(marketConfig),
              3200,
              'fallback prices'
            );
            if (Object.keys(fallbackData).length > 0) {
              renderBubbles(fallbackData);
              lastMarketPayload = fallbackData;
              const now = new Date();
              marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString() + ' (fallback source)';
              return;
            }

            throw new Error('No source returned market data');
          }
        } catch (error) {
          try {
            const fallbackData = await withTimeout(
              fetchFallbackDataForAssets(marketConfig),
              3200,
              'full fallback prices'
            );
            if (Object.keys(fallbackData).length > 0) {
              renderBubbles(fallbackData);
              lastMarketPayload = fallbackData;
              const now = new Date();
              marketTimestampEl.textContent = 'Updated at ' + now.toLocaleTimeString() + ' (fallback source)';
              marketErrorEl.style.display = 'none';
              return;
            }
          } catch {
            // If fallback also fails, show error below.
          }

          if (lastMarketPayload && Object.keys(lastMarketPayload).length > 0) {
            renderBubbles(lastMarketPayload);
            marketTimestampEl.textContent = 'Showing last known prices';
          }

          const message = error instanceof Error ? error.message : 'Unknown error';
          if (!lastMarketPayload || Object.keys(lastMarketPayload).length === 0) {
            marketTimestampEl.textContent = 'Live price unavailable';
          }
          marketErrorEl.style.display = 'block';
          marketErrorEl.textContent = 'Could not load prices now: ' + message;
        } finally {
          isMarketRefreshInFlight = false;
        }
      }

      async function addAssetFromSearch() {
        const rawInput = (marketSearchInputEl.value || '').trim();
        if (!rawInput) {
          return;
        }

        const queries = rawInput
          .split(/[;,\n]+/)
          .map((entry) => entry.trim())
          .filter((entry) => entry)
          .slice(0, 8);

        if (queries.length === 0) {
          return;
        }

        marketSearchBtnEl.disabled = true;

        let addedCount = 0;
        let lastFailureMessage = '';

        try {
          marketErrorEl.style.display = 'none';

          for (const rawQuery of queries) {
            const resolvedCoin = await resolveCoin(rawQuery);
            const coinId = resolvedCoin.id;
            if (!coinId) {
              lastFailureMessage = 'Asset not found (try full name or CoinGecko id)';
              continue;
            }

            let added = false;

            try {
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
                addedCount += 1;
              }
              added = true;
            } catch (error) {
              lastFailureMessage = error instanceof Error ? error.message : 'Unknown error';
            }

            if (added) {
              continue;
            }

            try {
              const binanceCoin = await resolveCoinWithBinance(rawQuery, resolvedCoin);
              if (binanceCoin) {
                if (!marketConfig.some((asset) => asset.id === binanceCoin.id)) {
                  marketConfig.push({
                    id: binanceCoin.id,
                    symbol: binanceCoin.symbol || resolveSymbol(binanceCoin.id, rawQuery)
                  });
                  addedCount += 1;
                }
                continue;
              }
            } catch {
              // Continue to the next fallback source.
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
                  addedCount += 1;
                }
                continue;
              }
            } catch {
              // Keep original error message from previous attempts.
            }
          }

          marketSearchInputEl.value = '';

          if (addedCount > 0) {
            await refreshMarketBubbles();
            await refreshSelectedChart();
            marketErrorEl.style.display = 'none';
            if (queries.length > 1 && addedCount < queries.length) {
              marketErrorEl.style.display = 'block';
              marketErrorEl.textContent = 'Added ' + addedCount + ' asset(s). Some inputs could not be resolved.';
            }
            return;
          }

          marketErrorEl.style.display = 'block';
          marketErrorEl.textContent = 'Could not load this asset from available free APIs: ' + (lastFailureMessage || 'Unknown error');
        } finally {
          marketSearchBtnEl.disabled = false;
        }
      }

      if (
        marketSearchBtnEl
        && marketSearchInputEl
        && marketAutocompleteEl
        && chartRefreshBtnEl
        && chartCoinSelectEl
        && chartRangeSelectEl
      ) {
        marketSearchBtnEl.addEventListener('click', addAssetFromSearch);
        marketSearchInputEl.addEventListener('input', () => {
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
          if (!marketAutocompleteEl || !marketSearchInputEl) {
            return;
          }
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

        try {
          syncChartOptions();
          renderBubbles(lastMarketPayload || {});
          void refreshMarketBubbles();
          void refreshSelectedChart();
          setInterval(() => {
            void refreshMarketBubbles();
          }, 60000);
          setInterval(() => {
            void refreshSelectedChart();
          }, 120000);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error || 'init failure');
          showBootstrapError(message);
        }
      } else {
        showBootstrapError('missing required DOM nodes for market event binding');
      }
    

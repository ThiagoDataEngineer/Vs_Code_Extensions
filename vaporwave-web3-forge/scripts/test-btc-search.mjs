const TEST_QUERY = "BTC";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry(url, retries = 2, timeoutMs = 12000) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(400);
      }
    } finally {
      clearTimeout(timeoutHandle);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Unknown fetch error");
}

function scoreCoin(coin, normalized) {
  const id = String(coin?.id || "").toLowerCase();
  const symbol = String(coin?.symbol || "").toLowerCase();
  const name = String(coin?.name || "").toLowerCase();

  let score = 0;
  if (symbol === normalized) score += 100;
  if (id === normalized) score += 95;
  if (name === normalized) score += 90;
  if (symbol.startsWith(normalized)) score += 60;
  if (id.includes(normalized)) score += 40;
  if (name.includes(normalized)) score += 35;

  return score;
}

function pickBestCoin(coins, normalized) {
  if (!Array.isArray(coins) || coins.length === 0) {
    return null;
  }

  const ranked = coins
    .map((coin) => ({
      coin,
      score: scoreCoin(coin, normalized),
      rank: Number.isFinite(Number(coin?.market_cap_rank))
        ? Number(coin.market_cap_rank)
        : Number.MAX_SAFE_INTEGER,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.rank - b.rank;
    });

  return ranked[0]?.coin || null;
}

async function resolveBtcOnCoinGecko() {
  const normalized = TEST_QUERY.toLowerCase();
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(TEST_QUERY)}`;
  const searchPayload = await fetchJsonWithRetry(searchUrl, 2, 12000);

  let best = pickBestCoin(searchPayload?.coins || [], normalized);

  if (!best) {
    const listUrl = "https://api.coingecko.com/api/v3/coins/list?include_platform=false";
    const listPayload = await fetchJsonWithRetry(listUrl, 1, 18000);
    const fromList = Array.isArray(listPayload)
      ? listPayload.filter((coin) => scoreCoin(coin, normalized) > 0)
      : [];

    best = pickBestCoin(fromList, normalized);
  }

  assert(best && best.id, "BTC was not resolved on CoinGecko");
  return String(best.id).toLowerCase();
}

async function fetchUsdPrice(coinId) {
  const priceUrl = "https://api.coingecko.com/api/v3/simple/price"
    + `?ids=${encodeURIComponent(coinId)}`
    + "&vs_currencies=usd&include_24hr_change=true";
  const payload = await fetchJsonWithRetry(priceUrl, 2, 12000);

  const row = payload?.[coinId];
  const usd = Number(row?.usd);
  const change = Number(row?.usd_24h_change);

  assert(Number.isFinite(usd), `USD price not available for ${coinId}`);

  return {
    usd,
    usd24hChange: Number.isFinite(change) ? change : 0,
  };
}

async function main() {
  console.log("[btc-search-test] Resolving BTC via CoinGecko search...");
  const resolvedId = await resolveBtcOnCoinGecko();
  console.log(`[btc-search-test] Resolved BTC to id: ${resolvedId}`);

  assert(
    resolvedId === "bitcoin",
    `Unexpected coin id for BTC: expected bitcoin, got ${resolvedId}`
  );

  console.log("[btc-search-test] Fetching USD price for resolved coin...");
  const price = await fetchUsdPrice(resolvedId);

  console.log(
    `[btc-search-test] PASS | BTC id=${resolvedId} | usd=${price.usd.toFixed(2)} | 24h=${price.usd24hChange.toFixed(2)}%`
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[btc-search-test] FAIL | ${message}`);
  process.exitCode = 1;
});
